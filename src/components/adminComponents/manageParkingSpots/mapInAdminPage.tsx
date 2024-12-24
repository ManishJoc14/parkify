"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";

const parkingIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface MapProps {
  latitude: number;
  longitude: number;
  setLocation: (latitude: number, longitude: number) => void;
}

export default function MapInAdminPage({
  latitude,
  longitude,
  setLocation,
}: MapProps) {
  if (!latitude || !longitude) {
    return (
      <div className="relative w-full h-[70vh] bg-gray-300 animate-pulse"></div>
    );
  }
  return (
    <div className="relative w-full h-[70vh]">
      <MapContainer
        center={[latitude, longitude]}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={[latitude, longitude]}
          icon={parkingIcon}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              setLocation(e.target.getLatLng().lat, e.target.getLatLng().lng);
            },
          }}
        >
          <Popup>Your parking spot</Popup>
        </Marker>
        {/* <LocationMarker /> */}
      </MapContainer>
    </div>
  );
}
