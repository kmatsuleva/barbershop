export default function Icon({ size, color, icon, className }) {
  return (
    <span
      className={`icon 
      ${size ? `icon-${size}` : ""} 
      ${color ? `icon-${color}` : ""} 
       fa fa-${icon}
       ${className ? className : ""}`}
    ></span>
  );
}
