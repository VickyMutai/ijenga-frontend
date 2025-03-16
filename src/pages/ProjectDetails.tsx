import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, FileText, MapPin } from "lucide-react";
import { MdApartment, MdEngineering } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import Loader from "../components/Loader";
import EditProjectDetails from "../components/EditProjectDetails";
import SubContractorsTable from "../components/SubContractorsTable";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchProjectDetails } from "../reducers/projectReducer";
import { fetchUsers, fetchUserProfile } from "../reducers/authReducer";
import { fetchSubcontractedWorks } from "../reducers/subcontractedWorksReducer";
import Sidebar from "../components/Sidebar";

export default function ProjectDetails() {
    const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { subcontractedWorks } = useSelector(
    (state: RootState) => state.subcontractedWorks
  );

  const { selectedProject, loading } = useSelector(
    (state: RootState) => state.projects
  );
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

  useEffect(() => {}, [subcontractedWorks]);

  const getSupervisorName = (uuid: string | null) => {
    if (!uuid) return "Not Assigned";
    const supervisor = users.find((user) => user.user_id === uuid);
    return supervisor
      ? `${supervisor.first_name} ${supervisor.last_name}`
      : "Not Assigned";
  };

  if (loading) return <Loader />;
  if (!selectedProject) return <p>Project not found</p>;

  const canEditProject =
    user?.role === "main-contractor" ||
    user?.role === "contractors-supervisor" ||
    user?.role === "subcontractor";

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="w-[300px] md:w-[400px]">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-[#1D3557] hover:text-[#2ECC71] transition-all duration-200 mb-4 cursor-pointer"
        >
          <ArrowLeft size={18} />
          <span>Go Back</span>
        </button>
      </div>
      <header className="py-4 px-6  flex flex-col-reverse lg:flex-row lg:justify-between gap-4">
        <h1 className="text-2xl font-bold">Project Details</h1>
        <Sidebar />
      </header>

      <div className="mt-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue mb-4">
          {selectedProject.projectName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Location</p>
              <p className="text-lg font-semibold">
                {selectedProject.projectLocation || "No description available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Description</p>
              <p className="text-lg font-semibold">
                {selectedProject.projectDescription ||
                  "No description available"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdEngineering size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Contractor</p>
              <p className="text-lg font-semibold">
                {getSupervisorName(selectedProject.supervisorContractor)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <BiSupport size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Consultant</p>
              <p className="text-lg font-semibold">
                {getSupervisorName(selectedProject.supervisorConsultant)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdApartment size={27} />
            <div>
              <p className="text-sm text-gray-500">Sub-Contractors</p>
              <p className="text-lg font-semibold">
                {selectedProject.subcontractors &&
                selectedProject.subcontractors.length > 0
                  ? selectedProject.subcontractors
                      .map((id) => {
                        const sub = users.find((user) => user.user_id === id);
                        return sub
                          ? `${sub.first_name} ${sub.last_name}`
                          : "Unknown";
                      })
                      .join(", ")
                  : "Not Assigned"}
              </p>
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
