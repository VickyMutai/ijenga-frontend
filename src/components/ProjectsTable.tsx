import { useNavigate } from "react-router-dom";

interface Project {
  id: number;
  projectName: string;
  projectLocation: string;
  projectDescription: string;
  supervisorContractor: string;
  supervisorConsultant: string;
  subcontractor: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const navigate = useNavigate();

  const handleRowClick = (projectId: number) => {
    navigate(`/project-details/${projectId}`); // Navigates to project details page
  };
  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-md mt-3">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="blue text-white">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Location
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Project Description
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Supervisor Contractor
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Supervisor Consultant
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
              Subcontractor
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200">
          {projects.map((project) => (
            <tr
              key={project.id}
              className="hover:bg-gray-100 transition duration-200 cursor-pointer"
              onClick={() => handleRowClick(project.id)}
            >
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectName}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectLocation}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.projectDescription}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.supervisorContractor}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.supervisorConsultant}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.subcontractor}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
