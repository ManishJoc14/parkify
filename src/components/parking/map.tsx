import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { Icon } from "leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import ParkingCard from "./parking-card";
import { ParkingLocation, ParkingDetailed } from "@/types/definitions";

// Define user and parking icons
const userIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

const parkingIcon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Custom hook to add the routing control after the map has loaded
function RoutingControl({
  userPosition,
  parking,
}: {
  userPosition: [number, number];
  parking: ParkingLocation[] | ParkingDetailed[];
}) {
  const map = useMap(); // Get the map instance using the hook

  useEffect(() => {
    if (!userPosition || !parking.length) return;

    const { latitude, longitude } = parking[0]; // First parking location

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(latitude, longitude), // Parking position
        L.latLng(userPosition[0], userPosition[1]), // User's position
      ],
      routeWhileDragging: true,
    }).addTo(map); // Add routing control to the map

    // Cleanup routing control when the component is unmounted or dependencies change
    return () => {
      routingControl.remove();
    };
  }, [userPosition, parking, map]);

  return null;
}

interface MapProps {
  id: string | undefined;
  parking: ParkingLocation[] | ParkingDetailed[];
  userPosition: [number, number] | undefined;
}

export default function Map({ id, parking, userPosition }: MapProps) {
  if (!userPosition) return null;

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={userPosition}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Marker */}
        <Marker position={userPosition} icon={userIcon}>
          <Popup>You are here</Popup>
        </Marker>

        {/* Parking Markers */}
        {parking.map((location, index) => (
          <Marker
            key={index}
            position={[location.latitude, location.longitude]}
            icon={parkingIcon}
          >
            <Popup>
              <ParkingCard id={id} parking={location} />
            </Popup>
          </Marker>
        ))}

        {/* NOTE  - if there is id , it is in detailed page so we can so Routings */}
        {id ? (
          <RoutingControl userPosition={userPosition} parking={parking} />
        ) : null}
      </MapContainer>
    </div>
  );
}
