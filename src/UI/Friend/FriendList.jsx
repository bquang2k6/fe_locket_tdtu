import React, { useEffect, useState } from "react";
import BouncyLoader from "../status/Bouncy"; // loader của bạn

function FriendItem({ friend }) {
  const username = friend.link
    ?.replace("https://locket.cam/", "")
    .replace("https://locket.camera/links/", "") || "";


  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-xl p-3 shadow-sm -ml-4 -mr-4 -mt-4 -mb-4">
      {/* Avatar */}
      <img
        // src={friend.avatar || "/avatar.png"}
        src={friend.avatar || "https://locket.cam/favicon.ico"}
        alt="avatar"
        className="w-12 h-12 rounded-full border-2 border-yellow-500 mr-3"
      />

      {/* Thông tin */}
      <div className="flex-1 text-sm text-gray-800">
        <div>username: {username}</div>
        <div>Tên: {friend.name}</div>
      </div>

      {/* Nút add */}
      <button
        className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-4 py-1 rounded-full transition cursor-pointer"
        onClick={() => {
          if (friend.link) {
            window.open(friend.link, "_blank"); // 👉 mở tab mới
          } else {
            alert("Không tìm thấy link bạn bè!");
          }
        }}
        aria-label={`Thêm bạn ${username}`}
      >
        add friend
      </button>
    </div>
  );
}

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true); // state loading

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/link-locket`)
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Lỗi khi fetch link-locket:", err))
      .finally(() => setLoading(false)); // tắt loading
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-6">
        <div className="inline-grid *:[grid-area:1/1]">
          <div className="status status-warning animate-bounce"></div>
        </div>
        <span className="text-orange-600 font-medium flex items-center mt-3">
          Đang tải danh sách <BouncyLoader size={20} color="orange" />
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {friends.length > 0 ? (
        friends.map((friend) => <FriendItem key={friend.id} friend={friend} />)
      ) : (
        <div className="text-center text-gray-500 py-4">
          Không có danh sách nào
        </div>
      )}
    </div>
  );
}

export default FriendList;
