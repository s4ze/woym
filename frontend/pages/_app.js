import { Toaster } from "react-hot-toast";
import AuthProvider from "../hooks/AuthProvider";
import "./globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Toaster />
      <Component {...pageProps} />
    </AuthProvider>
  );
}
