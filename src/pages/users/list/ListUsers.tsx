import { useEffect, useState } from "react"
import { UserDto } from "../../../types/user"
import { useNavigate } from "react-router-dom";
import { listUsers } from "../../../services/users";
import { Alert, Button, Col, Row, Table } from "react-bootstrap";

export const ListUsers = () => {

    const [users, setUsers] = useState<UserDto[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate()

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const usersData = await listUsers()
                setUsers(usersData)
            } catch (err) {
                setError('Error al cargar los usuarios')
            } finally {
                setLoading(false)
            }
        }
        loadUsers()
    }, [])

    if (loading) {
        return <p>Cargando eventos...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de Usuarios</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/users/create")
                    }}>
                        Crear
                    </Button>
                </Col>
            </Row>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Nombre de usuario</th>
                        <th>Fecha de creacion</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.firstName} {user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>{new Date(user.created).toLocaleDateString()}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => navigate(`/users/${user.id}`)}>
                                    Editar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </>
    )
}