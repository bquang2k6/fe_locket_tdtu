import Login from "./UI/Login";
import Home from "./UI/Home";
import "./App.css";
import React, { useState, useEffect } from "react";
import { verifyToken } from "./api/auth";

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
    const token = localStorage.getItem("token");
    const mssv = localStorage.getItem("mssv");

    if (token && mssv) {
      verifyToken(token).then((isValid) => {
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
    setStudentId(mssv);
    localStorage.setItem("mssv", mssv);
    localStorage.setItem("token", token);
  };

  // ❌ bỏ chặn giao diện khi loading
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
