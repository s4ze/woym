import React from "react";
import Card from "./Card";
import Photo from "./Photo";

const PhotosTab = () => {
  //   const { user } = useAuth;
  //   const media = user.media
  const media = [
    "https://images.unsplash.com/photo-1613639874322-60e5afb8e8dd?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1613639212313-e30d05d9b032?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <Card>
      <div className="grid grid-cols-2 gap-4">
        {media.map((m) => (
          <Photo src={m} />
        ))}
        {/* <Photo src="https://images.unsplash.com/photo-1613639874322-60e5afb8e8dd?q=80&w=3264&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}
      </div>
    </Card>
  );
};

export default PhotosTab;
