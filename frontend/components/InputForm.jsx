const InputForm = ({ name, setValue, type, size, placeholder }) => {
  let headerStyles = "mb-0 font-medium text-gray-600";

  if (size == "lg") headerStyles += " text-4xl";
  else if (size == "md") headerStyles += " text-2xl";
  else if (size == "sm") headerStyles += " text-lg";
  else headerStyles += " text-xl";

  return (
    <div className="m-2">
      <h2 className={headerStyles}>{name}</h2>
      <input
        onChange={(e) => setValue(e.target.value)}
        className="border-2 rounded-md p-2 w-full"
        type={type || ""}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputForm;
