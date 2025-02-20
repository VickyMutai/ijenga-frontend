import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";

const ProtectedRoute = () => {
  const { token, user, loading } = useSelector((state: RootState) => state.auth);
  if (loading) return <p>Loading...</p>;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
