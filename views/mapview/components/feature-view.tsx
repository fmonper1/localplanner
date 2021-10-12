import React, { useMemo } from "react";
import { Collection } from "../types/collection";
import { useMapViewContext } from "../map-view-context";
import Icon from "@mdi/react";
import {
  mdiCamera,
  mdiCar,
  mdiCommaBox,
  mdiComment,
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

const CommentSkeleton: React.FC = () => (
  <div>
    <div className="flex flex-no-wrap items-center mb-2">
      <div className="animate-pulse h-8 w-8 bg-gray-400 rounded-full" />
      <div className="animate-pulse h-8 bg-gray-400 rounded-md flex-grow ml-2 " />
    </div>
    <div className="space-y-2">
      <div className="animate-pulse h-6 bg-gray-400 rounded-md w-full" />
      <div className="animate-pulse h-4 bg-gray-400 rounded-md w-full" />
      <div className="animate-pulse h-3 bg-gray-400 rounded-md w-full" />
    </div>
  </div>
);

export const FeatureView: React.FC = () => {
  const { state } = useMapViewContext();
  const renderCount = useRenderCounter();

  return useMemo(() => {
    if (!state.feature) return <></>;
    return (
      <div
        className="grid grid-cols-2 gap-4 p-4 bg-gray-100 rounded-lg shadow-md transform -translate-y-12 relative "
        style={{ zIndex: 99999 }}
      >
        <div className="flex justify-between items-center p-2 col-span-2">
          <h2>{state.feature?.name}</h2>
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
        <div className="col-span-2">
          <div>{state.feature?.description}</div>
        </div>

        <div className="col-span-2">
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
        <div className="col-span-2">
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
        <div className="col-span-2">
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

        <div className="col-span-2 md:col-span-1">
          <h3 className="flex items-center font-bold">
            <Icon path={mdiComment} size={0.8} />
            comments
          </h3>

          <div className=" flex flex-col space-y-8 mt-4">
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
            <CommentSkeleton />
          </div>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="flex items-center font-bold">
            <Icon path={mdiGoogleAds} size={0.8} />
            recommended places
          </h3>
        </div>
      </div>
    );
  }, [state.feature]);
};
