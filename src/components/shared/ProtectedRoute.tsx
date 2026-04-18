// src/components/shared/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

type Props = {
    adminRole?: boolean;
};

export const ProtectedRoute = ({ adminRole }: Props) => {
    const { user, loading, esAdmin} = useAuth();

    if (loading) return <div>Cargando...</div>;
    if (!user) return <Navigate to="/login" replace />;

    if (adminRole && !esAdmin) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

