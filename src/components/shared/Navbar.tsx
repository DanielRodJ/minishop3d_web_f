import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserMenu } from "../shared/UserMenu";

import logo from "./../../assets/minisho3d_logo.svg";

export const Navbar = () => {
  return (
    <nav className="bg-black w-full">
      <div className="max-w-7xl flex justify-between gap-2 mx-auto p-4">
        <div id="menu-logo" className="w-64 flex-1 flex items-center justify-center">
          <img
            src={logo}
            alt="minisho3d_logo"
            className="min-w-32 h-12 object-contain"
          />
        </div>
        <ul id="menu-links" className="flex gap-4 items-center pl-4 pr-8 font-semibold text-white">
          <li><a className="whitespace-nowrap hover:px-2 hover:text-orange-500 transition-all duration-500" href="/">Inicio</a></li>
          <li><a className="whitespace-nowrap hover:px-2 hover:text-orange-500 transition-all duration-500" href="/Acerca de">FAQ</a></li>
          <li><a className="whitespace-nowrap hover:px-2 hover:text-orange-500 transition-all duration-500" href="/FAQ">Contacto</a></li>
          <li><a className="whitespace-nowrap hover:px-2 hover:text-orange-500 transition-all duration-500" href="/Contacto">Acerca de</a></li>
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

export default Navbar;