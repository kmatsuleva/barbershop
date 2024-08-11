export default function ButtonIcon({
  size,
  position,
  color,
  icon,
  onClick,
  text,
  className,
}) {
  return (
    <button
      className={`btn ${size ? `btn-${size}` : ""} btn-icon btn-icon-${
        position ? position : "left"
      } btn-${color ? color : "primary"} ${className ? className : ""}`}
      onClick={onClick}
    >
      <span className={`icon material-icons-${icon}`}></span>
      {text}
    </button>
  );
}
