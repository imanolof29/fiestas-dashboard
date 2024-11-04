import { useState } from "react"
import { signIn } from "../../../services/auth";
import { useAuth } from "../../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { Alert, Container, Form, Button } from "react-bootstrap";

export const SignIn = () => {

    const { setToken } = useAuth()

    const navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const { accessToken } = await signIn(email, password);
            setToken(accessToken);
            navigate("/", { replace: true });
        } catch (err) {
            console.log(err)
            setError("Algo fue mal")
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