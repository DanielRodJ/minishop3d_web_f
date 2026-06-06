// src/layouts/ShopLayaout.tsx

// Librerías externas.
import { Outlet } from "react-router-dom";

// Componentes.
import { ShopNavigationBar } from "@/features/shop/components/ShopNavigationBar";
import { ShopFooter } from "@/features/shop/components/ShopFooter";

export const ShopLayout = () => {
    return (
        <>
            <ShopNavigationBar />
            <main className="bg-zinc-950 text-neutral-500 text-sm">
                <Outlet />
            </main>
            <ShopFooter />
        </>
    );
};