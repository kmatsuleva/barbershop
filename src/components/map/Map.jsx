import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

export default function Map() {
  const location = [47.717562, -122.303803];

  return (
    <>
      <MapContainer
        className={styles["map-container"]}
        center={location}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={location} />
      </MapContainer>
    </>
  );
}
