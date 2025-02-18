import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./protectedRoutes"; 
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./reducers/store";
import { loadUser } from "./reducers/authReducer";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/HomePage";
import ProjectDetails from "./pages/ProjectDetails";
import SubContractedWorks from "./pages/SubContractedWorks";

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="forgot-password" element={<ForgotPassword />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/project-details" element={<Navigate to="/" />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/subcontracted-works-details/:id" element={<SubContractedWorks />} />
         {/* Protected Routes */}
         <Route element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/project-details" element={<Navigate to="/" />} />
          <Route path="/project-details/:id" element={<ProjectDetails />} />
          <Route path="/subcontracted-works-details/:id" element={<SubContractedWorks />} />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
