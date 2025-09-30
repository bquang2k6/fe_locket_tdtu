import React, { useEffect, useState } from "react";
import axios from "axios";
import BouncyLoader from "./Bouncy"; // 👈 loader bạn đã có sẵn
import { RiEmotionHappyLine } from "react-icons/ri";
import { TbMoodCrazyHappy } from "react-icons/tb";

function ServerStatus() {
  const [isStatusServer, setIsStatusServer] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/status`);
        const data = await res.json();

        if (data.status === "ok") {
          setIsStatusServer(true);
        } else {
          setIsStatusServer(false);
        }
      } catch (err) {
        setIsStatusServer(false);
      }

    };

    fetchStatus();
  }, []);

  return (
    <div className="mt-4 text-center">
      {isStatusServer === null ? (
        <>
          <div className="inline-grid *:[grid-area:1/1]">
            <div className="status status-warning animate-bounce"></div>
          </div>
          <span className="text-orange-600 font-medium flex items-center -mt-5">
            Đang kiểm tra server <BouncyLoader size={20} color="orange" />
          </span>
        </>
      ) : isStatusServer ? (
        <p className="text-green-600 font-medium flex items-center -mt-5">Server đang hoạt động<RiEmotionHappyLine className="ml-1" /></p>
      ) : (
        <p className="text-red-600 font-medium flex items-center -mt-5">Server lỗi<TbMoodCrazyHappy className="ml-1" /></p>
      )}
    </div>
  );
}

export default ServerStatus;
