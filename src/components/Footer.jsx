import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import logo from "../assets/logo.png";

const footerColumns = [
  {
    title: "Company",
    links: [
      "About us",
      "Careers",
      "Security",
      "Status",
      "Terms & privacy",
      "Your privacy rights",
    ],
  },
  {
    title: "Download",
    links: [
      "iOS & Android",
      "Mac & Windows",
      "Mail",
      "Calendar",
      "Web Clipper",
    ],
  },
  {
    title: "Resources",
    links: [
      "Help center",
      "Pricing",
      "Blog",
      "Community",
      "Connections",
      "Templates",
      "Partner programs",
    ],
  },
  {
    title: "TaskFlow for",
    links: ["Enterprise", "Small business", "Personal"],
    cta: "Explore more",
  },
];

const socialLinks = [
  { label: "Instagram", icon: FaInstagram },
  { label: "X", icon: FaXTwitter },
  { label: "LinkedIn", icon: FaLinkedin },
  { label: "Facebook", icon: FaFacebook },
  { label: "YouTube", icon: FaYoutube },
];

const Footer = () => {
  return (
    <footer className="bg-white text-main" aria-label="TaskFlow Footer">
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
                    href="#"
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-base font-medium text-black transition hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>

              {column.cta && (
                <a
                  href="#"
                  className="mt-24 inline-flex items-center gap-2 text-base font-semibold text-black transition lg:mt-28"
                >
                  <span className="hover:underline">{column.cta}</span>
                  <span aria-hidden="true">&rarr;</span>
                </a>
              )}
            </nav>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
