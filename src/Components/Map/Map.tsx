import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import FindLocationButton from "./FindLocationButton";
import { LatLngExpression } from "leaflet";
import { useGeolocation } from "../../Hooks/useGeolocation";
import { ZoomControl } from "react-leaflet/ZoomControl";

const dummyCompanyCoords = [
    { lat: 30.7782272, lng: 20.0193408 },
    { lat: 15.7782272, lng: 18.0193408 },
    { lat: 27.7782272, lng: 37.0193408 },
];

const defaultCoords = {
    lat: 37.7768774,
    lng: 29.0752062,
};

export default function Map({
    isAddressModal,
    selectedProvinceCoords,
}: {
    isAddressModal?: boolean;
    selectedProvinceCoords?: any;
}) {
    const [mapPosition, setMapPosition] = useState(defaultCoords);
    const { position, getPosition, isLoading } = useGeolocation(null);

    useEffect(() => {
        position ? setMapPosition(position) : setMapPosition(defaultCoords);
    }, [position]);

    useEffect(() => {
        selectedProvinceCoords
            ? setMapPosition({
                  lat: selectedProvinceCoords.latitude,
                  lng: selectedProvinceCoords.longitude,
              })
            : setMapPosition(defaultCoords);
    }, [selectedProvinceCoords]);

    return (
        <MapContainer
            style={{ height: "100%", position: "relative" }}
            center={mapPosition as LatLngExpression}
            zoom={isAddressModal ? 13 : 8}
            minZoom={5}
            placeholder={<MapPlaceholder />}
            scrollWheelZoom={true}
            zoomControl={false}
            fadeAnimation={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                errorTileUrl="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && !isLoading && (
                <Marker position={mapPosition as LatLngExpression}>
                    <Popup>You are here !</Popup>
                </Marker>
            )}

            {dummyCompanyCoords.map((coords, i) => (
                <Marker key={i} position={coords as LatLngExpression}>
                    <Popup>{coords.lat + " - " + coords.lng}</Popup>
                </Marker>
            ))}
            {!isAddressModal && <FindLocationButton onClick={getPosition} />}
            <ZoomControl position="bottomright" />
            <ChangeCenter position={mapPosition} />
        </MapContainer>
    );
}

function MapPlaceholder() {
    return (
        <p>
            Map of Türkiye.{" "}
            <noscript>You need to enable JavaScript to see this map.</noscript>
        </p>
    );
}

function ChangeCenter({ position }: { position: any }) {
    const map = useMap();
    map.setView(position);
    return null;
}
