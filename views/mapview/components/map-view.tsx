import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { LatLngTuple } from "leaflet";
import * as icons from "../icons/icons";
import { useMapViewContext } from "../map-view-context";
import Icon from "@mdi/react";
import { mdiInformation } from "@mdi/js";
import { useRenderCounter } from "../../../hooks/useRenderCounter";
import { useEffect, useState } from "react";
import { useMapElement } from "react-leaflet/types/MapContainer";

const RecenterHandler = () => {
  const { state } = useMapViewContext();

  const map = useMap();
  useEffect(() => {
    console.log("feature change");

    if (state.feature) {
      map.panTo([
        state.feature.geometry.coordinates[1],
        state.feature.geometry.coordinates[0],
      ] as LatLngTuple);
    }
  }, [state.feature]);

  return <></>;
};

const MapView: React.FC = ({ ...props }) => {
  const { state, setFeature } = useMapViewContext();

  const [center, setCenter] = useState<LatLngTuple>(
    Array.isArray(state.collection)
      ? ([
          state.collection[0].features[0].geometry.coordinates[1],
          state.collection[0].features[0].geometry.coordinates[0],
        ] as LatLngTuple)
      : ([
          state.collection.features[0].geometry.coordinates[1],
          state.collection.features[0].geometry.coordinates[0],
        ] as LatLngTuple)
  );

  useEffect(() => {
    console.log("feature change");

    if (state.feature) {
      setCenter([
        state.feature.geometry.coordinates[1],
        state.feature.geometry.coordinates[0],
      ] as LatLngTuple);
    }
  }, [state.feature]);

  const RenderMarkers = ({ feature }) => (
    <Marker
      position={
        [
          feature.geometry.coordinates[1],
          feature.geometry.coordinates[0],
        ] as LatLngTuple
      }
      icon={
        JSON.stringify(state.feature?.geometry.coordinates) ===
        JSON.stringify(feature.geometry.coordinates)
          ? icons.activeIcon
          : icons.iconPerson
      }
    >
      <Popup>
        <h2>{feature.properties?.Name}</h2>
        <h3>{feature.properties?.description}</h3>
        <br />
        <button
          onClick={() => setFeature(feature)}
          className="bg-blue-500 px-2 py-1 rounded-md inline-flex items-center justify-center gap-2"
        >
          <Icon path={mdiInformation} size={0.8} />
          view details
        </button>
      </Popup>

      <Tooltip
        direction="bottom"
        offset={[0, 20]}
        opacity={1}
        permanent={
          JSON.stringify(state.feature?.geometry.coordinates) ===
          JSON.stringify(feature.geometry.coordinates)
        }
      >
        {feature.properties?.Name}
      </Tooltip>
    </Marker>
  );

  return (
    <MapContainer
      center={center}
      whenCreated={(e) => console.log(e)}
      zoom={13}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <RecenterHandler />
      {state.collection &&
        Array.isArray(state.collection) &&
        state.collection.map((collection) =>
          collection.features.map((feature, i) => (
            <RenderMarkers feature={feature} key={i} />
          ))
        )}
      {state.collection &&
        !Array.isArray(state.collection) &&
        state.collection.features.map((feature, i) => (
          <RenderMarkers feature={feature} key={i} />
        ))}
      <div
        className="bg-gradient-to-b from-transparent to-white h-24 transform absolute bottom-0 w-full"
        style={{ zIndex: 9999 }}
      />
    </MapContainer>
  );
};

export default MapView;
