export default function Button({
  text,
  size,
  type,
  onClick,
  disabled,
  className,
  btnStyle,
}) {
  return (
    <button
      className={`btn ${size ? `btn-${size}` : ""} ${
        btnStyle ? `btn-${btnStyle}` : ""
      } btn-primary ${className ? className : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
