// src/layouts/AdminLayout

// Librerías externas.
import { Outlet } from "react-router-dom";

// Componentes.
import { NavigationBar } from "@/features/admin/components/AdminNavigationBar";

export const AdminLayout = () => {
    return (
        <div className="grid grid-cols-[250px_1fr] min-h-screen">
            <NavigationBar />
            <main className="bg-neutral-100 p-6 text-neutral-500 text-sm">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;