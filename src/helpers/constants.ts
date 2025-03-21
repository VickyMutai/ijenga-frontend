export const constants = {
  // BASE_URL: "https://ijenga.botontapwater.com/",
  // BASE_URL: "http://localhost:8000/",
  BASE_URL: "https://backend.wipms.com/",
  endpoints: {
    auth: {
      login: "/auth/login/",
      refresh: "/token/refresh/",
      register: "/auth/register/",
      forgot_password: "/users/forgot_password/",
      password_reset: "/users/reset_password/",
      logout: "/auth/logout/",
      user: "/users/profile/",
      all_users: "/users/all/",
      is_logged_in: "auth/is_logged_in/",
    },
    projects: {
      project_list: "/projects/",
      create_project: "/projects/create_project/",
      my_projects: "/projects/my_projects/",
      project_detail: "/projects/my_projects",
      update_project: "/projects/?/edit_project/",
      delete_project: "/projects/?/delete_project/",
      assign_contractor: "/projects/{{project_id}}/assign_contractor/",
      unassign_contractor: "/projects/{{project_id}}/unassign_contractor/",
      assign_supervisor_contractor:
        "/projects/{{project_id}}/assign_supervisor_contractor/",
      unassign_supervisor_contractor:
        "/projects/{{project_id}}/unassign_supervisor_contractor/",
      assign_supervisor_consultant:
        "/projects/{{project_id}}/assign_supervisor_consultant/",
      unassign_supervisor_consultant:
        "/projects/{{project_id}}/unassign_supervisor_consultant/",
    },
    subcontractor_works: {
      create_subcontracted_work: "/subcontracted-works/create_work/",
      edit_subcontracted_work: "/subcontracted-works/?/edit_work/",
      delete_subcontracted_work: "/subcontracted-works/?/delete_work/",
      get_subcontracted_works:
        "/subcontracted-works/project_works/?project_id=",
      get_subcontracted_works_details: "/subcontracted-works/project_works/",
      proof_of_works: "/subcontracted-works/?/add_image/",
      get_proof_of_works: "/subcontracted-works/?/fetch_all_images/",
      add_contractor_comment: "subcontracted-works/?/add_contractor_comment/",
      add_consultant_comment: "subcontracted-works/?/add_consultant_comment/",
      approve_consultant: "subcontracted-works/?/approve_consultant/",
      approve_contractor_supervisor:
        "subcontracted-works/?/approve_contractor_supervisor/",
      approve_main_contractor: "subcontracted-works/?/approve_payment/",
      approve_payment: "subcontracted-works/?/approve_payment/",
      approve_cost: "subcontracted-works/?/approve_cost/",
      approve_attendance: "/subcontracted-works/?/approve_attendance/",
      request_retention: "/subcontracted-works/?/request_retention_money/",
      approve_retention: "/subcontracted-works/?/approve_retention_money/",
    },
    labourers: {
      create_labourers: "/labourers/create_labourer/",
      create_and_assign_labourers:
        "/subcontracted-works/?/create_and_assign_labourer/",
      edit_labourer: "/labourers/?/edit_labourer/",
      get_labourers: "/labourers/work_labourers/",
      get_labourers_by_works: "/subcontracted-works/?/assigned_labourers/",
      get_labourers_by_id:
        "/labourers/my_labourers/?labourer_id={{labourer_id}}",
      delete_labourer: "/labourers/{labourer_id}/",
    },
  },
};

export const TASK_CATEGORIES = [
  "welding",
  "aluminium_fabrication",
  "metalwork",
  "tile_laying",
  "flooring_installation",
  "woodworking",
  "furniture_making",
  "framing",
  "reinforcing_steel_bars",
  "concrete_reinforcement",
  "machinery_repair",
  "equipment_maintenance",
  "operating_heavy_machinery",
  "equipment_handling",
  "painting",
  "surface_finishing",
  "solar_water_heater_installation",
  "plumbing",
  "erecting_scaffolding",
  "temporary_structures",
  "network_cabling",
  "wiring_installation",
  "electrical_wiring",
  "power_installation",
  "pipe_fitting",
  "water_system_installation",
  "space_planning",
  "home_decor",
  "furnishing",
  "road_construction",
  "drainage",
  "earthworks",
  "bricklaying",
  "stonework",
  "concrete_work",
  "other",
] as const;

export const ROLES = {
  MAIN_CONTRACTOR: "main-contractor",
  SUPERVISOR_CONSULTANT: "consultants-supervisor",
  SUPERVISOR_CONTRACTOR: "contractors-supervisor",
  SUBCONTRACTOR: "subcontractor",
};

export type TaskCategory = (typeof TASK_CATEGORIES)[number];
