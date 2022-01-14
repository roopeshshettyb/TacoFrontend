import { SyncOutlined } from "@ant-design/icons";

const ForgotPasswordForm = ({
  handleSubmit,
  email,
  setEmail,
  newPassword,
  setNewPassword,
  secret,
  setSecret,
  loading,
  page,
}) => (
  <form onSubmit={handleSubmit}>
    <div className="form-group p-2">
      <small>
        <label className="text-muted">Your Email</label>
      </small>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="form-control"
        placeholder="Enter Email"
      />
    </div>

    <div className="form-group p-2">
      <small>
        <label className="text-muted">New Password</label>
      </small>
      <input
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Enter New Password"
      />
    </div>

    <div className="form-group p-2">
      <small>
        <label className="text-muted">Pick a Question</label>
      </small>
      <select className="form-control">
        <option>What is your fav color</option>
        <option>What is your second fav color</option>
        <option>What is your third fav color</option>
      </select>
      <small className="form-text text-muted">
        You can use this to reset your password if forgotten,
      </small>
    </div>

    <div className="form-group p-2">
      <input
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
        type="text"
        className="form-control"
        placeholder="Answer"
      />
    </div>

    <div className="form-group p-2">
      <button
        disabled={!email || !newPassword || !secret || loading}
        className="btn btn-primary col-12"
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
      </button>
    </div>
  </form>
);

export default ForgotPasswordForm;
