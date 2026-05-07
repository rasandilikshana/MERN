import Link from "next/link";
import "./globals.css";

export const metadata = {
  title: "Mini LMS",
  description: "A minimum learning management system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">🎓 Mini LMS</Link>
          <Link href="/courses/new">+ New Course</Link>
        </nav>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
