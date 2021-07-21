import { useAuthContext } from "../context/auth/auth-context";
import { useNotificationContext } from "../context/notifications/notification-context";
import { useEffect } from "react";

export const Navbar = () => {
  const authCtx = useAuthContext();
  const notificationCtx = useNotificationContext();

  useEffect(() => {
    setInterval(() => {
      notificationCtx.dispatch({
        type: "ADD_NOTIFICATION",
        notification: "test",
      });
    }, 3000);
  }, []);

  return (
    <header className="w-full flex justify-between">
      <div>logo</div>
      {authCtx.state.state === "LOGGED_IN" && (
        <div>
          {authCtx.state.user?.name}
          <button onClick={() => authCtx.doLogout()}>logout</button>
        </div>
      )}
      {authCtx.state.state === "LOGGED_IN" && (
        <div>{notificationCtx.state.unreadCount}</div>
      )}
      {authCtx.state.state === "LOGGED_OUT" && (
        <div>
          <button onClick={() => authCtx.doLogin()}>login</button>
        </div>
      )}
    </header>
  );
};
