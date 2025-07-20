import { useState } from "react";

let currentUser = null;

export function useUser() {
    const [user, setUser] = useState(currentUser);

    const login = (userData) => {
        currentUser = userData;
        setUser(userData);
    };

    const logout = () => {
        currentUser = null;
        setUser(null);
    };

    return { user, login, logout };
}