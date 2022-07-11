import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import Post from "../../components/cards/Post";
import Link from "next/link";
import { RollbackOutlined } from "@ant-design/icons";
const config = require("../../config").config

const PostComments = () => {
  const [post, setPost] = useState();
  const router = useRouter();
  const _id = router.query._id;
  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      console.log("fetchpost", data);
      const { data } = await axios.get(config.NEXT_PUBLIC_API + `/user-post/${_id}`);
      console.log("fetchpost2", data);
      setPost(data);
    } catch (err) {
      console.log("fetchpost3", data);
      console.log(err);
    }
  };

  const removeComment = async (postId, comment) => {
    try {
      const answer = window.confirm("Are you sure?");
      if (!answer) return;
      const { data } = await axios.put(config.NEXT_PUBLIC_API + `/remove-comment`, {
        postId,
        comment,
      });
      console.log("Comment removed", data);
      fetchPost();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid">
      <div className="row py-5 text-light bg-default-image">
        <div className="col text-center">
          <h1>Taco</h1>
        </div>
      </div>
      <div className="container cik-md-8 offset-md-2 pt-5">
        <Post post={post} commentsCount={100} removeComment={removeComment} />
      </div>

      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center pt-5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};

export default PostComments;
