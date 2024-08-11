import { useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteBarber,
  useGetAllBarbers,
} from "../../../../hooks/useBarbers";
import Button from "../../../button/Button";
import BarberAdd from "../../../barbers/barber-add/BarberAdd";
import ButtonIcon from "../../../button-icon/ButtonIcon";
import ThumbnailCard from "../../../cards/thumbnail-card/ThumbnailCard";

export default function BarberManagement() {
  const [showAddBarberForm, setDisplayAddBarberForm] = useState(false);
  const { handleDeleteBarber } = useDeleteBarber();
  const { barbersList, refetchBarbers } = useGetAllBarbers();

  const handleBarberDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this barber?")) {
      try {
        await handleDeleteBarber(id);
        await refetchBarbers();
      } catch (error) {
        console.error("Failed to delete barber:", error);
      }
    }
  };

  const handleFormClose = () => {
    setDisplayAddBarberForm(false);
    refetchBarbers();
  };

  return (
    <>
      {!showAddBarberForm ? (
        <>
          <div className="flex justify-end">
            <ButtonIcon
              size="xs"
              icon="add"
              text="Add barber"
              onClick={() => setDisplayAddBarberForm(true)}
            />
          </div>
          <div className="range">
            <div className="cell-xs-12">
              <div className="range range-30">
                {barbersList.map((barber) => (
                  <div
                    className="cell-sm-6 cell-md-4 height-fill"
                    key={barber.id}
                  >
                    <ThumbnailCard
                      color="gray"
                      image={barber.photoUrl}
                      header={`${barber.firstName} ${barber.lastName}`}
                      body={barber.summary}
                      footer={
                        <ul className="flex justify-center cta w-full gap-2 flex-wrap">
                          <li>
                            <Button
                              text="Edit"
                              size="xs"
                              btnStyle="kangaroo-outline"
                              // onClick={() => handleTestimonialEditClick(id, review)}
                            />
                          </li>
                          <li>
                            <Button
                              text="Delete"
                              size="xs"
                              onClick={() => handleBarberDelete(barber.id)}
                            />
                          </li>
                        </ul>
                      }
                      detailsUrl={`/barbers/${barber.id}/details`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="range range-sm-center range-75">
          <div className="cell-xs-10">
            <Link
              className="link link-primary link-return mb-3"
              onClick={handleFormClose}
            >
              Back
            </Link>
            <BarberAdd handleFormClose={handleFormClose} />
          </div>
        </div>
      )}
    </>
  );
}
