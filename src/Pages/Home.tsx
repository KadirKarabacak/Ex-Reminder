import styled from "styled-components";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import { useState } from "react";

const StyledHome = styled.main`
    width: 100%;
    min-height: 60rem;
    height: calc(100dvh - 6.5rem);
`;

//
function findMyLocation() {
    const [position, setPosition] = useState<any>(null);
    const map = useMapEvents({
        click() {
            map.locate();
        },
        locationfound(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    );
}

export default function Home() {
    return (
        <StyledHome>
            <MapContainer
                style={{ height: "100%" }}
                center={[37.797069, 29.0292515]}
                zoom={11}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                    <Popup></Popup>
                </Marker>
            </MapContainer>
        </StyledHome>
    );
}
