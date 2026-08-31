import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";

import { isLoggedIn } from "../../services/auth.service";
import Loading from "../Loading/Loading";

function ProtectedRoute() {
  const [authenticated, setAuthenticated] =
    useState<boolean | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      const loggedIn = await isLoggedIn();

      setAuthenticated(loggedIn);
    }

    checkAuthentication();
  }, []);

  if (authenticated === null) {
    return (
      <Loading message="Checking authentication..." />
    );
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
