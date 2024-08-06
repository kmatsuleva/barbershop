import { Route, Routes } from "react-router-dom";

import Contacts from "./components/contacts/Contacts";
import Footer from "./components/footer/Footer";
import NotFound from "./components/404/NotFound";

function App() {
  return (
    <div className="page">
      <header></header>
      <main>
        <Routes>
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
export default App;
