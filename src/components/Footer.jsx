import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About us", path: "/about" },
      { label: "Careers", path: "/careers" },
      { label: "Security", path: "/security" },

      { label: "Terms & Conditions", path: "/terms-and-conditions" },
      { label: "Privacy Policy", path: "/privacy-policy" },
    ],
  },
  {
    title: "Download",
    links: [
      { label: "iOS & Android", path: "/download/mobile" },
      { label: "Mac & Windows", path: "/download/desktop" },
      { label: "Mail", path: "/products/mail" },
      { label: "Calendar", path: "/products/calendar" },
      { label: "Web Clipper", path: "/products/web-clipper" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Help center", path: "/help" },
      { label: "Pricing", path: "/pricing" },
      { label: "Blog", path: "/blog" },
      { label: "Community", path: "/community" },
      { label: "Connections", path: "/connections" },
      { label: "Templates", path: "/templates" },
      { label: "Partner programs", path: "/partners" },
    ],
  },
  {
    title: "TaskFlow for",
    links: [
      { label: "Enterprise", path: "/solutions/enterprise" },
      { label: "Small business", path: "/solutions/small-business" },
      { label: "Personal", path: "/solutions/personal" },
    ],
    cta: "Explore more",
    ctaPath: "/solutions",
  },
];

const socialLinks = [
  { label: "Instagram", icon: FaInstagram, url: "https://instagram.com" },
  { label: "X", icon: FaXTwitter, url: "https://x.com" },
  { label: "LinkedIn", icon: FaLinkedin, url: "https://linkedin.com" },
  { label: "Facebook", icon: FaFacebook, url: "https://facebook.com" },
  { label: "YouTube", icon: FaYoutube, url: "https://youtube.com" },
];
const Footer = () => {
  return (
    <footer
      className="bg-white border-t border-gray-200 text-main"
      aria-label="TaskFlow Footer"
    >
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[280px_1fr] lg:px-8">
        <section
          className="flex flex-col items-start justify-between"
          aria-label="TaskFlow brand"
        >
          <div>
            <div className="h-auto w-50">
              <img src={logo} alt="TaskFlow" />
            </div>

            <nav
              className="mt-9 flex items-center gap-5"
              aria-label="Social media links"
            >
              {socialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="text-xl text-gray-400 transition hover:text-black"
                  >
                    <Icon />
                  </a>
                );
              })}
            </nav>
          </div>

          <p className="mt-7 text-sm text-gray-500">
            &copy; {new Date().getFullYear()} TaskFlow Labs, Inc.
          </p>
        </section>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} links`}>
              <h2 className="text-sm font-medium text-gray-500">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-base font-medium text-black transition hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              {column.cta && (
                <Link
                  to={column.ctaPath}
                  className="mt-24 inline-flex items-center gap-2 text-base font-semibold text-black transition lg:mt-28"
                >
                  <span className="hover:underline">{column.cta}</span>
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              )}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
