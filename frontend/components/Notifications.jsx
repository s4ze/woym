import Link from "next/link";
import Avatar from "./Avatar";

const Notification = ({ notification }) => {
  return (
    <div className="flex gap-2 items-center py-2 border-b border-b-gray-300 p-4">
      <Link href={`/profile/${notification?.user?.userId}`}>
        <Avatar src={notification?.user?.avatarUrl} />
      </Link>
      <div>
        <Link
          href={`/profile/${notification?.user?.userId}`}
          className="font-semibold hover:underline"
        >
          {notification?.user?.name || "DEFAULT:Anvar Sizov"}
        </Link>
        {" liked "}
        <Link
          href={`/post/${notification?.post?.postId}`}
          className="text-woymBlue hover:underline"
        >
          your post
        </Link>
      </div>
    </div>
  );
};

const Notifications = ({ notifications }) => {
  return notifications?.map((notification, index) => (
    <Notification key={index} notification={notification} />
  ));
};

export default Notifications;
