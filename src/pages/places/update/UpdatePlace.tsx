import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { PlaceDto } from "../../../types/place"
import { getPlaceById } from "../../../services/places"
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import { Form, Spinner, Alert, Button, Row, Col } from 'react-bootstrap';
import * as Yup from 'yup';
import MapComponent from "../../../components/map/Map";

const UpdatePlace = () => {

    const { id } = useParams<{ id: string }>()

    const navigate = useNavigate()

    const [place, setPlace] = useState<PlaceDto | null>(null)

    const [loading, setLoading] = useState<boolean>(true)

    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const getPlaceData = async () => {
            if (!id) return
            try {
                const placeData = await getPlaceById(id)
                setPlace(placeData)
            } catch (err) {
                setError('Algo fue mal al cargar los datos de la ubicacion.')
            } finally {
                setLoading(false)
            }
        }
        getPlaceData()
    }, [id])

    const validationSchema = Yup.object({
        name: Yup.string().required(''),
        description: Yup.string().required(''),
        city: Yup.string(),
        street: Yup.string(),
        postcode: Yup.string(),
        housenumber: Yup.string(),
        website: Yup.string(),
        email: Yup.string(),
        facebook: Yup.string(),
        instagram: Yup.string(),
        phone: Yup.string(),
    })

    if (loading) return <Spinner animation="border" />

    if (error) return <Alert variant="danger">{error}</Alert>

    return (
        <div className="my-4">
            <h2>Actualizar ubicacion</h2>
            {place && (
                <>
                    <MapComponent coordinates={[{ latitude: place.position.coordinates[0], longitude: place.position.coordinates[1] }]} />
                    <Formik
                        initialValues={{
                            id: place.id,
                            name: place.name,
                            description: place.description,
                            position: place.position,
                            city: place.city,
                            street: place.street,
                            postcode: place.postcode,
                            housenumber: place.housenumber,
                            website: place.website,
                            email: place.email,
                            facebook: place.facebook,
                            instagram: place.instagram,
                            phone: place.phone,
                            osmId: place.id
                        }}
                        validationSchema={validationSchema}
                        onSubmit={() => { }}
                    >
                        {({ isSubmitting }) => (
                            <FormikForm>
                                <Form.Group controlId="formName" className="mb-3">
                                    <Form.Label>Nombre</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="name"
                                        placeholder="Ingresa el nombre de la ubicacion"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Form.Group controlId="formCity" className="mb-3">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Field
                                        as={Form.Control}
                                        type="text"
                                        name="city"
                                        placeholder="Ingresa la ciudad de la ubicacion"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formName" className="mb-3">
                                            <Form.Label>Telefono</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="phone"
                                                placeholder="Ingresa el telefono de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formStreet" className="mb-3">
                                            <Form.Label>Calle</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="street"
                                                placeholder="Ingresa la calle de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formPostcode" className="mb-3">
                                            <Form.Label>Codigo postal</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="postcode"
                                                placeholder="Ingresa el codigo postal de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formHousenumber" className="mb-3">
                                            <Form.Label>Numero</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="housenumber"
                                                placeholder="Ingresa el numero de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formWeb" className="mb-3">
                                            <Form.Label>Pagina web</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="website"
                                                placeholder="Ingresa la pagina web de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formName" className="mb-3">
                                            <Form.Label>Email</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="email"
                                                placeholder="Ingresa el email de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={6}>
                                        <Form.Group controlId="formName" className="mb-3">
                                            <Form.Label>Facebook url</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="facebook"
                                                placeholder="Ingresa el link de facebook de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group controlId="formName" className="mb-3">
                                            <Form.Label>Instragram url</Form.Label>
                                            <Field
                                                as={Form.Control}
                                                type="text"
                                                name="instagram"
                                                placeholder="Ingresa el link de instagram de la ubicacion"
                                            />
                                            <ErrorMessage name="name" component="div" className="text-danger" />
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Form.Group controlId="formDescription" className="mb-3">
                                    <Form.Label>Descripcion</Form.Label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        placeholder="Ingresa la descripción de la ubicación"
                                        className="form-control"
                                        rows={6}
                                    />
                                    <ErrorMessage name="name" component="div" className="text-danger" />
                                </Form.Group>

                                <Button variant="primary" type="submit" disabled={isSubmitting} onClick={() => navigate(-1)}>
                                    {isSubmitting ? 'Actualizando...' : 'Actualizar Ubicacion'}
                                </Button>
                            </FormikForm>
                        )}
                    </Formik>
                </>
            )}
        </div>
    )
}

export default UpdatePlace