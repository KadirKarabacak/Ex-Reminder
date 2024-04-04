import { useMap } from "react-leaflet";

export default function ChangeCenter({ position }: { position: any }) {
    const map = useMap();
    map.setView(position);
    return null;
}
