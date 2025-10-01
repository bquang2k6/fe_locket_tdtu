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

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 15;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/link-locket`)
      .then((res) => res.json())
      .then((data) => setFriends(data))
      .catch((err) => console.error("Lỗi khi fetch link-locket:", err))
      .finally(() => setLoading(false)); // tắt loading
  }, []);

  // Reset to first page when friends change (e.g., new fetch)
  useEffect(() => {
    setCurrentPage(1);
  }, [friends.length]);

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

  const totalItems = friends.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

  // clamp current page
  const page = Math.min(Math.max(1, currentPage), totalPages);

  const startIdx = (page - 1) * ITEMS_PER_PAGE;
  const endIdx = startIdx + ITEMS_PER_PAGE;
  const visibleFriends = friends.slice(startIdx, endIdx);

  function goToPage(n) {
    const next = Math.min(Math.max(1, n), totalPages);
    setCurrentPage(next);
    // scroll to top of list for UX
    const container = document.querySelector('.friend-list-container');
    if (container) container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="max-w-md mx-auto">
      {totalItems > 0 ? (
        <div className="space-y-3">
          <div className="friend-list-container space-y-2">
            {visibleFriends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </div>

          {/* Pagination controls - show only when more than one page */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-3">
              <button
                className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-300 text-sm"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                Prev
              </button>

              {/* Show page numbers but avoid a huge list: show first, last, neighbors */}
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => {
                  // only render if near current page or first/last or small total
                  if (
                    totalPages > 7 &&
                    p !== 1 &&
                    p !== totalPages &&
                    Math.abs(p - page) > 1
                  ) {
                    // insert ellipsis marker instead of numbers — handled below
                    return null;
                  }

                  return (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`px-2 py-1 rounded-md text-sm ${p === page ? 'bg-yellow-400 text-black' : 'text-black bg-gray-100 hover:bg-gray-200'}`}
                      aria-current={p === page ? 'page' : undefined}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* If there are skipped pages, render small ellipses and neighbors */}
                {totalPages > 7 && page > 3 && <span className="px-2">...</span>}
                {totalPages > 7 && page < totalPages - 2 && <span className="px-2">...</span>}
              </div>

              <button
                className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-300 text-sm"
                onClick={() => goToPage(page + 1)}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-4">Không có danh sách nào</div>
      )}
    </div>
  );
}

export default FriendList;
