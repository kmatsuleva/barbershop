import { useAuth } from "../../../../hooks/useAuth";
import { useFavoriteBarbers } from "../../../../hooks/useBarbers";
import ThumbnailCard from "../../../cards/thumbnail-card/ThumbnailCard";
import Icon from "../../../icon/Icon";
import Loader from "../../../loader/Loader";

export default function FavoriteBarbers() {
  const { user } = useAuth();
  const { favoriteBarbers, loading, error } = useFavoriteBarbers(user.uid);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="cell-xs-12">
      <div className="range range-30">
        {favoriteBarbers.map((barber) => (
          <div className="cell-sm-6 cell-md-4 height-fill" key={barber.id}>
            <ThumbnailCard
              image={barber.photoUrl}
              header={`${barber.firstName} ${barber.lastName}`}
              body={barber.summary}
              footer={
                <>
                  <button className="mt-2 no-button">
                    <Icon
                      size="xxs"
                      color="primary"
                      icon="heart"
                      className="mr-2"
                    />
                    <span>{barber.likes.length}</span>
                  </button>
                </>
              }
              detailsUrl={`/barbers/${barber.id}/details`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
