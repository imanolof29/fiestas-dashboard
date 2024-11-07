import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserDto } from "../../../types/user"
import { getUserById, updateUser } from "../../../services/users"
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Button } from 'react-bootstrap';
import * as Yup from 'yup';

export const UpdateUser = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [user, setUser] = useState<UserDto | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getUserData = async () => {
            if (!id) return
            try {
                const userData = await getUserById(id)
                setUser(userData)
            } catch (err) {
                setError('Algo fue mal al cargar los datos del usuario')
            } finally {
                setLoading(false)
            }
        }
        getUserData()
    }, [])

    const validationSchema = Yup.object({
        firstName: Yup.string().required('El nombre es obligatorio'),
        lastName: Yup.string().required('El apellido es obligatorio'),
        username: Yup.string().required('El nombre de usuario es obligatorio'),
    })

    const handleHubmit = async (values: UserDto) => {
        try {
            await updateUser(values)
            navigate(-1)
        } catch (err) {
            setError('Algo fue mal al actualizar el usuario')
        }
    }

    return (
        <div>
            <h2>Actualizar Usuario</h2>
            {user && (
                <Formik
                    initialValues={{
                        id: user.id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        username: user.username,
                        created: user.created,
                        role: user.role
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleHubmit}
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

                            <Button variant="primary" type="submit" disabled={isSubmitting || loading}>
                                {loading ? 'Actualizando...' : 'Actualizar Usuario'}
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            )}
        </div>
    )

}