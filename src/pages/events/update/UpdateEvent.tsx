import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { EventDto } from '../../../types/event';
import * as Yup from 'yup';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { getEventById, updateEvent } from '../../../services/events';
import MapComponent from '../../../components/map/Map';


export const UpdateEvent = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
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
    }, [id]);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        description: Yup.string().required('La descripción es obligatoria'),
        price: Yup.number().min(0, 'El precio no puede ser negativo').nullable(),
        ticketLimit: Yup.number().positive('El límite de tickets debe ser positivo').nullable(),
    });

    const handleSubmit = async (values: EventDto) => {
        try {
            await updateEvent(values);
            navigate(-1);
        } catch (err) {
            setError('Algo fue mal al actualizar el evento.');
        }
    };

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Actualizar Evento</h2>
            {event && (
                <>
                    <MapComponent coordinates={[{ latitude: event.position.coordinates[0], longitude: event.position.coordinates[1] }]} />
                    <Formik
                        initialValues={{
                            id: event.id,
                            created: new Date(event.created),
                            name: event.name,
                            description: event.description,
                            price: event.price ?? 0,
                            ticketLimit: event.ticketLimit ?? 0,
                            ticketsSold: event.ticketsSold ?? 0,
                            categoryIds: event.categoryIds,
                            position: event.position
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting }) => (
                            <FormikForm>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="name"
                                        placeholder="Ingresa el nombre del evento"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formDescription" className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        name="description"
                                        placeholder="Ingresa la descripción del evento"
                                    />
                                    <ErrorMessage name="description" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formPrice" className="mb-3">
                                    <Form.Label>Precio</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="number"
                                        name="price"
                                        placeholder="Ingresa el precio del evento"
                                    />
                                    <ErrorMessage name="price" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formTicketLimit" className="mb-3">
                                    <Form.Label>Límite de Tickets</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="number"
                                        name="ticketLimit"
                                        placeholder="Ingresa el límite de tickets"
                                    />
                                    <ErrorMessage name="ticketLimit" component="div" className="text-danger" />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Evento'}
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </>
            )}
        </div>
    );
};