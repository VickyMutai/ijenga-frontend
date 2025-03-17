import { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { editSubcontractedWork } from "../reducers/subcontractedWorksReducer";
import { fetchUsers } from "../reducers/authReducer";

const EditSubcontractedWorks = ({ workId }: { workId: string }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { selectedWork } = useSelector(
    (state: RootState) => state.subcontractedWorks
  );
useEffect(() => {
  dispatch(fetchUsers());
}, [dispatch]);


  const [formData, setFormData] = useState({
    task_title: "",
    task_description: "",
    task_cost_labor: "",
    task_cost_overhead: "",
    assigned_subcontractor: "",
  });

  const users = useSelector((state: RootState) => state.auth.users);
  const subcontractors = users.filter((user) => user.role === "subcontractor");

  useEffect(() => {
    if (selectedWork) {
      setFormData({
        task_title: selectedWork.task_title || "",
        task_description: selectedWork.task_description || "",
        task_cost_labor: selectedWork.task_cost_labor.toString() || "",
        task_cost_overhead: selectedWork.task_cost_overhead.toString() || "",
        assigned_subcontractor: selectedWork.assigned_subcontractor || "",
      });
    }
  }, [selectedWork]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(editSubcontractedWork({ workId, updatedData: formData }));
    setOpen(false);
  };

  return (
    <div>
      <button
        className="bg-[#1D3557] hover:bg-[#14253d] text-white px-4 py-2 rounded-full transition-all duration-300 transform cursor-pointer hover:scale-105 flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <FaPencilAlt />
        <span className="hidden md:block">Edit Works</span>
        <span className="block md:hidden">Edit</span>
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        className="relative z-10"
      >
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-blue">
                Edit Subcontracted Work
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5 text-blue" />
              </button>
            </div>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  id="task_title"
                  className="project-modal-input"
                  value={formData.task_title}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Description
                </label>
                <textarea
                  id="task_description"
                  rows={3}
                  className="project-modal-input"
                  value={formData.task_description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Cost Labour
                </label>
                <input
                  type="number"
                  id="task_cost_labor"
                  className="project-modal-input"
                  value={formData.task_cost_labor}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Cost Overhead
                </label>
                <input
                  type="number"
                  id="task_cost_overhead"
                  className="project-modal-input"
                  value={formData.task_cost_overhead}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Assigned Subcontractor
                </label>
                <select
                  id="assigned_subcontractor"
                  className="project-modal-input"
                  value={formData.assigned_subcontractor}
                  onChange={handleChange}
                >
                  <option value="">Select Subcontractor</option>
                  {subcontractors.map((sub) => (
                    <option key={sub.user_id} value={sub.user_id}>
                      {sub.first_name} {sub.last_name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded-lg hover:bg-green-900"
              >
                Save Changes
              </button>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default EditSubcontractedWorks;
