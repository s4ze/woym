import React from "react";
import toast from "react-hot-toast";

import {
  DeleteIcon,
  EditIcon,
  ReportIcon,
  SavedIcon,
  TurnOnNotificationIcon,
} from "../public/icons";
import api from "../hooks/axios";

function MoreComponent({ postId }) {
  const deletePost = async () => {
    try {
      const result = await api.delete("/Posts/remove", {
        params: {
          postId: postId,
        },
      });

      if (result.status === 200) {
        toast.success("Post deleted");
      }
    } catch {
      toast.error("Deleting post failed");
    }
  };

  const moreOptionsClasses =
    "flex gap-3 py-2 my-2 hover:bg-woymBlue hover:text-white -mx-3 p-3 rounded-md transition-all hover:scale-110 hover:shadow-gray-300";

  return (
    <div className="absolute -right-4 bg-white shadow-lg shadow-gray-300 p-3 rounded-xl border border-gray-100 w-56 z-[1]">
      {/* <a href="" className={moreOptionsClasses}>
        <SavedIcon />
        Save
      </a> */}
      {/* <a href="" className={moreOptionsClasses}>
        <EditIcon />
        Edit
      </a> */}
      <button
        onClick={() => {
          deletePost();
        }}
        className={moreOptionsClasses}
      >
        <DeleteIcon />
        Delete
      </button>
      {/* <a href="" className={moreOptionsClasses}>
        <ReportIcon />
        Report
      </a> */}
    </div>
  );
}

export default MoreComponent;
