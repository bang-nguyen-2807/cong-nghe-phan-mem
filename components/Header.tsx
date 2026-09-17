"use client";

import React, { useState } from "react";
import { BookOpen, Search, ShoppingBag, User, SearchCheck, Menu, X, Bell } from "lucide-react";

export default function Header() {
  const [activeTab, setActiveTab] = useState("cskh");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Trang chủ", href: "#" },
    { id: "sach", label: "Sách", href: "#" },
    { id: "khuyen-mai", label: "Khuyến mãi", href: "#", badge: "HOT" },
    { id: "cskh", label: "CSKH", href: "#", active: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner */}
      <div className="bg-[#024220] text-white text-xs py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex justify-end items-center">
          <div className="flex items-center space-x-4">
            <a href="#tracking" className="flex items-center gap-1 text-slate-200 hover:text-white transition-colors">
              <SearchCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Tra cứu đơn hàng</span>
            </a>
            <span className="text-slate-500">|</span>
            <span className="hover:text-amber-300 cursor-pointer">VN</span>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* LOGO (Brand Styling) */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#006633] to-[#024220] flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-200">
                <BookOpen className="w-6 h-6 text-amber-400" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl tracking-tight text-[#006633] leading-none">
                  NHÓM 1
                </span>
                <span className="text-[10px] tracking-widest uppercase text-amber-600 font-bold mt-0.5">
                  BOOKSTORE
                </span>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 font-medium">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveTab(item.id);
                  }}
                  className={`relative px-4 py-2.5 rounded-lg text-sm transition-all duration-150 flex items-center gap-1.5 ${
                    isActive
                      ? "text-[#006633] font-bold bg-emerald-50/80 shadow-2xs"
                      : "text-slate-600 hover:text-[#006633] hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full uppercase">
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#006633] rounded-full" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Search Bar & User Controls */}
          <div className="flex items-center gap-3">
            {/* Header Search Box */}
            <div className="hidden md:flex items-center relative w-52 lg:w-64">
              <input
                type="text"
                placeholder="Tìm sách, tác giả..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-full bg-slate-100 border border-transparent focus:border-[#006633] focus:bg-white focus:outline-none transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3" />
            </div>

            {/* Actions */}
            <button className="p-2 rounded-full text-slate-600 hover:text-[#006633] hover:bg-slate-100 relative" title="Thông báo">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-ping" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full" />
            </button>

            <button className="p-2 rounded-full text-slate-600 hover:text-[#006633] hover:bg-slate-100 relative" title="Tài khoản">
              <User className="w-5 h-5" />
            </button>

            <button className="p-2 rounded-full text-slate-600 hover:text-[#006633] hover:bg-slate-100 relative" title="Giỏ hàng">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-white font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                2
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-3 space-y-2">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => {
                setActiveTab(item.id);
                setMobileMenuOpen(false);
              }}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                activeTab === item.id
                  ? "bg-emerald-50 text-[#006633] font-bold"
                  : "text-slate-600 hover:bg-slate-50"
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
