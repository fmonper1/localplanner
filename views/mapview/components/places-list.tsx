import React from "react";
import { Collection, Feature } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import { useRenderCounter } from "../../../hooks/useRenderCounter";

export const PlacesList: React.FC<{ data?: Collection }> = ({ data }) => {
  const { state, setFeature } = useMapViewContext();
  const renderCount = useRenderCounter();

  const FeatureEntry = ({ item }: { item: Feature }) => (
    <li>
      <button className="w-full p-4" onClick={() => setFeature(item)}>
        {item?.properties?.Name}
      </button>
    </li>
  );
  return (
    <ul className="block max-h-1/2  overflow-x-scroll">
      {renderCount}
      {typeof state.collection !== undefined ? (
        Array.isArray(state.collection) ? (
          state.collection.map((collection) => {
            return (
              <div>
                <div>{collection.name}</div>
                {collection.features.map((item, i) => (
                  <FeatureEntry item={item} key={i} />
                ))}
              </div>
            );
          })
        ) : (
          state?.collection?.features.map((item, i) => (
            <FeatureEntry item={item} key={i} />
          ))
        )
      ) : (
        <>undefined</>
      )}
    </ul>
  );
};
