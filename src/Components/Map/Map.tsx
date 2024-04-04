import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import FindLocationButton from "./FindLocationButton";
import { LatLngExpression } from "leaflet";
import { useGeolocation } from "../../Hooks/useGeolocation";
import { ZoomControl } from "react-leaflet/ZoomControl";
import DetectClick from "./DetectClick";
import MapPlaceholder from "./MapPlaceholder";
import ChangeCenter from "./ChangeCenter";
import { useGetCompanies } from "../../Api/companyController";
import { PopupCompanyContent, PopupClickedContent } from "./PopupContent";

export const defaultCoords = {
    lat: 39.9333302,
    lng: 32.8600926,
};

export default function Map({
    isAddressModal,
    selectedProvinceCoords,
    setClickedPosition,
    clickedPosition,
    findAddress,
}: {
    isAddressModal?: boolean;
    selectedProvinceCoords?: any;
    setClickedPosition?: any;
    clickedPosition?: any;
    findAddress?: any;
}) {
    const [mapPosition, setMapPosition] = useState(defaultCoords);
    const { position, getPosition, isLoading } = useGeolocation(null);
    const { data: companies } = useGetCompanies();

    //! Geolocation
    useEffect(() => {
        position ? setMapPosition(position) : setMapPosition(defaultCoords);
    }, [position]);

    //! Add Address Modal
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
            center={clickedPosition || (mapPosition as LatLngExpression)}
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
            {clickedPosition && isAddressModal && findAddress && (
                <Marker position={clickedPosition}>
                    <Popup>
                        <PopupClickedContent findAddress={findAddress} />
                    </Popup>
                </Marker>
            )}
            {!clickedPosition &&
                !isAddressModal &&
                companies?.map(
                    (company, i) =>
                        company.companyAddress.companyCoordinates && (
                            <Marker
                                riseOnHover
                                key={i}
                                position={
                                    company?.companyAddress?.companyCoordinates
                                }
                            >
                                <Popup>
                                    <PopupCompanyContent company={company} />
                                </Popup>
                            </Marker>
                        )
                )}
            {!isAddressModal && <FindLocationButton onClick={getPosition} />}
            <DetectClick
                setClickedPosition={setClickedPosition}
                isAddressModal={isAddressModal}
            />
            <ZoomControl position="bottomright" />
            <ChangeCenter position={clickedPosition || mapPosition} />
        </MapContainer>
    );
}
