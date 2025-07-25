import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-base-200 text-cyan-800 pt-10 pb-4 px-3 mt-16">
    <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-6">
      {/* Logo and short desc */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-2">
          {/* You can replace with your Logo component */}
          <span className="text-3xl font-bold text-cyan-600">TechieTake</span>
        </div>
        <p className="text-sm text-cyan-700 mt-2 md:mt-0">
          The community for discovering and sharing innovative tech products.
        </p>
      </div>
      {/* Navigation */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-8 items-center">
        <a href="/" className="hover:text-cyan-600 transition">
          Home
        </a>
        <a href="/featured" className="hover:text-cyan-600 transition">
          Featured
        </a>
        <a href="/about" className="hover:text-cyan-600 transition">
          About
        </a>
        <a
          href="/dashboard/my-profile"
          className="hover:text-cyan-600 transition"
        >
          Profile
        </a>
      </div>
      {/* Socials */}
      <div className="flex gap-4 items-center mt-2 md:mt-0">
        <a
          href="https://github.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-cyan-600"
        >
          <FaGithub />
        </a>
        <a
          href="https://twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-cyan-600"
        >
          <FaTwitter />
        </a>
        <a
          href="https://linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-cyan-600"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
    {/* Divider and copyright */}
    <div className="divider my-4" />
    <div className="text-center text-cyan-600 text-xs">
      &copy; {new Date().getFullYear()} TechieTake. All rights reserved.
    </div>
  </footer>
);

export default Footer;
