import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";

const PublicRoute = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  if (token) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
