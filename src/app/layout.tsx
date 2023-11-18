import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
