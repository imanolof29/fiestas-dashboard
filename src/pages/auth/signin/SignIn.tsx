import { useState } from "react"
import { signIn } from "../../../services/auth";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {

    const { setToken } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { accessToken } = await signIn(email, password);
            setToken(accessToken);
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    )
}