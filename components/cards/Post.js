//@ts-ignore
// import renderHTML from "react-render-html";
const HtmlToReactParser = require('html-to-react').Parser;
const htmlToReactParser = new HtmlToReactParser();
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import {
  HeartOutlined,
  HeartFilled,
  CommentOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from "react";

import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";

const Post = ({
  post,
  handleDelete,
  handleLike,
  handleUnlike,
  handleComment,
  commentsCount = 10,
}) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "https://res.cloudinary.com/fortacos/image/upload/v1657539059/logo_hsxtvb.png";
    }
  };

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(`/user-post/${_id}`);

      setPost(data);
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
      fetchPost();
      toast.error("Comment Deleted");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {post && post.postedBy && (
        <div key={post._id} className="card mb-5">
          <div className="card-header">
            {<Avatar src={imageSource(post.postedBy)}></Avatar>}
            <span className="pt-2 ml-3" style={{ marginLeft: "0.5rem" }}>
              {post.postedBy.name}
            </span>
            <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
              {moment(post.createdAt).fromNow()}
            </span>
          </div>
          <div className="card-body">{htmlToReactParser.parse(post.content)}</div>
          <div className="card-footer">
            {post.image && <PostImage url={post.image.url} />}
            <div className="d-flex pt-2">
              {state &&
                state.user &&
                post.likes &&
                post.likes.includes(state.user._id) ? (
                <HeartFilled
                  onClick={() => handleUnlike(post._id)}
                  className="text-danger pt-2 h5"
                />
              ) : (
                <HeartOutlined
                  onClick={() => handleLike(post._id)}
                  className="text-danger pt-2 h5"
                />
              )}

              <div className="pt-2 pl-3" style={{ marginLeft: "0.1rem" }}>
                {post.likes.length} Likes
              </div>
              <CommentOutlined
                onClick={() => handleComment(post)}
                className="text-danger pt-2 h5 pl-5"
                style={{ marginLeft: "0.5rem" }}
              />
              <div className="pt-2 pl-3" style={{ marginLeft: "0.1rem" }}>
                <Link href={`/post/${post._id}`}>
                  <a>{post.comments.length} Comments</a>
                </Link>
              </div>
              {state && state.user && state.user._id === post.postedBy._id && (
                <>
                  <EditOutlined
                    onClick={() => router.push(`/user/post/${post._id}`)}
                    className="text-danger pt-2 h5 px-2 mx-auto"
                  />
                  <DeleteOutlined
                    onClick={() => handleDelete(post)}
                    className="text-danger pt-2 h5 px-2 mx-auto"
                  />
                </>
              )}
            </div>
          </div>
          {post.comments && post.comments.length > 0 && (
            <ol
              className="list-group"
              style={{ maxHeight: "125px", overflow: "scroll" }}
            >
              {post.comments.slice(0, commentsCount).map((c) => (
                <li
                  key={c._id}
                  className="list-group-item d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div>
                      <Avatar
                        size={20}
                        className="mb-1 mr-3"
                        src={imageSource(c.postedBy)}
                      />{" "}
                      {c.postedBy.name}
                    </div>
                    <i className="text-muted">{c.text}</i>
                  </div>
                  <span className="text-muted badge rounded-pill">
                    {moment(c.created).fromNow()}
                    {state && state.user && state.user._id === c.postedBy._id && (
                      <div className="ml-auto mt-1">
                        <DeleteOutlined
                          onClick={() => removeComment(post._id, c)}
                          className="pl-3 text-danger"
                        />
                      </div>
                    )}
                  </span>
                </li>
              ))}
            </ol>
          )}
        </div>
      )}
    </>
  );
};

export default Post;
