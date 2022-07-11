import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Modal, Avatar } from "antd";
import Link from "next/link";
import { UserContext } from "../../../context";
import { Router, useRouter } from "next/router";
import { LoadingOutlined, CameraOutlined } from "@ant-design/icons";
const config = require("../../../config").config
import AuthForm from "../../../components/forms/AuthForm";

const ProfileUpdate = () => {
  const [username, setUsername] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secret, setSecret] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (state && state.user) {
      //console.log("user from state", state.user);
      setUsername(state.user.username);
      setAbout(state.user.about);
      setName(state.user.name);
      setEmail(state.user.email);
      setImage(state.user.image);
    }
  }, [state && state.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(name, email, password, secret);
    try {
      setLoading(true);
      const { data } = await axios.put(config.NEXT_PUBLIC_API + `/profile-update`, {
        username,
        about,
        name: name,
        email: email,
        password: password,
        secret: secret,
        image,
      });
      console.log("update response", data);
      if (data.error) {
        toast.error(data.error);
        setLoading(false);
      } else {
        //updt local strg, user, keep token
        let auth = JSON.parse(localStorage.getItem("auth"));
        auth.user = data;
        localStorage.setItem("auth", JSON.stringify(auth));
        //update context
        setState({ ...state, user: data });
        setOk(true);
        setLoading(false);
      }
    } catch (err) {
      toast.error(err.response.data);
      setLoading(false);
    }
  };
  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    //console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post(config.NEXT_PUBLIC_API + "/upload-image", formData);
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
  return (
    <div className="container-fluid">
      <div className="row py-5 bg-default-image text-light">
        <div className="col text-center">
          <h1>Profile Page</h1>
        </div>
      </div>

      <div className="row py-5">
        <div className="col-md-6 offset-md-3">
          <label className="d-flex justify-content-center h5">
            {image && image.url ? (
              <Avatar size={30} src={image.url} className="mt-1" />
            ) : uploading ? (
              <LoadingOutlined className="mt-2" />
            ) : (
              <CameraOutlined className="mt-2" />
            )}
            <input
              onChange={handleImage}
              type="file"
              accept="images/*"
              hidden
            />
          </label>
          <AuthForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            secret={secret}
            setSecret={setSecret}
            loading={loading}
            username={username}
            about={about}
            setUsername={setUsername}
            setAbout={setAbout}
            page="update"
          />
        </div>
      </div>

      {/* <div className="row">
        <div className="col">
          <p className="text-center">
            Already Registered?
            <Link href="/login">
              <a> Login</a>
            </Link>
          </p>
        </div>
      </div> */}

      <div className="row">
        <div className="col">
          <Modal
            title="Profile Updated"
            visible={ok}
            onCancel={() => setOk(false)}
            footer={null}
          >
            <p>You have successfully updated your profile</p>
            <Link href="/user/dashboard">
              <a className="btn btn-primary btn-sm">Dashboard</a>
            </Link>
          </Modal>
        </div>
      </div>
    </div>
  );
};
export default ProfileUpdate;
