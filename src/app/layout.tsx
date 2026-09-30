import type { Metadata } from "next";
import "./globals.css";
import { ReduxProvider } from "./providers";

export const metadata: Metadata = {
  title: "Denior",
  description: "A Next.js Web App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full h-full">
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

