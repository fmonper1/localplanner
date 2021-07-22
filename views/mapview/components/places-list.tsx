import React from "react";
import { Collection, Feature } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import { useRenderCounter } from "../../../hooks/useRenderCounter";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export const PlacesList: React.FC<{ data?: Collection }> = ({ data }) => {
  const { state, setFeature } = useMapViewContext();

  const FeatureEntry = ({ item }: { item: Feature }) => (
    <li>
      <button
        className="w-full p-4 text-left inline-flex justify-between items-center border-b border-black hover:bg-gray-300 active:bg-gray-400"
        onClick={() => setFeature(item)}
      >
        {item?.properties?.Name}
        <Icon path={mdiArrowRight} size={1} />
      </button>
    </li>
  );
  return (
    <ul className="block max-h-1/2">
      {typeof state.collection !== undefined ? (
        Array.isArray(state.collection) ? (
          state.collection.map((collection) => {
            return (
              <div>
                <div className="bg-black text-white p-2">{collection.name}</div>
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
