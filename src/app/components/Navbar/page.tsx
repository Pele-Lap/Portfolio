"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About me", path: "/About" },
  { name: "Skills", path: "/Skills" },
  { name: "Project", path: "/Project" },
  { name: "Career", path: "/Career" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-950 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-white">Hello My Site</div>

        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-3 py-1 rounded-md transition-colors duration-300 ${
                pathname === item.path
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Toggle Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="flex flex-col md:hidden mt-2 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={() => setMenuOpen(false)}
              className={`hover:text-black hover:bg-green-400 block px-3 py-2 rounded-md transition-colors duration-300 hover:sca ${
                pathname === item.path
                  ? "bg-white text-black"
                  : "bg-gray-700 text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}