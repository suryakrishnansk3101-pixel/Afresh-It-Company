import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health/');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export const submitContactForm = async (formData) => {
  try {
    const response = await apiClient.post('/contact/', formData);
    return response.data;
  } catch (error) {
    console.error('Contact submission error:', error);
    throw error;
  }
};

export const submitEnquiry = async (formData) => {
  try {
    const response = await apiClient.post('/enquiries/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Enquiry submission error:', error);
    throw error;
  }
};


export const fetchServices = async () => {
  try {
    const response = await apiClient.get('/services/');
    return response.data;
  } catch (error) {
    console.error('Fetch services error:', error);
    throw error;
  }
};

export const fetchProjects = async () => {
  try {
    const response = await apiClient.get('/projects/');
    return response.data;
  } catch (error) {
    console.error('Fetch projects error:', error);
    throw error;
  }
};

export const sendChatMessage = async (message) => {
  try {
    const response = await apiClient.post('/chat/', { message });
    return response.data;
  } catch (error) {
    console.error('Chatbot error:', error);
    throw error;
  }
};

export default apiClient;
