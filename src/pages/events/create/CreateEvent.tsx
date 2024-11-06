import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { CreateEventDto } from "../../../types/event";
import { createEvent } from "../../../services/events";
import { CategoryDto } from "../../../types/category";
import { listCategories } from "../../../services/categories";

export const CreateEvent = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [categories, setCategories] = useState<CategoryDto[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await listCategories()
                setCategories(response);
            } catch (err) {
                setError('Error al cargar las categorías');
            }
        };
        fetchCategories();
    }, []);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        description: Yup.string().required('La descripción es obligatoria'),
        price: Yup.number().min(0, 'El precio no puede ser negativo').nullable(),
        ticketLimit: Yup.number().positive('El límite de tickets debe ser positivo').nullable(),
        categoryIds: Yup.array().min(1, 'Debe seleccionar al menos una categoría').required('Las categorías son obligatorias'),
        latitude: Yup.number(),
        longitude: Yup.number()
    });

    const handleSubmit = async (values: CreateEventDto) => {
        setLoading(true);
        try {
            await createEvent(values);
            navigate(-1);
        } catch (err) {
            setError('Algo fue mal al crear el evento.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Crear Evento</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Formik
                initialValues={{
                    name: '',
                    description: '',
                    price: 0,
                    ticketLimit: 0,
                    latitude: 0,
                    longitude: 0,
                    categoryIds: [],
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting, setFieldValue, values }) => (
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

                        <Form.Group controlId="formCategories" className="mb-3">
                            <Form.Label>Categorías</Form.Label>
                            <Field
                                as="select"
                                name="categoryIds"
                                multiple
                                className="form-control"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFieldValue("categoryIds", selectedOptions);
                                }}
                                value={values.categoryIds}
                            >
                                <option value="">Selecciona categorías</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="categoryIds" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formLatitude" className="mb-3">
                            <Form.Label>Latitud</Form.Label>
                            <Field
                                as={Form.Control}
                                type="number"
                                name="latitude"
                                placeholder="Ingresa la latitud"
                            />
                            <ErrorMessage name="latitud" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formLongitude" className="mb-3">
                            <Form.Label>Latitud</Form.Label>
                            <Field
                                as={Form.Control}
                                type="number"
                                name="longitude"
                                placeholder="Ingresa la longitude"
                            />
                            <ErrorMessage name="longitude" component="div" className="text-danger" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting || loading}>
                            {loading ? 'Creando...' : 'Crear Evento'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );
};