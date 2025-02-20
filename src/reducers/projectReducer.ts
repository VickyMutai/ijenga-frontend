/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/ijengaApi";
import { constants } from "../helpers/constants";

interface Project {
  id: number;
  projectName: string;
  projectLocation: string;
  projectDescription: string;
  supervisorContractor: string;
  supervisorConsultant: string;
  subcontractor: string;
}

interface ProjectsState {
  projects: Project[];
  selectedProject: Project | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProjectsState = {
  projects: [],
  selectedProject: null,
  loading: false,
  error: null,
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return rejectWithValue("Unauthorized: No authentication token found.");

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

      return formattedProjects;
    } catch (error) {
      console.error("Fetch Projects Error:", error);
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
      console.error("Create Project Error:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data?.detail || "Failed to create project");
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
        subcontractor: projectData.subcontractors.length > 0 ? projectData.subcontractors[0] : "Not Assigned",
      };
    } catch (error) {
      console.error("Fetch Project Details Error:", error);
      return rejectWithValue("Failed to fetch project details");
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload); // ✅ Add new project to list
      })
      .addCase(createProject.rejected, (state, action) => {
        state.error = action.payload as string;
      })      .addCase(fetchProjectDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProjectDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProject = action.payload; // ✅ Store selected project
      })
      .addCase(fetchProjectDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default projectsSlice.reducer;
