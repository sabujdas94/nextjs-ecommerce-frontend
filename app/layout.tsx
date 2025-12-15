import type { Metadata } from "next";
import "@fontsource/inter/index.css";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";

export const metadata: Metadata = {
  title: "alnasirlifestyle - Premium Quality Clothing",
  description: "alnasirlifestyle prints a huge variety of custom clothing like T-shirts, hoodies and more. Your order is handled daily with a lot of love from BANGLADESH and delivered worldwide!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
