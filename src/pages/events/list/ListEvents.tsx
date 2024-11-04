import { useEffect, useState } from "react";
import { deleteEvent, listEvents } from "../../../services/events";
import { Alert, Button, Modal, Table } from "react-bootstrap";
import { Event } from "../../../types/event";

export const ListEvents = () => {

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [eventToDelete, setEventToDelete] = useState<Event | null>(null);

    const handleDelete = async (eventId: string) => {
        await deleteEvent(eventId)
        setShowDeleteModal(false);
    };

    const handleShowDeleteModal = (event: Event) => {
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
            <h2>Listado de Eventos</h2>
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
                                <Button variant="warning" className="me-2">
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