import "./globals.css";
import { NextAuthProvider } from "./components/NextAuthProvider/provider";
import Provider from "@/utils/provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-primary">
        <Provider>
          <NextAuthProvider>{children}</NextAuthProvider>
        </Provider>
      </body>
    </html>
  );
}
