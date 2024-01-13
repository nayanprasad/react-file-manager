import {create} from "zustand";

type UserType = {
    name: string;
    email: string;
    id: string;
}

interface ProfileStore {
    user: UserType | null;
    isAuthenticated: boolean;
    getUser: () => void;
    onLogin: (user: UserType) => void;
    onLogout: () => void;
}

export const useProfile = create<ProfileStore>((set) => ({
    user: null,
    isAuthenticated: localStorage.getItem('token') !== null,
    getUser: () => {
        const token = localStorage.getItem('token');
        fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/profile/me`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }).then((res) => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Unauthorized");
                }
            }
        ).then((data) => {
            set({user: data.user, isAuthenticated: true});
        }).catch((err) => {
            console.error(err);
            set({user: null, isAuthenticated: false});
        })
    },
    onLogin: (user) => set({user, isAuthenticated: true}),
    onLogout: () => set({user: null, isAuthenticated: false})
}));
