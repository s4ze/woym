import React from "react";
import Avatar from "./Avatar";

const FriendsTabInfo = () => {
  return (
    <div>
      <div className="flex gap-2">
        <div>
          <Avatar />
        </div>
        <div>
          <h3 className="font-semibold text-xl">friend username</h3>
          <div className="text-sm leading-3">5 mutual friends</div>
        </div>
      </div>
    </div>
  );
};

export default FriendsTabInfo;
