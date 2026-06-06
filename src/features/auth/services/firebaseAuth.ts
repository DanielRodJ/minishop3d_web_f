// src/features/auth/services/firebaseAuth.ts

import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "@/services/firebase";

export const loginWithGoogle = async () => {
    try {
        const provider = new GoogleAuthProvider();
        return await signInWithPopup(auth, provider);

    } catch (error: any) {
        if(error.code === "auth/cancelled-popup-request") return;
        if(error.code === "auth/popup-closed-by-user") return;
        throw error;
    }
};

export const logout = async () => {
    await signOut(auth)
}