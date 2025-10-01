import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import "../Home";

function GetLinkGuide({ onLogout }) {
  // Hook để set title + description
  function usePageMeta(title, description) {
    useEffect(() => {
      if (title) document.title = title;
      if (description) {
        let el = document.querySelector('meta[name="description"]');
        if (!el) {
          el = document.createElement("meta");
          el.setAttribute("name", "description");
          document.head.appendChild(el);
        }
        el.setAttribute("content", description);
      }
    }, [title, description]);
  }

  return (
    <div className="">
      {usePageMeta(
        "Locket - Hướng dẫn lấy link",
        "Hướng dẫn chi tiết cách lấy link Locket để chia sẻ cho bạn bè."
      )}

      {/* Background động */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gray-50">
        <div className="absolute -top-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 
          bg-gradient-to-br from-purple-300 to-pink-300 rounded-full 
          mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div>

        <div
          className="absolute -bottom-16 -left-8 w-72 sm:w-96 h-72 sm:h-96 
          bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full 
          mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
          w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-emerald-300 to-teal-300 
          rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="">
        {/* Sidebar */}
        <Sidebar onLogout={onLogout} />

        <div className="h-20"></div>
        <div className="min-h-screen flex flex-col items-center -ml-5 -mr-5 -mt-10">
          {/* Card hướng dẫn */}
          <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-10 relative overflow-hidden border border-white/20 transition-all duration-500">
            <h3 className="font-semibold gradient-text disable-select text-xl mb-4 text-center">
              Hướng dẫn lấy link Locket
            </h3>
            <ol className="list-decimal list-inside text-gray-700 space-y-3">
              <li>Mở ứng dụng <b>Locket</b> trên điện thoại của bạn.</li>
              <li>Chuyển đến trang <b>Profile</b> (hồ sơ).</li>
              <li>Nhấn vào nút <b>Chia sẻ</b> hoặc <b>Share Profile</b>.</li>
              <img src="./b1.jpg" />
              <li>Nhấn vào nút <b>Chia sẻ</b> hoặc <b>Share Profile</b>.</li>
              <img src="./b2.jpg" />
            </ol>
            <p className="text-center mt-4 text-gray-500">
              Ví dụ link: <code className="bg-gray-100 px-2 py-1 rounded">https://locket.cam/username</code>
            </p>
          </div>

          {/* Tips thêm */}
          <div className="w-full max-w-3xl space-y-8">
            <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20 transition-all duration-500">
              <h4 className="font-semibold text-lg text-gray-800 mb-3">Cách 2</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Mở ứng dụng <b>Locket</b> trên điện thoại của bạn.</li>
                <li>Chuyển đến trang <b>Profile</b> (hồ sơ).</li>
                <img src="./c2.jpg" />
                <li>Lấy phần <b>Username</b></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default GetLinkGuide;
