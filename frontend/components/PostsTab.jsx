import React from "react";
import PostCard from "./PostCard";

const PostsTab = () => {
  const post = { Description: "blablablah", CreatedAt: "3 hours ago" };

  return (
    <div>
      <PostCard post={post} />
    </div>
  );
};

export default PostsTab;
