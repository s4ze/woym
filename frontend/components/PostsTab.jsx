import React from "react";
import Posts from "./Posts";

const PostsTab = () => {
  const posts = [{ description: "blablablah", createdAt: "3 hours ago" }];

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default PostsTab;
