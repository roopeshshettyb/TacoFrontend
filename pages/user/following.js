import moment from "moment";
import { Avatar, List } from "antd";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
const config = require("../../config").config

const Following = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [people, setPeople] = useState([]);

  useEffect(() => {
    if (state && state.token) fetchFollowing();
  }, [state && state.token]);

  const fetchFollowing = async () => {
    try {
      const { data } = await axios.get(config.NEXT_PUBLIC_API + "/user-following");
      console.log(data);

      setPeople(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  const handleUnfollow = async (user) => {
    try {
      const { data } = axios.put(config.NEXT_PUBLIC_API + "/user-unfollow", { _id: user._id });
      let auth = JSON.parse(localStorage.getItem("auth"));
      auth.user = data;
      localStorage.setItem("auth", JSON.stringify(auth));

      setState({ ...state, user: data });
      let filtered = people.filter((person) => person._id !== user._id);
      setPeople(filtered);
      toast.error(`Unfollowed ${user.name}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="row col-md-6 offset-md-3 ">
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="d-flex justify-content-between">
                  {user.username}{" "}
                  <span
                    onClick={() => handleUnfollow(user)}
                    className="text-primary pointer"
                  >
                    Unfollow
                  </span>
                </div>
              }
              avatar={<Avatar src={imageSource(user)}></Avatar>}
            />
          </List.Item>
        )}
      />
      <Link href="/user/dashboard">
        <a className="d-flex justify-content-center pt-5">
          <RollbackOutlined />
        </a>
      </Link>
    </div>
  );
};

export default Following;
