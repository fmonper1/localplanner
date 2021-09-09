import { useAuthContext } from "../context/auth/auth-context";
import { useNotificationContext } from "../context/notifications/notification-context";
import React, { useEffect } from "react";
import logout from "../pages/api/logout";
import Link from "next/link";
import { useAuthUser } from "next-firebase-auth";

export const Navbar = () => {
  const authCtx = useAuthContext();
  const { state: authState } = authCtx;
  const notificationCtx = useNotificationContext();

  const AuthUser = useAuthUser();

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
      <div>
        <Link href="/">
          <a>localplanner</a>
        </Link>
      </div>
      <div className="flex-grow" />
      {authState.state === "LOGGED_IN" && (
        <div>
          {authState.user?.name}
          <button
            onClick={() => {
              AuthUser.signOut();
              authCtx.doLogout();
            }}
          >
            logout
          </button>
        </div>
      )}
      {AuthUser.email ? (
        <>
          <p>Signed in as {AuthUser.email}</p>
          <button
            type="button"
            onClick={() => {
              AuthUser.signOut();
            }}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <p>You are not signed in.</p>
          <Link href="/auth">
            <a>
              <button type="button">Sign in</button>
            </a>
          </Link>
        </>
      )}
      {authState.state === "LOGGED_IN" && (
        <div>{notificationCtx.state.unreadCount}</div>
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
