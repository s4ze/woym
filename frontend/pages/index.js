"use client";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";
import { useAuth } from "../hooks/AuthProvider";

const Home = () => {
  const { user } = useAuth();

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
