"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import LogoutButton from "../LogoutButton/page";

const navItems = [
  { name: "Home", path: "/Admin/Home" },
  { name: "About me", path: "/Admin/About" },
  { name: "Skills", path: "/Admin/Skills" },
  { name: "Project", path: "/Admin/Project" },
  { name: "Career", path: "/Admin/Career" },
];

export default function AdminNavbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-blue-950 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold text-white">Admin</div>

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

        <LogoutButton></LogoutButton>


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