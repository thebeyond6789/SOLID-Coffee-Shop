import "@/public/css/bootstrap.min.css";
import Navbar from "./components/navbar";
// import Providers from "@/redux/providers";
import Providers from "@/redux/providers";
import { Inter } from "next/font/google";
// import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Client SOLID Coffee Shop",
  description: "Webapp Selling Coffee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>

      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <script
          src="https://kit.fontawesome.com/3763200a5b.js"
          crossOrigin="anonymous"
        ></script>
        <script src="/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  );
}
