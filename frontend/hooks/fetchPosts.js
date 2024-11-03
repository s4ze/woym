import toast from "react-hot-toast";
import api from "./axios";

const fetchPosts = async (user) => {
  if (user == null) {
    toast.error("No user for fetching posts");
    return [];
  }

  try {
    const result = await api.get("/Posts/get", {
      params: {
        userId: user.userId,
      },
    });

    if (result.status === 200) {
      return result.data.posts;
    }
  } catch {
    toast.error("Fetching posts failed");
  }
  return [];
};

export default fetchPosts;
