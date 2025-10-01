import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // thêm router
import Login from "./UI/Login";
import Home from "./UI/Home";
import "./App.css";
import { verifyToken } from "./api/auth";
import LoadingPage from "./UI/pages/LoadingPage";
import Hdlink from "./UI/Hdlink"; // import trang hướng dẫn link

function App() {
  const [studentId, setStudentId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Hàm logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mssv");
    setStudentId(null);
  };

  // Khi app load → check token với server
  useEffect(() => {
    const mssv = localStorage.getItem("mssv");

    if (mssv) {
      verifyToken().then((isValid) => {
        if (isValid) {
          setStudentId(mssv);
        } else {
          handleLogout();
        }
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // Hàm login
  const handleLogin = (mssv, token) => {
    console.log("Lưu token:", token); // debug
    setStudentId(mssv);
    localStorage.setItem("mssv", mssv);
    localStorage.setItem("token", token);
  };

  // Loading
  if (loading) {
    return <LoadingPage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Trang chính */}
        <Route
          path="/"
          element={
            !studentId ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Home studentId={studentId} onLogout={handleLogout} />
            )
          }
        />

        {/* Trang hướng dẫn lấy link */}
        <Route path="/Hdlink" element={<Hdlink />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
