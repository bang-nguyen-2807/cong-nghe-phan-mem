import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Trung Tâm Chăm Sóc Khách Hàng - Nhóm 1 Bookstore",
  description: "Trang hỗ trợ khách hàng, giải đáp thắc mắc đơn hàng, thanh toán, đổi trả và tư vấn trực tuyến Nhóm 1 Bookstore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-800 font-sans">
        {children}
      </body>
    </html>
  );
}
