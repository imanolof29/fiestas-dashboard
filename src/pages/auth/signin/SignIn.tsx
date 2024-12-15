import { useState } from "react"
import { signIn } from "../../../services/auth";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { loginFailure, loginSuccess } from "../../../redux/authSlice";
import { RootState } from "../../../redux/store";
import axios from "axios";

export const SignIn = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const error = useSelector((state: RootState) => state.auth.error)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await signIn(email, password);
            dispatch(loginSuccess({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                email: response.email,
                permissions: response.permissions
            }))
            navigate("/", { replace: true });
        } catch (e) {
            const errorMessage = axios.isAxiosError(e) ? e.response?.data?.message || "Error desconocido" : "Algo salió mal";
            dispatch(loginFailure(errorMessage));
        }
    };

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formEmail" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingresa tu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formPassword" className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                    Iniciar Sesión
                </Button>
            </Form>
        </Container>
    )
}
