import axios from 'axios';
import type { Course, Registration } from '../types';

const API_BASE_URL = 'http://localhost:8080/api';

export const api = {
  // Course endpoints
  getCourses: async (): Promise<Course[]> => {
    const response = await axios.get(`${API_BASE_URL}/courses`);
    return response.data;
  },
  
  getAvailableCourses: async (): Promise<Course[]> => {
    const response = await axios.get(`${API_BASE_URL}/courses/available`);
    return response.data;
  },
  
  getCourseById: async (id: number): Promise<Course> => {
    const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
    return response.data;
  },
  
  // Registration endpoints
  registerCourse: async (studentId: number, courseId: number): Promise<Registration> => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        studentId,
        courseId
      });
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data);
      }
      throw error;
    }
  },
  
  dropCourse: async (registrationId: number): Promise<string> => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/drop/${registrationId}`);
      return response.data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data) {
        throw new Error(error.response.data);
      }
      throw error;
    }
  },
  
  getStudentRegistrations: async (studentId: number): Promise<Registration[]> => {
    const response = await axios.get(`${API_BASE_URL}/registrations?studentId=${studentId}`);
    return response.data;
  }
};