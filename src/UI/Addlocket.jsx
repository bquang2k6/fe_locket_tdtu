import React, { useState } from "react";

function Addlocket() {
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Chưa có token, hãy đăng nhập lại!");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, link, name }),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm link");
      const data = await res.json();
      console.log("Thêm thành công:", data);

      setPassword("");
      setLink("");
      setName("");
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, xem console để biết chi tiết.");
    }
  };

  return (
    <>
      {/* Card form */}
      <div className="">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent">
          ➕ Thêm link Locket
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Nhập mssv
            </label>
            <input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mssv"
              className="w-full p-3 rounded-xl border border-purple-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              🔗 Link/ID
            </label>
            <input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Nhập link Locket hoặc username"
              className="w-full p-3 rounded-xl border border-blue-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              👤 Tên hoặc biệt danh
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên hoặc nickname"
              className="w-full p-3 rounded-xl border border-pink-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all duration-300"
          >
            🚀 Thêm link Locket
          </button>
        </form>
      </div>
    </>
  );
}

export default Addlocket;

