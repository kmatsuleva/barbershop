import { useUsers } from "../../../../hooks/useUsers";
import Button from "../../../button/Button";
import FormField from "../../../form-field/FormField";
import Loader from "../../../loader/Loader";

export default function UserManagement() {
  const { users, roles, loading, handleDelete, handleRoleChange } = useUsers();

  if (loading) {
    return <Loader />;
  }

  const handleRemoveBarber = (user, newRole) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to change the role of ${user.firstName} ${user.lastName} to ${newRole}?`
    );
    if (isConfirmed) {
      handleRoleChange(user.id, newRole);
    }
  };

  return (
    <>
      {users.length > 0 ? (
        <div className="table-custom-responsive table-round">
          <table className="table-striped table-custom table-custom-primary">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>
                    <img src={user.photoUrl} className="img-circle" />
                  </td>
                  <td>
                    {user.firstName} {user.lastName}
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <FormField
                      type="select"
                      value={user.role}
                      onChange={(e) => handleRemoveBarber(user, e.target.value)}
                      options={roles}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      text="Delete"
                      size="xs"
                      btnStyle="kangaroo-outline"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No barbers to display</p>
      )}
    </>
  );
}
