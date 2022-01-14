import ParralaxBG from "../../../components/cards/ParralaxBG";
import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic";
import Head from "next/head";
import Link from "next/link";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>TACO - A Social Food</title>
      <meta name="description" content={post.content} />
      <meta property="og:description" content="a social gamers platform" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="TACO" />
      <meta
        property="og:url"
        content={`http://taco.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = () => {
    if (post.image) {
      return post.image.url;
    } else {
      return "/images/logo.png";
    }
  };

  return (
    <>
      {head()}
      <ParralaxBG url="/images/taco.png">Taco Network</ParralaxBG>
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} />
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/post/${ctx.params._id}`);
  //console.log(data);
  return {
    props: {
      post: data,
    },
  };
}

export default SinglePost;
