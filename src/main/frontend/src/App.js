import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Signup from "./login/Signup";
import Login from "./login/Login";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Router>
  );
}

export default App;
