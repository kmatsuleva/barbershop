import { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { AuthProvider } from "./contexts/AuthContext";
import PrivatePagesGuard from "./components/common/PrivatePagesGuard";
import PublicPagesGard from "./components/common/PublicPagesGard";
import AdminPagesGuard from "./components/common/AdminPagesGuard";
import ClientPagesGuard from "./components/common/ClientPagesGuard";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Home from "./components/home/Home";
import Services from "./components/services/Services";
import ServicesList from "./components/services/service-list/ServiceList";
import Barbers from "./components/barbers/Barbers";
import BarbersList from "./components/barbers/barbers-list/BarbersList";
import BarberDetail from "./components/barbers/barber-detail/BarberDetail";
import BlogsList from "./components/blogs/blogs-list/BlogsList";
import Blogs from "./components/blogs/Blogs";
import BlogPost from "./components/blogs/blog-post/BlogPost";
import Contacts from "./components/contacts/Contacts";
import Booking from "./components/booking/Booking";
import Footer from "./components/footer/Footer";
import Forbidden from "./components/403/Forbidden";
import NotFound from "./components/404/NotFound";
import Maintenance from "./components/maintenance/Maintenance";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";
import Loader from "./components/loader/Loader";

const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const WelcomeDashboard = lazy(() =>
  import("./components/dashboard/welcome-dashboard/WelcomeDashboard")
);
const Profile = lazy(() =>
  import("./components/dashboard/client-dashboard/profile/Profile")
);
const Appointments = lazy(() =>
  import("./components/dashboard/client-dashboard/appointments/Appointments")
);
const UserTestimonials = lazy(() =>
  import(
    "./components/dashboard/client-dashboard/testimonials/UserTestimonials"
  )
);
const FavoriteBarbers = lazy(() =>
  import(
    "./components/dashboard/client-dashboard/favorite-barbers/FavoriteBarbers"
  )
);
const FavoriteBlogs = lazy(() =>
  import("./components/dashboard/client-dashboard/favorite-blogs/FavoriteBlogs")
);
const ClientsManagement = lazy(() =>
  import("./components/dashboard/admin-dashboard/clients/ClientsManagement")
);
const BarberManagement = lazy(() =>
  import("./components/dashboard/admin-dashboard/barbers/BarberManagement")
);
const BlogsManagement = lazy(() =>
  import("./components/dashboard/admin-dashboard/blogs/BlogsManagement")
);

function App() {
  const location = useLocation();
  const hideFooterPaths = ["/dashboard"];
  const shouldHideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <AuthProvider>
      <ErrorBoundary
        fallback={
          <div className="page">
            <Header />
            <Maintenance />
            <Footer />
          </div>
        }
      >
        <ScrollToTop />
        <div className="page">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/services" element={<Services />}>
                <Route index element={<ServicesList />} />
              </Route>
              <Route path="/barbers" element={<Barbers />}>
                <Route index element={<BarbersList />} />
                <Route path=":barberId/details" element={<BarberDetail />} />
              </Route>
              <Route path="/blogs" element={<Blogs />}>
                <Route index element={<BlogsList />} />
                <Route path=":blogId/details" element={<BlogPost />} />
              </Route>
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/forbidden" element={<Forbidden />} />
              <Route path="/*" element={<NotFound />} />

              <Route element={<PublicPagesGard />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              <Route element={<PrivatePagesGuard />}>
                <Route path="/booking" element={<Booking />} />
                <Route
                  path="/dashboard"
                  element={
                    <Suspense fallback={<Loader />}>
                      <Dashboard />
                    </Suspense>
                  }
                >
                  <Route
                    index
                    element={
                      <Suspense fallback={<Loader />}>
                        <WelcomeDashboard />
                      </Suspense>
                    }
                  />
                  <Route element={<AdminPagesGuard />}>
                    <Route
                      path="clients"
                      element={
                        <Suspense fallback={<Loader />}>
                          <ClientsManagement />
                        </Suspense>
                      }
                    />
                    <Route
                      path="barbers"
                      element={
                        <Suspense fallback={<Loader />}>
                          <BarberManagement />
                        </Suspense>
                      }
                    />
                    <Route
                      path="blogs"
                      element={
                        <Suspense fallback={<Loader />}>
                          <BlogsManagement />
                        </Suspense>
                      }
                    />
                  </Route>
                  <Route element={<ClientPagesGuard />}>
                    <Route
                      path="profile"
                      element={
                        <Suspense fallback={<Loader />}>
                          <Profile />
                        </Suspense>
                      }
                    />
                    <Route
                      path="appointments"
                      element={
                        <Suspense fallback={<Loader />}>
                          <Appointments />
                        </Suspense>
                      }
                    />
                    <Route
                      path="testimonials"
                      element={
                        <Suspense fallback={<Loader />}>
                          <UserTestimonials />
                        </Suspense>
                      }
                    />
                    <Route
                      path="favorite-barbers"
                      element={
                        <Suspense fallback={<Loader />}>
                          <FavoriteBarbers />
                        </Suspense>
                      }
                    />
                    <Route
                      path="favorite-blogs"
                      element={
                        <Suspense fallback={<Loader />}>
                          <FavoriteBlogs />
                        </Suspense>
                      }
                    />
                  </Route>
                </Route>
                <Route path="/logout" element={<Logout />} />
              </Route>
            </Routes>
          </main>
          {!shouldHideFooter && <Footer />}
        </div>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
