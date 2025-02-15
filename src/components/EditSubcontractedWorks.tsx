import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { FaPencilAlt } from "react-icons/fa";

const EditSubcontractedWorks = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="flex-1 w-full blue hover:bg-blue-900 text-white cursor-pointer py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
        onClick={() => setOpen(true)}
      >
        <FaPencilAlt />
        <span>Edit Details</span>
      </button>
      <Dialog open={open} onClose={() => {}} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
            >
              <div className="flex justify-between items-center gap-7 mt-4 px-4">
                <h2 className="text-xl md:text-2xl font-bold text-blue">
                  Edit Subcontraced Works
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-blue cursor-pointer" />
                </button>
              </div>
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <div>
                  <form className="space-y-2">
                    <div>
                      <label
                        htmlFor="task-title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Task Title
                      </label>
                      <input
                        type="text"
                        id="task-title"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="task-description"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Task Description
                      </label>
                      <textarea
                        id="task-description"
                        rows={3}
                        className="project-modal-input"
                      ></textarea>
                    </div>
                    <div>
                      <label
                        htmlFor="task-cost-labor"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Task Cost Labour
                      </label>
                      <input
                        type="number"
                        id="task-cost-labour"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="task-cost-overhead"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Task Cost Overhead
                      </label>
                      <input
                        type="text"
                        id="task-cost-overhead"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer Name
                      </label>
                      <input
                        type="text"
                        id="labourer-name"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-id"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer ID Number
                      </label>
                      <input
                        type="text"
                        id="labourer-id"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer Title
                      </label>
                      <select
                        id="labourer-title"
                        className="project-modal-input pr-2"
                      >
                        <option value=""></option>
                        <option value="person1">Mason</option>
                        <option value="person2">Casual</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-daily-rate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer Daily Rate
                      </label>
                      <input
                        type="text"
                        id="labourer-daily-rate"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-weekly-rate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer Weekly Rate
                      </label>
                      <input
                        type="text"
                        id="labourer-weekly-rate"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="labourer-number"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Labourer Mpesa Number
                      </label>
                      <input
                        type="text"
                        id="labourer-mpesa-number"
                        className="project-modal-input"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-900 transition duration-300"
                    >
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default EditSubcontractedWorks;
