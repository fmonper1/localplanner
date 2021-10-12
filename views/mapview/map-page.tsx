import { PlacesList } from "./components/places-list";
import * as data from "./data/data.json";
import { Collection } from "./types/collection";
import { FeatureView } from "./components/feature-view";
import * as React from "react";
import dynamic from "next/dynamic";
import { useMapViewContext } from "./map-view-context";

export const MapPage: React.FC<{ mapView: React.ReactNode }> = ({
  mapView,
}) => {
  const { state } = useMapViewContext();
  const MapView = React.useMemo(
    () =>
      dynamic(
        () => import("./components/map-view"), // replace '@components/map' with your component's location
        { loading: () => <p>A map is loading</p>, ssr: false } // This line is important. It's what prevents server-side render
      ),
    []
  );
  return (
    <div className="flex max-h-[90vh] min-h-[90vh]">
      <div className="w-2/6 md:w-1/5 bg-blue-100 flex flex-col">
        <div className=" overflow-y-scroll">
          <PlacesList />
        </div>
        <div className="bg-blue-400 py-8">
          <h3>Collection: Tenerife</h3>
          <h4>Created By: Fer</h4>
        </div>
      </div>
      <div className="w-4/6 md:w-4/5 overflow-y-scroll relative max-h-screen">
        <div className="h-[80%]">
          <MapView />
        </div>
        <div className="z-10 max-w-screen-lg mx-auto mt-[-150px]">
          <FeatureView />
        </div>
      </div>
    </div>
  );
};
