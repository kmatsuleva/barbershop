import { useUsers } from "../../../../hooks/useUsers";
import Button from "../../../button/Button";
import FormField from "../../../form-field/FormField";
import Loader from "../../../loader/Loader";

export default function UserManagement() {
  const { users, roles, loading, handleDelete, handleRoleChange } = useUsers();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {users.length > 0 ? (
        <div className="table-custom-responsive table-round">
          <table className="table-striped table-custom table-custom-primary">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Email</th>
                <th>Phone number</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    <FormField
                      type="select"
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user.id, e.target.value)
                      }
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
