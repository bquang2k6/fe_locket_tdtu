import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Addlocket from "./Addlocket";
import FriendList from "./Friend/FriendList";
import "./home.css";
import PopupNotification from "./PopupNotification/index";
import Footer from "./Footer";

function Home({ studentId, onLogout }) {
const [friends, setFriends] = useState([]);

const handleAdd = (newFriend) => {
setFriends([...friends, newFriend]);
};

function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let el = document.querySelector('meta[name="description"]');
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('name', 'description');
        document.head.appendChild(el);
      }
      el.setAttribute('content', description);
    }
  }, [title, description]);
}

return ( <div className=""> 
    {usePageMeta('Locket - Trang chủ', 'Trang chủ Locket: xem hoạt động, kết bạn và chia sẻ nội dung cho cộng đồng sinh viên.')}
{/* Background động */} 
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 bg-gray-50">
      <div className="absolute -top-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 
        bg-gradient-to-br from-purple-300 to-pink-300 rounded-full 
        mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"></div> 

      <div className="absolute -bottom-16 -left-8 w-72 sm:w-96 h-72 sm:h-96 
        bg-gradient-to-br from-blue-300 to-indigo-300 rounded-full 
        mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
        style={{ animationDelay: "2s" }}></div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-72 sm:w-96 h-72 sm:h-96 bg-gradient-to-br from-emerald-300 to-teal-300 
        rounded-full mix-blend-multiply filter blur-2xl opacity-20 animate-pulse"
        style={{ animationDelay: "4s" }}></div>
    </div>


  <div className="flex flex-col min-h-screen w-full">
    {/* Sidebar */}
    <Sidebar onLogout={onLogout} />

    <div className="h-20"></div>

    {/* Nội dung chính — flex-1 để đẩy footer xuống đáy */}
    <div className="flex-1 flex flex-col w-full items-center px-4 py-6">
      {/* Card chào mừng */}
      <div className="w-full max-w-4xl bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-10 mb-10 relative overflow-hidden border border-white/20 hover:shadow-3xl hover:scale-[1.02] transition-all duration-500">
        <h3 className="font-semibold gradient-text disable-select">
          Xin chào Tdtu 🎓
        </h3>
        <p className="text-center text-gray-600">
          Hãy chia sẻ link locket để có thêm bạn, ny
        </p>
        <Addlocket onAdd={handleAdd} />
      </div>

      {/* Add + List */}
      <div className="w-full max-w-4xl space-y-8">
        <div className="bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl p-6 border border-white/20 hover:shadow-2xl transition-all duration-500">
          <FriendList friends={friends} />
        </div>
      </div>
      <PopupNotification />
    </div>

    {/* Footer luôn ở đáy */}
    <Footer />
  </div>

  <style>{`
    .shadow-3xl {
      box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.3);
    }
  `}</style>
</div>


);
}

export default Home;
