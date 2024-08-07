import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import Button from "../button/Button";
import FormField from "../form-field/FormField";
import { useLogin } from "../../hooks/useAuth";
import Error from "../error/Error";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const validators = {
    email: (value) =>
      !value
        ? "Email is required."
        : !/\S+@\S+\.\S+/.test(value)
        ? "Invalid email address."
        : null,
    password: (value) => (!value ? "Password is required." : null),
  };

  const { values, handleInputChange, handleFormValidation, errors } = useForm(
    initialValues,
    validators
  );
  const { login, loginError } = useLogin();

  const handleLogin = async (event) => {
    event.preventDefault();
    if (handleFormValidation()) {
      await login(values);
    }
  };

  return (
    <section className="section-xl">
      <div className="range range-50">
        <div className="cell-xs-12">
          <form onSubmit={handleLogin}>
            <div className="shell">
              <div className="range">
                <div className="cell-md-5 d-none d-lg-flex">
                  <img
                    src="/images/home-three-3-1011x800.jpg"
                    className="w-full h-full"
                    style={{ objectFit: "cover" }}
                    alt="Background"
                  />
                </div>
                <div className="cell-md-7 mt-0">
                  <div className="flex flex-col h-full justify-center text-center">
                    <h4>Welcome Back!</h4>
                    <p className="mb-3">
                      Log in to book your next appointment, manage your favorite
                      barbers, and explore our latest blog posts. Share your
                      experience by writing testimonials and stay connected with
                      our community.
                    </p>

                    <div className="range mt-0">
                      <div className="cell-md-6 mt-1">
                        <FormField
                          type="email"
                          name="email"
                          placeholder="Email *"
                          value={values.email}
                          onChange={handleInputChange}
                          error={errors.email}
                        />
                      </div>
                      <div className="cell-md-6 mt-1">
                        <FormField
                          type="password"
                          name="password"
                          placeholder="Password *"
                          value={values.password}
                          onChange={handleInputChange}
                          error={errors.password}
                        />
                      </div>
                    </div>

                    {loginError && (
                      <div className="range mt-3">
                        <div className="cell-md-11 m-auto">
                          <Error message={loginError} />
                        </div>
                      </div>
                    )}

                    <div className="range">
                      <div className="cell-md-12">
                        <Button
                          type="submit"
                          text="Log In"
                          size="sm"
                          btnStyle="circle"
                          className="btn-block"
                        />
                      </div>
                    </div>

                    <div>
                      <Link to="/register" className="create-account-link">
                        Create new account
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
