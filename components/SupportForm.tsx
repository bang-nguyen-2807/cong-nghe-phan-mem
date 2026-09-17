"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Paperclip, X, AlertCircle, Sparkles } from "lucide-react";

export default function SupportForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    orderId: "",
    issueType: "",
    message: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successModal, setSuccessModal] = useState<{ open: boolean; ticketId: string }>({
    open: false,
    ticketId: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const issueOptions = [
    { value: "", label: "-- Chọn vấn đề cần hỗ trợ --" },
    { value: "don-hang", label: "📦 Đơn hàng & Giao hàng (Hủy, chậm trễ, tra cứu)" },
    { value: "thanh-toan", label: "💳 Thanh toán (Lỗi VNPAY, MoMo, Hoàn tiền)" },
    { value: "doi-tra", label: "🔄 Đổi trả & Lỗi sách (Sách lỗi in, rách, thiếu)" },
    { value: "san-pham", label: "📖 Tư vấn Sách & Đặt trước Pre-order" },
    { value: "tai-khoan", label: "👤 Tài khoản & Tích điểm Nhóm 1" },
    { value: "khac", label: "💬 Vấn đề khác" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles].slice(0, 3)); // Max 3 files
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.fullName.trim()) {
      setErrorMsg("Vui lòng nhập Họ và tên của bạn.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Vui lòng nhập Email hợp lệ để chúng tôi phản hồi.");
      return;
    }
    if (!formData.issueType) {
      setErrorMsg("Vui lòng chọn Vấn đề cần hỗ trợ.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Vui lòng nhập Nội dung chi tiết cần hỗ trợ.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    // Giả lập gửi API hỗ trợ CSKH
    setTimeout(() => {
      setIsSubmitting(false);
      const randomTicket = "PN-" + Math.floor(100000 + Math.random() * 900000);
      setSuccessModal({ open: true, ticketId: randomTicket });
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        orderId: "",
        issueType: "",
        message: "",
      });
      setFiles([]);
    }, 1200);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      {/* Container Form Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Form Banner Header */}
        <div className="bg-gradient-to-r from-[#006633] to-[#024220] px-6 py-8 text-white text-center relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-10 translate-x-4 -translate-y-4">
            <Send className="w-48 h-48 text-white" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight relative z-10 flex items-center justify-center gap-2">
            <Sparkles className="w-6 h-6 text-amber-400" />
            GỬI YÊU CẦU HỖ TRỢ
          </h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 font-normal max-w-xl mx-auto relative z-10">
            Nếu bạn không tìm thấy câu trả lời ở trên, hãy gửi thông tin cho đội ngũ CSKH Nhóm 1. Chúng tôi sẽ phản hồi qua email trong 24 giờ làm việc.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
          {errorMsg && (
            <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-sm flex items-center gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Họ tên */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Ví dụ: Nguyễn Văn An"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#006633] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Email liên hệ <span className="text-rose-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nguyenvanan@gmail.com"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#006633] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Số đơn hàng */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Số đơn hàng <span className="text-slate-400 font-normal">(Tùy chọn)</span>
              </label>
              <input
                type="text"
                name="orderId"
                value={formData.orderId}
                onChange={handleInputChange}
                placeholder="Ví dụ: PN89201"
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#006633] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>

            {/* Vấn đề cần hỗ trợ */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
                Vấn đề cần hỗ trợ <span className="text-rose-500">*</span>
              </label>
              <select
                name="issueType"
                value={formData.issueType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#006633] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all bg-white text-slate-700 font-medium"
              >
                {issueOptions.map((opt, i) => (
                  <option key={i} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Nội dung */}
          <div>
            <label className="block text-xs font-bold uppercase text-slate-700 mb-2">
              Nội dung chi tiết <span className="text-rose-500">*</span>
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleInputChange}
              placeholder="Vui lòng mô tả chi tiết thắc mắc hoặc sự cố bạn đang gặp phải..."
              className="w-full px-4 py-3 text-sm rounded-xl border border-slate-200 focus:border-[#006633] focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-y"
            />
          </div>

          {/* Attachments */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-bold uppercase text-slate-700 flex items-center gap-1.5">
                <Paperclip className="w-4 h-4 text-[#006633]" />
                Đính kèm hình ảnh / tài liệu (Tối đa 3 tệp)
              </label>
              <span className="text-xs text-slate-400">PNG, JPG, PDF (&lt;5MB)</span>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <label className="cursor-pointer bg-slate-50 hover:bg-emerald-50/60 border-2 border-dashed border-slate-300 hover:border-[#006633] px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 flex items-center gap-2 transition-all">
                <Paperclip className="w-4 h-4 text-[#006633]" />
                <span>+ Tải ảnh/tệp lên</span>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {files.map((file, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 bg-emerald-50 text-[#006633] text-xs font-semibold px-3 py-1.5 rounded-lg border border-emerald-200"
                >
                  <span className="truncate max-w-[140px]">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(idx)}
                    className="hover:text-rose-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-[#006633] to-[#024220] hover:from-[#008844] hover:to-[#006633] text-white font-extrabold text-base rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2 mx-auto disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Đang gửi yêu cầu...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-amber-300" />
                  <span>GỬI YÊU CẦU HỖ TRỢ</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {successModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center shadow-2xl border border-emerald-100">
            <div className="w-16 h-16 bg-emerald-100 text-[#006633] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-[#006633] mb-2">Gửi Yêu Cầu Thành Công!</h3>
            <p className="text-slate-600 text-sm mb-4">
              Cảm ơn bạn đã liên hệ với Nhóm 1 Bookstore. Mã yêu cầu (Ticket) của bạn là:
            </p>
            <div className="bg-emerald-50 border border-emerald-200 text-[#006633] font-mono font-bold text-lg py-2.5 rounded-xl mb-6 tracking-wider">
              #{successModal.ticketId}
            </div>
            <p className="text-xs text-slate-500 mb-6">
              Đội ngũ CSKH sẽ phản hồi chi tiết qua Email của bạn sớm nhất trong vòng 24h.
            </p>
            <button
              onClick={() => setSuccessModal({ open: false, ticketId: "" })}
              className="w-full py-3 bg-[#006633] hover:bg-[#024220] text-white font-bold rounded-xl transition-colors"
            >
              Hoàn tất & Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
