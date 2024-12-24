import { useNavigate } from "react-router-dom";
import { OrganizationDto } from "../../../types/organization";
import { PaginationDto } from "../../../types/pagination";
import { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import TableComponent from "../../../components/table/Table";
import { deleteOrganization, listOrganizations } from "../../../services/organizations";

export const ListOrganizations = () => {
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [organizationToDelete, setOrganizationToDelete] = useState<OrganizationDto | null>(null);

    const navigate = useNavigate()

    const handleDelete = async (organizationId: string) => {
        await deleteOrganization(organizationId)
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (organization: OrganizationDto) => {
        setOrganizationToDelete(organization);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setOrganizationToDelete(null);
    };

    const getOrganizations = async (page: number, limit: number): Promise<PaginationDto<OrganizationDto>> => {
        return listOrganizations(page, limit)
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de Eventos</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/organizations/create")
                    }}>
                        Crear
                    </Button>
                </Col>
            </Row>
            <TableComponent<OrganizationDto>
                columns={['Nombre', 'Acciones']}
                fetchData={getOrganizations}
                renderRow={(organization) => (
                    <>
                        <td>{organization.name}</td>
                        <td>{new Date(organization.created).toLocaleDateString()}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => navigate(`/organizations/${organization.id}`)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleShowDeleteModal(organization)}
                            >
                                Borrar
                            </Button>
                        </td>
                    </>
                )}
            />
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Borrado</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    ¿Estás seguro de que deseas eliminar el evento "{organizationToDelete?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => organizationToDelete && handleDelete(organizationToDelete.id)}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )

}