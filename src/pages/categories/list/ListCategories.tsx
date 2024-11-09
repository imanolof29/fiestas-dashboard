import { useState } from "react";
import { CategoryDto } from "../../../types/category";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteCategory, listCategories } from "../../../services/categories";
import { PaginationDto } from "../../../types/pagination";
import TableComponent from "../../../components/table/Table";

export const ListCategories = () => {

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<CategoryDto | null>(null);

    const navigate = useNavigate()

    const handleDelete = async (eventId: string) => {
        await deleteCategory(eventId)
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (category: CategoryDto) => {
        setCategoryToDelete(category);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setCategoryToDelete(null);
    };

    const getCategories = async (page: number, limit: number): Promise<PaginationDto<CategoryDto>> => {
        return listCategories(page, limit)
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de Categorias</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/categories/create")
                    }}>
                        Crear
                    </Button>
                </Col>
            </Row>
            <TableComponent<CategoryDto>
                columns={['Nombre', 'Fecha de creación']}
                fetchData={getCategories}
                renderRow={(category) => (
                    <>
                        <td>{category.name}</td>
                        <td>{new Date(category.created).toLocaleDateString()}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => navigate(`/${category.id}`)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleShowDeleteModal(category)}
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
                    ¿Estás seguro de que deseas eliminar el evento "{categoryToDelete?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => categoryToDelete && handleDelete(categoryToDelete.id)}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}