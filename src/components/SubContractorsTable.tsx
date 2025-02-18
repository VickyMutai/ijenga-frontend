import { Link } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SubcontractedWork {
    id: number;
    taskTitle: string;
    taskDescription: string;
    taskCostLabor: number;
    taskCostOverhead: number;
    laborerName: string;
    laborerIdNumber: string;
    laborerTitle: string;
    laborerDailyRate: number;
    laborerWeeklyRate: number;
    laborerMpesaNumber: string;
  }

  interface SubcontractedWorksTableProps {
    works: SubcontractedWork[];
  }
const SubContractorsTable = ({works}: SubcontractedWorksTableProps) => {
  const navigate = useNavigate();

  const handleRowClick = (workId: number) => {
    navigate(`/subcontracted-works-details/${workId}`);
  };
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue mb-4">
          Subcontracted Works
        </h2>
        <Link to="/create-subcontracted-works">
          <CirclePlus
            className="text-blue cursor-pointer hover:scale-105"
            size={28}
          />
        </Link>
      </div>
      <div className="overflow-x-auto rounded-lg shadow-md mt-3">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="blue text-white">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Task Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Task Description
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Task Cost (Labor)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Task Cost (Overhead)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer Name
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer ID Number
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer Title
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer Daily Rate
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer Weekly Rate
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                Laborer M-Pesa Number
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {works.map((work) => (
              <tr
                key={work.id}
                className="hover:bg-gray-100 transition duration-200 cursor-pointer"
                onClick={() => handleRowClick(work.id)}
              >
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.taskTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.taskDescription}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Ksh.{work.taskCostLabor.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Ksh.{work.taskCostOverhead.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.laborerName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.laborerIdNumber}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.laborerTitle}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Ksh. {work.laborerDailyRate.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  Ksh. {work.laborerWeeklyRate.toLocaleString()}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {work.laborerMpesaNumber}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubContractorsTable;
