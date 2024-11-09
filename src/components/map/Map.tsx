import { useEffect, useRef } from 'react';
import '../../App.css'
import { MapProperties } from './Map.properties';
import Map, { MapRef, Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const token = process.env.MAPBOX_ACCESS_TOKEN || ''

const MapComponent = (properties: MapProperties) => {

    const mapRef = useRef<MapRef>()


    useEffect(() => {
        if (!mapRef) return
        mapRef.current?.flyTo({
            center: [properties.coordinates[0].latitude, properties.coordinates[0].longitude],
            essential: true,
            animate: false
        })
    }, [properties])

    return (
        <Map
            mapboxAccessToken={token}
            initialViewState={{
                longitude: -3.439,
                latitude: 40.4165,
                zoom: 5
            }}
            style={properties.style ?? { height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            {properties.coordinates && (
                properties.coordinates.map((coordinates) => <Marker longitude={coordinates.longitude} latitude={coordinates.latitude} />)
            )}
        </Map>
    )

}

export default MapComponent