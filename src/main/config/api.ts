export const API_CONFIG = {
    BASE_URL: process.env.API_BASE_URL || 'http://localhost:8081',
    ENDPOINTS: {
        TASKS: '/api/tasks',
        TASK_BY_ID: (id: string) => `/api/tasks/${id}`
    }
};
