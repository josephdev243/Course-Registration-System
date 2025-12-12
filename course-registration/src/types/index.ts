export interface Course {
  id: number;
  code: string;
  title: string;
  description: string;
  credits: number;
  capacity: number;
  enrolled: number;
  available?: boolean; 
  prerequisites?: string;
  availableSeats: number;
}

export interface Registration {
  id: number;
  student: {
    id: number;
    name: string;
    email: string;
  };
  course: Course;
  registrationDate: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
}