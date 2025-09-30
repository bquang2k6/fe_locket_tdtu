import Login from "./UI/Login";
import Home from "./UI/Home";
import "./App.css";
import React, { useState, useEffect } from "react";
import { verifyToken } from "./api/auth";
import LoadingPage from "./UI/pages/LoadingPage";

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

  // ❌ bỏ chặn giao diện khi loading
  // While we're verifying the token with the server, don't render the login UI
  if (loading) {
    return (
      <LoadingPage />
    );
  }

  return (
    <div>
      {!studentId ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home studentId={studentId} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
