import { useAuth } from "../hooks/AuthProvider";

function Avatar({ size, src }) {
  let width = "w-12";
  if (size === "lg") {
    width = "w-36";
  }

  const { user } = useAuth();

  return (
    <div className={`${width} rounded-full overflow-hidden`}>
      <img
        src={
          user != null
            ? user.avatar
            : src != null
            ? src
            : "https://i.pinimg.com/1200x/62/87/26/62872606328a29ace159c2e03926b4df.jpg"
        }
      />
    </div>
  );
}

export default Avatar;
