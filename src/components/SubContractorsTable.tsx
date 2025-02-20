import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchUserProfile } from "../reducers/authReducer";
import { useEffect } from "react";

interface SubcontractedWork {
    id: number;
    taskTitle: string;
    taskDescription: string;
    taskCostLabor: number;
    taskCostOverhead: number;
  }

  interface SubcontractedWorksTableProps {
    works: SubcontractedWork[];
  }
const SubContractorsTable = ({works}: SubcontractedWorksTableProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!user) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, user]); 

  const canAddSubcontractedWork = user?.role === "contractors-supervisor" || user?.role === "subcontractor";

  const handleRowClick = (workId: number) => {
    navigate(`/subcontracted-works-details/${workId}`);
  };
  
  return (
    <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue mb-4">
          Subcontracted Works
        </h2>
        {canAddSubcontractedWork && (
          <Link to="/create-subcontracted-works">
            <CirclePlus
              className="text-blue cursor-pointer hover:scale-105"
              size={28}
            />
          </Link>
        )}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubContractorsTable;
