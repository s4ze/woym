"use client";
import Layout from "../components/Layout";
import PostCard from "../components/PostCard";
import PostFormCard from "../components/PostFormCard";

import "../styles/globals.css";

// export interface User {
//   name: string;
// }

export default function Home() {
  // const [user] =
  //   useState <
  //   User >
  //   {
  //     name: "",
  //   };
  return (
    <Layout>
      <PostFormCard />
      <PostCard />
    </Layout>
  );
}
