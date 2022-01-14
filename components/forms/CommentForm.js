const CommentForm = ({ addComment, comment, setComment }) => {
  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        className="form-control"
        placeholder="write your comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="btn btn-primary my-5">Submit</button>
    </form>
  );
};

export default CommentForm;
