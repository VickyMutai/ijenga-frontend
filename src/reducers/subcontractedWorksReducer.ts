/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";
import { RootState } from "./store";

interface SubcontractedWork {
  id: string;
  project: string;
  task_title: string;
  task_description: string;
  task_category: string;
  task_cost_labor: number;
  task_cost_overhead: number;
  contractor_review?: string;
  consultant_review?: string;
  contractor_supervisor_comments?: string;
  consultant_supervisor_comments?: string;
  contractor_supervisor_approval?: boolean;
  contractor_supervisor_payment_approval?: boolean;
  contractor_supervisor_attendance_approval?: boolean;
  consultant_approval?: boolean;
  main_contractor_cost_approval?: boolean;
  main_contractor_payment_approval?: boolean;
  assigned_subcontractor?: string;
  payment_status?: string;
  retention_money?: string;
  retention_money_paid?: boolean;
  retention_money_payment_approved?: boolean;
  retention_money_payment_requested?: boolean;
}

interface SubcontractedWorkState {
  subcontractedWorks: SubcontractedWork[];
  selectedWork: SubcontractedWork | null;
  loading: boolean;
  error: string | null;
  paidLabourerIds: string[];
}

const initialState: SubcontractedWorkState = {
  subcontractedWorks: [],
  selectedWork: null,
  loading: false,
  error: null,
  paidLabourerIds: [],
};

export const createSubcontractedWork = createAsyncThunk(
  "subcontractedWork/create",
  async (workData: Omit<SubcontractedWork, "id">, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      const response = await api.post(
        constants.endpoints.subcontractor_works.create_subcontracted_work,
        workData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return {
        id: response.data.data.work_id,
        project: response.data.data.project,
        assigned_subcontractor: response.data.data.assigned_subcontractor,
        task_title: response.data.data.task_title,
        task_description: response.data.data.task_description,
        task_category: response.data.data.task_category || "other",
        task_cost_labor: parseFloat(response.data.data.task_cost_labor),
        task_cost_overhead: parseFloat(response.data.data.task_cost_overhead),
      };
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to create subcontracted work"
      );
    }
  }
);

export const fetchSubcontractedWorks = createAsyncThunk(
  "subcontractedWork/fetchSubcontractedWorks",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      if (!projectId)
        return rejectWithValue("Project ID is missing before API call.");

      const response = await api.get(
        `${constants.endpoints.subcontractor_works.get_subcontracted_works}${projectId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.data.map((work: any) => ({
        id: work.work_id,
        project: work.project,
        assigned_subcontractor: work.assigned_subcontractor,
        task_title: work.task_title,
        task_description: work.task_description,
        task_category: work.task_category || "other",
        task_cost_labor: parseFloat(work.task_cost_labor),
        task_cost_overhead: parseFloat(work.task_cost_overhead),
      }));
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subcontracted works"
      );
    }
  }
);

export const editSubcontractedWork = createAsyncThunk(
  "subcontractedWork/editSubcontractedWork",
  async (
    { workId, updatedData }: { workId: string; updatedData: any },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      const url =
        constants.endpoints.subcontractor_works.edit_subcontracted_work.replace(
          "?",
          workId
        );

      const response = await api.put(url, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data; // Return updated work data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to update subcontracted work"
      );
    }
  }
);

export const fetchSubcontractedWorkDetails = createAsyncThunk(
  "subcontractedWork/fetchDetails",
  async (
    { projectId, workId }: { projectId: string; workId: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      const url = `${constants.endpoints.subcontractor_works.get_subcontracted_works_details}?project_id=${projectId}&work_id=${workId}`;

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch work details"
      );
    }
  }
);

export const addContractorComment = createAsyncThunk(
  "subcontractedWork/addContractorComment",
  async (
    { workId, comment }: { workId: string; comment: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      await api.post(
        `${constants.endpoints.subcontractor_works.add_contractor_comment.replace(
          "?",
          workId
        )}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return comment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to add contractor review"
      );
    }
  }
);

export const addConsultantComment = createAsyncThunk(
  "subcontractedWork/addConsultantComment",
  async (
    { workId, comment }: { workId: string; comment: string },
    { rejectWithValue }
  ) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      await api.post(
        `${constants.endpoints.subcontractor_works.add_consultant_comment.replace(
          "?",
          workId
        )}`,
        { comment },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return comment;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to add consultant review"
      );
    }
  }
);

export const approveContractorSupervisor = createAsyncThunk(
  "subcontractedWork/approveContractorSupervisor",
  async (workId: string, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const selectedWork = state.subcontractedWorks.selectedWork;

      if (!selectedWork) {
        return rejectWithValue("Work not found.");
      }

      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      if (!selectedWork.main_contractor_cost_approval) {
        return rejectWithValue(
          "Main Contractor must approve the cost before Supervisor Contractor can approve."
        );
      }

      await api.post(
        constants.endpoints.subcontractor_works.approve_contractor_supervisor.replace(
          "?",
          workId
        ),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Approve payment under contractor supervisor
      await api.post(
        constants.endpoints.subcontractor_works.approve_payment.replace(
          "?",
          workId
        ),
        { approval_type: "contractor_supervisor" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return workId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to approve work and payment (Contractor Supervisor)"
      );
    }
  }
);

export const approveConsultant = createAsyncThunk(
  "subcontractedWork/approveConsultant",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      await api.post(
        constants.endpoints.subcontractor_works.approve_consultant.replace(
          "?",
          workId
        ),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return workId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to approve work (consultant)"
      );
    }
  }
);

