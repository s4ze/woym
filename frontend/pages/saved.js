import Layout from "../components/Layout";
import React, { useEffect, useState } from "react";
import Posts from "../components/Posts";
import fetchPosts from "../hooks/fetchPosts";
import { useAuth } from "../hooks/AuthProvider";

const SavedPage = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([
    {
      description: "Hello geis, today we have top thinko funiest momentos",
      createdAt: "2 hours ago",
      media:
        "https://images.unsplash.com/photo-1618941672699-b75ba3cfcbd5?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      description: "Hello geis, today we have top thinko funiest momentos",
      createdAt: "2 hours ago",
    },
  ]);

  useEffect(() => {
    const updatePosts = async () => {
      const fetchedPosts = await fetchPosts(user);
      setPosts(fetchedPosts);
    };

    if (user) updatePosts();
  }, []);

  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">Saved posts</h1>
      <Posts posts={posts} />
    </Layout>
  );
};

export default SavedPage;
