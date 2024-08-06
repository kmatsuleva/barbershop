export default function GridCard({ collection }) {
  return (
    <div
      style={{
        backgroundImage: "url(images/home-three-3-1011x800.jpg)",
      }}
    >
      <div className="image-wrap-inner">
        <div className="range range-condensed range-inner-bordered">
          {collection.map((card) => (
            <div className="cell-xs-6" key={card._id}>
              <article className="box-icon">
                <figure className="box-icon-image">
                  <img src={card.iconUrl} alt="" width="70" height="62" />
                </figure>
                <p className="box-icon-header">{card.title}</p>
                <p className="box-icon-text">{card.summary}</p>
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