export const approveMainContractorCost = createAsyncThunk(
  "subcontractedWork/approveMainContractorCost",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      await api.post(
        constants.endpoints.subcontractor_works.approve_cost.replace(
          "?",
          workId
        ),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return workId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to approve main contractor cost."
      );
    }
  }
);

export const approveMainContractor = createAsyncThunk(
  "subcontractedWork/approveMainContractor",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      // Approve payment under main contractor
      await api.post(
        constants.endpoints.subcontractor_works.approve_payment.replace(
          "?",
          workId
        ),
        { approval_type: "main_contractor" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return workId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail ||
          "Failed to approve work and payment (Main Contractor)"
      );
    }
  }
);

export const approveAttendance = createAsyncThunk(
  "subcontractedWork/approveAttendance",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      await api.post(
        constants.endpoints.subcontractor_works.approve_attendance.replace(
          "?",
          workId
        ),
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return workId;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to approve attendance"
      );
    }
  }
);

export const requestRetentionMoney = createAsyncThunk(
  "subcontractedWork/requestRetentionMoney",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      const url =
        constants.endpoints.subcontractor_works.request_retention.replace(
          "?",
          workId
        );

      const response = await api.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.message; // Success message from API
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to request retention money"
      );
    }
  }
);

export const approveRetentionMoney = createAsyncThunk(
  "subcontractedWork/approveRetentionMoney",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      const url =
        constants.endpoints.subcontractor_works.approve_retention.replace(
          "?",
          workId
        );

      const response = await api.post(
        url,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      return response.data.message; // Success message from API
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to approve retention money"
      );
    }
  }
);

export const fetchPaymentRecords = createAsyncThunk(
  "subcontractedWork/fetchPaymentRecords",
  async (workId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized");

      const response = await api.get(
        constants.endpoints.subcontractor_works.payment_records.replace(
          "?",
          workId
        ),
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response.data);
      return response.data.labourers; // Return list of paid labourer IDs
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.detail || "Failed to fetch payment records"
      );
    }
  }
);

const subcontractedWorkSlice = createSlice({
  name: "subcontractedWork",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSubcontractedWork.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        createSubcontractedWork.fulfilled,
        (state, action: PayloadAction<SubcontractedWork>) => {
          state.loading = false;
          state.subcontractedWorks.push(action.payload);
        }
      )
      .addCase(createSubcontractedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchSubcontractedWorks.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchSubcontractedWorks.fulfilled,
        (state, action: PayloadAction<SubcontractedWork[]>) => {
          state.loading = false;
          state.subcontractedWorks = action.payload;
        }
      )
      .addCase(fetchSubcontractedWorks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSubcontractedWorkDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSubcontractedWorkDetails.fulfilled, (state, action) => {
        state.selectedWork = action.payload;
        state.loading = false;
      })
      .addCase(fetchSubcontractedWorkDetails.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(addContractorComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addContractorComment.fulfilled, (state, action) => {
        if (state.selectedWork) {
          state.selectedWork.contractor_review = action.payload;
        }
      })
      .addCase(addContractorComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addConsultantComment.fulfilled, (state, action) => {
        if (state.selectedWork) {
          state.selectedWork.consultant_review = action.payload;
        }
      })
      .addCase(approveContractorSupervisor.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveContractorSupervisor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload) {
          state.selectedWork.contractor_supervisor_approval = true;
          state.selectedWork.contractor_supervisor_payment_approval = true;
        }
      })
      .addCase(approveContractorSupervisor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Consultant Approval
      .addCase(approveConsultant.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveConsultant.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload) {
          state.selectedWork.consultant_approval = true;
        }
      })
      .addCase(approveConsultant.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Main Contractor Approval
      .addCase(approveMainContractor.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveMainContractor.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload) {
          state.selectedWork.main_contractor_cost_approval = true;
        }
      })
      .addCase(approveMainContractor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(editSubcontractedWork.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload.id) {
          state.selectedWork = { ...state.selectedWork, ...action.payload };
        }
      })
      .addCase(editSubcontractedWork.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveMainContractorCost.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveMainContractorCost.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload) {
          state.selectedWork.main_contractor_cost_approval = true;
        }
      })
      .addCase(approveMainContractorCost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveAttendance.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveAttendance.fulfilled, (state, action) => {
        state.loading = false;
        if (state.selectedWork && state.selectedWork.id === action.payload) {
          state.selectedWork.contractor_supervisor_attendance_approval = true;
        }
      })
      .addCase(approveAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder
      .addCase(requestRetentionMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(requestRetentionMoney.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(requestRetentionMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(approveRetentionMoney.pending, (state) => {
        state.loading = true;
      })
      .addCase(approveRetentionMoney.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(approveRetentionMoney.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPaymentRecords.fulfilled, (state, action) => {
        state.paidLabourerIds = action.payload;
      })
      .addCase(fetchPaymentRecords.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default subcontractedWorkSlice.reducer;
