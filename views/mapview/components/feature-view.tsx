import React from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import Icon from "@mdi/react";
import {
  mdiCamera,
  mdiCar,
  mdiGoogleAds,
  mdiImageAlbum,
  mdiInformation,
  mdiStorefront,
  mdiWalk,
} from "@mdi/js";
import clsx from "clsx";

const InfoPill: React.FC<{
  icon: string;
  text: string;
  style?: "default" | "warn" | "disabled";
}> = ({ icon, text, style = "default" }) => (
  <div
    className={clsx(
      "flex items-center rounded-md",
      style === "disabled" && "opacity-50",
      style === "warn" && "bg-orange-700-300"
    )}
  >
    <Icon path={icon} size={0.8} /> {text}
  </div>
);

const ImageSkeleton: React.FC = () => (
  <div
    className="animate-pulse h-48 w-48 bg-gray-400 rounded-md "
    style={{ flex: "0 0 auto" }}
  />
);

export const FeatureView: React.FC = () => {
  const { state } = useMapViewContext();

  return (
    <div className="space-y-4">
      <div>{state.feature?.properties.Name}</div>
      <div>{state.feature?.properties.description}</div>
      <div>
        <h3 className="flex items-center font-bold">
          <Icon path={mdiInformation} size={0.8} />
          info
        </h3>

        <div className="flex flex-wrap space-x-5">
          <InfoPill icon={mdiStorefront} text="stores" />
          <InfoPill icon={mdiCar} text="not required" style="disabled" />
          <InfoPill icon={mdiWalk} text="15min" style="warn" />
          <InfoPill icon={mdiCamera} text="sight seeing" />
        </div>
      </div>
      <div>
        <h3 className="flex items-center font-bold">
          <Icon path={mdiImageAlbum} size={0.8} />
          images
        </h3>

        <div className="max-w-auto overflow-x-scroll overflow-y-hidden flex flex-no-wrap space-x-5">
          <ImageSkeleton />
          <ImageSkeleton />
          <ImageSkeleton />
          <ImageSkeleton />
        </div>
      </div>
      <div>
        <h3 className="flex items-center font-bold">
          <Icon path={mdiGoogleAds} size={0.8} />
          recommended places
        </h3>

        <div className="max-w-auto overflow-x-scroll overflow-y-hidden flex flex-no-wrap space-x-5">
          <ImageSkeleton />
          <ImageSkeleton />
          <ImageSkeleton />
          <ImageSkeleton />
        </div>
      </div>
    </div>
  );
};
