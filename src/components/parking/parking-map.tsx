"use client";

import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface ParkingMapProps {
  latitude: number;
  longitude: number;
}

export function ParkingMap({ latitude, longitude }: ParkingMapProps) {
  useEffect(() => {
    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
      version: "weekly",
    });

    loader.load().then(() => {
      const map = new google.maps.Map(
        document.getElementById("map") as HTMLElement,
        {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        }
      );

      new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
      });
    });
  }, [latitude, longitude]);

  return <div id="map" className="w-full h-full rounded-lg" />;
}
