import localFont from "next/font/local";
import "./globals.css";

const manrope = localFont({
  src: [
    {
      path: "../fonts/Manrope-Bold.woff2",
      weight: "700",
      style: "bold",
    },
    {
      path: "../fonts/Manrope-Medium.woff2",
      weight: "500",
      style: "medium",
    },
  ],
  variable: "--font-manrope",
  display: "swap",
  
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        {children}
      </body>
    </html>
  );
}

