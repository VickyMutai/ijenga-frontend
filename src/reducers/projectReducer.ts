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
  loading: boolean;
  error: string | null;
}

// Initial State
const initialState: ProjectsState = {
  projects: [],
  loading: false,
  error: null,
};

// ✅ Fetch Projects (GET /projects/my_projects/)
export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("authToken"); // ✅ Retrieve token manually

      if (!token) {
        return rejectWithValue("Unauthorized: No authentication token found.");
      }

      const response = await api.get(constants.endpoints.projects.my_projects, {
        headers: { Authorization: `Bearer ${token}` }, // ✅ Attach token manually
      });


      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const formattedProjects: Project[] = response.data.data.map((proj: any) => ({
        id: proj.id,
        projectName: proj.project_name,
        projectLocation: proj.project_location,
        projectDescription: proj.project_description,
        supervisorContractor: proj.supervisor_contractor,
        supervisorConsultant: proj.supervisor_consultant,
        subcontractor: proj.subcontractor,
      }));

      return formattedProjects;
    } catch (error: any) {
      console.error("❌ Fetch Projects Error:", error.response?.data || error.message); // ✅ Debugging
      return rejectWithValue(error.response?.data?.detail || "Failed to fetch projects");
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


// Create the Projects Slice
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
      });
  },
});

export default projectsSlice.reducer;
