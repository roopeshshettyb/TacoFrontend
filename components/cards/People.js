import moment from "moment";
import { Avatar, List } from "antd";
import PostImage from "../images/PostImage";
import { useContext } from "react";
import { UserContext } from "../../context";
import { useRouter } from "next/router";
import Link from "next/link";

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state] = useContext(UserContext);
  const router = useRouter();

  const imageSource = (user) => {
    if (user.image) {
      return user.image.url;
    } else {
      return "/images/logo.png";
    }
  };
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              title={
                <div className="d-flex justify-content-between">
                  <Link href={`/user/${user.username}`}>
                    <a>{user.username}</a>
                  </Link>

                  {state &&
                    state.user &&
                    user.followers &&
                    user.followers.includes(state.user._id) ? (
                    <span
                      onClick={() => handleUnfollow(user)}
                      className="text-primary pointer"
                    >
                      Unfollow
                    </span>
                  ) : (
                    <span
                      onClick={() => handleFollow(user)}
                      className="text-primary pointer"
                    >
                      Follow
                    </span>
                  )}
                </div>
              }
              avatar={<Avatar src={imageSource(user)}></Avatar>}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default People;
