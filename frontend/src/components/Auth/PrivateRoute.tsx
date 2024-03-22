import { Outlet, Navigate } from "react-router-dom";
import useAuthentication from "../../hooks/useAuthentication";

// A private route that only allows access to authenticated users
const PrivateRoute = () => {
  const { loading, authenticated } = useAuthentication();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
