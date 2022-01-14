import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import AdminRoute from "../../components/routes/AdminRoute";
import renderHTML from "react-render-html";
import axios from "axios";
import { toast } from "react-toastify";

const Admin = () => {
  const [state, setState] = useContext(UserContext);

  const [content, setContent] = useState("");

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state && state.token) {
      fetchUserPosts();
    }
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/posts`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/admin/delete-post/${post._id}`);
      toast.error("Post Deleted");
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    let answer = window.confirm("Are you sure?");
    if (!answer) return;
    try {
      const { data } = await axios.put(`/remove-comment`, {
        postId,
        comment,
      });
      fetchUserPosts();
      toast.error("Comment Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AdminRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Admin Page</h1>
          </div>
        </div>

        <div className="row py-4">
          <div className="col-md-8 offset-md-2 ">
            {posts &&
              posts.map((post) => (
                <div key={post._id} className="d-flex justify-content-between">
                  <div>
                    {renderHTML(post.content)} - <b>{post.postedBy.name}</b>{" "}
                  </div>
                  <div
                    onClick={() => handleDelete(post)}
                    className="text-danger"
                  >
                    Delete
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AdminRoute>
  );
};

export default Admin;
