import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { siteConfig } from "@/config/site";
const display = Poppins({ variable:"--font-display", subsets:["latin"], weight:["400","500","600","700"] });
const body = DM_Sans({ variable:"--font-body", subsets:["latin"], weight:["400","500","600","700"] });

export const metadata: Metadata = { metadataBase:new URL(siteConfig.url), title:{default:"Royal Cleaning Crew | Premium Cleaning Services in Calgary",template:"%s | Royal Cleaning Crew"},description:"Royal Cleaning Crew provides premium residential and commercial cleaning services in Calgary, including regular cleaning, deep cleaning, move-in and move-out cleaning, Airbnb cleaning, post-construction cleaning and specialty services.",openGraph:{type:"website",locale:"en_CA",siteName:siteConfig.name},robots:{index:true,follow:true} };

export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en" className={`${display.variable} ${body.variable}`}><body><Header/><main>{children}</main><Footer/></body></html>; }
