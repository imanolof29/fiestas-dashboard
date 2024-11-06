import { useEffect, useState } from "react";
import { CategoryDto } from "../../../types/category";
import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { deleteCategory, listCategories } from "../../../services/categories";

export const ListCategories = () => {

    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
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

    useEffect(() => {
        const loadCategories = async () => {
            try {
                const categoriesData = await listCategories()
                setCategories(categoriesData)
            } catch (err) {
                setError('Error al cargar categorias')
            } finally {
                setLoading(false)
            }
        }
        loadCategories()
    }, [])

    if (loading) {
        return <p>Cargando categorias...</p>;
    }

    if (error) {
        return <Alert variant="danger">{error}</Alert>
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
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Fecha de Creación</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{new Date(category.created).toLocaleDateString()}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => navigate(`/categories/${category.id}`)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleShowDeleteModal(category)}>
                                    Borrar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
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