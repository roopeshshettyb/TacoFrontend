import { UserContext } from "../context";
import { useContext, useEffect, useState } from "react";
import ParralaxBG from "../components/cards/ParralaxBG";
import axios from "axios";
import PostPublic from "../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";
import io from "socket.io-client";
const config = require("../config.js").config
const socket = io(
  config.SOCKETIO_CONNECTION_URL,
  { path: "/socket.io" },
  {
    reconnection: true,
  }
);

const Home = ({ posts }) => {
  const [state, setState] = useContext(UserContext);
  const [newsFeed, setNewsFeed] = useState([]);

  // useEffect(() => {
  //   //console.log("SOCKETIO ON JOIN", socket);
  //   socket.on("receive-msg", (newMessage) => {
  //     alert(newMessage);
  //   });
  // }, []);

  useEffect(() => {
    //console.log("SOCKETIO ON JOIN", socket);
    socket.on("new-post", (newPost) => {
      setNewsFeed([newPost, ...posts]);
    });
  }, []);

  const head = () => (
    <Head>
      <title>TACO - A Social Food</title>
      <meta name="description" content="a social gamers platform" />
      <meta property="og:description" content="a social gamers platform" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TACO" />
      <meta property="og:url" content="http://taco.com" />
      <meta
        property="og:image:secure_url"
        content="http://taco.com/images/taco.png"
      />
    </Head>
  );

  const collection = newsFeed.length > 0 ? newsFeed : posts;

  return (
    <>
      {head()}
      <ParralaxBG url="/images/taco.png">Taco Network</ParralaxBG>
      <div className="container">
        {/* <button
          onClick={() => {
            socket.emit("send-message", "This is roopesh!!");
          }}
        >
          Send Message
        </button> */}
        <div className="row pt-5">
          {collection.map((post) => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`}>
                <a>
                  <PostPublic key={post._id} post={post} />
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const { data } = await axios.get(config.NEXT_PUBLIC_API + "/posts");
  //console.log(data);
  return {
    props: {
      posts: data,
    },
  };
}

export default Home;
