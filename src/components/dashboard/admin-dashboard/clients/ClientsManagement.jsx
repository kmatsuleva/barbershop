import {
  useClientRoleChange,
  useGetAllClients,
} from "../../../../hooks/useUsers";
import FormField from "../../../form-field/FormField";
import Loader from "../../../loader/Loader";

export default function ClientsManagement() {
  const { clients, roles, loading, refetchClients } = useGetAllClients();
  const { handleRoleChange } = useClientRoleChange();

  if (loading) {
    return <Loader />;
  }

  const handleRemoveBarber = (client, newRole) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to change the role of ${client.firstName} ${client.lastName} to ${newRole}?`
    );
    if (isConfirmed) {
      handleRoleChange(client.id, newRole);
      refetchClients();
    }
  };

  const showRoleColumn = clients && clients.some((client) => client.role);

  return (
    <>
      {clients && clients.length > 0 ? (
        <div className="table-custom-responsive table-round">
          <table className="table-striped table-custom table-custom-primary">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
                {showRoleColumn && <th>Role</th>}
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td>{client.email}</td>
                  <td>{client.phoneNumber}</td>
                  {showRoleColumn && (
                    <td>
                      <FormField
                        type="select"
                        value={client.role}
                        onChange={(e) =>
                          handleRemoveBarber(client, e.target.value)
                        }
                        options={roles}
                        includeDefaultOption={false}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No clients to display</p>
      )}
    </>
  );
}
