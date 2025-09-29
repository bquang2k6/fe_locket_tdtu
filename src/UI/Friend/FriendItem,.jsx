import React from "react";
import "./FriendItem.css"; // nếu muốn style riêng

function FriendItem({ friend }) {
  // Lấy username bằng cách xóa tiền tố
  const username = friend.link?.replace("https://locket.cam/", "") || "";

  const handleAddFriend = () => {
    if (friend.link) {
      // chuyển sang link của bạn bè
      window.location.href = friend.link;
    } else {
      alert("Không tìm thấy link bạn bè!");
    }
  };

  return (
    <div className="friend-item">
      <img
        src={friend.avatar || "/avatar.png"}
        alt="avatar"
        className="avatar"
      />
      <div className="friend-info">
        <div>username: {username}</div>
        <div>Tên: {friend.name}</div>
      </div>
      <button className="add-btn" onClick={handleAddFriend}>
        Thêm bạn bè
      </button>
    </div>
  );
}

export default FriendItem;
