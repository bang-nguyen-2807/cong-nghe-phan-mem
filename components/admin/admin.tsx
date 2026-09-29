"use client";

import React, { useEffect, useState } from "react";
import { MessageSquare, User, Send, RefreshCw, Clock, ShieldCheck, Mail, Search } from "lucide-react";

export default function AdminPage() {
    const [conversations, setConversations] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    // 1. Lấy danh sách tất cả các cuộc trò chuyện
    const fetchConversations = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/admin/getConversations");
            const data = await res.json();
            if (data.success) {
                setConversations(data.conversations);
                // Nếu chưa chọn cuộc trò chuyện nào, chọn cuộc trò chuyện đầu tiên
                if (data.conversations.length > 0 && !selectedConversation) {
                    setSelectedConversation(data.conversations[0]);
                }
            }
        } catch (err) {
            console.error("Lỗi khi tải danh sách cuộc trò chuyện:", err);
        } finally {
            setLoading(false);
        }
    };

    // 2. Lấy tin nhắn của cuộc trò chuyện được chọn
    const fetchMessages = async (conversationId: number) => {
        try {
            const res = await fetch(`/api/admin/getMessages?conversation_id=${conversationId}`);
            const data = await res.json();
            if (data.success) {
                setMessages(data.messages);
            }
        } catch (err) {
            console.error("Lỗi khi tải tin nhắn:", err);
        }
    };

    useEffect(() => {
        fetchConversations();
        const interval = setInterval(() => {
            fetchConversations();
        }, 3000);
        return () => clearInterval(interval);

    }, []);

    useEffect(() => {
        if (selectedConversation?.id) {
            fetchMessages(selectedConversation.id);
            const interval = setInterval(() => { // tự đọng update tn sau 2 giây
                fetchMessages(selectedConversation.id);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [selectedConversation]);

    // 3. Admin gửi tin nhắn trả lời khách hàng
    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!replyText.trim() || !selectedConversation?.id) return;

        const content = replyText;
        setReplyText("");

        // Cập nhật UI ngay lập tức
        const tempMsg = {
            id: Date.now(),
            conversation_id: selectedConversation.id,
            sender: "admin",
            content: content,
            created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, tempMsg]);

        try {
            await fetch("/api/createMessages", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    conversation_id: selectedConversation.id,
                    sender: "admin", // Admin trả lời
                    content: content,
                }),
            });
            // Tải lại để đồng bộ tin nhắn mới nhất
            fetchMessages(selectedConversation.id);
            fetchConversations();
        } catch (err) {
            console.error("Lỗi khi gửi phản hồi:", err);
        }
    };

    // Lọc danh sách theo từ khóa tìm kiếm (tên hoặc email)
    const filteredConversations = conversations.filter(
        (c) =>
            c.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.user_email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
            {/* Admin Header */}
            <header className="bg-[#006633] text-white px-6 py-4 flex justify-between items-center shadow-md border-b-4 border-amber-400">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400 text-[#006633] flex items-center justify-center font-bold shadow">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="font-extrabold text-lg leading-tight">Hệ Thống Quản Lý CSKH (Admin)</h1>
                        <p className="text-xs text-emerald-200">Quản lý và tương tác trực tiếp với khách hàng</p>
                    </div>
                </div>

                <button
                    onClick={fetchConversations}
                    className="flex items-center gap-2 bg-emerald-800 hover:bg-emerald-900 px-4 py-2 rounded-xl text-xs font-bold text-amber-300 transition shadow"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                    Làm mới danh sách
                </button>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 p-6 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-100px)]">

                {/* DANH SÁCH CUỘC TRÒ CHUYỆN (BÊN TRÁI) */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-slate-100 bg-slate-50">
                        <div className="relative">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm theo tên hoặc email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#006633]"
                            />
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                        {filteredConversations.length === 0 ? (
                            <div className="p-8 text-center text-slate-400 text-xs">
                                Chưa có cuộc trò chuyện nào.
                            </div>
                        ) : (
                            filteredConversations.map((item) => {
                                const isSelected = selectedConversation?.id === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setSelectedConversation(item)}
                                        className={`w-full text-left p-4 transition-colors flex items-start gap-3 ${isSelected ? "bg-emerald-50/80 border-l-4 border-[#006633]" : "hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="w-10 h-10 rounded-full bg-emerald-100 text-[#006633] font-bold flex items-center justify-center text-sm shrink-0">
                                            {item.user_name ? item.user_name.charAt(0).toUpperCase() : "K"}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-center mb-1">
                                                <h4 className="font-bold text-xs text-slate-900 truncate">
                                                    {item.user_name}
                                                </h4>
                                                <span className="text-[10px] text-slate-400">
                                                    #{item.id}
                                                </span>
                                            </div>

                                            <p className="text-[11px] text-slate-500 truncate mb-1">
                                                ✉ {item.user_email}
                                            </p>

                                            <p className="text-xs text-slate-600 truncate font-medium">
                                                {item.last_message || "Chưa có tin nhắn..."}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* KHUNG NỘI DUNG CHAT & TRẢ LỜI (BÊN PHẢI) */}
                <div className="lg:col-span-8 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
                    {selectedConversation ? (
                        <>
                            {/* Selected Header */}
                            <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#006633] text-amber-300 font-bold flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-sm text-slate-900">{selectedConversation.user_name}</h3>
                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {selectedConversation.user_email}
                                        </span>
                                    </div>
                                </div>

                                <span className="bg-emerald-100 text-[#006633] text-xs font-extrabold px-3 py-1 rounded-full">
                                    Cuộc trò chuyện #{selectedConversation.id}
                                </span>
                            </div>

                            {/* Message List */}
                            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
                                {messages.length === 0 ? (
                                    <div className="text-center text-slate-400 text-xs py-10">
                                        Chưa có tin nhắn nào trong cuộc trò chuyện này.
                                    </div>
                                ) : (
                                    messages.map((msg) => {
                                        const isAdmin = msg.sender === "admin";
                                        return (
                                            <div
                                                key={msg.id}
                                                className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}
                                            >
                                                <div className="text-[10px] text-slate-400 mb-1 px-1">
                                                    {isAdmin ? "👨‍💼 Tư vấn viên (Admin)" : `👤 ${selectedConversation.user_name}`}
                                                </div>
                                                <div
                                                    className={`max-w-[75%] p-3.5 rounded-2xl text-xs shadow-xs ${isAdmin
                                                        ? "bg-[#006633] text-white rounded-tr-none"
                                                        : "bg-white text-slate-800 border border-slate-200 rounded-tl-none"
                                                        }`}
                                                >
                                                    {msg.content}
                                                </div>
                                                <span className="text-[9px] text-slate-400 mt-1">
                                                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                        );
                                    })
                                )}
                            </div>

                            {/* Reply Input Form */}
                            <form onSubmit={handleSendReply} className="p-4 bg-white border-t border-slate-200 flex items-center gap-3">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    placeholder={`Trả lời ${selectedConversation.user_name}...`}
                                    className="flex-1 px-4 py-3 text-xs bg-slate-100 rounded-xl outline-none focus:ring-2 focus:ring-[#006633]"
                                />
                                <button
                                    type="submit"
                                    className="px-5 py-3 bg-[#006633] hover:bg-[#024220] text-amber-300 font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                                >
                                    <Send className="w-4 h-4" />
                                    GỬI PHẢN HỒI
                                </button>
                            </form>
                        </>
                    ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs">
                            <MessageSquare className="w-12 h-12 mb-2 text-slate-300" />
                            Vui lòng chọn một cuộc trò chuyện ở cột bên trái để xem.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}