"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLng } from "leaflet";
import { useEffect, useState } from "react";
import ParkingCard from "./parking-card";
import { ParkingLocation } from "@/types/definitions";

// Default marker icon for locations
const icon = new Icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

// Special icon for user location
const userIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1077/1077012.png", // Custom user location icon
  iconRetinaUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

interface MapProps {
  locations: ParkingLocation[];
}

function LocationMarker() {
  const [position, setPosition] = useState<LatLng | null>(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom() + 2);
    },
  });

  return position === null ? null : (
    <Marker position={position} icon={userIcon}>
      <Popup>You are here</Popup>
    </Marker>
  );
}

export default function Map({ locations }: MapProps) {
  const [center, setCenter] = useState<[number, number]>([
    27.681826, 85.335422,
  ]);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );

  // Fetch initial geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([latitude, longitude]);
          setUserPosition([latitude, longitude]);
          console.log(userPosition);
        },
        (error) => {
          console.error("Error getting user location:", error);
        }
      );
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={center}
        zoom={15}
        style={{ height: "100%", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* NOTE - Parking Locations */}
        {locations.map((location) => (
          <Marker
            key={location.uuid}
            position={[location.latitude, location.longitude]}
            icon={icon}
          >
            <Popup>
              {/* Popup content */}
              <ParkingCard parking={location} />
            </Popup>
          </Marker>
        ))}

        {/* Locate Button */}
        <LocationMarker />
      </MapContainer>
    </div>
  );
}

// "use client";

// import { useState, useCallback } from "react";
// import {
//   GoogleMap,
//   useJsApiLoader,
//   Marker,
//   InfoWindow,
// } from "@react-google-maps/api";
// import type { ParkingLocation } from "@/types/definitions";

// interface MapProps {
//   locations: ParkingLocation[];
// }

// const containerStyle = {
//   width: "100%",
//   height: "100%",
// };

// const center = {
//   lat: 27.7172,
//   lng: 85.324,
// };

// export default function Map({ locations }: MapProps) {
//   const { isLoaded } = useJsApiLoader({
//     id: "google-map-script",
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
//   });

//   const [map, setMap] = useState<google.maps.Map | null>(null);
//   const [selectedLocation, setSelectedLocation] =
//     useState<ParkingLocation | null>(null);

//   const onLoad = useCallback(
//     (map: google.maps.Map) => {
//       const bounds = new window.google.maps.LatLngBounds(center);
//       locations.forEach(({ latitude, longitude }) =>
//         bounds.extend({ lat: latitude, lng: longitude })
//       );
//       map.fitBounds(bounds);
//       setMap(map);
//     },
//     [locations]
//   );

//   const onUnmount = useCallback(() => {
//     setMap(null);
//   }, []);

//   return isLoaded ? (
//     <GoogleMap
//       mapContainerStyle={containerStyle}
//       center={center}
//       zoom={14}
//       onLoad={onLoad}
//       onUnmount={onUnmount}
//     >
//       {locations.map((location) => (
//         <Marker
//           key={location.uuid}
//           position={{ lat: location.latitude, lng: location.longitude }}
//           onClick={() => setSelectedLocation(location)}
//         />
//       ))}

//       {selectedLocation && (
//         <InfoWindow
//           position={{
//             lat: selectedLocation.latitude,
//             lng: selectedLocation.longitude,
//           }}
//           onCloseClick={() => setSelectedLocation(null)}
//         >
//           <div className="p-2">
//             <h3 className="font-semibold">{selectedLocation.name}</h3>
//             <p className="text-sm text-gray-600">{selectedLocation.address}</p>
//             <p className="text-lg font-bold mt-1">
//               £{parseFloat(selectedLocation.ratePerHour).toFixed(2)}/hr
//             </p>
//           </div>
//         </InfoWindow>
//       )}
//     </GoogleMap>
//   ) : (
//     <div>Loading...</div>
//   );
// }
