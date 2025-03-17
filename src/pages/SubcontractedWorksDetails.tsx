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
  approveMainContractorCost,
  approveAttendance,
  requestRetentionMoney,
  approveRetentionMoney,
} from "../reducers/subcontractedWorksReducer";
import { deleteLabourer, fetchLabourers } from "../reducers/labourerReducer";
import { fetchProofOfWorks } from "../reducers/proofOfWorksReducer";
import AddLaborerDetails from "../components/AddLaborerDetails";
import Loader from "../components/Loader";
import { FaTrashCan } from "react-icons/fa6";
import {
  BadgeCheck,
  CircleCheck,
  CircleDollarSign,
  Upload,
  CheckCircle,
} from "lucide-react";
import EditLaborerDetails from "../components/EditLaborerDetails";
import EditSubcontractedWorks from "../components/EditSubcontractedWorks";
import Sidebar from "../components/Sidebar";
import ProofOfWorkModal from "../components/proofOfWorkModal";
import { constants, ROLES } from "../helpers/constants";
import BackButton from "../components/BackButton";

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
  const { users } = useSelector((state: RootState) => state.auth);

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

  const handleCostApprovalMainContractor = async () => {
    await dispatch(approveMainContractorCost(workId));
    dispatch(fetchSubcontractedWorkDetails({ projectId, workId })); // ✅ Refresh data
  };
  const handleApproveAttendance = async () => {
    try {
      await dispatch(approveAttendance(workId));
      dispatch(fetchSubcontractedWorkDetails({ projectId, workId })); // ✅ Refresh Data
    } catch (error) {
      console.error("Error approving attendance:", error);
    }
  };

  const assignedSubcontractor =
    selectedWork.assigned_subcontractor &&
    users.find((user) => user.user_id === selectedWork.assigned_subcontractor);

  const subcontractorName = assignedSubcontractor
    ? `${assignedSubcontractor.first_name} ${assignedSubcontractor.last_name}`
    : "Not Assigned";
  const paymentStatus = selectedWork.payment_status || "Unknown";
  const costApproval = selectedWork.main_contractor_cost_approval
    ? "Approved"
    : "Not Approved";
  const handleRemoveLaborer = (labourerId: string) => {
    dispatch(deleteLabourer(labourerId));
  };

  const handleRequestRetention = async () => {
    try {
      await dispatch(requestRetentionMoney(workId));
      alert("Retention money request submitted successfully.");
    } catch (error) {
      console.error("Error requesting retention money:", error);
    }
  };
  const handleApproveRetention = async () => {
    try {
      await dispatch(approveRetentionMoney(workId));
      alert("Retention money approved successfully.");
      dispatch(fetchSubcontractedWorkDetails({ projectId, workId })); // Refresh data
    } catch (error) {
      console.error("Error approving retention money:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <BackButton />
      <header className="py-4 px-6  flex flex-col-reverse lg:flex-row lg:justify-between gap-4">
        <h1 className=" text-xl md:text-2xl font-bold">
          Subcontracted Work Details
        </h1>
        <Sidebar />
      </header>

      <div className="mt-6">
        <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 space-y-4 mb-10">
          <div className="pb-4">
            <header className="mb-6 flex justify-between items-center">
              <h2 className="text-xl md:text-2xl text-blue font-semibold capitalize">
                {selectedWork.task_title}
              </h2>
              <EditSubcontractedWorks workId={workId} />
            </header>

            <p className="text-base mb-2 text-gray-800">{selectedWork.task_description}</p>
            <p className="text-sm text-gray-600 mb-4">
              Task Category:{" "}
              <span className="font-medium capitalize">
                {selectedWork.task_category}
              </span>
            </p>
            <div className="bg-gray-50 p-4 py-5 rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1 font-medium">
                  Assigned Subcontractor:
                </span>
                <span className="font-semibold text-[#1D3557] capitalize">
                  {subcontractorName}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1 font-medium">
                  Payment Status:
                </span>
                <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block w-fit capitalize">
                  {paymentStatus}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-600 text-sm mb-1 font-medium">
                  Cost Approval Status:
                </span>
                <span className="font-semibold text-green-700 bg-green-100 px-3 py-1 rounded-full inline-block w-fit capitalize">
                  {costApproval}
                </span>
              </div>
            </div>
          </div>

          <section className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <span className="text-gray-700 mb-2 text-base">Task Cost (Labor)</span>
                <span className="text-3xl font-bold text-[#1D3557] self-end mt-auto">
                  Ksh. {selectedWork.task_cost_labor}
                </span>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white p-5 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 flex flex-col">
                <span className="text-gray-700 mb-2 text-base">Task Cost (Overhead)</span>
                <span className="text-3xl font-bold text-[#1D3557] self-end mt-auto">
                  Ksh. {selectedWork.task_cost_overhead}
                </span>
              </div>
            </div>
          </section>
          <>
            <AddLaborerDetails />
          </>

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
                    Days Worked
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold uppercase">
                    Overhead Cost
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
                        {labourer.labourer_title
                          .replace(/_/g, " ")
                          .toLowerCase()
                          .replace(/\b\w/g, (char) => char.toUpperCase())}{" "}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-700">
                        Ksh. {labourer.labourer_daily_rate}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.labourer_mpesa_number}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.number_of_days_worked}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">
                        {labourer.labourer_overhead_cost}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-7">
                          {/* Pass the labourer object as a prop */}
                          <EditLaborerDetails labourer={labourer} />

                          <button
                            className="hover:text-red-600 transition duration-200 cursor-pointer"
                            onClick={() =>
                              handleRemoveLaborer(labourer.labourer_id)
                            }
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-blue mb-4">
                Proof of Work Done
              </h2>
              {(userRole === ROLES.SUPERVISOR_CONSULTANT ||
                userRole === ROLES.SUPERVISOR_CONTRACTOR) && (
                <>
                  <button
                    onClick={() => setIsProofModalOpen(true)}
                    className="bg-[#2ECC71] hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
                  >
                    <Upload />
                    <span>Upload Proof of Work</span>
                  </button>
                  <ProofOfWorkModal
                    workId={workId}
                    isOpen={isProofModalOpen}
                    onClose={() => setIsProofModalOpen(false)}
                  />
                </>
              )}
            </div>
            <div className="mt-6 space-y-4">
              {proofOfWorks.length === 0 ? (
                <p className="text-gray-600">No proof of work uploaded yet.</p>
              ) : (
                proofOfWorks.map((proof) => (
                  <div
                    key={proof.image_id}
                    className="flex items-start space-x-4 bg-gray-100 p-4 rounded-lg"
                  >
                    <img
                      src={`${constants.BASE_URL}${proof.image_file}`}
                      alt="Proof of Work"
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <p className="text-gray-800 mt-2 font-medium">
                        {proof.description}
                      </p>
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
          {
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-blue mb-4">Reviews</h2>

              {/* Contractor's Supervisor Review */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  Contractor's Supervisor Review
                </label>
                <p className="bg-gray-100 p-3 rounded-lg text-sm">
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
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1D3557] focus:border-[#1D3557] outline-none transition-all duration-300"
                        placeholder="Write a review..."
                      ></textarea>
                      <button
                        onClick={handleSubmitContractorReview}
                        className="mt-2 bg-[#1D3557] hover:bg-[#14253d] text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 gap-2 ml-auto"
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
                <p className="bg-gray-100 p-3 rounded-lg text-sm">
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
                        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#1D3557] focus:border-[#1D3557] outline-none transition-all duration-300"
                        placeholder="Write a review..."
                      ></textarea>
                      <button
                        onClick={handleSubmitConsultantReview}
                        className="mt-2 bg-[#1D3557] hover:bg-[#14253d] text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 gap-2 ml-auto"
                      >
                        Submit
                      </button>
                    </>
                  )}
              </div>
            </div>
          }
        </div>
      </div>

      <div className="bg-[#f8fafb] border border-gray-200 rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-lg md:text-xl font-bold text-[#1D3557] mb-6">
          Approval section
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userRole === ROLES.MAIN_CONTRACTOR &&
            !selectedWork.main_contractor_cost_approval && (
              <button
                className="flex items-center justify-center bg-purple-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-purple-900 transition duration-200"
                onClick={handleCostApprovalMainContractor}
              >
                <CircleDollarSign className="mr-2" /> Approve Cost
              </button>
            )}
          {selectedWork.main_contractor_cost_approval && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Cost Approved by Main Contractor
            </p>
          )}
          {/* Consultant Approval */}
          {userRole === ROLES.SUPERVISOR_CONSULTANT &&
            !selectedWork.consultant_approval && (
              <button
                className="flex items-center justify-center bg-blue-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-blue-900 transition duration-200"
                onClick={handleApproveConsultant}
              >
                <BadgeCheck className="mr-2" /> Approve as Consultant
              </button>
            )}
          {selectedWork.consultant_approval && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Approved by Consultant
            </p>
          )}

          {/* Attendance Approval Button */}
          {userRole === ROLES.SUPERVISOR_CONTRACTOR &&
            !selectedWork.contractor_supervisor_attendance_approval && (
              <button
                className="flex items-center justify-center bg-orange-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-orange-800 transition duration-200"
                onClick={handleApproveAttendance}
              >
                <CircleCheck className="mr-2" /> Approve Attendance
              </button>
            )}

          {selectedWork.contractor_supervisor_attendance_approval && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Attendance Approved
            </p>
          )}

          {userRole === ROLES.SUPERVISOR_CONTRACTOR &&
            selectedWork.contractor_supervisor_attendance_approval &&
            selectedWork.consultant_approval &&
            !selectedWork.contractor_supervisor_payment_approval && (
              <button
                className="flex items-center justify-center bg-green-800 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
                onClick={handleApproveContractorSupervisor}
              >
                <BadgeCheck className="mr-2" /> Approve Work & Payment
              </button>
            )}

          {selectedWork.contractor_supervisor_payment_approval && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Supervisor Approved Work & Payment
            </p>
          )}

          {userRole === ROLES.SUBCONTRACTOR &&
            selectedWork.contractor_supervisor_approval &&
            selectedWork.consultant_approval &&
            selectedWork.main_contractor_cost_approval &&
            selectedWork.main_contractor_payment_approval &&
            !selectedWork.retention_money_payment_requested && (
              <button
                className="flex items-center justify-center bg-yellow-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-yellow-800 transition duration-200"
                onClick={handleRequestRetention}
              >
                <CircleDollarSign className="mr-2" /> Request Retention Money
              </button>
            )}

          {selectedWork.retention_money_payment_requested && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Requested Retention Money
            </p>
          )}

          {userRole === ROLES.MAIN_CONTRACTOR &&
            selectedWork.contractor_supervisor_approval &&
            selectedWork.consultant_approval &&
            selectedWork.main_contractor_cost_approval &&
            !selectedWork.main_contractor_payment_approval && ( // ✅ Ensure approval is NOT given
              <button
                className="flex items-center justify-center bg-purple-600 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-purple-900 transition duration-200"
                onClick={handleApproveMainContractor}
              >
                <CircleDollarSign className="mr-2" /> Approve as Main Contractor
              </button>
            )}

          {selectedWork.main_contractor_payment_approval && (
            <p className="text-green-700 text-sm flex items-center gap-2 bg-green-100 p-3 rounded-xl">
              <CheckCircle /> Approved by Main Contractor
            </p>
          )}
          {userRole === ROLES.MAIN_CONTRACTOR &&
            selectedWork.contractor_supervisor_approval &&
            selectedWork.consultant_approval &&
            selectedWork.main_contractor_cost_approval &&
            !selectedWork.retention_money_payment_approved && (
              <button
                className="flex items-center justify-center bg-green-700 text-white cursor-pointer py-3 px-4 rounded-lg hover:bg-green-900 transition duration-200"
                onClick={handleApproveRetention}
              >
                <CircleDollarSign className="mr-2" /> Approve Retention Money
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
