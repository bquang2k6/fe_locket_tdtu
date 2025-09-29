import React, { useEffect, useState } from "react";
function FriendItem({ friend }) {
  const username = friend.link?.replace("https://locket.cam/", "") || "";

  return (
    <div className="flex items-center justify-between bg-gray-100 rounded-xl p-3 shadow-sm -ml-4 -mr-4 -mt-4 -mb-4">
      {/* Avatar */}
      <img
        src={friend.avatar || "/avatar.png"}
        alt="avatar"
        className="w-12 h-12 rounded-full border-2 border-yellow-500 mr-3"
      />

      {/* Thông tin */}
      <div className="flex-1 text-sm text-gray-800">
        <div>username: {username}</div>
        <div>Tên: {friend.name}</div>
      </div>

      {/* Nút add */}
      <button className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-4 py-1 rounded-full transition">
        add friend
      </button>
    </div>
  );
}

function FriendList() {
  const [friends, setFriends] = React.useState([]);

  React.useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/link-locket`)
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Lỗi khi fetch link-locket:", err));
  }, []);


  return (
    <div className="max-w-md mx-auto">
      {friends.map((friend) => (
        <FriendItem key={friend.id} friend={friend} />
      ))}
    </div>
  );
}

export default FriendList;
