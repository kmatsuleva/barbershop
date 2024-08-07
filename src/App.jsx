import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

import PrivatePagesGuard from "./components/common/PrivatePagesGuard";
import PublicPagesGard from "./components/common/PublicPagesGard";
import Header from "./components/header/Header";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Logout from "./components/logout/Logout";
import Home from "./components/home/Home";
import Barbers from "./components/barbers/Barbers";
import BarbersList from "./components/barbers/barbers-list/BarbersList";
import BarberDetail from "./components/barbers/barber-detail/BarberDetail";
import BlogPostDetail from "./components/blogs/blog-post-detail/BlogPostDetail";
import Contacts from "./components/contacts/Contacts";
import Booking from "./components/booking/Booking";
import Dashboard from "./components/dashboard/Dashboard";
import Footer from "./components/footer/Footer";
import NotFound from "./components/404/NotFound";

function App() {
  return (
    <AuthProvider>
      <div className="page">
        <Header />
        <main>
          <Routes>
            <Route element={<PublicPagesGard />}>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<PrivatePagesGuard />}>
              <Route path="/booking" element={<Booking />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/logout" element={<Logout />} />
            </Route>

            <Route path="/" element={<Home />} />
            <Route path="/barbers" element={<Barbers />}>
              <Route index element={<BarbersList />} />
              <Route path=":barberId/details" element={<BarberDetail />} />
            </Route>
            <Route path="/blogs/:blogId/details" element={<BlogPostDetail />} />
            <Route path="/contacts" element={<Contacts />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
