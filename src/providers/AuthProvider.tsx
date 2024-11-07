import axios from "axios"
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react"

interface AuthContextType {
    token: string | null;
    setToken: (newToken: string) => void;
    signOut: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken_] = useState<string | null>(localStorage.getItem("token"));

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem('token');
        }
    }, [token]);

    function signOut() {
        localStorage.removeItem('token')
    }

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            signOut
        }),
        [token]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;