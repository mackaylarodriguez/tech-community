import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  title: "Tech Community",
  description: "A community resource board for people in tech",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="navbar">
          <h1>Tech Community</h1>
          <p className="text-secondary">
            A community resource board for people in tech
          </p>
        </header>
        <main className="page">{children}</main>
      </body>
    </html>
  );
}
