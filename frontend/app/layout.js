import { Inter } from "next/font/google";
import AuthProvider from "../hooks/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WOYM",
  description: "Created with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
