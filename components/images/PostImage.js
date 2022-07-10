const PostImage = ({ url }) => (
  <div
    style={{
      backgroundImage: "url(" + url + ")",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "top",
      backgroundSize: 'auto auto',
      height: "400px",
    }}
  ></div>
);

export default PostImage;
