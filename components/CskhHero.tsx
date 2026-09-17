"use client";

import React from "react";
import { Search, HelpCircle, Sparkles, BookOpenCheck } from "lucide-react";

interface CskhHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onTagClick: (tag: string) => void;
}

export default function CskhHero({ searchQuery, setSearchQuery, onTagClick }: CskhHeroProps) {
  const popularTags = [
    "Thời gian giao hàng",
    "Đổi trả 7 ngày",
    "Thanh toán VNPAY",
    "Xuất hóa đơn VAT",
    "Bọc sách Bookcare",
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#024220] via-[#006633] to-[#045028] text-white py-14 px-4 sm:px-6 lg:px-8">
      {/* Background Decorative Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#ffcc00_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Floating subtle shapes */}
      <div className="absolute top-6 left-10 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-4 right-10 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Sub Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-semibold mb-6 shadow-inner">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Hỗ Trợ Nhanh 24/7 - Nhóm 1 Bookstore</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white mb-3">
          📚 TRUNG TÂM CHĂM SÓC KHÁCH HÀNG
        </h1>

        {/* Subtitle */}
        <p className="text-emerald-100/90 text-base sm:text-lg max-w-2xl mx-auto mb-8 font-normal">
          Chúng tôi luôn sẵn sàng hỗ trợ bạn. Mọi thắc mắc về đơn hàng, thanh toán và sách sẽ được giải đáp nhanh chóng.
        </p>

        {/* Search Bar Input */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center shadow-2xl rounded-2xl overflow-hidden bg-white p-2 transition-all focus-within:ring-4 focus-within:ring-amber-400/50">
            <Search className="w-6 h-6 text-[#006633] ml-3 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="🔍 Bạn cần hỗ trợ vấn đề gì? (Ví dụ: Đổi trả sách, Mã giảm giá...)"
              className="w-full pl-3 pr-4 py-3 text-slate-800 placeholder-slate-400 text-sm sm:text-base outline-none bg-transparent font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="mr-2 text-xs bg-slate-200 hover:bg-slate-300 text-slate-600 px-2.5 py-1 rounded-full font-semibold transition-colors"
              >
                Xóa
              </button>
            )}
            <button className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-6 py-3 rounded-xl font-bold text-sm shadow-md transition-all shrink-0">
              <BookOpenCheck className="w-4 h-4" />
              <span>Tìm kiếm</span>
            </button>
          </div>
        </div>

        {/* Popular Tags */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-emerald-100">
          <span className="font-semibold text-amber-300 flex items-center gap-1">
            <HelpCircle className="w-3.5 h-3.5" /> Tìm nhanh:
          </span>
          {popularTags.map((tag, idx) => (
            <button
              key={idx}
              onClick={() => onTagClick(tag)}
              className="bg-white/15 hover:bg-white/25 border border-white/20 px-3 py-1 rounded-full text-white transition-all text-xs cursor-pointer hover:border-amber-300 hover:text-amber-200"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
