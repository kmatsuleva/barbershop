export default function Banner({ heading }) {
  return (
    <div className="page-title">
      <div className="page-title-content">
        <div className="shell">
          <p className="page-title-header">{heading}</p>
        </div>
      </div>
    </div>
  );
}
