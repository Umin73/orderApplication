import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Signup from "./login/Signup";
import Login from "./login/Login";
import Start from "./start";
import AdminApp from "./admin/AdminApp";
import FindId from "./login/FindId";
import ProductRegister from "./admin/ProductRegister";
import KioskMainPage from "./orderApp/mainTab/KioskMainPage";
import ProductUpdate from "./admin/ProductUpdate";
import ProductList from "./Productdirectory/ProductList";
import KioskSelectStorePage from "./orderApp/orderTab/KioskSelectStorePage";
import KioskOrderListPage from "./orderApp/orderTab/KioskOrderListPage";
import KioskItemOrderPage from "./orderApp/orderTab/KioskItemOrderPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* 로그인 */}
        <Route path="/" element={<Start />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/find-id" element={<FindId />} />
        {/* 오더 어플 */}
        <Route path="/kiosk/main" element={<KioskMainPage />} />
        <Route path="/kiosk/order" element={<KioskSelectStorePage />} />
        <Route path="/kiosk/order-item-list" element={<KioskOrderListPage />} />
        <Route path="/kiosk/order-item" element={<KioskItemOrderPage />} />

        {/* 관리자 페이지 */}
        <Route path="/admin" element={<AdminApp />} />
        <Route path="/product-register" element={<ProductRegister />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/product-update" element={<ProductUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
