import AuthProvider from "../hooks/AuthProvider";
import "./globals.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
