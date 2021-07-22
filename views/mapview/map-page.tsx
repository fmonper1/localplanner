import { PlacesList } from "./components/places-list";
import * as data from "./data/data.json";
import { Collection } from "./types/collection";
import { FeatureView } from "./components/feature-view";
import * as React from "react";

export const MapPage: React.FC<{ mapView: React.ReactNode }> = ({
  mapView,
}) => {
  return (
    <div className="flex max-h-[85vh]">
      <div className="w-2/6 bg-blue-100 flex flex-col">
        <div className=" overflow-y-scroll">
          <PlacesList />
        </div>
        <div className="bg-blue-400 py-8">
          <h3>Collection: Tenerife</h3>
          <h4>Created By: Fer</h4>
        </div>
      </div>
      <div className="w-4/6 overflow-y-scroll relative">
        <div className="z-10">{mapView}</div>
        <FeatureView />
      </div>
    </div>
  );
};
