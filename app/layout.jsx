import localFont from "next/font/local";
import "./globals.css";
import { MainThemeProvider } from '../theme/mainTheme';
import ClientWrapper from './ClientWrapper';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Capstone Project System",
  description: "Accra Institute of Technology - Capstone Project System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <MainThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <ClientWrapper>{children}</ClientWrapper>
        </MainThemeProvider>
      </body>
    </html>
  );
}
