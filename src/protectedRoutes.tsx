import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./reducers/store";
import Loader from "./components/Loader";

const ProtectedRoute = () => {
  const { token, user, loading } = useSelector((state: RootState) => state.auth);
  if (loading) return <Loader />;

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
