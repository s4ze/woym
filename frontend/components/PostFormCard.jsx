import { useAuth } from "../hooks/AuthProvider";
import { CheckInIcon, MoodIcon, ProfileIcon } from "../public/icons";
import Avatar from "./Avatar";
import Card from "./Card";

const PostFormCard = () => {
  const { user } = useAuth();

  return (
    <Card>
      <div className="flex gap-2">
        <div>
          <Avatar />
        </div>
        <textarea
          className="grow p-3 h-12"
          placeholder={`What's on your mind, ${
            user != null ? user.Name : "guest"
          }?`}
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
          <button className="bg-woymBlue text-white px-6 py-1 rounded-md">
            Share
          </button>
        </div>
      </div>
    </Card>
  );
};

export default PostFormCard;
