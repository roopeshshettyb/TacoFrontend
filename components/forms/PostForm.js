import { Avatar } from "antd";
import { CameraOutlined, LoadingOutlined } from "@ant-design/icons";



const PostForm = ({
  content,
  setContent,
  uploading,
  image,
  postSubmit,
  handleImage,
}) => {

  return (
    <div className="card">
      <div className="card-body pb-3">
        <form className="form-group">
          <input
            value={content}
            type="text"
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            placeholder="Write"
          />
        </form>
      </div>

      <div className="card-footer d-flex justify-content-between text-muted">
        <button
          disabled={!content}
          onClick={postSubmit}
          className="btn btn-primary btn-sm mt-1"
        >
          Post
        </button>
        <label>
          {image && image.url ? (
            <Avatar size={30} src={image.url} className="mt-1" />
          ) : uploading ? (
            <LoadingOutlined className="mt-2" />
          ) : (
            <CameraOutlined className="mt-2" />
          )}
          <input onChange={handleImage} type="file" accept="images/*" hidden />
        </label>
      </div>
    </div>
  );
};

export default PostForm;
