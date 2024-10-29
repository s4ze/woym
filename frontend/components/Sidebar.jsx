// "use client";
import Card from "./Card";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { useAuth } from "../hooks/AuthProvider";
import api from "../hooks/axios";
import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  NotificationsIcon,
  ProfileIcon,
  SavedIcon,
} from "../public/icons";

function Sidebar() {
  const router = useRouter();
  const { user, setUser } = useAuth();

  const logout = async () => {
    try {
      const result = await api.post("/Authentication/logout");
      if (result.status === 200) {
        setUser(null);
        toast.success("Logout successful");
        router.refresh();
      }
    } catch {
      toast.error("Logout failed");
    }
  };

  const activeElementClasses =
    "flex gap-3 py-3 my-1 bg-woymBlue text-white -mx-10 px-10 rounded-md shadow-md shadow-gray-300";
  const nonActiveElementClasses =
    "flex gap-3 py-2 my-2 hover:bg-woymBlue hover:bg-opacity-20 -mx-4 p-4 rounded-md transition-all hover:scale-110 hover:shadow-gray-300";

  return (
    <Card>
      <div className="px-4 pb-2">
        {/* <h2 className="text-gray-400 mb-3">Navigation</h2> */}
        <Link
          href="/"
          className={
            router.asPath === "/"
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <HomeIcon />
          Home
        </Link>
        <Link
          href="/profile/posts"
          className={
            router.asPath.includes("/profile")
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <ProfileIcon />
          Profile
        </Link>
        <Link
          href="/saved"
          className={
            router.asPath === "/saved"
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <SavedIcon />
          Saved
        </Link>
        <Link
          href="/notifications"
          className={
            router.asPath === "/notifications"
              ? activeElementClasses
              : nonActiveElementClasses
          }
        >
          <NotificationsIcon />
          Notifications
        </Link>
        {user ? (
          <button onClick={() => logout()} className={nonActiveElementClasses}>
            <LogoutIcon />
            Log out
          </button>
        ) : (
          <Link href="/login" className={nonActiveElementClasses}>
            <LoginIcon />
            Login
          </Link>
        )}
      </div>
    </Card>
  );
}

export default Sidebar;
