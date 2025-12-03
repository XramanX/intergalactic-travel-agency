import type { Metadata } from "next";
import "@/styles/globals.scss";
import { ThemeProvider } from "@/features/theme/ThemeContext";

export const metadata: Metadata = {
  title: "Intergalactic Travel Agency",
  description: "Space booking wizard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
