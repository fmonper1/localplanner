import * as React from "react";

type AuthState = {
  state: "LOGGED_IN" | "LOGGED_OUT";
  user?: {
    name: string;
  };
};

type ReducerAction =
  | { type: "LOG_IN"; user: AuthState["user"] }
  | { type: "LOG_OUT" };

const AuthContext = React.createContext<
  [AuthState, React.Dispatch<ReducerAction>] | undefined
>(undefined);

const authReducer = (state: AuthState, action: ReducerAction): AuthState => {
  switch (action.type) {
    case "LOG_IN": {
      return { ...state, state: "LOGGED_IN", user: action.user };
    }
    case "LOG_OUT": {
      return { state: "LOGGED_OUT" };
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`);
    }
  }
};

const AuthProvider: React.FC = (props) => {
  const [state, dispatch] = React.useReducer(authReducer, {
    state: "LOGGED_OUT",
  });
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AuthContext.Provider value={value} {...props} />;
};

function useAuthContext() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error(`useCount must be used within a CountProvider`);
  }
  const [state, dispatch] = context;

  const doLogin = () => {
    dispatch({ type: "LOG_IN", user: { name: "fer" } });
  };
  const doLogout = () => {
    dispatch({ type: "LOG_OUT" });
  };
  return {
    state,
    dispatch,
    doLogin,
    doLogout,
  };
}

export { AuthProvider, useAuthContext };
