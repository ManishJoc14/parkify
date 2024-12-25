import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "@/context/authContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MontserratPrimary = localFont({
  src: "./fonts/Montserrat-Regular.ttf",
  variable: "--font-primary-regular",
  weight: "100 900",
});
const MontserratBold = localFont({
  src: "./fonts/Montserrat-Bold.ttf",
  variable: "--font-primary-bold",
  weight: "100 900",
});
const MontserratSemiBold = localFont({
  src: "./fonts/Montserrat-SemiBold.ttf",
  variable: "--font-primary-semibold",
  weight: "100 900",
});
const MontserratMedium = localFont({
  src: "./fonts/Montserrat-Medium.ttf",
  variable: "--font-primary-medium",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Parkify",
    default: "Parkify",
  },
  description: "The official Parkify website. Best Parking finder available.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${MontserratPrimary.variable} ${MontserratBold.variable}  ${MontserratSemiBold.variable} ${MontserratMedium.variable} antialiased`}
      >
        <ToastContainer />
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string}
        >
          <AuthProvider>{children}</AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
