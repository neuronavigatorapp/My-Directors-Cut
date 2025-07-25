import "../styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Director's Cut",
  description: "Curate and browse your personal movie collection.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
