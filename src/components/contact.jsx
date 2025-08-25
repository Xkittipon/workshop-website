import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react"; // ไอคอนจาก lucide-react

const FloatingChat = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed right-4 bottom-4 flex flex-col items-center space-y-3 z-50">
      {/* ช่องทางติดต่อ (แสดงเมื่อกดเปิด) */}
      {isOpen && (
        <div className="flex flex-col items-center space-y-3 mb-3">
          {/* Messenger */}
          <a
            href="https://m.me/yourpage"
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 flex items-center justify-center "
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/768px-Facebook_Messenger_logo_2020.svg.png"
              alt="Messenger"
              className="w-10 h-10 shadow-lg hover:scale-110 transition"
            />
          </a>

          {/* LINE */}
          <a
            href="##"
            target="_blank"
            rel="noopener noreferrer"
            className="  flex items-center justify-center "
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124027.png"
              alt="LINE"
              className="w-10 h-10 shadow-lg hover:scale-110 transition rounded-full "
            />
          </a>
        </div>
      )}

      {/* ปุ่มหลัก */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-[#fca311] text-[#ffffff] flex items-center justify-center shadow-xl hover:scale-110 transition"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default FloatingChat;
