"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

import Avatar from "../../components/Avatar";
import Card from "../../components/Card";
import Layout from "../../components/Layout";

import AboutTab from "../../components/AboutTab";
import FriendsTab from "../../components/FriendsTab";
import PhotosTab from "../../components/PhotosTab";
import PostsTab from "../../components/PostsTab";

import "../../styles/globals.css";

import {
  PostsIcon,
  AboutIcon,
  FriendsIcon,
  PhotosIcon,
} from "../../public/icons";
import { useAuth } from "../../hooks/AuthProvider";

function ProfilePage() {
  const { user } = useAuth();
  const router = useRouter();

  const isPosts = router.asPath == "/profile/posts";
  const isAbout = router.asPath == "/profile/about";
  const isFriends = router.asPath == "/profile/friends";
  const isPhotos = router.asPath == "/profile/photos";

  const nonActiveTabClasses =
    "flex gap-1 px-4 py-1 items-center border-b-4 border-white";
  const activeTabClasses =
    "flex gap-1 px-4 py-1 items-center border-b-4 border-woymBlue text-woymBlue";

  return (
    <Layout>
      <Card noPadding={true}>
        <div className="relative overflow-hidden rounded-md">
          <div className="h-36 overflow-hidden flex justify-center items-center">
            <img
              src={
                user?.backgroundUrl ||
                "https://images.unsplash.com/photo-1568183113672-bfc2f6c66198?q=80&w=2957&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
          </div>
          <div className="absolute top-24 left-4">
            <Avatar size="lg" />
          </div>
          <div className="p-4">
            <div className="ml-40">
              <h1 className="text-3xl font-semibold">
                {user?.name || "DEFAULT:Anvar Sizov"}
              </h1>
              <div className="text-gray-500 leading-4">
                {user?.city || "DEFAULT:Surgut, Russia"}
              </div>
            </div>
            <div className="mt-10 flex gap-1">
              <Link
                href="/profile/posts"
                className={isPosts ? activeTabClasses : nonActiveTabClasses}
              >
                <PostsIcon />
                Posts
              </Link>
              <Link
                href="/profile/about"
                className={isAbout ? activeTabClasses : nonActiveTabClasses}
              >
                <AboutIcon />
                About
              </Link>
              <Link
                href="/profile/friends"
                className={isFriends ? activeTabClasses : nonActiveTabClasses}
              >
                <FriendsIcon />
                Friends
              </Link>
              <Link
                href="/profile/photos"
                className={isPhotos ? activeTabClasses : nonActiveTabClasses}
              >
                <PhotosIcon />
                Photos
              </Link>
            </div>
          </div>
        </div>
      </Card>
      {isPosts && <PostsTab />}
      {isAbout && <AboutTab />}
      {isFriends && <FriendsTab />}
      {isPhotos && <PhotosTab />}
    </Layout>
  );
}

export default ProfilePage;
