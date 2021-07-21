import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Collection } from "../types/collection";
import { Icon, LatLngTuple } from "leaflet";
import * as icons from "../icons/icons";
import { useMapViewContext } from "../map-view-context";
import { useMemo } from "react";
const MapView: React.FC<{ mapdata: Collection }> = ({ mapdata }) => {
  const { state } = useMapViewContext();

  const MapElem = () => (
    <MapContainer
      center={
        state.map?.center ??
        ([
          mapdata.features[0].geometry.coordinates[1],
          mapdata.features[0].geometry.coordinates[0],
        ] as LatLngTuple)
      }
      whenCreated={(e) => console.log(e)}
      zoom={10}
      scrollWheelZoom={false}
      style={{ width: "100%", height: 400 }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {mapdata.features.map((feature, i) => {
        return (
          <Marker
            position={
              [
                feature.geometry.coordinates[1],
                feature.geometry.coordinates[0],
              ] as LatLngTuple
            }
            icon={icons.iconPerson as unknown as Icon}
            key={i}
          >
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );

  return (
    <div className="w-full h-[400px]">
      <MapElem />
    </div>
  );
};

export default MapView;
