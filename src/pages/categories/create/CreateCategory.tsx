import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { CreateCategoryDto } from "../../../types/category"
import { createCategory } from "../../../services/categories"
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export const CreateCategory = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio')
    })

    const handleSubmit = async (values: CreateCategoryDto) => {
        setLoading(true)
        try {
            await createCategory(values)
            navigate(-1)
        } catch (err) {
            setError('Algo fue mal al crear la categoria')
        } finally {
            setLoading(false)
        }
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Crear Categoria</h2>
            <Formik
                initialValues={{
                    name: ''
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
                        <Button variant="primary" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Creando...' : 'Crear Evento'}
                        </Button>
                    </FormikForm>
                )}
            </Formik>
        </div>
    )

}