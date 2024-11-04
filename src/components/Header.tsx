import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                {/* Logotipo o nombre de la aplicación */}
                <Navbar.Brand as={Link} to="/">
                    MiAplicación
                </Navbar.Brand>

                {/* Botón de navegación responsive */}
                <Navbar.Toggle aria-controls="navbar-nav" />

                {/* Elementos de navegación */}
                <Navbar.Collapse id="navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">
                            Inicio
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about">
                            Acerca de
                        </Nav.Link>
                        <Nav.Link as={Link} to="/contact">
                            Contacto
                        </Nav.Link>
                    </Nav>

                    <Nav>
                        <Button variant="outline-light">
                            Cerrar sesion
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header