import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import TableComponent from "../../../components/table/Table";
import { UserDto } from "../../../types/user";
import { PaginationDto } from "../../../types/pagination";
import { listUsers } from "../../../services/users";

export const ListUsers = () => {

    const navigate = useNavigate()

    const getUsers = async (page: number, limit: number): Promise<PaginationDto<UserDto>> => {
        return listUsers(page, limit)
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
            <TableComponent<UserDto>
                columns={['Nombre', 'Usuario', 'Email', 'Fecha de creacion']}
                fetchData={getUsers}
                renderRow={(user) => (
                    <>
                        <td>{user.firstName} {user.lastName}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{new Date(user.created).toLocaleDateString()}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => navigate(`/${user.id}`)}
                            >
                                Editar
                            </Button>
                        </td>
                    </>
                )}
            />
        </>
    )
}