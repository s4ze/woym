import toast from "react-hot-toast";
import api from "./axios";

const fetchUser = async (user) => {
  if (user == null) {
    toast.error("No user for fetching");
    return null;
  }

  try {
    const result = await api.get("/Authentication/get", {
      params: {
        userId: user.userId,
      },
    });

    if (result.status === 200) {
      return result.data.user;
    }
  } catch {
    toast.error("Fetching user failed");
  }
  return null;
};

export default fetchUser;
