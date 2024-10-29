import React from "react";
import Card from "./Card";
import FriendsTabInfo from "./FriendsTabInfo";

const FriendsTab = () => {
  return (
    <Card>
      <h2 className="text-3xl mb-2">Friends</h2>
      <div className="grid gap-5 grid-cols-2">
        <FriendsTabInfo />
        <FriendsTabInfo />
        <FriendsTabInfo />
        <FriendsTabInfo />
        <FriendsTabInfo />
        <FriendsTabInfo />
        <FriendsTabInfo />
      </div>
    </Card>
  );
};

export default FriendsTab;
