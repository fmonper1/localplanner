import React, { useMemo } from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import Icon from "@mdi/react";
import {
  mdiCamera,
  mdiCar,
  mdiCurrencyEur,
  mdiGoogleAds,
  mdiHeartOutline,
  mdiImageAlbum,
  mdiInformation,
  mdiStorefront,
  mdiWalk,
} from "@mdi/js";
import clsx from "clsx";
import { useRenderCounter } from "../../../hooks/useRenderCounter";

const InfoPill: React.FC<{
  icon: string;
  text: string;
  style?: "default" | "warn" | "disabled";
}> = ({ icon, text, style = "default" }) => (
  <div
    className={clsx(
      "flex items-center rounded-md p-1 px-2",
      style === "disabled" && "opacity-50",
      style === "warn" && "bg-yellow-200"
    )}
  >
    <Icon path={icon} size={0.75} /> {text}
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
  const renderCount = useRenderCounter();

  return useMemo(() => {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center p-2">
          <h2>{state.feature?.properties.Name}</h2>
          <div className="flex space-x-4">
            <div className="text-xs text-center">
              5<br />
              comments
            </div>
            <div className="text-xs text-center">
              35
              <br />
              saved
            </div>
            <div>
              <Icon path={mdiHeartOutline} size={1.2} />
            </div>
          </div>
        </div>
        <div>{state.feature?.properties.description}</div>
        {renderCount}

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
            <InfoPill icon={mdiCurrencyEur} text="€€€" style="warn" />
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
  }, [state.feature, renderCount]);
};
