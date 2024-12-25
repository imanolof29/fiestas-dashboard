import { useParams } from "react-router-dom";
import { CheckoutForm } from "../../../components/checkout-form/CheckoutForm";
import { useEffect, useState } from "react";
import { getEventById } from "../../../services/events";
import { EventDto } from "../../../types/event";
import { Card, Container, Spinner } from "react-bootstrap";

export const PurchaseEventTicket = () => {

    const { id } = useParams<{ id: string }>();
    const [event, setEvent] = useState<EventDto | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getEventData = async () => {
            if (!id) return;
            try {
                const eventData = await getEventById(id);
                setEvent(eventData);
            } catch (err) {
                setError('Algo fue mal al cargar los datos del evento.');
            } finally {
                setLoading(false);
            }
        };
        getEventData();
    }, [id])

    return (
        <Container className="py-5">
            <Card>
                <Card.Header as="h2" className="text-center">Comprar Ticket</Card.Header>
                <Card.Body>
                    {loading && <div className="text-center"><Spinner animation="border" /></div>}
                    {error && <p className="text-danger">{error}</p>}
                    {event && (
                        <>
                            <Card.Title>Evento: {event.name}</Card.Title>
                            <Card.Text>Precio: {event.price}€</Card.Text>
                            <CheckoutForm eventId={event.id} amount={event.price || 0} />
                        </>
                    )}
                </Card.Body>
            </Card>
        </Container>
    )
}