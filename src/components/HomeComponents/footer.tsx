import { ChevronRight, Facebook, Instagram, X, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const socialLinks = [
    { href: "/", icon: Facebook },
    { href: "/", icon: X },
    { href: "/", icon: Instagram },
    { href: "/", icon: Youtube },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "/", label: "Features" },
    { href: "/", label: "Services" },
    { href: "/", label: "About Us" },
    { href: "/", label: "Contact Us" },
  ];

  const contactDetails = [
    { content: "📞 98123000" },
    {
      content: "🌐",
      link: { href: "#", label: "www.parkify.com" },
    },
    {
      content: "✉️",
      link: { href: "mailto:info@bookmyspot.com", label: "info@parkify.com" },
    },
    { content: "📌 Banehswor, Kathmandu" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 p-2">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl text-white font-mont-bold">
            <span className="text-3xl">🚗</span>Parkify
          </h3>
          <p className="mt-2 text-sm">
            Find and reserve parking spots with ease. Simplify your parking
            experience today.
          </p>
          <div className="flex mt-4 space-x-4 flex-wrap">
            {socialLinks.map((social, index) => (
              <Link
                key={index}
                href={social.href}
                className="bg-slate-600 p-2 rounded-full text-white hover:scale-95 transition-all"
              >
                <social.icon />
              </Link>
            ))}
          </div>
        </div>

        {/* Company and Contact Section */}
        <div className="flex flex-col sm:flex-row gap-10 justify-between">
          {/* Company Section */}
          <div>
            <h4 className="text-white text-lg font-semibold">Company</h4>
            <ul className="mt-2 space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white text-lg font-semibold">Contact</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {contactDetails.map((detail, index) => (
                <li key={index} className="text-nowrap">
                  {detail.content}{" "}
                  {detail.link && (
                    <Link href={detail.link.href} className="hover:underline">
                      {detail.link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div>
          <h4 className="text-white text-lg font-semibold">
            Get the latest updates
          </h4>
          <p className="mt-2 text-sm">
            Sign up for our newsletter to stay informed about the latest offers
            and updates.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              placeholder="Email address"
              className="px-4 py-2 w-full text-gray-800 rounded-l-md focus:outline-none"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-white rounded-r-md hover:bg-primary/70"
            >
              <ChevronRight />
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 py-4 text-center">
        <p className="text-sm">
          © 2024 Book My Spot. All Rights Reserved. |{" "}
          <Link href="/" className="hover:underline">
            Terms & Conditions
          </Link>{" "}
          |{" "}
          <Link href="/" className="hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </footer>
  );
}
