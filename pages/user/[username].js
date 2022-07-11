import moment from "moment";
import { Avatar, Card } from "antd";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import axios from "axios";
import { RollbackOutlined } from "@ant-design/icons";
import Link from "next/link";
const config = require("../../config").config

const { Meta } = Card;
const Username = () => {
  const [state, setState] = useContext(UserContext);
  const router = useRouter();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (router.query.username) fetchUser();
  }, [router.query.username]);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(config.NEXT_PUBLIC_API + `/user/${router.query.username}`);
      console.log(data);

      setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "https://res.cloudinary.com/fortacos/image/upload/v1657539059/logo_hsxtvb.png";
    }
  };

  return (
    <div className="row col-md-6 offset-md-3 ">
      {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
      <div className="pt-5 pb-5">
        <Card hoverable cover={<img src={imageSource(user)} alt={user.name} />}>
          <Meta title={user.name} description={user.about} />
          <p className="pt-2 text-muted">
            Joined {moment(user.createdAt).fromNow()}
          </p>
          <div className="d-flex justify-content-between">
            <span className="btn btn-sm">
              {user.followers && user.followers.length} Followers
            </span>
            <span className="btn btn-sm">
              {user.following && user.following.length} Following
            </span>
          </div>
        </Card>

        <Link href="/user/dashboard">
          <a className="d-flex justify-content-center pt-5">
            <RollbackOutlined />
          </a>
        </Link>
      </div>
    </div>
  );
};

export default Username;
