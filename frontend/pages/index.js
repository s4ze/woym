"use client";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";
import { useAuth } from "../hooks/AuthProvider";
import api from "../hooks/axios";

const Home = () => {
  // const { user } = useAuth();
  const { user, token } = useAuth();

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

  console.log(`user:${user}\ntoken:${token}`);

  const url = "/Posts/get";

  const fetchPosts = async () => {
    if (user) {
      try {
        const result = await api.get(url, {
          params: {
            userId: user.userId,
          },
        });

        console.log("user in");
        if (result.status === 200) {
          console.log("200 status in");
          setPosts(result.data.posts);
        }
      } catch {
        toast.error("Fecthing posts failed");
      }
    }
  };

  useEffect(() => fetchPosts(), []);

  console.log(`posts:${posts}`);

  // add mapping PostCard elements with number of fetched posts

  return (
    <Layout>
      {/* {user && ( */}
      <div>
        <PostFormCard />
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
    </Layout>
  );
};

export default Home;
