import { useNavigate } from "react-router-dom";
import { UserDto } from "../../../types/user";
import { useEffect, useState } from "react";
import { listUsers } from "../../../services/users";
import * as Yup from 'yup';
import { createOrganization } from "../../../services/organizations";
import { CreateOrganizationDto } from "../../../types/organization";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button, Alert } from 'react-bootstrap';
import { PlaceDto } from "../../../types/place";
import { listPlaces } from "../../../services/places";

export const CreateOrganization = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [users, setUsers] = useState<UserDto[]>([]);
    const [places, setPlaces] = useState<PlaceDto[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await listUsers(0, 100)
                setUsers(response.data);
            } catch (err) {
                setError('Error al cargar los usuarios');
            }
        };
        const fetchPlaces = async () => {
            try {
                const response = await listPlaces(0, 100)
                setPlaces(response.data);
            } catch (err) {
                setError('Error al cargar los lugares');
            }
        }
        fetchUsers();
        fetchPlaces();
    }, [])

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        userId: Yup.string().required('El usuario es obligatorio'),
    })

    const handleSubmit = async (values: CreateOrganizationDto) => {
        setLoading(true);
        try {
            await createOrganization(values);
            navigate(-1);
        } catch (err) {
            setError('Algo fue mal al crear la organización.');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h2>Crear Organización</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Formik
                initialValues={{
                    name: '',
                    userId: '',
                    placeId: ''
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
                                placeholder="Ingresa el nombre de la organización"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formUserId" className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Field
                                as="select"
                                name="userId"
                                className="form-control"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selectedUserId = e.target.value;
                                    setFieldValue("userId", selectedUserId);
                                }}
                                value={values.userId}
                            >
                                <option value="">Selecciona un usuario</option>
                                {users.map((user) => (
                                    <option key={user.id} value={user.id}>
                                        {user.firstName} {user.lastName}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="userId" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formUserId" className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Field
                                as="select"
                                name="placeId"
                                className="form-control"
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                                    const selectedUserId = e.target.value;
                                    setFieldValue("placeId", selectedUserId);
                                }}
                                value={values.userId}
                            >
                                <option value="">Selecciona una ubicacion</option>
                                {places.map((place) => (
                                    <option key={place.id} value={place.id}>
                                        {place.name}
                                    </option>
                                ))}
                            </Field>
                            <ErrorMessage name="userId" component="div" className="text-danger" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting || loading}>
                            {loading ? 'Creando...' : 'Crear Organización'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );

}