import React from "react";

export const Footer = () => {
  const footerLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-white shadow-inner mt-10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a href="/" className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <span className="text-white text-sm font-bold">M</span>
              </div>
              <span className="ml-2 text-lg font-semibold text-gray-800">
                MindfulU
              </span>
            </a>
            <p className="text-sm text-gray-600 mt-1">
              Supporting mental well-being of Sri Lankan university students
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
