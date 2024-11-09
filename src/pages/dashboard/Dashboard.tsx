import { useEffect, useState } from "react"
import MapComponent from "../../components/map/Map"
import { listEvents } from "../../services/events"
import { LatLng } from "../../components/map/Map.properties"

const Dashboard = () => {

    const [coordinates, setCoordinates] = useState<LatLng[]>([])

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const response = await listEvents(0, 50)
                const data = response.data.map((event) => ({
                    latitude: event.position.coordinates[0],
                    longitude: event.position.coordinates[1]
                }))
                setCoordinates(data)
            } catch (e) {
                console.log(e)
            }
        }
        loadEvents()
    }, [])

    return (
        <>
            {coordinates && (
                <MapComponent coordinates={coordinates} style={{ height: '80vh' }} />
            )}
        </>
    )
}

export default Dashboard