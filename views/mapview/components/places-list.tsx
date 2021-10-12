import React from "react";
import { Collection, Feature } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import { useRenderCounter } from "../../../hooks/useRenderCounter";
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

export const PlacesList: React.FC<{ data?: Collection }> = ({ data }) => {
  const { state, setFeature } = useMapViewContext();

  const FeatureEntry = ({ item }: { item: any }) => (
    <li>
      <button
        className="w-full p-4 text-left inline-flex justify-between items-center border-b border-black hover:bg-gray-300 active:bg-gray-400"
        onClick={() => setFeature(item)}
      >
        {item?.name}
        <Icon path={mdiArrowRight} size={1} />
      </button>
    </li>
  );
  return (
    <ul className="block max-h-1/2">
      <div>
        <div className="bg-black text-white p-2">{}</div>
        {state.collection.places.map((item: any, i: number) => (
          <FeatureEntry item={item} key={i} />
        ))}
      </div>
    </ul>
  );
};
