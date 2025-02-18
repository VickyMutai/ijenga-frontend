export const constants = {
    // BASE_URL: "https://ijenga.botontapwater.com/",
    BASE_URL: "http://localhost:8000/",
    endpoints: {
        auth: {
            login: "/auth/login/",
            refresh: "/token/refresh/",
            register: "/auth/register/",
            password_reset: "/users/reset_password/",
            logout: "/auth/logout/",
            user: "/users/profile/"
        }
    }}