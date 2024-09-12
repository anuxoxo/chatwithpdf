import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html className="min-h-screen h-screen flex flex-col" lang="en">
        <body>{children}</body>
      </html>
    </ClerkProvider>
  );
}
