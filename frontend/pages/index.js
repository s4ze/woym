"use client";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";
import { useAuth } from "../hooks/AuthProvider";
import api from "../hooks/axios";

const Home = () => {
  const { user } = useAuth();

  const url = "/Posts/get";

  let posts = null;

  if (user) {
    const result = api.get(url, {
      params: {
        userId: user.userId,
      },
    });

    posts = result.data.posts;
    if (result.status === 200) {
      posts = JSON.parse(result.data);
    }
  }

  // add mapping PostCard elements with number of fetched posts

  return (
    <Layout>
      {!user && (
        <div>
          <PostFormCard />
          <PostCard />
        </div>
      )}
    </Layout>
  );
};

export default Home;
