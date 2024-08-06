import { useGetAllBarbers } from "../../../hooks/barbers/useGetAllBarbers";

import Loader from "../../loader/Loader";
import ThumbnailCard from "../../cards/thumbnail-card/ThumbnailCard";
import ButtonLink from "../../button-link/ButtonLink";

export default function BarbersList({ size }) {
  const { barbersList, isRequestPending } = useGetAllBarbers();

  const displayedBarbers = size ? barbersList.slice(0, size) : barbersList;

  return (
    <>
      {isRequestPending ? (
        <Loader />
      ) : barbersList.length > 0 ? (
        <>
          <div className="range range-30">
            {displayedBarbers.map((barber) => (
              <div className="cell-sm-6 cell-md-4 height-fill" key={barber._id}>
                <ThumbnailCard
                  image={barber.photoUrl}
                  header={`${barber.firstName} ${barber.lastName}`}
                  body={barber.summary}
                  footer={barber.workExperience}
                  detailsUrl={`/barbers/${barber._id}/details`}
                />
              </div>
            ))}
          </div>
          {size && (
            <div className="range range-30">
              <div className="cell-xs-12">
                <ButtonLink url="/barbers" text="View all team" size="sm" />
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-center">No barbers to display</p>
      )}
    </>
  );
}
