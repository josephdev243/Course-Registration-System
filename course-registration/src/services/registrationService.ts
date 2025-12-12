const API_BASE_URL = 'http://localhost:8080/api';

export interface Registration {
    id: number;
    studentId: number;
    courseId: number;
    registrationDate: string;
    course?: {
        id: number;
        code: string;
        title: string;
        credits: number;
    };
}

// Register for a course - matches your backend @PostMapping("/register")
export const registerForCourse = async (
    studentId: number, 
    courseId: number
): Promise<Registration> => {
    const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId, courseId })
    });
    
    if (!response.ok) {
        const error = await response.text();
        throw new Error(error || 'Registration failed');
    }
    
    return response.json();
};

// Get student's registrations - matches your backend @GetMapping("/registrations")
export const getStudentRegistrations = async (studentId: number): Promise<Registration[]> => {
    const response = await fetch(`${API_BASE_URL}/registrations?studentId=${studentId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch registrations');
    }
    return response.json();
};

// Drop a course - matches your backend @DeleteMapping("/drop/{id}")
export const dropCourse = async (registrationId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/drop/${registrationId}`, {
        method: 'DELETE',
    });
    
    if (!response.ok) {
        throw new Error('Failed to drop course');
    }
};