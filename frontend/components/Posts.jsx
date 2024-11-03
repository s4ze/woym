import PostCard from "./PostCard";

const Posts = ({ posts }) => {
  try {
    const postCards = posts.map((post, index) => (
      <PostCard key={index} post={post} />
    ));
    return postCards;
  } catch (e) {
    console.log(e);
  }

  return <div></div>;
};

export default Posts;
