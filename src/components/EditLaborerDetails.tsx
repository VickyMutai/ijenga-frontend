/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import { editLabourer, fetchLabourers } from "../reducers/labourerReducer";
import { fetchSubcontractedWorkDetails } from "../reducers/subcontractedWorksReducer";

const EditLaborerDetails = ({ labourer }: { labourer: any }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const selectedWork = useSelector(
    (state: RootState) => state.subcontractedWorks.selectedWork
  );
  const [formData, setFormData] = useState({
    labourer_name: labourer.labourer_name,
    national_id_number: labourer.national_id_number,
    labourer_title: labourer.labourer_title,
    labourer_daily_rate: labourer.labourer_daily_rate,
    labourer_mpesa_number: labourer.labourer_mpesa_number,
    labourer_overhead_cost: labourer.labourer_overhead_cost,
    number_of_days_worked: labourer.number_of_days_worked,
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(
      editLabourer({ labourer_id: labourer.labourer_id, updatedData: formData })
    );

    if (selectedWork) {
      dispatch(
        fetchSubcontractedWorkDetails({
          projectId: selectedWork.project,
          workId: selectedWork.id,
        })
      );
      dispatch(fetchLabourers(selectedWork.id));
    }

    setOpen(false);
  };
  return (
    <div>
      <button
        className="hover:text-blue-600 transition duration-200 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <FaPencilAlt className="w-6 h-6" />
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
                Edit Laborer Details
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full"
              >
                <X className="w-5 h-5 text-blue" />
              </button>
            </div>
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <input
                type="text"
                id="labourer_name"
                value={formData.labourer_name}
                onChange={handleChange}
                className="project-modal-input"
              />
              <input
                type="text"
                id="national_id_number"
                value={formData.national_id_number}
                onChange={handleChange}
                className="project-modal-input"
              />
              <input
                type="text"
                id="labourer_title"
                value={formData.labourer_title}
                onChange={handleChange}
                className="project-modal-input"
              />
              <input
                type="number"
                id="labourer_daily_rate"
                value={formData.labourer_daily_rate}
                onChange={handleChange}
                className="project-modal-input"
              />
              <input
                type="text"
                id="labourer_mpesa_number"
                value={formData.labourer_mpesa_number}
                onChange={handleChange}
                className="project-modal-input"
              />
              <input
                type="text"
                id="number_of_days_worked"
                value={formData.number_of_days_worked}
                onChange={handleChange}
                className="project-modal-input"
              />{" "}
              <input
                type="text"
                id="labourer_overhead_cost"
                value={formData.labourer_overhead_cost}
                onChange={handleChange}
                className="project-modal-input"
              />
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

export default EditLaborerDetails;
