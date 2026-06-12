import React, { useEffect, useState } from "react";
import BouncyLoader from "../status/Bouncy"; // loader của bạn

function FriendItem({ friend }) {
  const username = friend.link
    ?.replace("https://locket.cam/", "")
    .replace("https://locket.camera/links/", "") || "";

  return (
    <div className="flex items-center gap-3 bg-gray-100 rounded-xl p-3 shadow-sm -ml-4 -mr-4 -mt-4 -mb-4">
      {/* Avatar */}
      <img
        src={friend.avatar || "https://locket.cam/favicon.ico"}
        alt="avatar"
        className="w-12 h-12 rounded-full border-2 border-yellow-500 flex-shrink-0"
      />

      {/* Thông tin — min-w-0 để truncate hoạt động */}
      <div className="flex-1 min-w-0 text-sm text-gray-800">
        <div className="truncate">@{username}</div>
        <div className="truncate text-gray-500">{friend.name}</div>
      </div>

      {/* Nút add — flex-shrink-0 để không bị co */}
      <button
        className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-white text-sm font-medium px-4 py-1 rounded-full transition cursor-pointer whitespace-nowrap"
        onClick={() => {
          if (friend.link) {
            window.open(friend.link, "_blank");
          } else {
            alert("Không tìm thấy link bạn bè!");
          }
        }}
        aria-label={`Thêm bạn ${username}`}
      >
        Add
      </button>
    </div>
  );
}

function FriendList() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);

  // tokenStack[i] = nextToken cần truyền để lấy trang i+1
  // tokenStack[0] = undefined → trang 1 không cần token
  const [tokenStack, setTokenStack] = useState([undefined]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const currentToken = tokenStack[currentIndex];

  useEffect(() => {
    setLoading(true);
    const url = currentToken
      ? `${import.meta.env.VITE_API_URL}/api/link-locket?nextToken=${currentToken}&limit=20`
      : `${import.meta.env.VITE_API_URL}/api/link-locket?limit=20`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.items || []);
        setHasMore(data.hasMore || false);

        // Lưu nextToken vào stack nếu chưa có
        if (data.hasMore && data.nextToken && currentIndex === tokenStack.length - 1) {
          setTokenStack((prev) => {
            const next = [...prev];
            if (next[currentIndex + 1] !== data.nextToken) {
              next[currentIndex + 1] = data.nextToken;
            }
            return next;
          });
        }
      })
      .catch((err) => console.error("Lỗi khi fetch link-locket:", err))
      .finally(() => setLoading(false));
  }, [currentToken]);

  // Số trang đã biết = tokenStack.length (mỗi phần tử là 1 trang)
  // Nếu hasMore thì còn ít nhất 1 trang nữa chưa load
  const knownPages = tokenStack.length;
  const totalPages = hasMore ? knownPages + 1 : knownPages;
  const page = currentIndex + 1; // 1-indexed

  function goToPage(n) {
    const next = Math.min(Math.max(1, n), knownPages); // chỉ đi được đến trang đã biết token
    setCurrentIndex(next - 1);
    const container = document.querySelector(".friend-list-container");
    if (container) container.scrollIntoView({ behavior: "smooth", block: "start" });
  }

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
        <div className="space-y-3">
          <div className="friend-list-container space-y-2">
            {friends.map((friend) => (
              <FriendItem key={friend.id} friend={friend} />
            ))}
          </div>

          {/* Pagination controls - show only when more than one page */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2 mt-3">
              <button
                className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => goToPage(page - 1)}
                disabled={page === 1}
                aria-label="Previous page"
              >
                Prev
              </button>

              <div className="flex items-center space-x-1">
                {/* Trang đã biết */}
                {Array.from({ length: knownPages }, (_, i) => i + 1).map((p) => {
                  if (
                    knownPages > 7 &&
                    p !== 1 &&
                    p !== knownPages &&
                    Math.abs(p - page) > 1
                  ) {
                    return null;
                  }
                  return (
                    <button
                      key={p}
                      onClick={() => goToPage(p)}
                      className={`px-2 py-1 rounded-md text-sm ${
                        p === page
                          ? "bg-yellow-400 text-black"
                          : "text-black bg-gray-100 hover:bg-gray-200"
                      }`}
                      aria-current={p === page ? "page" : undefined}
                    >
                      {p}
                    </button>
                  );
                })}

                {/* Ellipsis nếu còn trang chưa load */}
                {hasMore && <span className="px-2 text-gray-500">...</span>}

                {knownPages > 7 && page > 3 && (
                  <span className="px-2">...</span>
                )}
                {knownPages > 7 && page < knownPages - 2 && (
                  <span className="px-2">...</span>
                )}
              </div>

              <button
                className="px-3 py-1 rounded-md bg-gray-400 hover:bg-gray-300 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                onClick={() => goToPage(page + 1)}
                disabled={page === knownPages && !hasMore}
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
