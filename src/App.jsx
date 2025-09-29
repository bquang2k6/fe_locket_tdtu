import Login from "./UI/Login";
import Home from "./UI/Home";
import "./App.css";
import React, { useState, useEffect } from "react";


function App() {
  const [studentId, setStudentId] = useState(null);
  // Khi app load, check token trong localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const mssv = localStorage.getItem("mssv");
    if (token && mssv) {
      setStudentId(mssv); // tự động login lại
    }
  }, []);
    const handleLogin = (mssv) => {
    setStudentId(mssv);
    localStorage.setItem("mssv", mssv); // lưu luôn mssv
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("mssv");
    setStudentId(null);
  };

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
