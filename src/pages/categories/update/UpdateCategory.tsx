import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CategoryDto } from "../../../types/category"
import { getCategoryById, updateCategory } from "../../../services/categories"
import * as Yup from 'yup';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Alert, Button, Form, Spinner } from "react-bootstrap";

export const UpdateCategory = () => {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [category, setCategory] = useState<CategoryDto | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getCategoryData = async () => {
            if (!id) return
            try {
                const categoryData = await getCategoryById(id)
                setCategory(categoryData)
            } catch (err) {
                setError('Algo fue mal al cargar los datos de la categoria')
            } finally {
                setLoading(false)
            }
        }
        getCategoryData()
    }, [id])

    const validationSchema = Yup.object({
        name: Yup.string().required('El nombre es obligatorio')
    })

    const handleSubmit = async (values: CategoryDto) => {
        try {
            await updateCategory(values)
            navigate(-1)
        } catch (err) {
            setError('Algo fue mal al actualizar la categoria')
        }
    }

    if (loading) return <Spinner animation="border" />;
    if (error) return <Alert variant="danger">{error}</Alert>;

    return (
        <div>
            <h2>Actualizar Categoria</h2>
            {category && (
                <Formik
                    initialValues={{
                        id: category.id,
                        name: category.name,
                        created: category.created
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
                                {isSubmitting ? 'Actualizando...' : 'Actualizar Evento'}
                            </Button>
                        </FormikForm>
                    )}
                </Formik>
            )}
        </div>
    )

}