import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X } from "lucide-react";
import { MdAdd } from "react-icons/md";
import Select from "react-select";

interface AssignLaborerProjectProps {
  onClose: () => void;
  onSave: (selectedProjects: number[]) => void;
}

const AssignLaborerProject = ({
  onClose,
  onSave,
}: AssignLaborerProjectProps) => {
  const [open, setOpen] = useState(false);
  const dummyProjects = [
    { id: 1, name: "Alpha Builders" },
    { id: 2, name: "Beta Contractors" },
    { id: 3, name: "Gamma Engineers" },
    { id: 4, name: "Delta Constructions" },
    { id: 5, name: "Epsilon Works" },
  ];

  const [selectedProjects, setSelectedProjects] = useState<
    { value: number; label: string }[]
  >([]);

  const handleSave = () => {
    onSave(selectedProjects.map((proj) => proj.value));
    onClose();
  };
  return (
    <div>
      <button
        className="hidden md:flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 transition-colors duration-200 transform hover:scale-105 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MdAdd />
        Assign Project
      </button>
      <button
        className="block md:hidden bg-blue-500 hover:bg-blue-600 text-white rounded-md px-3 py-2 transition-colors duration-200 transform hover:scale-105 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <MdAdd />
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
                  Assign Project
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
                  <form className="space-y-4">
                    <label className="block font-semibold">
                      Select Projects
                    </label>
                    <Select
                      isMulti
                      options={dummyProjects.map((proj) => ({
                        value: proj.id,
                        label: proj.name,
                      }))}
                      value={selectedProjects}
                      onChange={(newValue) =>
                        setSelectedProjects(
                          newValue as { value: number; label: string }[]
                        )
                      }
                      placeholder="Search and select projects..."
                      menuPortalTarget={document.body} // Ensures dropdown renders outside modal
                      menuPosition="fixed" // Keeps position correct
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }), // Ensures visibility
                      }}
                    />
                    <button
                      type="submit"
                      className="w-full mt-4 cursor-pointer bg-[#2ECC71] text-white p-2 rounded-lg hover:bg-green-900 transition duration-300"
                      onClick={handleSave}
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

export default AssignLaborerProject;
