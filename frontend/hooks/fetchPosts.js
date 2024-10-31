import toast from "react-hot-toast";

const fetchPosts = ({ user }) => {
  if (user == null) {
    toast.error("No user for fetching posts");
    return [{ description: "no user for displaying" }];
  }
  // return [];

  try {
    const result = api.get("/Posts/get", {
      params: {
        userId: user?.userId,
      },
    });

    if (result.status === 200) {
      return result.data.posts;
    }
  } catch {
    toast.error("Fetching posts failed");
  }
  return [{ description: "bruh" }];
  // return [];
};

export default fetchPosts;
