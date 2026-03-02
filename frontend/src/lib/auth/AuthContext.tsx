"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, signOut, fetchAuthSession, signIn, signUp, confirmSignUp } from 'aws-amplify/auth';
import { configureAmplify } from './amplify-config';

configureAmplify();

interface AuthContextType {
    user: any;
    loading: boolean;
    signIn: (params: any) => Promise<any>;
    signUp: (params: any) => Promise<any>;
    confirmSignUp: (params: any) => Promise<any>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkUser();
    }, []);

    async function checkUser() {
        try {
            const currentUser = await getCurrentUser();
            const session = await fetchAuthSession();
            setUser({ ...currentUser, ...session });
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    async function handleSignIn(params: any) {
        const res = await signIn(params);
        await checkUser();
        return res;
    }

    async function handleSignUp(params: any) {
        return await signUp(params);
    }

    async function handleConfirmSignUp(params: any) {
        const res = await confirmSignUp(params);
        await checkUser();
        return res;
    }

    async function logout() {
        try {
            await signOut();
            setUser(null);
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            logout,
            signIn: handleSignIn,
            signUp: handleSignUp,
            confirmSignUp: handleConfirmSignUp
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
