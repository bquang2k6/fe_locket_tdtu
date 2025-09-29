// src/api/auth.js
export async function verifyToken(token) {
  try {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/links`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      return true; // token hợp lệ
    } else {
      return false; // token hết hạn hoặc sai
    }
  } catch (err) {
    console.error("Verify token error:", err);
    return false;
  }
}
