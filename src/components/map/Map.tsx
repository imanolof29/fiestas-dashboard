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
            center: [properties.longitude, properties.latitude],
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
            style={{ height: 400 }}
            mapStyle="mapbox://styles/mapbox/streets-v9"
        >
            <Marker longitude={properties.longitude} latitude={properties.latitude} />
        </Map>
    )

}

export default MapComponent