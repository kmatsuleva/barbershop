import { useAuth } from "../../../hooks/useAuth";

export default function WelcomeDashboard() {
  const { user, userRole } = useAuth();

  return (
    <>
      <div className="flex flex-col items-center justify-lg-center text-center h-full">
        <h5 className="mb-3">Hello, {`${user.firstName} ${user.lastName}!`}</h5>

        {userRole === "client" ? (
          <>
            <div className="p text-width-medium">
              <div className="p big">
                <ul>
                  <li>- Review and manage your appointments</li>
                  <li>- Update your list of favorite barbers</li>
                  <li>- Edit, delete, or view your testimonials</li>
                  <li>- Explore your favorite blog posts</li>
                  <li>- Adjust your profile settings</li>
                </ul>
              </div>
              <div className="p big">
                Need help? Contact us on
                <span>
                  <a
                    href="mailto:american.barbershop.office@gmail.com"
                    className="inline-block pl-2 link link-primary text-medium"
                  >
                    american.barbershop.office@gmail.com
                  </a>
                </span>
              </div>
            </div>
          </>
        ) : (
          <div className="p text-width-medium">
            <div className="p big">
              <ul>
                <li>- Create, read, update, and delete blogs</li>
                <li>- Manage barbers: add, update, or remove profiles</li>
                <li>- View and manage appointments, including cancellations</li>
                <li>
                  - Access client information, modify their roles, or delete
                  their profiles
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
