import { useState } from "react";
import Avatar from "./Avatar";
import Card from "./Card";
import useClickOutside from "../hooks/useClickOutside";
import MoreComponent from "./MoreComponent";
import Link from "next/link";

function PostCard () {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    let domNode = useClickOutside(() => {
        setDropdownOpen(false);
    });

    return (
        <Card>
          <div ref={domNode} className="flex gap-3">
            <div>
              <Link href={'/profile'}>
                <span className="cursor-pointer">
                  <Avatar/>
                </span>
              </Link>
            </div>
            <div className="grow">
              <p>
                <Link href={'/profile'}>
                  <span className="font-semibold hover:underline cursor-pointer">
                    User
                  </span>
                </Link>
                {' shared a '}  
                <span className="text-woymBlue">
                  album
                </span>
              </p>
              <p className="text-gray-500 text-sm">
                2 hours ago
              </p>
            </div>
            <div>
                <button className="text-gray-500" onClick={() => setDropdownOpen(!dropdownOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                </button>
                <div className="relative">
                    {dropdownOpen && <MoreComponent />}
                </div>
            </div>
          </div>
          <div>
            <p className="my-3 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aenean vel elit scelerisque mauris. Eu turpis egestas pretium aenean pharetra magna. At tellus at urna condimentum mattis pellentesque id nibh tortor. Cursus eget nunc scelerisque viverra. Ornare suspendisse sed nisi lacus sed viverra tellus. Velit laoreet id donec ultrices tincidunt. Sed vulputate mi sit amet mauris commodo. Netus et malesuada fames ac turpis.</p>
            <div className="rounded-xl overflow-hidden">
                <img src='https://images.unsplash.com/photo-1618941672699-b75ba3cfcbd5?q=80&w=3272&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'/>
            </div>
          </div>
          <div className="flex gap-5 mt-4">
            <button className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                72
            </button>
            <button className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                </svg>
                Comment
            </button>
            <button className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                </svg>
                Share
            </button>
          </div>
          <div className="flex mt-4 gap-3">
            <div>
                <Avatar/>
            </div>
            <div className="border grow rounded-xl relative">
                <textarea className="block w-full py-2 px-4 h-12 rounded-xl overflow-hidden" placeholder="Leave a comment"></textarea>
                <button className="absolute top-3 right-3 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
                    </svg>
                </button>
            </div>
          </div>
        </Card>
    );
}

export default PostCard;
