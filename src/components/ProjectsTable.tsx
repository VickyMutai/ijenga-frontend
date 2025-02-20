import { useEffect } from "react";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { deleteProject } from "../reducers/projectReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../reducers/store";

interface Project {
  id: string;
  projectName: string;
  projectLocation: string;
  projectDescription: string;
  supervisorContractor?: string;
  supervisorConsultant?: string;
  subcontractor?: string;
}

interface ProjectsTableProps {
  projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
  }, [projects]);

  const handleRowClick = (projectId: string | undefined) => {
    navigate(`/project-details/${projectId}`);
  };

  const handleDelete = async (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents navigating when clicking delete
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      await dispatch(deleteProject(projectId));
    }
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
                {project.supervisorContractor || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.supervisorConsultant || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">
                {project.subcontractor || "N/A"}
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex space-x-4">
                  {/* View Button */}
                  <button
                    className="text-secondary hover:text-green-600 transition duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(project.id);
                    }}
                  >
                    <FaEye className="w-5 h-5" />
                  </button>

                  {/* Edit Button */}
                  <button
                    className="text-primary hover:text-blue-800 transition duration-200 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(project.id);
                    }}
                  >
                    <FaPencilAlt className="w-5 h-5" />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="text-primary hover:text-red-600 transition duration-200 cursor-pointer"
                    onClick={(e) => handleDelete(project.id, e)}
                  >
                    <FaTrashCan className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
