import { ChevronRight, Facebook, Instagram, X, Youtube } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="bg-gray-900 text-gray-300 p-2">
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row justify-between gap-10">
          {/* <!-- Brand Section --> */}
          <div>
            <h3 className="text-white text-lg font-bold">
              <span className="text-2xl">🚗</span>Parkify
            </h3>
            <p className="mt-2 text-sm">
              Find and reserve parking spots with ease. Simplify your parking
              experience today.
            </p>
            <div className="flex mt-4 space-x-4 flex-wrap">
              {/* <!-- Social Icons --> */}
              <Link
                href="/"
                className="bg-slate-600 p-2 rounded-full text-white hover:scale-95 transition-all"
              >
                <Facebook />
              </Link>
              <Link
                href="/"
                className="bg-slate-600 p-2 rounded-full text-white hover:scale-95 transition-all"
              >
                <X />
              </Link>
              <Link
                href="/"
                className="bg-slate-600 p-2 rounded-full text-white hover:scale-95 transition-all"
              >
                <Instagram />
              </Link>
              <Link
                href="/"
                className="bg-slate-600 p-2 rounded-full text-white hover:scale-95 transition-all"
              >
                <Youtube />
              </Link>
            </div>
          </div>

          {/*  <!-- Company and Contact Section -->   */}
          <div className="flex flex-col sm:flex-row gap-8 justify-between">
            {/* <!-- Company Section --> */}
            <div>
              <h4 className="text-white text-lg font-semibold">Company</h4>
              <ul className="mt-2 space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* <!-- Contact Section --> */}
            <div>
              <h4 className="text-white text-lg font-semibold">Contact</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li className="text-nowrap">📞 98123000</li>
                <li className="text-nowrap">
                  🌐{" "}
                  <Link href="#" className="hover:underline">
                    www.parkify.com
                  </Link>
                </li>
                <li className="text-nowrap">
                  ✉️{" "}
                  <Link
                    href="mailto:info@bookmyspot.com"
                    className="hover:underline"
                  >
                    info@parkify.com
                  </Link>
                </li>
                <li className="text-nowrap">📌 Banehswor, Kathmandu</li>
              </ul>
            </div>
          </div>

          {/* <!-- Newsletter Section --> */}
          <div>
            <h4 className="text-white text-lg font-semibold">
              Get the latest updates
            </h4>
            <p className="mt-2 text-sm">
              Sign up for our newsletter to stay informed about the latest
              offers and updates.
            </p>
            <form className="mt-4 flex">
              <input
                type="email"
                placeholder="Email address"
                className="px-4 py-2 w-full text-gray-800 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700"
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
    </>
  );
}
