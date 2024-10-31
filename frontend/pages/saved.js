import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import fetchPosts from "../hooks/fetchPosts";
import { useAuth } from "../hooks/AuthProvider";

const SavedPage = () => {
  const { user, token } = useAuth();
  const [posts, setPosts] = useState([]);
  console.log("token:", token, "\nuser:", user);

  useEffect(() => {
    if (user) setPosts(fetchPosts(user));
  }, []);

  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">Saved posts</h1>
      <Posts posts={posts} />
    </Layout>
  );
};

export default SavedPage;
