import { useAuthContext } from "../context/auth/auth-context";
import { useNotificationContext } from "../context/notifications/notification-context";
import { useEffect } from "react";
import logout from "../pages/api/logout";
import Link from "next/link";

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
    <header className="w-full flex justify-between bg-black text-white p-4 space-x-4">
      <div>localplanner</div>
      <div className="flex-grow" />
      {authState.state === "LOGGED_IN" && (
        <div>
          {authState.user?.name}
          <button
            onClick={() => {
              logout();
              // authCtx.doLogout();
            }}
          >
            logout
          </button>
        </div>
      )}
      {authState.state === "LOGGED_IN" && (
        <div>{notificationCtx.state.unreadCount}</div>
      )}
      {authState.state === "LOGGED_OUT" && (
        <div>
          <Link href="/auth">
            <a>
              <button type="button">Sign in</button>
            </a>
          </Link>
          {/*<button onClick={() => authCtx.doLogin()}>login</button>*/}
        </div>
      )}
      <div>
        <Link href="/map">
          <a>
            <button type="button">map</button>
          </a>
        </Link>
      </div>
    </header>
  );
};
