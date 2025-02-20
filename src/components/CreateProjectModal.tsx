import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { CirclePlus, X } from "lucide-react";
import { AppDispatch, RootState } from "../reducers/store";
import { createProject, fetchProjects } from "../reducers/projectReducer";
import { fetchUsers } from "../reducers/authReducer";

export default function CreateProjectModal() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    project_name: "",
    project_location: "",
    project_description: "",
    supervisor_contractor: "",
    supervisor_consultant: "",
  });

  useEffect(() => {
    if (open) {
      dispatch(fetchUsers());
    }
  }, [open, dispatch]);

  const { users, loading } = useSelector((state: RootState) => state.auth);

  const supervisorContractors = Array.isArray(users)
  ? users.filter(user => user.role?.trim().toLowerCase() === "contractors-supervisor")
  : [];

  const supervisorConsultants = Array.isArray(users)
    ? users.filter(user => user.role?.trim().toLowerCase() === "consultants-supervisor")
    : [];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const resultAction = await dispatch(createProject(formData));
  
    if (createProject.fulfilled.match(resultAction)) {
      dispatch(fetchProjects()); 
    }
  
    setOpen(false);
  };
  

  return (
    <div>
      <CirclePlus
        type="button"
        onClick={() => setOpen(true)}
        className="text-blue cursor-pointer hover:scale-105"
        size={28}
      />
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex justify-between items-center gap-16 mt-4 px-4">
                <h2 className="text-xl md:text-2xl font-bold text-blue">Create Project</h2>
                <button onClick={() => setOpen(false)} className="rounded-full bg-gray-100 p-2 hover:bg-gray-200">
                  <X className="h-5 w-5 text-blue cursor-pointer" />
                </button>
              </div>
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input type="text" name="project_name" value={formData.project_name} onChange={handleChange} className="project-modal-input" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Location</label>
                    <input type="text" name="project_location" value={formData.project_location} onChange={handleChange} className="project-modal-input" required />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Description</label>
                    <textarea name="project_description" value={formData.project_description} onChange={handleChange} rows={3} className="project-modal-input"></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Supervisor-Contractor</label>
                    <select name="supervisor_contractor" value={formData.supervisor_contractor} onChange={handleChange} className="project-modal-input pr-2">
                      <option value="">Select</option>
                      {loading ? <option>Loading...</option> : supervisorContractors.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assign Supervisor-Consultant</label>
                    <select name="supervisor_consultant" value={formData.supervisor_consultant} onChange={handleChange} className="project-modal-input pr-2">
                      <option value="">Select</option>
                      {loading ? <option>Loading...</option> : supervisorConsultants.map((user) => (
                        <option key={user.user_id} value={user.user_id}>
                          {user.first_name} {user.last_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className="w-full cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-800 transition duration-300">
                    Submit
                  </button>
                </form>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
