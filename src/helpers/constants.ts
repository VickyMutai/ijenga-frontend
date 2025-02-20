export const constants = {
    // BASE_URL: "https://ijenga.botontapwater.com/",
    BASE_URL: "http://localhost:8000/",
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
            is_logged_in: "auth/is_logged_in/"
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
            assign_supervisor_contractor: "/projects/{{project_id}}/assign_supervisor_contractor/",
            unassign_supervisor_contractor: "/projects/{{project_id}}/unassign_supervisor_contractor/",
            assign_supervisor_consultant: "/projects/{{project_id}}/assign_supervisor_consultant/",
            unassign_supervisor_consultant: "/projects/{{project_id}}/unassign_supervisor_consultant/",
        }
    }}