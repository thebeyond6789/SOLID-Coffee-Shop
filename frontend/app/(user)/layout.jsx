import "@/public/css/bootstrap.min.css";
import Navbar from "./components/navbar";
// import Providers from "@/redux/providers";
import Providers from "@/redux/providers";

export const metadata = {
  title: "SOLID Coffee Shop",
  description: "Webapp Selling Coffee",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
