import PostCard from "./PostCard";

const Posts = ({ posts }) => {
  return posts.map((post, index) => <PostCard key={index} post={post} />);
};

export default Posts;
