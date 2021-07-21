import * as React from "react";
import { useEffect } from "react";
import { Collection } from "./types/collection";

type MapViewState = {
  collection?: Collection;
  map?: {
    center?: [number, number];
  };
};

type MapViewAction = {
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
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const MapViewProvider: React.FC<{ initialData?: Collection }> = (props) => {
  const [state, dispatch] = React.useReducer<any>(
    notificationReducer,
    props.initialData ?? {}
  );
  const value = React.useMemo(() => [state, dispatch], [state]);

  return <MapViewContext.Provider value={value} {...props} />;
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
  return {
    state,
    dispatch,
    setMapCenter,
  };
}

export { MapViewProvider, useMapViewContext };
