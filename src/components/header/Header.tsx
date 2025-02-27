import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/authSlice";

const Header = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const handleSignOut = () => {
        dispatch(logout())
        navigate('/signIn', { replace: true })
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    Fiestas
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbar-nav" />

                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/events">
                            Eventos
                        </Nav.Link>
                        <Nav.Link as={Link} to="/organizations">
                            Organizaciones
                        </Nav.Link>
                        <Nav.Link as={Link} to="/categories">
                            Categorias
                        </Nav.Link>
                        <Nav.Link as={Link} to="/users">
                            Usuarios
                        </Nav.Link>
                        <Nav.Link as={Link} to="/places">
                            Ubicaciones
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <Button variant="outline-light" onClick={handleSignOut}>
                            Cerrar sesion
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header