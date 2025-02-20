import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./reducers/store";
import { loadUser } from "./reducers/authReducer";
import ProtectedRoute from "./protectedRoutes";
import PublicRoute from "./publicRoute";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Home from "./pages/HomePage";
import ProjectDetails from "./pages/ProjectDetails";
import CreateSubContractedWorks from "./pages/CreateSubContractedWorks";
import SubcontractedWorkDetails from "./pages/SubcontractedWorksDetails";
import Loader from "./components/Loader";

const AppRoutes = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    dispatch(loadUser()).finally(() => setLoading(false)); 
  }, [dispatch]);

  if (loading) {
    return <Loader />
  }


  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/project-details" element={<Navigate to="/home" />} />
          <Route path="/project-details/:projectId" element={<ProjectDetails />} />
          <Route path="/subcontracted-works-details" element={<Navigate to="/home" />} />
          <Route path="/subcontracted-works-details/:id" element={<SubcontractedWorkDetails />} />
          <Route path="/create-subcontracted-works/:projectId" element={<CreateSubContractedWorks />}/>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
