import * as React from "react";
import { useEffect } from "react";

type NotificationState = {
  unreadCount: number;
  notifications: string[] | [];
};

type ReducerAction = {
  type: "ADD_NOTIFICATION";
  notification: string;
};

const NotificationContext = React.createContext<
  [NotificationState, React.Dispatch<ReducerAction>] | undefined
>(undefined);

const notificationReducer = (
  state: NotificationState,
  action: ReducerAction
): NotificationState => {
  switch (action.type) {
    case "ADD_NOTIFICATION": {
      return {
        ...state,
        unreadCount: state.unreadCount + 1,
        notifications: [...state.notifications, action.notification],
      };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const NotificationProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(notificationReducer, {
    unreadCount: 0,
    notifications: [],
  });
  const value = React.useMemo(() => [state, dispatch], [state]);

  return (
    <NotificationContext.Provider
      value={value as [NotificationState, React.Dispatch<ReducerAction>]}
      {...props}
    />
  );
};

function useNotificationContext() {
  const context = React.useContext(NotificationContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [state, dispatch] = context;
  const addNotification = (notification: string) => {
    dispatch({
      type: "ADD_NOTIFICATION",
      notification,
    });
  };
  return {
    state,
    dispatch,
    addNotification,
  };
}

export { NotificationProvider, useNotificationContext };
