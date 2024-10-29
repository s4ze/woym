function Card({ children, noPadding, noBottomMargin, hoverEffect }) {
  let classes = "bg-white shadow-md rounded-md justify-center";

  if (!noBottomMargin) classes += " mb-5";
  if (!noPadding) classes += " p-4";
  if (hoverEffect) classes += " hover:bg-gray-100";

  return <div className={classes}>{children}</div>;
}

export default Card;
