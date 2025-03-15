/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface Project {
  id: string;
  projectName: string;
  projectLocation: string;
  projectDescription: string;
  supervisorContractor: string;
  supervisorConsultant: string;
  subcontractors: string[]; // ✅ Ensure this is an array
}

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  walletBalance: number;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
  walletBalance: 0,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token)
        return rejectWithValue("Unauthorized: No authentication token found.");

      const response = await api.get(constants.endpoints.projects.my_projects, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const formattedProjects = response.data.data.map((proj: any) => ({
        id: proj.id || proj.project_id,
        projectName: proj.project_name || "Unnamed Project",
        projectLocation: proj.project_location || "Unknown Location",
        projectDescription: proj.project_description || "",
        supervisorContractor: proj.supervisor_contractor || "",
        supervisorConsultant: proj.supervisor_consultant || "",
        subcontractor: proj.subcontractor || "",
      }));

      const walletBalance =
        parseFloat(response.data.data[0]?.project_wallet_balance) || 0; // ✅ Extract wallet balance

      return { projects: formattedProjects, walletBalance };
    } catch (error) {
      return rejectWithValue("Failed to fetch projects");
    }
  }
);

export const createProject = createAsyncThunk(
  "projects/createProject",
  async (projectData: {
    project_name: string;
    project_location: string;
    project_description?: string;
    supervisor_contractor?: string;
    supervisor_consultant?: string;
  }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const response = await api.post(constants.endpoints.projects.create_project, projectData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return response.data.data; // Return new project
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.detail || "Failed to create project");
    }
  }
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({ projectId, projectData }: { projectId: string; projectData: Partial<Project> }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = `/projects/${projectId}/edit_project/`;

      // ✅ Ensure subcontractors is an array
      const formattedProjectData = {
        ...projectData,
        subcontractors: projectData.subcontractors ?? [], // ✅ Ensures it's an array
      };

      const response = await api.put(url, formattedProjectData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("API Response:", response.data); // ✅ Debugging

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Error updating project");
    }
  }
);

export const fetchProjectDetails = createAsyncThunk(
  "projects/fetchProjectDetails",
  async (projectId: string, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

      const url = `${constants.endpoints.projects.project_detail}?project_id=${projectId}`;

      const response = await api.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const projectsArray = response.data.data;
      if (!projectsArray || projectsArray.length === 0) return rejectWithValue("Project not found");

      const projectData = projectsArray[0];

      return {
        id: projectData.project_id || "Unknown ID",
        projectName: projectData.project_name || "Unnamed Project",
        projectLocation: projectData.project_location || "Unknown Location",
        projectDescription: projectData.project_description || "",
        supervisorContractor: projectData.supervisor_contractor || "Not Assigned",
        supervisorConsultant: projectData.supervisor_consultant || "Not Assigned",
        subcontractors: Array.isArray(projectData.subcontractors) ? projectData.subcontractors : [], // ✅ Ensures an array
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch project details");
    }
  }
);


export const deleteProject = createAsyncThunk<
  string, // Returning only projectId
  string, // Accepts projectId
  { rejectValue: string }
>("projects/deleteProject", async (projectId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("authToken");
    if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

    const url = constants.endpoints.projects.delete_project.replace("?", projectId);

    await api.delete(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return projectId;
  } catch (error: unknown) {
    return rejectWithValue("Failed to delete project");
  }
});

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    resetProjects: (state) => {
      state.projects = [];
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload.projects;
        state.walletBalance = action.payload.walletBalance;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload);
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error = action.payload as string;
      })      .addCase(fetchProjectDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = {
          ...action.payload,
          subcontractors: action.payload.subcontractors || [], // ✅ Ensure an array
        };
      })
      
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateProject.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProject.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload;
      })
      .addCase(updateProject.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter((project) => project.id !== action.payload);
      })
      .addCase(deleteProject.rejected, (state, action) => {
        state.error = action.payload as string;
      })
  },
});

export const { resetProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
