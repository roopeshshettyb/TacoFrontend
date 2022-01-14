import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import UserRoute from "../../components/routes/UserRoute";
import PostForm from "../../components/forms/PostForm";
import CommentForm from "../../components/forms/CommentForm";
import { userRouter, useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";
import PostList from "../../components/cards/Postlist";
import People from "../../components/cards/People";
import Link from "next/link";
import { Modal, Pagination } from "antd";
import Search from "../../components/Search";
import io from "socket.io-client";

const socket = io(
  process.env.NEXT_PUBLIC_SOCKETIO,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const Dashboard = () => {
  const [state, setState] = useContext(UserContext);

  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [people, setPeople] = useState([]);
  const [comment, setComment] = useState("");
  const [visible, setVisible] = useState(false);
  const [currentPost, setCurrentPost] = useState({});
  const router = useRouter();
  const [totalPosts, setTotalPosts] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (state && state.token) {
      findPeople();
      fetchUserPosts();
      console.log(page);
    }
  }, [state && state.token, page]);

  useEffect(() => {
    try {
      axios.get("/total-posts").then(({ data }) => setTotalPosts(data));
    } catch (err) {
      console.log(err);
    }
  });

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(`/user-posts/${page}`);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const findPeople = async () => {
    try {
      const { data } = await axios.get("/find-people");
      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    //console.log("Post =>", content);
    try {
      const { data } = await axios.post("/create-post", { content, image });
      console.log("Response", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        setPage(1);
        fetchUserPosts();
        toast.success("Post Created");
        setContent("");
        setImage("");
        //socket
        socket.emit("new-post", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    //console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post("/upload-image", formData);
      console.log("uploaded", data);
      setUploading(false);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (post) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.delete(`/delete-post/${post._id}`);
      toast.error("Post Deleted");
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFollow = async (user) => {
    //console.log("Add to following", user._id);
    try {
      const { data } = await axios.put("/user-follow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      setState({ ...state, user: data });
      let filtered = people.filter((person) => person._id !== user._id);
      setPeople(filtered);
      toast.success(`Following ${user.name}`);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async (_id) => {
    //console.log("Like this post", _id);
    try {
      const { data } = await axios.put(`/like-post`, { _id });
      console.log("liked data", data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUnlike = async (_id) => {
    //console.log("UnLike this post", _id);
    try {
      const { data } = await axios.put(`/unlike-post`, { _id });
      console.log("unliked data", data);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleComment = (post) => {
    setCurrentPost(post);
    setVisible(true);
  };

  const addComment = async (e) => {
    e.preventDefault();
    // console.log("add comment", currentPost._id);
    // console.log("comment", comment);
    try {
      const { data } = await axios.put("/add-comment", {
        postId: currentPost._id,
        comment,
      });
      console.log("comment", data);
      setComment("");
      setVisible(false);
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
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-default-image">
          <div className="col text-center">
            <h1>Gamers Feed</h1>
          </div>
        </div>

        <div className="row py-2">
          <div className="col-md-6">
            <PostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handleImage={handleImage}
              uploading={uploading}
              image={image}
            />
            <br />
            <PostList
              posts={posts}
              handleLike={handleLike}
              handleUnlike={handleUnlike}
              handleDelete={handleDelete}
              handleComment={handleComment}
              removeComment={removeComment}
            />
            <Pagination
              current={page}
              total={(totalPosts / 3) * 10}
              onChange={(value) => setPage(value)}
              className="pb-5"
            ></Pagination>
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}

          <div className="col-md-4 pb-5">
            <Search />
            <br />
            {state && state.user && state.user.following && (
              <Link href={`/user/following`} className="pt-5 pb-5">
                <a className="h6">{state.user.following.length} Following</a>
              </Link>
            )}
            <People people={people} handleFollow={handleFollow} />
          </div>
        </div>
        <Modal
          visible={visible}
          onCancel={() => setVisible(false)}
          title="Comment"
          footer={null}
        >
          <CommentForm
            comment={comment}
            setComment={setComment}
            addComment={addComment}
          />
        </Modal>
      </div>
    </UserRoute>
  );
};

export default Dashboard;
