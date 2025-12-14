import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConfigProvider, ConfigProviderProps } from "antd";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import HeaderSection from "./_components/Header";
import "./globals.css";

const danaRegular = localFont({
  src: "../../public/fonts/DanaFaNum-Regular.woff2",
});
const danaMedium = localFont({
  src: "../../public/fonts/DanaFaNum-Medium.woff2",
  variable: "--font-dana-medium",
});
const danaBold = localFont({
  src: "../../public/fonts/DanaFaNum-Bold.woff2",
  variable: "--font-dana-bold",
});
const poppinsRegular = localFont({
  src: "../../public/fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
});
const poppinsMedium = localFont({
  src: "../../public/fonts/Poppins-Medium.ttf",
  variable: "--font-poppins-medium",
});
const poppinsBold = localFont({
  src: "../../public/fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
});

export const metadata: Metadata = {
  title: "task manager",
};

const antdThemeConfigs: ConfigProviderProps["theme"] = {
  token: {
    fontFamily: "var(--font-dana-regular)",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`
          ${danaRegular.className} ${danaMedium.variable} ${danaBold.variable} 
          ${poppinsRegular.variable} ${poppinsMedium.variable} ${poppinsBold.variable} 
          bg-primary
        `}
      >
        <ReactQueryProvider>
          <ConfigProvider theme={antdThemeConfigs} direction="rtl">
            <HeaderSection />
            {children}
          </ConfigProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
