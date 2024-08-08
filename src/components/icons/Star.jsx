export default function Icon({ size, icon }) {
  return (
    <span className={`icon icon-${size} icon-primary fa fa-${icon}`}></span>
  );
}
