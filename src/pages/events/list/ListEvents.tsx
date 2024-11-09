import { useState } from "react";
import { deleteEvent, listEvents } from "../../../services/events";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { EventDto } from "../../../types/event";
import { useNavigate } from "react-router-dom";
import TableComponent from "../../../components/table/Table";
import { PaginationDto } from "../../../types/pagination";

export const ListEvents = () => {

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

    const getEvents = async (page: number, limit: number): Promise<PaginationDto<EventDto>> => {
        return listEvents(page, limit)
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de Eventos</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/events/create")
                    }}>
                        Crear
                    </Button>
                </Col>
            </Row>
            <TableComponent<EventDto>
                columns={['Nombre', 'Fecha de creación', 'Precio', 'Ventas', 'Acciones']}
                fetchData={getEvents}
                renderRow={(event) => (
                    <>
                        <td>{event.name}</td>
                        <td>{new Date(event.created).toLocaleDateString()}</td>
                        <td>{event.price ? `${event.price}€` : 'Gratuito'}</td>
                        <td>{event.ticketLimit ?? 0}</td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => navigate(`/events/${event.id}`)}
                            >
                                Editar
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleShowDeleteModal(event)}
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