import React, { useState } from "react";
import "./home.css";

function Addlocket() {
  const [password, setPassword] = useState("");
  const [link, setLink] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra dữ liệu đầu vào trước khi gọi API
    if (!password.trim() || !link.trim() || !name.trim()) {
      alert("⚠️ Vui lòng nhập đầy đủ tất cả các ô!");
      return;
    }
    if (name.trim().split(/\s+/).length > 6) {
      alert("⚠️ Tên/biệt danh không được quá 6 từ!");
      return;
    }





    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Chưa có token, hãy đăng nhập lại!");
        return;
      }

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/links`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password, link, name }),
      });

      if (!res.ok) throw new Error("Lỗi khi thêm link");
      const data = await res.json();
      console.log("Response:", data);

      if (
        data &&
        typeof data === "object" &&
        "id" in data &&
        "link" in data &&
        "name" in data &&
        "avatar" in data
      ) {
        alert("✅ Thêm thành công!");
        window.location.reload();
      } else {
        alert(" API không trả về đúng cấu trúc dữ liệu!");
      }

      setPassword("");
      setLink("");
      setName("");
    } catch (err) {
      console.error(err);
      alert(" Link đã được thêm trước đó hoặc sai mssv");
    }
  };


  return (
    <div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Nhập mssv</label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mssv"
            className="w-full p-3 rounded-xl border border-purple-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-purple-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">🔗 Link/ID</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link Locket or username"
            className="w-full p-3 rounded-xl border border-blue-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-2">
            👤 Tên hoặc biệt danh
            <p className="text-sm text-gray-500">tối đa 6 từ</p>
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              // Giữ chữ cái + khoảng trắng, bỏ ký tự khác
              let value = e.target.value.replace(/[^a-zA-ZÀ-ỹ\s]/g, "");

              // Tách từ theo khoảng trắng (cho phép nhiều space)
              let words = value.split(/\s+/).filter(Boolean); // bỏ từ rỗng

              if (words.length > 6) {
                words = words.slice(0, 6); // giữ tối đa 6 từ
              }

              // Nếu người dùng đang gõ thêm khoảng trắng thì vẫn cho hiển thị
              if (value.endsWith(" ")) {
                setName(words.join(" ") + " ");
              } else {
                setName(words.join(" "));
              }
            }}
            placeholder="Nhập tên hoặc nickname"
            className="w-full p-3 rounded-xl border border-pink-200 bg-white/70 backdrop-blur-sm focus:ring-2 focus:ring-pink-400 focus:outline-none shadow-md text-gray-900 placeholder-gray-400"
          />
        </div>


        <button
          type="submit"
          className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-white font-bold rounded-xl shadow-lg hover:opacity-90 transition-all duration-300 gradient-bg"
        >
          🚀 Thêm link Locket
        </button>
      </form>
    </div>
  );
}

export default Addlocket;
