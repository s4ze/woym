import Avatar from "../components/Avatar";
import Card from "../components/Card";
import Layout from "../components/Layout";
import Link from "next/link";
import React from "react";

const NotificationsPage = () => {
  return (
    <Layout>
      <h1 className="text-6xl mb-4 text-gray-300">Notifications</h1>
      <Card noPadding={true}>
        <div>
          <div className="flex gap-2 items-center py-2 border-b border-b-gray-300 p-4">
            <Link href="/profile">
              <Avatar />
            </Link>
            <div>
              <Link href="/profile" className="font-semibold hover:underline">
                Anvar Sizov
              </Link>
              {" liked "}
              <Link href="" className="text-woymBlue hover:underline">
                your photo
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center py-2 border-b border-b-gray-300 p-4">
            <Link href="/profile">
              <Avatar />
            </Link>
            <div>
              <Link href="/profile" className="font-semibold hover:underline">
                Anvar Sizov
              </Link>
              {" liked "}
              <Link href="" className="text-woymBlue hover:underline">
                your photo
              </Link>
            </div>
          </div>
          <div className="flex gap-2 items-center py-2 border-b border-b-gray-300 p-4">
            <Link href="/profile">
              <Avatar />
            </Link>
            <div>
              <Link href="/profile" className="font-semibold hover:underline">
                Anvar Sizov
              </Link>
              {" liked "}
              <Link href="" className="text-woymBlue hover:underline">
                your photo
              </Link>
            </div>
          </div>
        </div>
      </Card>
    </Layout>
  );
};

export default NotificationsPage;
