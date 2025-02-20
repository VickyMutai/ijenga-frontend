import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FileText, MapPin } from "lucide-react";
import { MdApartment, MdEngineering } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Loader from "../components/Loader";
import EditProjectDetails from "../components/EditProjectDetails";
import SubContractorsTable from "../components/SubContractorsTable";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchProjectDetails } from "../reducers/projectReducer";

export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { selectedProject, loading } = useSelector((state: RootState) => state.projects);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectDetails(projectId));
    }
  }, [dispatch, projectId]);
  
  useEffect(() => {
  }, [selectedProject]);
  

  if (loading) return <Loader />  ;

  if (!selectedProject) return <p>Project not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Details</h1>
      </header>

      {/* Project Details Section */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue mb-4">{selectedProject.projectName}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Location</p>
              <p className="text-lg font-semibold">{selectedProject.projectLocation || "No description available"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Description</p>
              <p className="text-lg font-semibold">{selectedProject.projectDescription || "No description available"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdEngineering size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Contractor</p>
              <p className="text-lg font-semibold">{selectedProject.supervisorContractor || "Not Assigned"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <BiSupport size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Consultant</p>
              <p className="text-lg font-semibold">{selectedProject.supervisorConsultant || "Not Assigned"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdApartment size={27} />
            <div>
              <p className="text-sm text-gray-500">Sub-Contractor</p>
              <p className="text-lg font-semibold">{selectedProject.subcontractor || "Not Assigned"}</p>
            </div>
          </div>
        </div>

        {/* Edit Project Button */}
        <div className="mt-6 flex space-x-4">
          <EditProjectDetails />
        </div>
      </div>

      {/* Subcontracted Works Section (To be implemented later) */}
      <SubContractorsTable works={[]} />
    </div>
  );
}
