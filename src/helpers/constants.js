export const constants = {
    endpoints: {
        auth: {
            login: "/userAccounts/login/",
            refresh: "/userAccounts/token/refresh/",
            register: "/userAccounts/register/",
            password_reset: "/userAccounts/password/reset/",
            password_reset_confirm: "/userAccounts/password/reset/confirm/",
            logout: "/userAccounts/users/logout/"
        },
        users: {
            list: "/userAccounts/users/",
            profile: "/userAccounts/users/profile/",
            update_profile: "/userAccounts/users/update_profile/"
        },
        projects: {
            projects: "/projects/projects/",
            works: "/projects/subcontracted-works/",
            "labourers": "/projects/labourers/"
        },
        payments: {
            payments: "/payments/payments/",
            transactions: "/payments/transactions/"
        },
        reports: {
            deadlines: "/reports/deadlines/",
            "time-logs": "/reports/time-logs/"
        },
        notifications: "/notifications/"
    }}