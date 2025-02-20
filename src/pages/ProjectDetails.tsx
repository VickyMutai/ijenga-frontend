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
import { fetchUsers, fetchUserProfile } from "../reducers/authReducer";
import { fetchSubcontractedWorks } from "../reducers/subcontractedWorksReducer";


export default function ProjectDetails() {
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { subcontractedWorks } = useSelector((state: RootState) => state.subcontractedWorks);

  const { selectedProject, loading } = useSelector((state: RootState) => state.projects);
  const { users } = useSelector((state: RootState) => state.auth);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (projectId) {
      dispatch(fetchProjectDetails(projectId));
      dispatch(fetchSubcontractedWorks(projectId));
    }
    dispatch(fetchUsers());
  }, [dispatch, projectId]);

    useEffect(() => {
      if (!user) {
        dispatch(fetchUserProfile());
      }
    }, [dispatch, user]); 

    useEffect(() => {
    }, [subcontractedWorks]);    

  const getSupervisorName = (uuid: string | null) => {
    if (!uuid) return "Not Assigned";
    const supervisor = users.find(user => user.user_id === uuid);
    return supervisor ? `${supervisor.first_name} ${supervisor.last_name}` : "Not Assigned";
  };

  if (loading) return <Loader />;
  if (!selectedProject) return <p>Project not found</p>;


  const canEditProject = user?.role === "main-contractor" || user?.role === "contractors-supervisor" || user?.role === "subcontractor";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Details</h1>
      </header>

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
              <p className="text-lg font-semibold">{getSupervisorName(selectedProject.supervisorContractor)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <BiSupport size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Consultant</p>
              <p className="text-lg font-semibold">{getSupervisorName(selectedProject.supervisorConsultant)}</p>
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

        {canEditProject && (
          <div className="mt-6 flex space-x-4">
            <EditProjectDetails />
          </div>
        )}
      </div>

      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue">Subcontracted Works</h2>
        <SubContractorsTable
          works={subcontractedWorks}
          projectId={projectId!}
        />

        </div>
    </div>
  );
}
