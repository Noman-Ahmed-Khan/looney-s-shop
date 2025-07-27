import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import About from "./pages/About";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Products from "./pages/Products";
import './index.css';

// import Profile from "./pages/profile";
// import ProtectedRoute from "./components/ProtectedRoute";
function App() {
  const location = useLocation();

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile" element={<Profile />} /> */}
          {/* <Route */}
            {/* path="/dashboard" */}
            {/* element={ */}
              {/* <ProtectedRoute allowedRoles={["admin"]}> */}
                {/* <Dashboard /> */}
              {/* </ProtectedRoute> */}
            {/* } */}
          {/* /> */}
        </Routes>
      </AnimatePresence>
    </Layout>
  );
}

export default App;