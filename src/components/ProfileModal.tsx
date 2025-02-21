import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { X, UserRound } from "lucide-react";

const ProfileModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <li
        className="flex items-center p-3 rounded-lg hover:bg-gray-100 transition-all transform hover:translate-x-2 cursor-pointer"
        onClick={() => setOpen(true)}
      >
        <UserRound className="text-blue" />
        <span className="ml-2 font-semibold text-blue">Profile</span>
      </li>
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
                  User Profile
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gray-100 p-2 hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-blue cursor-pointer" />
                </button>
              </div>
              <div className="bg-white px-4 pt-3 pb-4 sm:p-6 sm:pb-4">
                <div className="flex flex-col gap-5 mt-4">
                  <div className="flex justify-between border-b border-gray-300 pb-3">
                    <p>Name</p>
                    <p className="font-semibold">Doctor Strange</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-3">
                    <p>Role</p>
                    <p className="font-semibold">Main Contractor</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-3">
                    <p>Email</p>
                    <p className="font-semibold">docstrange@yahoo.com</p>
                  </div>
                  <div className="flex justify-between border-b border-gray-300 pb-3">
                    <p>Phone Number</p>
                    <p className="font-semibold">0712345678</p>
                  </div>
                  <div className="flex justify-between pb-5">
                    <p>Delete Account</p>
                    <button className="cursor-pointer bg-red-500 hover:bg-red-400 transition-colors text-white py-2 px-4 rounded-xl">Delete</button>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default ProfileModal;
