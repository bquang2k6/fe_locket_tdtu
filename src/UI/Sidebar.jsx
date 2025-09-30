import React, { useState } from "react";
import { LogOut, HelpCircle, Menu, Upload } from "lucide-react";

function Sidebar({ onLogout }) {
const [open, setOpen] = useState(false);

return ( <div className="fixed top-6 right-6 z-50">
{/* Nút menu */}
<button
onClick={() => setOpen(!open)}
className="fixed top-0 left-0 w-full p-3 bg-white/80 backdrop-blur-lg shadow-xl border-b border-white/30 hover:scale-105 hover:shadow-2xl transition-all duration-300 z-50 flex items-center">
  <div className="ml-auto">
    <Menu className="w-6 h-6 text-purple-600" />
  </div> </button>


  {/* Menu dropdown */}
  {open && (
    <div className="absolute right-0 mt-9 -mr-5 w-56 bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden animate-fadeIn">
      <a
        href="https://wangtech.top"
        target="_blank"
        className="flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 transition-colors"
      >
        <HelpCircle className="w-5 h-5 text-purple-500" />
        <span className="font-medium">Báo lỗi</span>
      </a>

      <button
        onClick={onLogout}
        className="w-full flex items-center gap-3 px-5 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-colors"
      >
        <LogOut className="w-5 h-5 text-red-500" />
        <span className="font-medium">Đăng xuất</span>
      </button>
      <a
        href="https://locket.wangtech.top"
        target="_blank"
        className="flex items-center gap-3 px-5 py-3 text-green-700 hover:bg-gradient-to-r hover:from-green-100 hover:to-green-300 transition-colors"
      >
        <Upload className="w-5 h-5 text-green-500" />
        <span className="font-medium">Locket upload</span>
      </a>

    </div>
  )}

  <style>{`
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.3s ease-out forwards;
    }
  `}</style>
</div>


);
}

export default Sidebar;
