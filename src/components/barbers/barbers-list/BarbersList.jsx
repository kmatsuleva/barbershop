import {
  useGetAllBarbers,
  useGetBarbersByService,
} from "../../../hooks/useBarbers";
import { useGetAllServices } from "../../../hooks/useServices";
import { useForm } from "../../../hooks/useForm";
import Loader from "../../loader/Loader";
import ThumbnailCard from "../../cards/thumbnail-card/ThumbnailCard";
import ButtonLink from "../../button-link/ButtonLink";
import FormField from "../../form-field/FormField";

export default function BarbersList({ size }) {
  const sortBy = ["Most liked", "First name"];

  const { servicesList } = useGetAllServices();
  const { values, handleInputChange } = useForm({
    "filter-by-services": "",
    "sort-by": "",
  });

  const serviceId = servicesList?.find(
    (service) => service.title === values["filter-by-services"]
  )?.id;
  
  const {
    barbersByService: filteredBarbers,
    loading: loadingFilteredBarbers,
  } = useGetBarbersByService(serviceId);

  const { barbersList: allBarbers, loading: loadingAllBarbers } =
    useGetAllBarbers();

  const loading = loadingFilteredBarbers || loadingAllBarbers;

  const sortBarbers = (barbers, sortBy) => {
    switch (sortBy) {
      case "First name":
        return barbers
          .slice()
          .sort((a, b) => a.firstName.localeCompare(b.firstName));
      case "Most liked":
        return barbers.slice().sort((a, b) => b.likes.length - a.likes.length);
      default:
        return barbers;
    }
  };

  const displayedBarbers = size
    ? (serviceId ? filteredBarbers : allBarbers).slice(0, size)
    : serviceId
    ? filteredBarbers
    : allBarbers;

  const sortedBarbers = sortBarbers(displayedBarbers, values["sort-by"]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {!size && (
        <div className="range justify-end">
          <div className="cell-sm-6 cell-md-4 cell-lg-3">
            {servicesList && servicesList.length > 0 && (
              <FormField
                type="select"
                name="filter-by-services"
                options={servicesList}
                label="Filter by services"
                value={values["filter-by-services"]}
                onChange={handleInputChange}
              />
            )}
          </div>
          <div className="cell-sm-6 cell-md-4 cell-lg-3">
            <FormField
              type="select"
              name="sort-by"
              options={sortBy}
              label="Sort by"
              value={values["sort-by"]}
              onChange={handleInputChange}
            />
          </div>
        </div>
      )}
      {sortedBarbers && sortedBarbers.length > 0 ? (
        <>
          <div className="range range-30">
            {sortedBarbers.map((barber) => (
              <div className="cell-sm-6 cell-md-4 height-fill" key={barber.id}>
                <ThumbnailCard
                  image={barber.photoUrl}
                  header={`${barber.firstName} ${barber.lastName}`}
                  body={barber.summary}
                  detailsUrl={`/barbers/${barber.id}/details`}
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
