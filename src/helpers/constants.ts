export const constants = {
    BASE_URL: "https://ijenga.botontapwater.com/",
    // BASE_URL: "http://localhost:8000/",
    endpoints: {
        auth: {
            login: "/auth/login/",
            refresh: "/token/refresh/",
            register: "/auth/register/",
            forgot_password: "/users/forgot_password/",
            password_reset: "/users/reset_password/",
            logout: "/auth/logout/",
            user: "/users/profile/",
            is_logged_in: "auth/is_logged_in/"
        }
    }}