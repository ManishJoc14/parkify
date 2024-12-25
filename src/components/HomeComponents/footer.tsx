"use client";

import axiosInstance from "@/lib/axiosInstance";
import { ChevronRight, Facebook, Instagram, X, Youtube } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Footer() {
  const [email, setEmail] = useState("");
  const socialLinks = [
    { href: "/", icon: Facebook },
    { href: "/", icon: X },
    { href: "/", icon: Instagram },
    { href: "/", icon: Youtube },
  ];

  const companyLinks = [
    { href: "/", label: "Home" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#testimonials", label: "Testimonial" },
    { href: "#benefits", label: "Benefits" },
    { href: "#faq", label: "FAQ" },
    { href: "#feedback", label: "Feedback" },
  ];

  const contactDetails = [
    { content: "📞 +44 207946" },
    { content: "📌 London, UK" },
    {
      content: "🌐",
      link: { href: "#", label: "www.parkify.co.uk" },
    },
    {
      content: "✉️",
      link: { href: "mailto:info@parkify.co.uk", label: "info@parkify.co.uk" },
    },
  ];

  const handleNewsletterSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(
        "/public/website-app/newsletter/subscribe",
        {
          email,
        }
      );
      toast.success(res.data.message);
      setEmail("");
    } catch {
      toast.error("Failed to subscribe to the newsletter. Please try again.");
    }

    setEmail("");
  };

  return (
    <footer className="bg-gray-900 text-gray-300 p-2">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-16">
        {/* Brand Section */}
        <div>
          <h3 className="text-2xl text-white font-mont-semibold">
            <span className="text-3xl">{/* FIXME - LOGO */}</span>Parkify
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
        <div className="flex flex-col sm:flex-row gap-16 justify-between">
          {/* Company Section */}
          <div className="min-w-fit">
            <h4 className="text-white text-lg font-mont-semibold">Company</h4>
            <ul className="mt-2 space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-white text-lg font-mont-semibold">Contact</h4>
            <ul className="mt-2 space-y-2 text-sm">
              {contactDetails.map((detail, index) => (
                <li key={index} className="text-nowrap">
                  {detail.content}{" "}
                  {detail.link && (
                    <Link
                      href={detail.link.href}
                      className="hover:text-primary"
                    >
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
          <h4 className="text-white text-lg font-mont-semibold">
            Get the latest updates
          </h4>
          <p className="mt-2 text-sm">
            Sign up for our newsletter to stay informed about the latest offers
            and updates.
          </p>
          <form className="mt-4 flex" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
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
          © 2024 Parkify. All Rights Reserved. |{" "}
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
