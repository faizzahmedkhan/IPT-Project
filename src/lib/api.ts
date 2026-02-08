// API Configuration
// In production, this should point to your deployed backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? 'https://your-backend.vercel.app/api' : 'http://localhost:5001/api');

// Generic fetch wrapper with error handling
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'An error occurred' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

// Types
export interface Course {
  _id: string;
  title: string;
  level: string;
  description: string;
  topics: string[];
  icon: string;
  price: number;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactSubmission extends ContactFormData {
  _id: string;
  status: 'pending' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  count?: number;
}

// API Functions

// Courses
export const coursesApi = {
  getAll: () => fetchApi<ApiResponse<Course[]>>('/courses'),
  getById: (id: string) => fetchApi<ApiResponse<Course>>(`/courses/${id}`),
  create: (course: Omit<Course, '_id' | 'createdAt' | 'updatedAt'>) =>
    fetchApi<ApiResponse<Course>>('/courses', {
      method: 'POST',
      body: JSON.stringify(course),
    }),
  update: (id: string, course: Partial<Course>) =>
    fetchApi<ApiResponse<Course>>(`/courses/${id}`, {
      method: 'PUT',
      body: JSON.stringify(course),
    }),
  delete: (id: string) =>
    fetchApi<ApiResponse<null>>(`/courses/${id}`, {
      method: 'DELETE',
    }),
  seed: () =>
    fetchApi<ApiResponse<Course[]>>('/courses/seed', {
      method: 'POST',
    }),
};

// Contact
export const contactApi = {
  submit: (data: ContactFormData) =>
    fetchApi<ApiResponse<ContactSubmission>>('/contact', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
  getAll: () => fetchApi<ApiResponse<ContactSubmission[]>>('/contact'),
  getById: (id: string) => fetchApi<ApiResponse<ContactSubmission>>(`/contact/${id}`),
  updateStatus: (id: string, status: ContactSubmission['status']) =>
    fetchApi<ApiResponse<ContactSubmission>>(`/contact/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
  delete: (id: string) =>
    fetchApi<ApiResponse<null>>(`/contact/${id}`, {
      method: 'DELETE',
    }),
};

// Health Check
export const healthApi = {
  check: () => fetchApi<{ status: string; message: string; timestamp: string }>('/health'),
};
