import type { Metadata } from "next";
import localFont from "next/font/local";
import { ConfigProvider, ConfigProviderProps } from "antd";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import HeaderSection from "./_components/Header";
import { Toaster } from "sonner";
import "./globals.css";

// fonts
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

// html meta tags
export const metadata: Metadata = {
  title: "task manager",
};

// antd configs
const antdThemeConfigs: ConfigProviderProps["theme"] = {
  token: {
    fontFamily: "var(--font-dana-regular)",
  },
  components: {
    Select: {
      optionSelectedBg: "rgba(6, 182, 212, .2)",
    },
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
          bg-[#0a0a0e]
        `}
      >
        <ReactQueryProvider>
          <ConfigProvider theme={antdThemeConfigs} direction="rtl">
            <HeaderSection />
            {children}
            <Toaster
              position="top-center"
              toastOptions={{
                style: {
                  backgroundColor: "#12121a",
                  border: "1px solid rgba(6, 182, 212, .3)",
                  color: "white",
                  fontFamily: "var(--font-dana-medium)",
                },
              }}
            />
          </ConfigProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
