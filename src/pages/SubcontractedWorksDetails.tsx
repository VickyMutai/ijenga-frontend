import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../reducers/store";
import {
  fetchSubcontractedWorkDetails,
  addContractorComment,
  addConsultantComment,
  approveConsultant,
  approveContractorSupervisor,
  approveMainContractor,
} from "../reducers/subcontractedWorksReducer";
import { fetchLabourers } from "../reducers/labourerReducer";
import { fetchProofOfWorks } from "../reducers/proofOfWorksReducer";
import AddLaborerDetails from "../components/AddLaborerDetails";
import Loader from "../components/Loader";
import { FaTrashCan } from "react-icons/fa6";
import { BadgeCheck, CircleCheck, CircleDollarSign } from "lucide-react";
import EditLaborerDetails from "../components/EditLaborerDetails";
import EditSubcontractedWorks from "../components/EditSubcontractedWorks";
import Sidebar from "../components/Sidebar";
import ProofOfWorkModal from "../components/proofOfWorkModal";
import { constants, ROLES } from "../helpers/constants";

export default function SubcontractedWorkDetails() {
  const params = useParams();
  const { projectId, id: workId } = params as { projectId: string; id: string };
  const dispatch = useDispatch<AppDispatch>();
  const { selectedWork, loading } = useSelector(
    (state: RootState) => state.subcontractedWorks
  );
  const [contractorReview, setContractorReview] = useState("");
  const [consultantReview, setConsultantReview] = useState("");
  const { labourers = [] } = useSelector((state: RootState) => state.labourers);
  const proofOfWorks = useSelector(
    (state: RootState) => state.proofOfWorks.proofOfWorks || []
  );
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const userRole = useSelector((state: RootState) => state.auth.user?.role);

  useEffect(() => {
    dispatch(fetchLabourers(workId));
    dispatch(fetchProofOfWorks(workId));
  }, [dispatch, workId, projectId]);

  useEffect(() => {
    if (projectId && workId) {
      dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
    } else {
      console.error("Missing Project ID or Work ID");
    }
  }, [dispatch, projectId, workId]);

  useEffect(() => {
    console.log("Selected Work Details in Redux:", selectedWork);
  }, [selectedWork]);

  if (loading) return <Loader />;
  if (!selectedWork) return <p>Subcontracted work not found</p>;

  const handleSubmitContractorReview = async () => {
    if (!contractorReview.trim()) return;
    await dispatch(addContractorComment({ workId, comment: contractorReview }));
    setContractorReview("");
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
  };

  const handleSubmitConsultantReview = () => {
    if (!consultantReview.trim()) return;
    dispatch(addConsultantComment({ workId, comment: consultantReview })).then(
      () => setConsultantReview("")
    );
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
  };

  const handleApproveContractorSupervisor = async () => {
    if (!selectedWork.consultant_approval) {
      alert("Consultant must approve first before the supervisor can approve.");
      return;
    }
    await dispatch(approveContractorSupervisor(workId));
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
  };

  const handleApproveConsultant = async () => {
    await dispatch(approveConsultant(workId));
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
  };

  const handleApproveMainContractor = async () => {
    if (
      !selectedWork.contractor_supervisor_approval ||
      !selectedWork.consultant_approval
    ) {
      alert(
        "Supervisor and Consultant must approve before the main contractor can approve."
      );
      return;
    }
    await dispatch(approveMainContractor(workId));
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId }));
  };

  const handleRemoveLaborer = () => {
    console.log("Remove laborer clicked");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="py-4 px-6  flex flex-col-reverse lg:flex-row lg:justify-between gap-4">
        <h1 className=" text-xl md:text-2xl font-bold">
          Subcontracted Work Details
        </h1>
        <Sidebar />
      </header>

      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4 mb-10">
          <header className="border-b pb-4">
            <h2 className="text-xl text-blue font-semibold">
              {selectedWork.task_title}
            </h2>
            <p className="text-sm mt-2">{selectedWork.task_description}</p>
            <p className="text-sm mt-2">
              Task Category: {selectedWork.task_category}
            </p>
          </header>

          <section className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Labor)</span>
              <span className="font-medium">
                Ksh. {selectedWork.task_cost_labor}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Task Cost (Overhead)</span>
              <span className="font-medium">
                Ksh. {selectedWork.task_cost_overhead}
              </span>
            </div>
          </section>

          {userRole === ROLES.SUBCONTRACTOR && (
            <>
              <AddLaborerDetails />
              <button
                className="hover:text-red-600 transition duration-200 cursor-pointer"
                onClick={handleRemoveLaborer}
              >
                <FaTrashCan className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="mt-6 flex space-x-4">
            <EditSubcontractedWorks workId={workId} />{" "}
          </div>

          <section className="overflow-x-auto rounded-lg shadow-md mt-3">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="blue text-white">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Laborer Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    ID Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Daily Rate
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Mpesa No.
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {labourers.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-gray-600">
                      No labourers available
                    </td>
                  </tr>
                ) : (
                  labourers.map((labourer) => (
                    <tr
                      key={labourer.labourer_id}
                      className="hover:bg-gray-100 transition duration-200"
                    >
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.labourer_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.national_id_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.labourer_title}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        Ksh. {labourer.labourer_daily_rate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.labourer_mpesa_number}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-7">
                          <EditLaborerDetails />
                          <button
                            className="hover:text-red-600 transition duration-200 cursor-pointer"
                            onClick={handleRemoveLaborer}
                          >
                            <FaTrashCan className="w-6 h-6" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full md:w-1/2">
            {(userRole === ROLES.SUPERVISOR_CONSULTANT ||
              userRole === ROLES.SUPERVISOR_CONTRACTOR) && (
              <div>
                <h2 className="text-xl font-semibold text-blue mb-4">
                  Proof of Work Done
                </h2>
                <button
                  onClick={() => setIsProofModalOpen(true)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition"
                >
                  Upload Proof of Work
                </button>
                <ProofOfWorkModal
                  workId={workId}
                  isOpen={isProofModalOpen}
                  onClose={() => setIsProofModalOpen(false)}
                />
              </div>
            )}
            <div className="mt-6 space-y-4">
              {proofOfWorks.length === 0 ? (
                <p className="text-gray-600">No proof of work uploaded yet.</p>
              ) : (
                proofOfWorks.map((proof) => (
                  <div
                    key={proof.image_id}
                    className="border p-4 rounded-lg flex gap-4"
                  >
                    <img
                      src={`${constants.BASE_URL}${proof.image_file}`}
                      alt="Proof of Work"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-gray-700">{proof.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          <ProofOfWorkModal
            workId={workId}
            isOpen={isProofModalOpen}
            onClose={() => setIsProofModalOpen(false)}
          />
          {userRole !== ROLES.SUBCONTRACTOR && (
            <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-1/2">
              <h2 className="text-xl font-semibold text-blue mb-4">Reviews</h2>

              {/* Contractor's Supervisor Review */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Contractor's Supervisor Review
                </label>
                <p className="bg-gray-100 p-3 rounded-lg">
                  {selectedWork.contractor_supervisor_comments || (
                    <span className="text-gray-500">No review yet.</span>
                  )}
                </p>

                {userRole === ROLES.SUPERVISOR_CONTRACTOR &&
                  !selectedWork.contractor_supervisor_comments && (
                    <>
                      <textarea
                        rows={3}
                        value={contractorReview}
                        onChange={(e) => setContractorReview(e.target.value)}
                        className="w-full p-2 border rounded-lg mt-2"
                        placeholder="Write a review..."
                      ></textarea>
                      <button
                        onClick={handleSubmitContractorReview}
                        className="w-full md:w-[200px] mt-2 bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
                      >
                        Submit
                      </button>
                    </>
                  )}
              </div>

              {/* Consultant's Supervisor Review */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Consultant's Supervisor Review
                </label>
                <p className="bg-gray-100 p-3 rounded-lg">
                  {selectedWork.consultant_supervisor_comments || (
                    <span className="text-gray-500">No review yet.</span>
                  )}
                </p>

                {userRole === ROLES.SUPERVISOR_CONSULTANT &&
                  !selectedWork.consultant_supervisor_comments && (
                    <>
                      <textarea
                        rows={3}
                        value={consultantReview}
                        onChange={(e) => setConsultantReview(e.target.value)}
                        className="w-full p-2 border rounded-lg mt-2"
                        placeholder="Write a review..."
                      ></textarea>
                      <button
                        onClick={handleSubmitConsultantReview}
                        className="w-full md:w-[200px] mt-2 bg-blue-600 text-white cursor-pointer py-2 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
                      >
                        Submit
                      </button>
                    </>
                  )}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-14 flex flex-col items-center">
        <h2 className="text-xl font-semibold text-blue mb-4">
          Approval Section
        </h2>
        <div className="flex flex-col md:flex-row flex-wrap gap-4">
          {/* Consultant Approval */}
          {userRole === ROLES.SUPERVISOR_CONSULTANT &&
            !selectedWork.consultant_approval && (
              <button
                className="w-full md:w-[200px] flex items-center justify-center bg-blue-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
                onClick={handleApproveConsultant}
              >
                <BadgeCheck className="mr-2" /> Approve as Consultant
              </button>
            )}
          {selectedWork.consultant_approval && (
            <p className="text-green-700 font-semibold">
              ✅ Approved by Consultant
            </p>
          )}

          {/* Supervisor Approval (Only if Consultant has approved) */}
          {userRole === ROLES.SUPERVISOR_CONTRACTOR &&
            selectedWork.consultant_approval && (
              <button
                className="w-full md:w-[200px] flex items-center justify-center bg-green-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
                onClick={handleApproveContractorSupervisor}
              >
                <CircleCheck className="mr-2" /> Approve as Supervisor
              </button>
            )}
          {selectedWork.contractor_supervisor_approval && (
            <p className="text-green-700 font-semibold">
              ✅ Approved by Supervisor
            </p>
          )}

          {/* Supervisor Approval for Work & Payment (Only if Consultant has approved) */}
          {userRole === ROLES.SUPERVISOR_CONTRACTOR &&
            selectedWork.consultant_approval &&
            !selectedWork.contractor_supervisor_payment_approval && (
              <button
                className="w-full md:w-[300px] flex items-center justify-center bg-green-800 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
                onClick={handleApproveContractorSupervisor}
              >
                <BadgeCheck className="mr-2" /> Approve Work & Payment
              </button>
            )}
          {selectedWork.contractor_supervisor_payment_approval && (
            <p className="text-green-700 font-semibold">
              ✅ Supervisor Approved Work & Payment
            </p>
          )}

          {userRole === ROLES.MAIN_CONTRACTOR &&
            selectedWork.contractor_supervisor_approval &&
            selectedWork.consultant_approval &&
            !selectedWork.main_contractor_cost_approval && (
              <button
                className="w-full md:w-[200px] flex items-center justify-center bg-purple-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-purple-900 transition duration-200"
                onClick={handleApproveMainContractor}
              >
                <CircleDollarSign className="mr-2" /> Approve as Main Contractor
              </button>
            )}
          {selectedWork.main_contractor_cost_approval && (
            <p className="text-green-700 font-semibold">
              ✅ Approved by Main Contractor
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
