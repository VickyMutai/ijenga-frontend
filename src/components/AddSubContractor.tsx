import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { MdPersonAdd } from "react-icons/md";

const AddSubcontractor = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="hidden md:flex items-center gap-2 green hover:bg-green-700 text-white py-2 px-4 rounded-md transition-all transform hover:scale-105 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MdPersonAdd size={24} />
        <span>Add Subcontractor</span>
      </button>
      <button
        className="block md:hidden green hover:bg-green-700 text-white py-2 px-4 rounded-md gap-2 transition-all transform hover:scale-105 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MdPersonAdd size={24} />
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
                  Add Subcontractor
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
                        htmlFor="subcontractor-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subcontractor Name
                      </label>
                      <input
                        type="text"
                        id="subcontractor-name"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        id="email"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Phone Number
                      </label>
                      <input
                        type="number"
                        id="phone"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="project"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Project
                      </label>
                      <input
                        type="text"
                        id="project"
                        className="project-modal-input"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full mt-4 cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-900 transition duration-300"
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

export default AddSubcontractor;
