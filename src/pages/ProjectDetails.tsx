import { FileText, MapPin } from "lucide-react";
import { MdApartment, MdEngineering } from "react-icons/md";
import { BiSupport } from "react-icons/bi";
import EditProjectDetails from "../components/EditProjectDetails";
import SubContractorsTable from "../components/SubContractorsTable";

export default function ProjectDetails() {
  // Example project data (fetch this from the backend using the project ID)
  const project = {
    id: 1,
    projectName: "Project Alpha",
    projectLocation: "Nairobi",
    projectDescription: "Construction of a commercial building",
    supervisorContractor: "John Doe",
    supervisorConsultant: "Jane Smith",
    subcontractor: "ABC Construction",
  };

  // Example subcontracted works data (fetch this from the backend)
  const subcontractedWorks = [
    {
      id: 1,
      taskTitle: "Foundation Work",
      taskDescription: "Excavation and concrete pouring for foundation",
      taskCostLabor: 5000,
      taskCostOverhead: 1000,
      laborerName: "James Brown",
      laborerIdNumber: "12345678",
      laborerTitle: "Mason",
      laborerDailyRate: 1500,
      laborerWeeklyRate: 7500,
      laborerMpesaNumber: "0712345678",
    },
    {
      id: 2,
      taskTitle: "Wall Construction",
      taskDescription: "Brick laying and plastering",
      taskCostLabor: 7500,
      taskCostOverhead: 1500,
      laborerName: "Mary Johnson",
      laborerIdNumber: "87654321",
      laborerTitle: "Casual",
      laborerDailyRate: 1000,
      laborerWeeklyRate: 5000,
      laborerMpesaNumber: "0723456789",
    },
  ];



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Project Details</h1>
      </header>

      {/* Project Details Section */}
      <div className="mt-6 bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue mb-4">
          {project.projectName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Location</p>
              <p className="text-lg font-semibold">{project.projectLocation}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <FileText size={26} />
            <div>
              <p className="text-sm text-gray-500">Project Description</p>
              <p className="text-lg font-semibold">
                {project.projectDescription}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdEngineering size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Contractor</p>
              <p className="text-lg font-semibold">
                {project.supervisorContractor}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <BiSupport size={27} />
            <div>
              <p className="text-sm text-gray-500">Supervisor Consultant</p>
              <p className="text-lg font-semibold">
                {project.supervisorConsultant}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <MdApartment size={27} />
            <div>
              <p className="text-sm text-gray-500">Sub-Contractor</p>
              <p className="text-lg font-semibold">{project.subcontractor}</p>
            </div>
          </div>
        </div>

        {/* Edit Project Button */}
        <div className="mt-6 flex space-x-4">
          <EditProjectDetails />
        </div>
      </div>

      {/* Subcontracted Works Section */}
      <SubContractorsTable works={subcontractedWorks}/>
    </div>
  );
}
