"use client";

import React, { useState, useEffect } from "react";
import { Phone, Mail, MessageSquare, Clock, Send, X, Bot, ShieldCheck, User, Loader2, LogOut } from "lucide-react";

export default function ContactBar() {
  const [chatOpen, setChatOpen] = useState(false);
  const [user, setUser] = useState({ user_name: "", user_email: "" });
  const [conversation, setConversation] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [chatMessages, setChatMessages] = useState([
    {
      sender: "bot",
      text: "Xin chào! 👋 Tôi là trợ lý ảo Nhóm 1 Bookstore. Tôi có thể hỗ trợ gì cho bạn hôm nay?",
      time: "Vừa xong",
    },
  ]);
  const [inputMsg, setInputMsg] = useState("");

  const handleStartConversation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user.user_name.trim() || !user.user_email.trim()) {
      alert("Vui lòng nhập đầy đủ Tên và Email để bắt đầu!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/createConversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setConversation(data.conversation);
        localStorage.setItem("user_conversation", JSON.stringify(data.conversation));
        setChatMessages([
          {
            sender: "bot",
            text: `Xin chào ${data.conversation.user_name}! 👋 CSKH Nhóm 1 Bookstore đã sẵn sàng hỗ trợ bạn. Bạn cần tư vấn điều gì hôm nay?`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        alert(data.error || "Tạo cuộc trò chuyện thất bại!");
      }
    } catch (err: any) {
      console.error(err);
      alert("Có lỗi xảy ra khi kết nối máy chủ!");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Kiểm tra nếu trong localStorage đã có thông tin cuộc trò chuyện cũ
    const savedConversation = localStorage.getItem("user_conversation");
    if (savedConversation) {
      setConversation(JSON.parse(savedConversation));
    }
  }, []);

  const handleSendChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !conversation?.id) return;

    const userText = inputMsg;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Làm sạch ngay ô nhập để khách hàng có thể gõ nội dung tiếp theo liên tục
    setInputMsg("");

    // 2. Cập nhật tin nhắn lên màn hình UI ngay lập tức
    setChatMessages((prev) => [
      ...prev,
      { sender: "user", text: userText, time: now },
    ]);

    try {
      // 3. Tự động gửi conversation_id, sender="user" và content lên CSDL
      await fetch("/api/createMessages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversation.id,
          sender: "user",
          content: userText,
        }),
      });
    } catch (err) {
      console.error("Lỗi khi gửi tin nhắn:", err);
    }
  };

  const handleResetChat = () => {
    setConversation(null);
    setUser({ user_name: "", user_email: "" });
  };
  useEffect(() => {
    if (!conversation?.id) return;

    // Hàm tự động gọi API lấy tin nhắn mới nhất từ CSDL
    const fetchLatestMessages = async () => {
      try {
        const res = await fetch(`/api/admin/getMessages?conversation_id=${conversation.id}`);
        const data = await res.json();
        if (data.success && data.messages) {
          // Chuyển đổi định dạng danh sách tin nhắn để hiển thị UI
          const formatted = data.messages.map((m: any) => ({
            sender: m.sender,
            text: m.content,
            time: new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          }));
          setChatMessages(formatted);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchLatestMessages(); // Gọi lần đầu
    const interval = setInterval(fetchLatestMessages, 2000); // ⏱ Tự động lặp lại mỗi 2 giây (2000ms)

    return () => clearInterval(interval); // Dọn dẹp bộ đếm thời gian
  }, [conversation?.id]);


  return (
    <>
      {/* Contact Bar Wireframe Section */}
      <section className="bg-gradient-to-r from-[#024220] via-[#006633] to-[#024220] text-white py-10 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-400">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-emerald-800">

            {/* 📞 Hotline */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-amber-400 group-hover:text-[#006633] transition-all duration-300 flex items-center justify-center mb-3 text-amber-300 shadow-md">
                <Phone className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base uppercase text-amber-300">📞 Hotline Hỗ Trợ</h3>
              <a href="tel:19006656" className="text-2xl font-black tracking-tight text-white hover:text-amber-200 mt-1">
                1900 6656
              </a>
              <span className="text-xs text-emerald-200 flex items-center gap-1 mt-1 font-medium">
                <Clock className="w-3.5 h-3.5" /> 8h00 - 21h00 (Tất cả các ngày)
              </span>
            </div>

            {/* ✉ Email */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-amber-400 group-hover:text-[#006633] transition-all duration-300 flex items-center justify-center mb-3 text-amber-300 shadow-md">
                <Mail className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base uppercase text-amber-300">✉ Email Khách Hàng</h3>
              <a href="mailto:hotro@nhom1bookstore.com" className="text-base font-bold text-white hover:text-amber-200 mt-1">
                hotro@nhom1bookstore.com
              </a>
              <span className="text-xs text-emerald-200 mt-1 font-medium">
                Phản hồi trong vòng 24 giờ
              </span>
            </div>

            {/* 💬 Chat trực tuyến */}
            <div className="pt-4 md:pt-0 md:px-6 flex flex-col items-center group">
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-amber-400 group-hover:text-[#006633] transition-all duration-300 flex items-center justify-center mb-3 text-amber-300 shadow-md">
                <MessageSquare className="w-7 h-7" />
              </div>
              <h3 className="font-extrabold text-base uppercase text-amber-300">💬 Chat Trực Tuyến</h3>
              <button
                onClick={() => setChatOpen(true)}
                className="mt-2 px-6 py-2 bg-amber-400 hover:bg-amber-300 text-[#006633] font-black text-sm rounded-full shadow-md transition-all hover:scale-105"
              >
                MỞ KHUNG CHAT
              </button>
              <span className="text-xs text-emerald-200 mt-1 font-medium flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                Tư vấn viên sẵn sàng
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="bg-gradient-to-br from-[#006633] to-[#024220] hover:from-[#008844] hover:to-[#006633] text-white p-4 rounded-full shadow-2xl flex items-center gap-2 border-2 border-amber-400 hover:scale-110 transition-transform duration-200 group"
          title="Chat với CSKH Nhóm 1"
        >
          <MessageSquare className="w-6 h-6 text-amber-400 group-hover:rotate-12 transition-transform" />
          <span className="hidden sm:inline font-bold text-xs pr-1">Hỗ trợ trực tuyến</span>
        </button>
      </div>

      {/* Live Chat Modal Drawer */}
      {chatOpen && (
        <div className="fixed bottom-20 right-4 sm:right-6 z-50 w-full sm:w-96 max-w-[calc(100vw-2rem)] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col h-[500px] animate-slide-up">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-[#006633] to-[#024220] p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-amber-400 text-[#006633] flex items-center justify-center font-bold">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-sm leading-none">CSKH Nhóm 1</h4>
                <span className="text-[10px] text-emerald-200 flex items-center gap-1 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-amber-300" /> Trực tuyến 24/7
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {conversation && (
                <button
                  onClick={handleResetChat}
                  title="Thoát cuộc trò chuyện"
                  className="p-1 hover:bg-white/20 rounded-full text-slate-200 hover:text-amber-300 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setChatOpen(false)}
                className="p-1 hover:bg-white/20 rounded-full text-slate-200 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* CHƯA TẠO CUỘC TRÒ CHUYỆN: HIỂN THỊ FORM NHẬP TÊN & EMAIL */}
          {!conversation ? (
            <div className="flex-1 p-6 flex flex-col justify-center bg-slate-50">
              <div className="text-center mb-6">
                <div className="w-14 h-14 bg-emerald-100 text-[#006633] rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
                  <MessageSquare className="w-7 h-7" />
                </div>
                <h3 className="font-extrabold text-slate-800 text-base">Bắt Đầu Trò Chuyện</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Nhập thông tin của bạn để kết nối trực tiếp với bộ phận Chăm Sóc Khách Hàng.
                </p>
              </div>

              <form onSubmit={handleStartConversation} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Họ và Tên *</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={user.user_name}
                      onChange={(e) => setUser({ ...user, user_name: e.target.value })}
                      placeholder="Ví dụ: Nguyễn Văn A"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#006633] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Địa chỉ Email *</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={user.user_email}
                      onChange={(e) => setUser({ ...user, user_email: e.target.value })}
                      placeholder="nva@gmail.com"
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-white border border-slate-300 rounded-xl focus:ring-2 focus:ring-[#006633] focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-[#006633] hover:bg-[#024220] text-amber-300 font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-amber-300" />
                      Đang tạo cuộc trò chuyện...
                    </>
                  ) : (
                    "BẮT ĐẦU CHAT NGAY"
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* ĐÃ TẠO CUỘC TRÒ CHUYỆN: HIỂN THỊ KHUNG NỘI DUNG CHAT */
            <>
              {/* Thẻ thông tin khách hàng đang chat */}
              <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-2 flex items-center justify-between text-[11px] text-emerald-800">
                <span className="font-semibold truncate max-w-[200px]">
                  👤 {conversation.user_name} ({conversation.user_email})
                </span>
                <span className="bg-emerald-200/60 text-emerald-800 px-2 py-0.5 rounded-full text-[9px] font-bold">
                  Mã cuộc trò chuyện #{conversation.id}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === "user"
                        ? "bg-[#006633] text-white rounded-tr-none"
                        : "bg-white text-slate-700 border border-slate-200 shadow-2xs rounded-tl-none"
                        }`}
                    >
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.time}</span>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <form onSubmit={handleSendChat} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
                <input
                  type="text"
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  className="flex-1 px-3 py-2 text-xs bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
                <button
                  type="submit"
                  className="p-2 bg-[#006633] hover:bg-[#024220] text-white rounded-xl shadow-xs"
                >
                  <Send className="w-4 h-4 text-amber-300" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

