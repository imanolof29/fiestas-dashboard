import { useNavigate } from "react-router-dom"
import { PaginationDto } from "../../../types/pagination"
import { PlaceDto } from "../../../types/place"
import { listPlaces } from "../../../services/places"
import { Button, Col, Row } from "react-bootstrap"
import TableComponent from "../../../components/table/Table"

const ListPlaces = () => {

    const navigate = useNavigate()

    const getPlaces = async (page: number, limit: number): Promise<PaginationDto<PlaceDto>> => {
        return listPlaces(page, limit)
    }

    return (
        <>
            <Row className="mb-3">
                <Col xs={8}>
                    <h2>Listado de ubicaciones</h2>
                </Col>
                <Col xs={4} className="text-end">
                    <Button onClick={() => {
                        navigate("/places/import")
                    }}>
                        Import datos
                    </Button>
                </Col>
            </Row>
            <TableComponent<PlaceDto>
                columns={['Nombre']}
                fetchData={getPlaces}
                renderRow={(place) => (
                    <>
                        <td>{place.name}</td>
                    </>
                )}
            />
        </>
    )

}

export default ListPlaces