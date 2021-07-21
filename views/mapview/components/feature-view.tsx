import React from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";

export const FeatureView: React.FC = () => {
  const { state } = useMapViewContext();

  return (
    <div>
      {state.feature?.properties.Name}
      {state.feature?.properties.description}
    </div>
  );
};
