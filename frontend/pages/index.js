"use client";
import { useEffect, useState } from "react";

import Layout from "../components/Layout";
import Posts from "../components/Posts";
import PostFormCard from "../components/PostFormCard";

import { useAuth } from "../hooks/AuthProvider";
import fetchPosts from "../hooks/fetchPosts";
import { useRouter } from "next/router";

const Home = () => {
  const [posts, setPosts] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
    const getPosts = async () => {
      const fetchedPosts = await fetchPosts(user);
      setPosts(fetchedPosts);
    };

    if (user) getPosts();
  }, []);

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
