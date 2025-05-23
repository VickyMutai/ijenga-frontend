import { useState, useEffect } from "react";
import Select, { MultiValue } from "react-select";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { fetchProjectDetails, updateProject } from "../reducers/projectReducer";
import { fetchUsers } from "../reducers/authReducer";
import { useParams } from "react-router-dom";

export default function EditProjectDetails() {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = useState(false);
  const { projectId } = useParams<{ projectId: string }>();

  const { selectedProject } = useSelector((state: RootState) => state.projects);
  const { users } = useSelector((state: RootState) => state.auth);

  interface SubcontractorOption {
    value: string;
    label: string;
  }

  const [formData, setFormData] = useState({
    project_name: "",
    project_location: "",
    project_description: "",
    supervisor_contractor: [] as string[],
    supervisor_consultant: [] as string[],
    subcontractor: [] as string[],
  });

  useEffect(() => {
    if (selectedProject) {
      setFormData({
        project_name: selectedProject.projectName || "",
        project_location: selectedProject.projectLocation || "",
        project_description: selectedProject.projectDescription || "",
        supervisor_contractor: Array.isArray(
          selectedProject.supervisorContractor
        )
          ? selectedProject.supervisorContractor
          : selectedProject.supervisorContractor
          ? [selectedProject.supervisorContractor]
          : [],
        supervisor_consultant: Array.isArray(
          selectedProject.supervisorConsultant
        )
          ? selectedProject.supervisorConsultant
          : selectedProject.supervisorConsultant
          ? [selectedProject.supervisorConsultant]
          : [],
        subcontractor: Array.isArray(selectedProject.subcontractors)
          ? selectedProject.subcontractors
          : [],
      });
    }
  }, [selectedProject]);

  useEffect(() => {
    if (open) {
      dispatch(fetchUsers());
    }
  }, [open, dispatch]);

  const supervisorContractors = users.filter(
    (user) => user.role === "contractors-supervisor"
  );
  const supervisorConsultants = users.filter(
    (user) => user.role === "consultants-supervisor"
  );
  const subcontractors = users.filter((user) => user.role === "subcontractor");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectId) {
      return;
    }

    const updatedProjectData = {
      ...formData,
      supervisor_contractor:
        formData.supervisor_contractor.length > 0
          ? formData.supervisor_contractor
          : [],
      supervisor_consultant:
        formData.supervisor_consultant.length > 0
          ? formData.supervisor_consultant
          : [],
      subcontractors:
        formData.subcontractor.length > 0 ? formData.subcontractor : [],
    };

    const result = await dispatch(
      updateProject({ projectId, projectData: updatedProjectData })
    );

    if (updateProject.fulfilled.match(result)) {
      dispatch(fetchProjectDetails(projectId));
    }

    setOpen(false);
  };

  return (
    <div>
      <button
        className="flex items-center green text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <FaPencilAlt className="mr-2" /> Edit Project Details
      </button>
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
              <div className="flex justify-between items-center gap-7 mt-4 px-4">
                <h2 className="text-xl md:text-2xl font-bold text-blue">
                  Edit Project Details
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-blue cursor-pointer" />
                </button>
              </div>
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <form onSubmit={handleSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    disabled
                    name="project_name"
                    value={formData.project_name}
                    className="project-modal-input bg-gray-100 cursor-not-allowed"
                  />
                  <input
                    type="text"
                    disabled
                    name="project_location"
                    value={formData.project_location}
                    className="project-modal-input bg-gray-100 cursor-not-allowed resize-none"
                  />
                  <textarea
                    name="project_description"
                    disabled
                    value={formData.project_description}
                    rows={3}
                    className="project-modal-input bg-gray-100 cursor-not-allowed resize-none"
                  ></textarea>

                  <label>Select Subcontractors</label>
                  <Select
                    isMulti
                    options={
                      subcontractors.map((sub) => ({
                        value: sub.user_id,
                        label: `${sub.first_name} ${sub.last_name}`,
                      })) as SubcontractorOption[]
                    }
                    value={
                      formData.subcontractor.map((id) => {
                        const sub = subcontractors.find(
                          (s) => s.user_id === id
                        );
                        return {
                          value: id,
                          label: sub
                            ? `${sub.first_name} ${sub.last_name}`
                            : "Unknown",
                        };
                      }) as SubcontractorOption[]
                    }
                    onChange={(selected: MultiValue<SubcontractorOption>) =>
                      setFormData({
                        ...formData,
                        subcontractor: selected.map((s) => s.value) as string[], // Ensure it's an array
                      })
                    }
                    placeholder="Search and select subcontractors..."
                  />

                  <label>Select Supervisor-Contractors</label>
                  <Select
                    isMulti
                    options={supervisorContractors.map((user) => ({
                      value: user.user_id,
                      label: `${user.first_name} ${user.last_name}`,
                    }))}
                    value={formData.supervisor_contractor.map((id) => {
                      const supervisor = supervisorContractors.find(
                        (user) => user.user_id === id
                      );
                      return {
                        value: id,
                        label: supervisor
                          ? `${supervisor.first_name} ${supervisor.last_name}`
                          : "Unknown",
                      };
                    })}
                    onChange={(
                      selected: MultiValue<{ value: string; label: string }>
                    ) =>
                      setFormData({
                        ...formData,
                        supervisor_contractor: selected.map((s) => s.value),
                      })
                    }
                    placeholder="Search and select supervisor-contractors..."
                  />

                  <label>Select Supervisor-Consultants</label>
                  <Select
                    isMulti
                    options={supervisorConsultants.map((user) => ({
                      value: user.user_id,
                      label: `${user.first_name} ${user.last_name}`,
                    }))}
                    value={formData.supervisor_consultant.map((id) => {
                      const supervisor = supervisorConsultants.find(
                        (user) => user.user_id === id
                      );
                      return {
                        value: id,
                        label: supervisor
                          ? `${supervisor.first_name} ${supervisor.last_name}`
                          : "Unknown",
                      };
                    })}
                    onChange={(
                      selected: MultiValue<{ value: string; label: string }>
                    ) =>
                      setFormData({
                        ...formData,
                        supervisor_consultant: selected.map((s) => s.value),
                      })
                    }
                    placeholder="Search and select supervisor-consultants..."
                  />

                  <button
                    type="submit"
                    className="w-full mt-6 bg-green-600 text-white p-2 rounded-lg hover:bg-green-800 transition duration-300 cursor-pointer"
                  >
                    Save Changes
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
