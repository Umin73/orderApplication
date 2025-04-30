import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./login/Signup";
import Login from "./login/Login";
import Start from "./start";
import AdminApp from "./admin/AdminApp";
import FindId from "./login/FindId";
import ProductRegister from "./admin/ProductRegister";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
          <Route path="/find-id" element={<FindId />} />

        <Route path="/admin" element={<AdminApp />} />
          <Route path="/product-register" element={<ProductRegister />} />
      </Routes>
    </Router>
  );
}

export default App;
