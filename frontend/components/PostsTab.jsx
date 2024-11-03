import React, { useEffect, useState } from "react";
import Posts from "./Posts";
import { useAuth } from "../hooks/AuthProvider";
import fetchPosts from "../hooks/fetchPosts";

const PostsTab = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const updatePosts = async () => {
      const fetchedPosts = await fetchPosts(user);
      setPosts(fetchedPosts);
    };

    if (user) updatePosts();
  }, []);

  return (
    <div>
      <Posts posts={posts} />
    </div>
  );
};

export default PostsTab;
