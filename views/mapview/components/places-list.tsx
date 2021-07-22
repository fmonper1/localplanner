import React from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";

export const PlacesList: React.FC<{ data?: Collection }> = ({ data }) => {
  const { state, setFeature } = useMapViewContext();

  return (
    <ul className="block max-h-1/2  overflow-x-scroll">
      {typeof state.collection !== undefined ? (
        Array.isArray(state.collection) ? (
          state.collection.map((collection) => {
            return (
              <div>
                <div>{collection.name}</div>
                {collection.features.map((item, i) => (
                  <li key={i}>
                    <button
                      className="w-full p-4"
                      onClick={() => setFeature(item)}
                    >
                      {item?.properties?.Name}
                    </button>
                  </li>
                ))}
              </div>
            );
          })
        ) : (
          state?.collection?.features.map((item, i) => (
            <li key={i}>
              <button className="w-full p-4" onClick={() => setFeature(item)}>
                {item?.properties?.Name}
              </button>
            </li>
          ))
        )
      ) : (
        <>undefined</>
      )}
    </ul>
  );
};
