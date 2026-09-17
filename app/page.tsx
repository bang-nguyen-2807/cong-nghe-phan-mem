"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import CskhHero from "@/components/CskhHero";
import FaqSection from "@/components/FaqSection";
import SupportForm from "@/components/SupportForm";
import ContactBar from "@/components/ContactBar";
import Footer from "@/components/Footer";

export default function CskhPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-emerald-100 selection:text-[#006633]">
      {/* 1. Header Header (LOGO | Trang chủ | Sách | Khuyến mãi | CSKH) */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 2. Hero Banner CSKH (📚 TRUNG TÂM CHĂM SÓC KHÁCH HÀNG & Ô tìm kiếm) */}
        <CskhHero
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onTagClick={handleTagClick}
        />

        {/* 3. FAQ Section (CÂU HỎI THƯỜNG GẶP - 5 Danh mục với Accordion) */}
        <FaqSection searchQuery={searchQuery} />

        {/* 4. Support Form Section (GỬI YÊU CẦU HỖ TRỢ) */}
        <SupportForm />

        {/* 5. Contact Bar Footer Section (📞 Hotline | ✉ Email | 💬 Chat trực tuyến) */}
        <ContactBar />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
