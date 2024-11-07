import { useState } from "react"
import { useNavigate } from "react-router-dom"
import * as Yup from 'yup';
import { CreateUserDto } from "../../../types/user";
import { Form, Button, Alert } from 'react-bootstrap';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { createUser } from "../../../services/users";

export const CreateUser = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El nombre es obligatorio'),
        lastName: Yup.string().required('El apellido es obligatorio'),
        username: Yup.string().required('El nombre de usuario es obligatorio'),
        email: Yup.string().email('Debe ser un correo válido').required('El correo es obligatorio'),
        password: Yup.string().min(6, 'La contraseña debe tener al menos 6 caracteres').required('La contraseña es obligatoria'),
        role: Yup.string().oneOf(['USER', 'ORGANIZER', 'ADMIN']).required('El rol es obligatorio'),
    })

    const handleSubmit = async (values: CreateUserDto) => {
        setLoading(true)
        try {
            await createUser(values)
            navigate(-1)
        } catch (err) {
            setError('Algo fue mal al crear el usuario.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h2>Crear Evento</h2>
            {error && <Alert variant="danger">{error}</Alert>}

            <Formik
                initialValues={{
                    firstName: '',
                    lastName: '',
                    username: '',
                    email: '',
                    password: '',
                    role: 'USER'
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ isSubmitting }) => (
                    <FormikForm>
                        <Form.Group controlId="formFirstName" className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Field
                                as={Form.Control}
                                type="text"
                                name="firstName"
                                placeholder="Ingresa tu nombre"
                            />
                            <ErrorMessage name="firstName" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formLastName" className="mb-3">
                            <Form.Label>Apellido</Form.Label>
                            <Field
                                as={Form.Control}
                                type="text"
                                name="lastName"
                                placeholder="Ingresa tu apellido"
                            />
                            <ErrorMessage name="lastName" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formUsername" className="mb-3">
                            <Form.Label>Nombre de Usuario</Form.Label>
                            <Field
                                as={Form.Control}
                                type="text"
                                name="username"
                                placeholder="Ingresa tu nombre de usuario"
                            />
                            <ErrorMessage name="username" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Field
                                as={Form.Control}
                                type="email"
                                name="email"
                                placeholder="Ingresa tu correo electrónico"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Field
                                as={Form.Control}
                                type="password"
                                name="password"
                                placeholder="Ingresa tu contraseña"
                            />
                            <ErrorMessage name="password" component="div" className="text-danger" />
                        </Form.Group>

                        <Form.Group controlId="formRole" className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Field as={Form.Select} name="role">
                                <option value="USER">Usuario</option>
                                <option value="ORGANIZER">Organizador</option>
                                <option value="ADMIN">Administrador</option>
                            </Field>
                            <ErrorMessage name="role" component="div" className="text-danger" />
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isSubmitting || loading}>
                            {loading ? 'Creando...' : 'Crear Usuario'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    );

}