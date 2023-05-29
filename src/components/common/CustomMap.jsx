import React from "react";
import { MapContainer, Marker, TileLayer, Popup } from "react-leaflet";

const position = [36.597728, 53.064761];
export const CustomMap = () => {
  return (
    <div className="w-full h-40 lg:w-full lg:h-full">
      <MapContainer className="w-full h-full" attributionControl={false} center={position} zoom={15}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup closeOnClick closeButton={false}>
            آکادمی برنامه نویسی بحر همینجاست!!!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
