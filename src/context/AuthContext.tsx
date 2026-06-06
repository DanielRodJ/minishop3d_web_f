// src/context/AuthContext.tsx

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "@/services/firebase";
import { getMiUsuarioAsync } from "@/features/auth/services/apiUser";

type AuthContextType = {
    user: User | null;
    loading: boolean;
    esAdmin: boolean;
    isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, esAdmin: false, isAuthenticated: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [esAdmin, setEsAdmin] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (u) => {
            if (u) {
                setLoading(true);
                try {
                    const data = await getMiUsuarioAsync();
                    setUser(u);
                    setEsAdmin(data.esAdmin);
                } catch (error) {
                    console.error("Error al obtener datos del usuario:", error);
                    setUser(null);
                    setEsAdmin(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(true);
                setUser(null);
                setEsAdmin(false);
                setLoading(false);
            }
        });

        return unsub;
    }, []);

    const isAuthenticated = !!user && !loading;

    return (
        <AuthContext.Provider value={{ user, loading, esAdmin, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);