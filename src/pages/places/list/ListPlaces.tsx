import { useNavigate } from "react-router-dom"
import { PaginationDto } from "../../../types/pagination"
import { PlaceDto } from "../../../types/place"
import { listPlaces, deleteAllData } from "../../../services/places"
import { Button, Col, Row } from "react-bootstrap"
import TableComponent from "../../../components/table/Table"

const ListPlaces = () => {

    const navigate = useNavigate()

    const getPlaces = async (page: number, limit: number): Promise<PaginationDto<PlaceDto>> => {
        return listPlaces(page, limit)
    }

    const deleteData = async (): Promise<void> => {
        await deleteAllData()
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de ubicaciones</h2>
                </Col>
                <Col xs={2} className="text-end">
                    <Button
                        variant="primary"
                        onClick={() => navigate("/places/import")}
                    >
                        Importar datos
                    </Button>
                </Col>

                <Col xs={2} className="text-end">
                    <Button
                        variant="danger"
                        onClick={deleteData}
                    >
                        Borrar datos
                    </Button>
                </Col>
            </Row>
            <TableComponent<PlaceDto>
                columns={['Nombre', 'Ciudad', 'Dirección']}
                fetchData={getPlaces}
                renderRow={(place) => (
                    <>
                        <td>{place.name}</td>
                        <td>{place.city}</td>
                        <td>
                            {[
                                place.street,
                                place.housenumber,
                                place.postcode
                            ]
                                .filter(Boolean)
                                .join(', ')
                            }
                        </td>
                        <td>
                            <Button
                                variant="warning"
                                className="me-2"
                                onClick={() => navigate(`/places/${place.id}`)}
                            >
                                Editar
                            </Button>
                        </td>
                    </>
                )}
            />
        </>
    )

}

export default ListPlaces