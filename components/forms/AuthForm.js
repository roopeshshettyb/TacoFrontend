import { SyncOutlined } from "@ant-design/icons";

const AuthForm = ({
  handleSubmit,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  secret,
  setSecret,
  loading,
  page,
  username,
  setUsername,
  about,
  setAbout,
}) => (
  <form onSubmit={handleSubmit}>
    {page === "update" && (
      <>
        <div className="form-group p-2">
          <small>
            <label className="text-muted">Username</label>
          </small>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Enter Name"
          />
        </div>

        <div className="form-group p-2">
          <small>
            <label className="text-muted">About</label>
          </small>
          <input
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            type="text"
            className="form-control"
            placeholder="Write about yourself"
          />
        </div>
      </>
    )}

    {page !== "login" && (
      <div className="form-group p-2">
        <small>
          <label className="text-muted">Your Name</label>
        </small>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Enter Name"
        />
      </div>
    )}

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
        disabled={page === "update"}
      />
    </div>

    <div className="form-group p-2">
      <small>
        <label className="text-muted">Your Password</label>
      </small>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="form-control"
        placeholder="Enter Password"
      />
    </div>
    {page !== "login" && (
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
    )}
    {page !== "login" && (
      <div className="form-group p-2">
        <input
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          type="text"
          className="form-control"
          placeholder="Answer"
        />
      </div>
    )}
    <div className="form-group p-2">
      <button
        disabled={
          page === "update"
            ? loading
            : page === "login"
            ? !email || !password || loading
            : !email || !password || !secret || loading || !name
        }
        className="btn btn-primary col-12"
      >
        {loading ? <SyncOutlined spin className="py-1" /> : "Submit"}
      </button>
    </div>
  </form>
);

export default AuthForm;
