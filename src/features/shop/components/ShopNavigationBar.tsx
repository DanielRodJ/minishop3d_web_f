// src/features/shop/components/ShopNavigationBar.tsx

import { Link } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import logo from "@/assets/minisho3d_logo.svg";
import { UserMenu } from "@/components/shared/UserMenu";

const linkClasses = "whitespace-nowrap hover:px-2 hover:text-orange-500 transition-all duration-500";

const links = [
  { to: "/", label: "Inicio" },
  { to: "/about", label: "Acerca de" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contacto" },
];

export const ShopNavigationBar = () => {
  return (
    <nav className="bg-black w-full">
      <div className="max-w-7xl flex justify-between gap-2 mx-auto p-4">
        <div id="menu-logo" className="w-64 flex-1 flex items-center justify-center">
          <img
            src={logo}
            alt="Minisho3d logo"
            className="min-w-32 h-12 object-contain"
          />
        </div>
        <ul id="menu-links" className="flex gap-4 items-center pl-4 pr-8 font-semibold text-white">
          {
            links.map(link =>(
              <li key={link.to}>
                <Link className={linkClasses} to={link.to}>
                  {link.label}
                </Link>
              </li>
            ))
          }
        </ul>
        <div id="menu-search" className="min-w-28 flex-1">
          <div className="relative h-full flex items-center">
            <div className="absolute flex items-center inset-y-0 left-0 pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-zinc-400" />
            </div>
            <input
              id="search-input"
              name="search"
              type="text"
              placeholder="Buscar"
              className="
              bg-zinc-800 border border-zinc-700 
                w-full rounded-lg pl-10 pr-4 py-2 
                font-body text-sm text-white
                focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>
        <UserMenu />
      </div>
    </nav>
  );
};