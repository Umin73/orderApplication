import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from "./login/Signup";
import Login from "./login/Login";
import Start from "./start";
import AdminApp from "./admin/AdminApp";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Start />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

        {/*    admin 페이지*/}
            <Route path="/admin" element={<AdminApp />} />
        </Routes>
      </Router>
  );
}

export default App;
