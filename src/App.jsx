import { Routes, Route, useLocation } from "react-router-dom";
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
import Barbers from "./components/barbers/Barbers";
import BarbersList from "./components/barbers/barbers-list/BarbersList";
import BarberDetail from "./components/barbers/barber-detail/BarberDetail";
import BlogsList from "./components/blogs/blogs-list/BlogsList";
import Blogs from "./components/blogs/Blogs";
import BlogPost from "./components/blogs/blog-post/BlogPost";
import Contacts from "./components/contacts/Contacts";
import Booking from "./components/booking/Booking";
import Dashboard from "./components/dashboard/Dashboard";
import StartDashboard from "./components/dashboard/start-dashboard/StartDashboard";
import BarberManagement from "./components/dashboard/admin-dashboard/barbers/BarberManagement";
import BlogManagement from "./components/dashboard/admin-dashboard/blogs/BlogManagement";
import UserManagement from "./components/dashboard/admin-dashboard/users/UserManagement";
import Footer from "./components/footer/Footer";
import Forbidden from "./components/403/Forbidden";
import NotFound from "./components/404/NotFound";

function App() {
  const location = useLocation();
  const hideFooterPaths = ["/dashboard"];
  const shouldHideFooter = hideFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <AuthProvider>
      <div className="page">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
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
                <Route index element={<StartDashboard />} />
                <Route element={<AdminPagesGuard />}>
                  <Route path="users" element={<UserManagement />} />
                  <Route path="barbers" element={<BarberManagement />} />
                  <Route path="blogs" element={<BlogManagement />} />
                </Route>
                <Route element={<ClientPagesGuard />}>
                  <Route path="appointments" element={<Booking />} />
                </Route>
              </Route>
              <Route path="/logout" element={<Logout />} />
            </Route>
          </Routes>
        </main>
        {!shouldHideFooter && <Footer />}
      </div>
    </AuthProvider>
  );
}

export default App;
