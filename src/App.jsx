// src/App.jsx
import React from "react";
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate 
} from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import DashboardPage from "./pages/DashboardPage";
import ReservationsListPage from "./pages/ReservationsListPage";
import Layout from "./Components/layout/Layout";
import LoginPage from "./Pages/LoginPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./contexts/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reservations" element={<ReservationsListPage />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
      
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
     </AuthProvider>
  );
}

export default App;