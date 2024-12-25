import { useNavigate, useParams } from "react-router-dom";
import { OrganizationDto } from "../../../types/organization";
import { useEffect, useState } from "react";
import { getOrganizationById, updateOrganization } from "../../../services/organizations";
import * as Yup from 'yup';
import { Form, Button, Spinner, Alert } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { listUsers } from "../../../services/users";
import { UserDto } from "../../../types/user";
import { PlaceDto } from "../../../types/place";
import { listPlaces } from "../../../services/places";

export const UpdateOrganization = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate()
    const [organization, setOrganization] = useState<OrganizationDto | null>(null);
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

    useEffect(() => {
        const getOrganizationData = async () => {
            if (!id) return;
            try {
                const organizationData = await getOrganizationById(id);
                setOrganization(organizationData);
            } catch (err) {
                setError('Algo fue mal al cargar los datos de la organizacion.');
            } finally {
                setLoading(false);
            }
        };
        getOrganizationData();
    }, [id]);

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio'),
        userId: Yup.string().required('El usuario es obligatorio'),
        placeId: Yup.string().required('El lugar es obligatorio'),
    })

    const handleSunmit = async (values: OrganizationDto) => {
        try {
            await updateOrganization(values);
            navigate(-1);
        } catch (err) {
            setError('Algo fue mal al actualizar la organización.');
        }
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Actualizar Organización</h2>
            {organization && (
                <Formik
                    initialValues={{
                        id: organization.id,
                        logo: organization.logo,
                        name: organization.name,
                        userId: organization.userId,
                        placeId: organization.placeId,
                        created: new Date(organization.created)
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSunmit}
                >
                    <FormikForm>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Field className="form-control" name="name" />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Usuario</Form.Label>
                            <Field as="select" className="form-control" name="userId">
                                <option value="">Selecciona un usuario</option>
                                {users.map(user => (
                                    <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="userId" component="div" className="text-danger" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Lugar</Form.Label>
                            <Field as="select" className="form-control" name="placeId">
                                <option value="">Selecciona un lugar</option>
                                {places.map(place => (
                                    <option key={place.id} value={place.id}>{place.name}</option>
                                ))}
                            </Field>
                            <ErrorMessage name="placeId" component="div" className="text-danger" />
                        </Form.Group>
                        <Button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading && <Spinner animation="border" size="sm" className="me-1" />}
                            Actualizar
                        </Button>
                    </FormikForm>
                </Formik>
            )}
        </div>
    )

}