import { api } from './api';

export interface Course {
    id: number;
    code: string;
    title: string;
    description: string;
    credits: number;
    capacity: number;
    enrolled: number;
    availableSeats: number;
}

export const fetchCourses = async (): Promise<Course[]> => {
    return api.getCourses();
};