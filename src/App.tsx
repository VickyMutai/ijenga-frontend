import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/HomePage";
import ProjectDetails from "./pages/ProjectDetails";
import CreateSubContractedWorks from "./pages/CreateSubContractedWorks";
import SubcontractedWorkDetails from "./pages/SubcontractedWorksDetails";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="forgot-password" element={<ForgotPassword />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/project-details" element={<Navigate to="/home" />} />
        <Route path="/project-details/:id" element={<ProjectDetails />} />
        <Route path="/subcontracted-works-details" element={<Navigate to="/home" />} />
        <Route path="/subcontracted-works-details/:id" element={<SubcontractedWorkDetails />} />
        <Route path="/create-subcontracted-works" element={<CreateSubContractedWorks />}/>
      </Routes>
    </Router>
  )
}

export default App
