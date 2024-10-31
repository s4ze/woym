"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostFormCard from "../components/PostFormCard";
import { useAuth } from "../hooks/AuthProvider";
import Posts from "../components/Posts";
import fetchPosts from "../hooks/fetchPosts";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
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
  const { user } = useAuth();

  useEffect(() => {
    if (user) setPosts(fetchPosts(user));
  }, [router.asPath]);

  return (
    <Layout>
      <div>
        <PostFormCard />
        <Posts posts={posts} />
      </div>
    </Layout>
  );
};

export default Home;
