"use client";

import React from "react";
import { BookOpen, ShieldCheck, Truck, RefreshCw, PhoneCall } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Col 1 */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#006633] flex items-center justify-center text-white font-bold">
              <BookOpen className="w-5 h-5 text-amber-400" />
            </div>
            <span className="font-extrabold text-lg text-white">NHÓM 1 BOOKSTORE</span>
          </div>
          <p className="text-slate-400 leading-relaxed">
            Hệ thống nhà sách uy tín hàng đầu Việt Nam. Cung cấp sách quốc văn, ngoại văn, văn phòng phẩm và quà lưu niệm cao cấp.
          </p>
          <p className="text-slate-500">© 2026 NhASachPhuongNam.com - All Rights Reserved.</p>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase mb-3 text-amber-400">Về Nhóm 1</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Giới thiệu Công ty</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Hệ thống Nhà sách</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tuyển dụng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a></li>
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase mb-3 text-amber-400">Hỗ Trợ Khách Hàng</h4>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-white transition-colors">Hướng dẫn đặt hàng</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phương thức thanh toán</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Phương thức vận chuyển</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Chính sách đổi trả hàng</a></li>
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-bold text-white text-sm uppercase mb-3 text-amber-400">Cam Kết Chất Lượng</h4>
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>100% Sách chính hãng bản quyền</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Truck className="w-4 h-4 text-emerald-400" />
              <span>Giao hàng nhanh trên toàn quốc</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <RefreshCw className="w-4 h-4 text-emerald-400" />
              <span>Bao đổi trả trong vòng 7 ngày</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
