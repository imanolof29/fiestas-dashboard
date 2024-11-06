import { useEffect, useState } from "react";
import { deleteEvent, listEvents } from "../../../services/events";
import { Alert, Button, Col, Modal, Row, Table } from "react-bootstrap";
import { EventDto } from "../../../types/event";
import { useNavigate } from "react-router-dom";

export const ListEvents = () => {

    const [events, setEvents] = useState<EventDto[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [eventToDelete, setEventToDelete] = useState<EventDto | null>(null);

    const navigate = useNavigate()

    const handleDelete = async (eventId: string) => {
        await deleteEvent(eventId)
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (event: EventDto) => {
        setEventToDelete(event);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setEventToDelete(null);
    };

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const eventsData = await listEvents();
                setEvents(eventsData);
            } catch (err) {
                setError('Error al cargar los eventos');
            } finally {
                setLoading(false);
            }
        };

        loadEvents();
    }, []);

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
                    <h2>Listado de Eventos</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/create")
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
                        <th>Precio</th>
                        <th>Boletos Vendidos</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event) => (
                        <tr key={event.id}>
                            <td>{event.name}</td>
                            <td>{new Date(event.created).toLocaleDateString()}</td>
                            <td>{event.price ? `$${event.price}` : 'Gratuito'}</td>
                            <td>{event.ticketSold}</td>
                            <td>
                                <Button variant="warning" className="me-2" onClick={() => navigate(`/${event.id}`)}>
                                    Editar
                                </Button>
                                <Button variant="danger" onClick={() => handleShowDeleteModal(event)}>
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
                    ¿Estás seguro de que deseas eliminar el evento "{eventToDelete?.name}"?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={() => eventToDelete && handleDelete(eventToDelete.id)}>
                        Borrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}