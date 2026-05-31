import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type UserRole = 'user' | 'admin' | null;

interface AuthState {
    token: string | null;
    role: UserRole;
    setToken: (token: string | null, role?: UserRole) => void;
    logout: () => void;
    hasRole: (requiredRole: UserRole | UserRole[]) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            role: null,
            setToken: (token, role) => set({ token, role: role || null }),
            logout: () => set({ token: null, role: null }),
            hasRole: (requiredRole) => {
                const currentRole = get().role;
                if (Array.isArray(requiredRole)) {
                    return requiredRole.includes(currentRole);
                }
                return currentRole === requiredRole;
            },
        }),
        {
            name: 'auth-storage'
        }
    )
)