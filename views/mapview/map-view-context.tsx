import * as React from "react";
import { useEffect } from "react";
import { Collection, Feature } from "./types/collection";

type MapViewState = {
  collection?: any;
  feature?: any;
  map?: {
    center?: [number, number];
  };
};

type MapViewAction =
  | {
      type: "SET_CURRENT_FEATURE";
      feature: any;
    }
  | {
      type: "SET_CENTER";
      coords: [number, number];
    };

const MapViewContext = React.createContext<
  [MapViewState, React.Dispatch<MapViewAction>] | undefined
>(undefined);

const notificationReducer = (
  state: MapViewState,
  action: MapViewAction
): MapViewState => {
  switch (action.type) {
    case "SET_CENTER": {
      return {
        ...state,
        map: { center: action.coords },
      };
    }
    case "SET_CURRENT_FEATURE": {
      return {
        ...state,
        map: {
          center: [
            action.feature.coordinate.lat,
            action.feature.coordinate.lng,
          ],
        },
        feature: action.feature,
      };
    }
    default: {
      throw new Error(`Unsupported action type`);
    }
  }
};

const MapViewProvider: React.FC<{
  initialData?: any;
}> = (props) => {
  const [state, dispatch] = React.useReducer(
    notificationReducer,
    { collection: props.initialData } ?? {}
  );
  const value = React.useMemo(() => [state, dispatch], [state]);

  return (
    <MapViewContext.Provider
      value={value as [MapViewState, React.Dispatch<MapViewAction>]}
      {...props}
    />
  );
};

function useMapViewContext() {
  const context = React.useContext(MapViewContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [state, dispatch] = context;
  const setMapCenter = (coords: [number, number]) => {
    dispatch({
      type: "SET_CENTER",
      coords,
    });
  };
  const setFeature = (feature: Feature) => {
    dispatch({
      type: "SET_CURRENT_FEATURE",
      feature,
    });
  };
  return {
    state,
    dispatch,
    setMapCenter,
    setFeature,
  };
}

export { MapViewProvider, useMapViewContext };
