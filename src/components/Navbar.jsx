import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const navLinks = [
  { title: "Features", href: "#features" },
  { title: "About", href: "#about" },
  { title: "Blog", href: "#blog" },
  { title: "Solutions", href: "#solutions" },
  { title: "Resources", href: "#resources" },
  { title: "Enterprise", href: "#enterprise" },
  { title: "Pricing", href: "#pricing" },
  { title: "Request a demo", href: "/contact-sales" },
];
const Navbar = () => {
  return (
    <header className="border-b border-border-subtle bg-white">
      <nav
        className="mx-auto grid  items-center gap-4 px-6 py-5 md:grid-cols-[1fr_auto_1fr] lg:px-8"
        aria-label="Main navigation"
      >
        <Link to="/" className="flex w-fit items-center">
          <img src={logo} className="h-10 w-auto" alt="TaskFlow" />
        </Link>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm font-semibold text-secondary-text">
          {navLinks.map((link) => (
            <a
              key={link.title}
              href={link.href}
              className="transition hover:text-primary"
            >
              {link.title}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-5 md:justify-end">
          <Link
            to="/register"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-text transition hover:bg-primary-hover"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="text-sm font-semibold text-secondary-text  hover:bg-accent-subtle px-4 py-2 rounded-md  transition-colors duration-300 ease-in-out"
          >
            Log in
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
