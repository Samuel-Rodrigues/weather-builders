import React, { FC, useRef, useContext } from 'react'
import Leaflet from "leaflet";
import { MapContainer, Marker, TileLayer, useMapEvent } from "react-leaflet"

import { Container } from './styles'
import { LocationContext } from '../contexts/LocationContext'

const mapPinIcon = Leaflet.icon({
    iconUrl: 'https://raw.githubusercontent.com/rocketseat-content/blog-react-maps-leaflet/83ab06c13ba7bd105d3a7d901b2a52002c311cb0/src/pin.svg',
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [170, 2],
});


const GenericMacp: FC = () => {

    const { locationData } = useContext(LocationContext)

    const animateRef = useRef(false)

    function SetViewOnClick({ animateRef }: any) {
        const map = useMapEvent('click', (e) => {
            map.setView(e.latlng, map.getZoom(), {
                animate: animateRef.current || false,
            })
        })

        return null
    }

    return (
        <Container>
            {locationData && locationData.lat && locationData.lgn ? (<>
                <MapContainer
                    center={[locationData.lat, locationData.lgn]}
                    zoom={15}
                    maxZoom={20}
                    zoomControl={false}
                    doubleClickZoom={true}
                    scrollWheelZoom={false}
                    dragging={true}
                    easeLinearity={0.35}
                    style={{ width: "100%", height: 'calc(100vh - 82px)' }}
                >
                    <TileLayer
                        id={'mapbox/streets-v11'}
                        tileSize={512}
                        zoomOffset={-1}
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
                    />
                    <SetViewOnClick animateRef={animateRef} />
                    <Marker
                        icon={mapPinIcon}
                        position={[locationData.lat, locationData.lgn]}
                    ></Marker>
                </MapContainer>
            </>) : (
                <>
                    <MapContainer
                        center={[-13.7007945, -69.7126948]}
                        zoom={4.499}
                        style={{ width: "100%", height: "100%" }}
                        zoomControl={false}
                        doubleClickZoom={false}
                        scrollWheelZoom={false}
                        zoomAnimation={false}
                        touchZoom={false}
                    >
                        <TileLayer
                            tileSize={512}
                            zoomOffset={-1}
                            url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_ACCESS_TOKEN_MAP_BOX}`}
                        />
                    </MapContainer>
                </>)}

        </Container>
    )
}

export default GenericMacp