import { ArrowUpRight, Crown } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/config/site";

const companyLinks = [
  ["About", "/about"],
  ["Service Areas", "/service-areas"],
  ["How It Works", "/process"],
  ["Frequently Asked Questions", "/faq"],
  ["Contact", "/contact"],
] as const;

const serviceLinks = [
  ["Residential Cleaning", "/services/residential-cleaning"],
  ["Deep Cleaning", "/services/deep-cleaning"],
  ["Move-In / Move-Out", "/services/move-in-move-out"],
  ["Short-Term Rental", "/services/airbnb-cleaning"],
  ["Commercial Cleaning", "/services/commercial-cleaning"],
  ["Janitorial Services", "/services/janitorial-services"],
  ["Store Cleaning", "/services/store-cleaning"],
  ["Building Cleaning", "/services/building-cleaning"],
  ["Specialty Cleaning", "/services/specialty-cleaning"],
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-main">
        <div className="footer-brand-column">
          <Link href="/" className="brand-mark brand-mark-light" aria-label="Royal Cleaning Crew home">
            <span className="brand-emblem"><Crown size={18} strokeWidth={1.5} /></span>
            <span className="brand-name"><strong>ROYAL</strong><small>CLEANING CREW</small></span>
          </Link>
          <p className="footer-brand-copy">A considered standard of cleaning for homes, workplaces and properties across Calgary.</p>
          <p className="footer-location">{siteConfig.location}</p>
        </div>
        <div>
          <h2 className="footer-heading">Explore</h2>
          <ul className="footer-links">
            {companyLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
            <li><Link href="/pricing">Estimate</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer-heading">Services</h2>
          <ul className="footer-links">
            {serviceLinks.map(([label, href]) => <li key={href}><Link href={href}>{label}</Link></li>)}
          </ul>
        </div>
        <div className="footer-contact-column">
          <h2 className="footer-heading">Start a conversation</h2>
          <p>Share the space, the timing and the details that matter. We&apos;ll help shape the right scope.</p>
          <Link className="footer-contact-link" href="/contact">Request a quote <ArrowUpRight size={16} /></Link>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <span>© {new Date().getFullYear()} Royal Cleaning Crew</span>
          <span>Calgary, Alberta, Canada</span>
          <div><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
        </div>
      </div>
    </footer>
  );
}