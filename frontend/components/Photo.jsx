const Photo = ({ src }) => {
  return (
    <div className="rounded-md overflow-hidden h-48 flex items-center shadow-md">
      <img src={src} />
    </div>
  );
};

export default Photo;
