import React from "react";

const Footer = () => {
  return (
    <footer
      className="border-t bg-white text-gray-700"
      aria-label="TaskFlow Footer"
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Top Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {/* Brand */}
          <section aria-label="TaskFlow brand section">
            <h2 className="text-xl font-bold text-black">TaskFlow</h2>
            <p className="mt-2 text-sm text-gray-500">
              Organize tasks, projects, and workflows efficiently.
            </p>

            {/* Social links */}
            <nav className="flex gap-3 mt-4" aria-label="Social media links">
              <a href="#" aria-label="Instagram" className="hover:text-black">
                Instagram
              </a>
              <a href="#" aria-label="X (Twitter)" className="hover:text-black">
                X
              </a>
              <a href="#" aria-label="LinkedIn" className="hover:text-black">
                LinkedIn
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-black">
                YouTube
              </a>
            </nav>
          </section>

          {/* Company */}
          <nav aria-label="Company links">
            <h3 className="font-semibold text-black">Company</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  About us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Security
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Status
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Terms & Privacy
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources links">
            <h3 className="font-semibold text-black">Resources</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Templates
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  API Docs
                </a>
              </li>
            </ul>
          </nav>

          {/* Product */}
          <nav aria-label="Product links">
            <h3 className="font-semibold text-black">Product</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-black">
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Integrations
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Download
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Roadmap
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Bottom */}
        <div
          className="mt-10 border-t pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500"
          role="contentinfo"
        >
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>

          <nav aria-label="Legal links" className="flex gap-6 mt-3 md:mt-0">
            <a href="#" className="hover:text-black">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black">
              Terms
            </a>
            <a href="#" className="hover:text-black">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
