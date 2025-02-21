import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { CirclePlus ,X } from "lucide-react";

const AddLaborerDetails = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <CirclePlus
        type="button"
        onClick={() => setOpen(true)}
        className="text-blue cursor-pointer hover:scale-105"
        size={28}
      />
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
                  Add Laborer Details
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
                        htmlFor="laborer-name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Laborer Name
                      </label>
                      <input
                        type="text"
                        id="laborer-name"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="id-number"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        ID Number
                      </label>
                      <input
                        type="number"
                        id="id-number"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="title"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        id="title"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="daily-rate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Daily Rate
                      </label>
                      <input
                        type="number"
                        id="daily-rate"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="weekly-rate"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Weekly Rate
                      </label>
                      <input
                        type="number"
                        id="weekly-rate"
                        className="project-modal-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="mpesa-number"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Mpesa Number
                      </label>
                      <input
                        type="number"
                        id="mpesa-number"
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

export default AddLaborerDetails;
