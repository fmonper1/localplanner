import React from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";

export const PlacesList: React.FC<{ data: Collection }> = ({ data }) => {
  const { setMapCenter } = useMapViewContext();

  return (
    <ul>
      {data.features.map((item, i) => (
        <li key={i}>
          <button
            onClick={() =>
              setMapCenter([
                item.geometry.coordinates[1],
                item.geometry.coordinates[0],
              ])
            }
          >
            {item.properties.Name}
          </button>
        </li>
      ))}
    </ul>
  );
};
