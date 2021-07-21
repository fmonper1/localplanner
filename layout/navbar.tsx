import { useAuthContext } from "../context/auth/auth-context";
import { useNotificationContext } from "../context/notifications/notification-context";
import { useEffect } from "react";

export const Navbar = () => {
  const authCtx = useAuthContext();
  const { state: authState } = authCtx;
  const notificationCtx = useNotificationContext();

  useEffect(() => {
    if (authState.state === "LOGGED_IN")
      setInterval(() => {
        notificationCtx.dispatch({
          type: "ADD_NOTIFICATION",
          notification: "test",
        });
      }, 3000);
  }, [authState]);

  return (
    <header className="w-full flex justify-between bg-black text-white p-4">
      <div>localplanner</div>
      <div className="flex-grow" />
      {authState.state === "LOGGED_IN" && (
        <div>
          {authState.user?.name}
          <button onClick={() => authCtx.doLogout()}>logout</button>
        </div>
      )}
      {authState.state === "LOGGED_IN" && (
        <div>{notificationCtx.state.unreadCount}</div>
      )}
      {authState.state === "LOGGED_OUT" && (
        <div>
          <button onClick={() => authCtx.doLogin()}>login</button>
        </div>
      )}
    </header>
  );
};
