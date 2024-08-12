export default function GridCard({ image, collection }) {
  return (
    <div
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      <div className="image-wrap-inner">
        <div className="range range-condensed range-inner-bordered">
          {collection.map((card) => (
            <div className="cell-xs-6" key={card.id}>
              <article className="box-icon">
                {(card.iconLight || card.iconDark) && (
                  <figure className="box-icon-image">
                    <img
                      src={card.iconLight || card.iconLight}
                      alt=""
                      width="70"
                      height="62"
                    />
                  </figure>
                )}
                {card.title && <p className="box-icon-header">{card.title}</p>}
                {card.summary && (
                  <p className="box-icon-text">{card.summary}</p>
                )}
              </article>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
