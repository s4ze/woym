import Card from "../components/Card";
import Layout from "../components/Layout";
import React, { useState } from "react";
import Notifications from "../components/Notifications";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([
    {
      user: {
        userId: "1234",
        name: "Anvar Sizov",
      },
      post: { postId: "4321" },
    },
    {
      user: {
        userId: "5678",
        name: "Anna Sizova",
      },
      post: { postId: "8765" },
    },
  ]);

  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">Notifications</h1>
      <Card noPadding={true}>
        <Notifications notifications={notifications} />
      </Card>
    </Layout>
  );
};

export default NotificationsPage;
