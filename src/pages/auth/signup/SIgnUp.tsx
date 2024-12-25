import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { RootState } from "../../../redux/store";
import { signUp } from "../../../services/auth";
import { registerFailure, registerSuccess } from "../../../redux/authSlice";
import axios from "axios";
import { Alert, Container, Form, Button } from "react-bootstrap";

export const SignUp = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const error = useSelector((state: RootState) => state.auth.error)

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await signUp(firstName, lastName, username, email, password);
            dispatch(registerSuccess({
                accessToken: response.accessToken,
                refreshToken: response.refreshToken,
                email: response.email,
                permissions: response.permissions
            }))
            navigate("/", { replace: true });
        } catch (e) {
            const errorMessage = axios.isAxiosError(e) ? e.response?.data?.message || "Error desconocido" : "Algo salió mal";
            dispatch(registerFailure(errorMessage));
        }
    }

    return (
        <Container className="mt-5" style={{ maxWidth: '400px' }}>
            <h2 className="text-center mb-4">Registrarse</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleLogin}>
                <Form.Group controlId="formFirstName" className="mb-3">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formLastName" className="mb-3">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu apellido"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formUsername" className="mb-3">
                    <Form.Label>Nombre de usuario</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </Form.Group>
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
                    Registrate
                </Button>
            </Form>
            <div className="mt-3 text-center">
                <span>¿Ya tienes una cuenta? </span>
                <Link to="/signin">Iniciar Sesión</Link>
            </div>
        </Container>
    )

}