import { useState } from "react";
import Link from "next/link";
import { format } from "timeago.js";

import Avatar from "./Avatar";
import Card from "./Card";
import MoreComponent from "./MoreComponent";

import { useAuth } from "../hooks/AuthProvider";
import useClickOutside from "../hooks/useClickOutside";
import {
  AttachIcon,
  CommentIcon,
  LikeIcon,
  MoreIcon,
  ShareIcon,
} from "../public/icons";

function PostCard({ post }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();

  let domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  // let time = null;
  // const time = format(post.CreatedAt);

  return (
    <Card>
      <div ref={domNode} className="flex gap-3">
        <div>
          <Link href={"/"}>
            {/* profile */}
            <Avatar />
          </Link>
        </div>
        <div className="grow">
          <Link href={"/"}>
            {/* profile */}
            <span className="font-semibold hover:underline cursor-pointer">
              {user?.name || "DEFAULT:Anvar Sizov"}
            </span>
          </Link>
          <p className="text-gray-500 text-sm">{post.createdAt}</p>
        </div>
        <div>
          <button
            className="text-gray-500"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <MoreIcon />
          </button>
          <div className="relative">{dropdownOpen && <MoreComponent />}</div>
        </div>
      </div>
      <div>
        <p className="my-3 text-sm">{post.description}</p>
        <div className="rounded-xl overflow-hidden">
          <img src={post?.media} />
        </div>
      </div>
      <div className="flex gap-5 mt-4">
        <button className="flex gap-2 items-center">
          <LikeIcon />
          72
        </button>
        <button className="flex gap-2 items-center">
          <CommentIcon />
          Comment
        </button>
        <button className="flex gap-2 items-center">
          <ShareIcon />
          Share
        </button>
      </div>
      <div className="flex mt-4 gap-3">
        <div>
          <Avatar />
        </div>
        <div className="border grow rounded-xl relative">
          <textarea
            className="resize-none block w-full py-2 px-4 h-12 rounded-xl overflow-hidden"
            placeholder="Leave a comment"
          ></textarea>
          <button className="absolute top-3 right-3 text-gray-400">
            <AttachIcon />
          </button>
        </div>
      </div>
    </Card>
  );
}

export default PostCard;
