import { FaTrash } from "react-icons/fa";
import { BadgeCheck, CircleCheck, CircleDollarSign, UserRound } from "lucide-react";
import EditSubcontractedWorks from "../components/EditSubcontractedWorks";

export default function SubcontractedWorkDetails() {

  // Example subcontracted work data (fetch this from the backend using the ID)
  const subcontractedWork = {
    id: 1,
    taskTitle: "Foundation Work",
    taskDescription: "Excavation and concrete pouring for foundation",
    taskCostLabor: 5000,
    taskCostOverhead: 1000,
    laborerName: "James Brown",
    laborerIdNumber: "12345678",
    laborerTitle: "Mason",
    laborerDailyRate: 1500,
    laborerWeeklyRate: 7500,
    laborerMpesaNumber: "0712345678",
    contractorReview: "Work was completed on time and to a high standard.",
    consultantReview: "No major issues were observed during inspection.",
  };

  // Handle remove laborer
  const handleRemoveLaborer = () => {
    console.log("Remove laborer clicked");
  };

  // Handle approve works
  const handleApproveWorks = () => {
    console.log("Approve works clicked");
  };

  // Handle approve works and payment
  const handleApproveWorksAndPayment = () => {
    console.log("Approve works and payment clicked");
  };

  // Handle approve payment
  const handleApprovePayment = () => {
    console.log("Approve payment clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Subcontracted Work Details</h1>
      </header>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white lg:h-[460px] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4">
          <header className="border-b pb-4">
            <h2 className="text-xl text-blue font-semibold">
              {subcontractedWork.taskTitle}
            </h2>
            <p className="text-sm mt-2">{subcontractedWork.taskDescription}</p>
          </header>

          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Labor)</span>
              <span className="font-medium">
                Ksh. {subcontractedWork.taskCostLabor.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Overhead)</span>
              <span className="font-medium">
                Ksh. {subcontractedWork.taskCostOverhead.toLocaleString()}
              </span>
            </div>
          </section>

          <section className="bg-gray-50 p-4 rounded-lg space-y-3">
            <div className="flex items-center space-x-3">
              <UserRound />
              <div>
                <h3 className="font-medium">{subcontractedWork.laborerName}</h3>
                <p className="text-sm">{subcontractedWork.laborerTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">ID Number</p>
                <p className="font-medium">
                  {subcontractedWork.laborerIdNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-600">M-Pesa Number</p>
                <p className="font-medium">
                  {subcontractedWork.laborerMpesaNumber}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Daily Rate</p>
                <p className="font-medium">
                  Ksh. {subcontractedWork.laborerDailyRate.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Weekly Rate</p>
                <p className="font-medium">
                  Ksh. {subcontractedWork.laborerWeeklyRate.toLocaleString()}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <EditSubcontractedWorks />
            <button
              className="flex-1 border border-red-500 hover:bg-red-50 text-red-500 cursor-pointer py-2 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
              onClick={handleRemoveLaborer}
            >
              <FaTrash />
              <span>Remove Labourer</span>
            </button>
          </div>
        </div>

        <div>
          <div className="bg-white p-6 lg:h-[460px] rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold text-primary mb-4">
              Proof of Work Done
            </h2>

            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-blue mb-4">Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <form>
              <label
                htmlFor="supervisor-review"
                className="block text-sm font-medium text-gray-800 mb-1"
              >
                Contractor's Supervisor Review
              </label>

              <textarea
                id="supervisor-review"
                rows={3}
                className="project-modal-input"
              ></textarea>
              <button className="w-full md:w-[200px] mt-2 blue text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200">Submit</button>
            </form>
          </div>
          <div>
            <form>
            <label
              htmlFor="supervisor-review"
              className="block text-sm font-medium text-gray-800 mb-1"
            >
              Consultant's Supervisor Review
            </label>

            <textarea
              id="supervisor-review"
              rows={3}
              className="project-modal-input"
            ></textarea>
            <button className="w-full md:w-[200px] mt-2 blue text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200">Submit</button>
            </form>
          </div>
        </div>
      </div>

      {/* Approval Buttons */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-blue mb-4">Approval Section</h2>
          <div className="flex flex-col md:flex-row flex-wrap gap-4">
          <button
            className="w-full md:w-[200px] flex items-center justify-center bg-green-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
            onClick={handleApproveWorks}
          >
            <CircleCheck className="mr-2" /> Approve Works
          </button>
          <button
            className="w-full md:w-[300px] flex items-center justify-center bg-blue-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
            onClick={handleApproveWorksAndPayment}
          >
            <BadgeCheck className="mr-2" /> Approve Works & Payment
          </button>
          <button
            className="w-full md:w-[200px] flex items-center justify-center bg-purple-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-purple-900 transition duration-200"
            onClick={handleApprovePayment}
          >
            <CircleDollarSign className="mr-2" /> Approve Payment
          </button>
          </div>
        </div>
    </div>
  );
}
