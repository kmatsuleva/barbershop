import { useState } from "react";
import {
  useDeleteBarber,
  useGetAllBarbers,
} from "../../../../hooks/useBarbers";
import ThumbnailCard from "../../../cards/thumbnail-card/ThumbnailCard";
import BarberAdd from "../../../barbers/barber-add/BarberAdd";
import BarberEdit from "../../../barbers/barber-edit/BarberEdit";
import ButtonIcon from "../../../button-icon/ButtonIcon";
import Button from "../../../button/Button";
import BackLink from "../../../back-link/BackLink";
import { useGetAllServices } from "../../../../hooks/useServices";

export default function BarberManagement() {
  const [showAddBarberForm, setShowAddBarberForm] = useState(false);
  const [editingBarber, setEditingBarber] = useState({});

  const { handleDeleteBarber } = useDeleteBarber();
  const { barbersList, refetchBarbers } = useGetAllBarbers();
  const { servicesList } = useGetAllServices();

  const handleEditBarber = (barber) => {
    setEditingBarber(barber);
    setShowAddBarberForm(false);
  };

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
    setShowAddBarberForm(false);
    setEditingBarber({});
    refetchBarbers();
  };

  if (showAddBarberForm) {
    return (
      <div className="range range-sm-center range-75">
        <div className="cell-xs-12">
          <BackLink onClick={handleFormClose} />
          <BarberAdd handleFormClose={handleFormClose} />
        </div>
      </div>
    );
  }

  if (Object.values(editingBarber).length > 0 && servicesList) {
    return (
      <>
        <BackLink onClick={handleFormClose} />
        <BarberEdit
          editingBarber={editingBarber}
          servicesList={servicesList}
          handleFormClose={handleFormClose}
        />
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <ButtonIcon
          size="xs"
          icon="add"
          text="Add barber"
          onClick={() => setShowAddBarberForm(true)}
        />
      </div>
      <div className="range">
        <div className="cell-xs-12">
          <div className="range range-30">
            {barbersList.map((barber) => (
              <div className="cell-sm-6 cell-md-4 height-fill" key={barber.id}>
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
                          onClick={() => handleEditBarber(barber)}
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
  );
}
