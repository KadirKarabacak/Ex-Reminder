import { useMapEvents } from "react-leaflet";

export default function DetectClick({
    setClickedPosition,
    isAddressModal,
}: {
    setClickedPosition: any;
    isAddressModal: boolean | undefined;
}) {
    const map = useMapEvents({
        click: event => {
            isAddressModal ? setClickedPosition(event.latlng) : null;
        },
    });
    return null;
}
