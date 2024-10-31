import toast from "react-hot-toast";

import Avatar from "./Avatar";
import Card from "./Card";
import { CheckInIcon, MoodIcon, ProfileIcon } from "../public/icons";

import api from "../hooks/axios";
import { useAuth } from "../hooks/AuthProvider";

const PostFormCard = () => {
  const { user } = useAuth();

  const addPost = async () => {
    const description = document.querySelector("#post").value;
    console.log(description);
    try {
      const result = await api.post("/Posts/add", {
        userId: user.userId,
        description: description,
      });

      if (result.status === 200) {
        document.querySelector("#post").value = null;
      }
    } catch {
      toast.error("Adding a new post failed");
    }
  };

  return (
    <Card>
      <div className="flex gap-2">
        <div>
          <Avatar />
        </div>
        <textarea
          id="post"
          maxLength={1024}
          className="border grow p-3 h-12 rounded-xl p-2 min-h-[48px] max-h-[300px]"
          placeholder={`What's on your mind, ${user?.name || "guest"}?`}
        />
      </div>
      <div className="flex gap-5 items-center mt-2">
        <div>
          <button className="flex gap-1">
            <ProfileIcon />
            People
          </button>
        </div>
        <div>
          <button className="flex gap-1">
            <CheckInIcon />
            Check in
          </button>
        </div>
        <div>
          <button className="flex gap-1">
            <MoodIcon />
            Mood
          </button>
        </div>
        <div className="grow text-right">
          <button
            className="bg-woymBlue text-white px-6 py-1 rounded-md"
            onClick={() => addPost()}
          >
            Share
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PostFormCard;
