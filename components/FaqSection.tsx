"use client";

import React, { useState, useMemo } from "react";
import { 
  Package, 
  CreditCard, 
  RefreshCw, 
  BookOpen, 
  User, 
  ChevronDown, 
  Check, 
  ThumbsUp, 
  ThumbsDown,
  HelpCircle
} from "lucide-react";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

interface FaqSectionProps {
  searchQuery: string;
}

export default function FaqSection({ searchQuery }: FaqSectionProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [openFaqId, setOpenFaqId] = useState<string | null>("ord-1");
  const [helpfulFeedback, setHelpfulFeedback] = useState<Record<string, "yes" | "no">>({});

  const categories = [
    { id: "all", label: "Tất cả câu hỏi", icon: HelpCircle },
    { id: "don-hang", label: "📦 Đơn hàng & giao hàng", icon: Package },
    { id: "thanh-toan", label: "💳 Thanh toán", icon: CreditCard },
    { id: "doi-tra", label: "🔄 Đổi trả / hoàn tiền", icon: RefreshCw },
    { id: "san-pham", label: "📖 Sản phẩm & sách", icon: BookOpen },
    { id: "tai-khoan", label: "👤 Tài khoản", icon: User },
  ];

  const faqData: FaqItem[] = [
    // Đơn hàng & giao hàng
    {
      id: "ord-1",
      category: "don-hang",
      question: "Thời gian giao hàng của Nhóm 1 Bookstore mất bao lâu?",
      answer: "Thời gian giao hàng tiêu chuẩn tại TP.HCM và Hà Nội là từ 1 - 2 ngày làm việc. Đối với các tỉnh thành khác trên toàn quốc, thời gian giao từ 3 - 5 ngày làm việc tùy khu vực địa lý.",
    },
    {
      id: "ord-2",
      category: "don-hang",
      question: "Phí vận chuyển đơn hàng được tính như thế nào?",
      answer: "Nhóm 1 Bookstore miễn phí vận chuyển cho đơn hàng từ 250.000đ tại khu vực nội thành TP.HCM/Hà Nội và từ 350.000đ toàn quốc. Đơn hàng dưới mức trên áp dụng phí giao hàng cố định 20.000đ - 35.000đ.",
    },
    {
      id: "ord-3",
      category: "don-hang",
      question: "Làm thế nào để kiểm tra vị trí hành trình đơn hàng?",
      answer: "Bạn có thể nhập mã đơn hàng tại mục 'Tra cứu đơn hàng' trên góc phải màn hình hoặc đăng nhập Tài khoản > Quản lý đơn hàng để xem mã vận đơn chi tiết.",
    },

    // Thanh toán
    {
      id: "pay-1",
      category: "thanh-toan",
      question: "Nhóm 1 Bookstore hỗ trợ các hình thức thanh toán nào?",
      answer: "Nhóm 1 hỗ trợ đa dạng phương thức: Thanh toán khi nhận hàng (COD), Ví điện tử (MoMo, ZaloPay, ShopeePay), Chuyển khoản ngân hàng qua VNPAY-QR và Thẻ Visa/Mastercard.",
    },
    {
      id: "pay-2",
      category: "thanh-toan",
      question: "Tôi muốn xuất hóa đơn đỏ (VAT) cho công ty thì làm như thế nào?",
      answer: "Tại bước thanh toán, vui lòng tích chọn 'Yêu cầu xuất hóa đơn VAT' và điền đầy đủ Tên công ty, Mã số thuế, Địa chỉ và Email nhận hóa đơn điện tử. Hóa đơn sẽ gửi qua email trong vòng 24h.",
    },

    // Đổi trả / hoàn tiền
    {
      id: "ret-1",
      category: "doi-tra",
      question: "Chính sách đổi trả sản phẩm bị lỗi áp dụng ra sao?",
      answer: "Nhóm 1 Bookstore hỗ trợ đổi mới 100% trong vòng 7 ngày kể từ khi nhận hàng nếu sách bị lỗi in ấn (mất trang, bung gáy, rách) hoặc giao nhầm sản phẩm. Vui lòng giữ nguyên hóa đơn & sản phẩm.",
    },
    {
      id: "ret-2",
      category: "doi-tra",
      question: "Thời gian hoàn tiền cho đơn hàng hủy hoặc đổi trả là bao lâu?",
      answer: "Đối với ví điện tử: Hoàn tiền từ 1 - 2 ngày làm việc. Đối với thẻ ATM/Visa: Tiền sẽ về tài khoản ngân hàng của bạn trong từ 3 - 7 ngày làm việc theo quy định ngân hàng phát hành.",
    },

    // Sản phẩm & sách
    {
      id: "prod-1",
      category: "san-pham",
      question: "Sách trên Nhóm 1 Bookstore có cam kết chính hãng 100% không?",
      answer: "Tất cả sách và văn phòng phẩm tại Nhóm 1 Bookstore đều là hàng bản quyền chính hãng 100% từ các nhà xuất bản uy tín trong và ngoài nước.",
    },
    {
      id: "prod-2",
      category: "san-pham",
      question: "Dịch vụ bọc sách Bookcare có được cung cấp tại website không?",
      answer: "Có! Bạn có thể chọn option 'Bọc sách kiếng màng bọc cao cấp' ngay tại trang chi tiết sản phẩm hoặc trong giỏ hàng với mức phí hỗ trợ ưu đãi 3.000đ/cuốn.",
    },

    // Tài khoản
    {
      id: "acc-1",
      category: "tai-khoan",
      question: "Làm thế nào nếu tôi quên mật khẩu đăng nhập?",
      answer: "Nhấp vào 'Đăng nhập' > Chọn 'Quên mật khẩu' và nhập Email/SĐT đăng ký. Chúng tôi sẽ gửi đường dẫn khôi phục mật khẩu mới về hộp thư của bạn ngay lập tức.",
    },
    {
      id: "acc-2",
      category: "tai-khoan",
      question: "Tích điểm thành viên Nhóm 1 BookClub sử dụng ra sao?",
      answer: "Mỗi 100.000đ thanh toán bạn sẽ tích lũy 1.000 điểm Nhóm 1. Điểm tích lũy có thể đổi trực tiếp thành Voucher giảm giá hoặc trừ trực tiếp tiền mặt vào đơn hàng tiếp theo.",
    },
  ];

  // Lọc theo danh mục và từ khóa tìm kiếm
  const filteredFaqs = useMemo(() => {
    return faqData.filter((item) => {
      const matchCategory = activeCategory === "all" || item.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === "" ||
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const handleFeedback = (id: string, type: "yes" | "no") => {
    setHelpfulFeedback((prev) => ({ ...prev, [id]: type }));
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#006633] tracking-tight uppercase">
          CÂU HỎI THƯỜNG GẶP
        </h2>
        <div className="w-16 h-1 bg-amber-400 mx-auto mt-2.5 rounded-full" />
        <p className="text-slate-500 text-sm mt-2">
          Chọn danh mục bên dưới để nhanh chóng tìm thấy lời giải đáp cho thắc mắc của bạn
        </p>
      </div>

      {/* Category Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 mb-8">
        {categories.map((cat) => {
          const Icon = cat.icon;
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 p-3 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 text-left border shadow-2xs ${
                isActive
                  ? "bg-[#006633] text-white border-[#006633] shadow-md scale-[1.02]"
                  : "bg-white text-slate-700 border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/50"
              }`}
            >
              <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-amber-300" : "text-[#006633]"}`} />
              <span className="truncate">{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* FAQ List / Accordion */}
      <div className="space-y-3.5">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-[#006633] ring-2 ring-emerald-500/20 shadow-md"
                    : "border-slate-200 hover:border-slate-300 shadow-2xs"
                }`}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleAccordion(faq.id)}
                  className="w-full px-5 py-4 text-left flex justify-between items-center gap-4 bg-white hover:bg-emerald-50/30 transition-colors"
                >
                  <span className="font-bold text-slate-800 text-sm sm:text-base flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#006633] shrink-0" />
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                      isOpen ? "bg-[#006633] text-white rotate-180" : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Answer Content */}
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-sm leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p className="mt-2 text-slate-700 font-normal">{faq.answer}</p>

                    {/* Feedback Helpful Question */}
                    <div className="mt-4 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                      <span>Thông tin này có giúp ích cho bạn không?</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleFeedback(faq.id, "yes")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                            helpfulFeedback[faq.id] === "yes"
                              ? "bg-emerald-100 border-emerald-500 text-emerald-800 font-bold"
                              : "bg-white border-slate-200 hover:bg-emerald-50 text-slate-600"
                          }`}
                        >
                          <ThumbsUp className="w-3.5 h-3.5" />
                          <span>Hữu ích</span>
                        </button>

                        <button
                          onClick={() => handleFeedback(faq.id, "no")}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-all ${
                            helpfulFeedback[faq.id] === "no"
                              ? "bg-rose-100 border-rose-400 text-rose-800 font-bold"
                              : "bg-white border-slate-200 hover:bg-rose-50 text-slate-600"
                          }`}
                        >
                          <ThumbsDown className="w-3.5 h-3.5" />
                          <span>Chưa hữu ích</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
            <HelpCircle className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-600 font-semibold text-base">Không tìm thấy câu hỏi phù hợp với từ khóa "{searchQuery}"</p>
            <p className="text-slate-400 text-xs mt-1">Vui lòng thử từ khóa khác hoặc gửi yêu cầu hỗ trợ bên dưới</p>
          </div>
        )}
      </div>
    </section>
  );
}
