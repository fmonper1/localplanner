import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { Collection } from "../types/collection";
import { LatLngTuple } from "leaflet";
import * as icons from "../icons/icons";
import { useMapViewContext } from "../map-view-context";
import Icon from "@mdi/react";
import { mdiInformation } from "@mdi/js";
import { useMemo } from "react";

const MapView: React.FC<{ mapdata: Collection }> = ({ mapdata, ...props }) => {
  const { state, setFeature } = useMapViewContext();
  const { map } = state;
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
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
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
            icon={icons.iconPerson}
            key={i}
          >
            <Popup>
              <h2>{feature.properties.Name}</h2>
              <h3>{feature.properties.description}</h3>
              <br />
              <button onClick={() => setFeature(feature)}>
                <Icon path={mdiInformation} size={0.8} />
                view details
              </button>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );

  return (
    <div className="h-[60vh]">
      <MapElem />
    </div>
  );
};

export default MapView;
