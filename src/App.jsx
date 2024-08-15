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
import Dashboard from "./components/dashboard/Dashboard";
import WelcomeDashboard from "./components/dashboard/welcome-dashboard/WelcomeDashboard";
import Profile from "./components/dashboard/client-dashboard/profile/Profile";
import Appointments from "./components/dashboard/client-dashboard/appointments/Appointments";
import UserTestimonials from "./components/dashboard/client-dashboard/testimonials/UserTestimonials";
import FavoriteBarbers from "./components/dashboard/client-dashboard/favorite-barbers/FavoriteBarbers";
import FavoriteBlogs from "./components/dashboard/client-dashboard/favorite-blogs/FavoriteBlogs";
import ClientsManagement from "./components/dashboard/admin-dashboard/clients/ClientsManagement";
import BarberManagement from "./components/dashboard/admin-dashboard/barbers/BarberManagement";
import BlogsManagement from "./components/dashboard/admin-dashboard/blogs/BlogsManagement";
import Footer from "./components/footer/Footer";
import Forbidden from "./components/403/Forbidden";
import NotFound from "./components/404/NotFound";
import Maintenance from "./components/maintenance/Maintenance";
import ScrollToTop from "./components/scroll-to-top/ScrollToTop";

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
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route index element={<WelcomeDashboard />} />
                  <Route element={<AdminPagesGuard />}>
                    <Route path="clients" element={<ClientsManagement />} />
                    <Route path="barbers" element={<BarberManagement />} />
                    <Route path="blogs" element={<BlogsManagement />} />
                  </Route>
                  <Route element={<ClientPagesGuard />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="appointments" element={<Appointments />} />
                    <Route path="testimonials" element={<UserTestimonials />} />
                    <Route
                      path="favorite-barbers"
                      element={<FavoriteBarbers />}
                    />
                    <Route path="favorite-blogs" element={<FavoriteBlogs />} />
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
