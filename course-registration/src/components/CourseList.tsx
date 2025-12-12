import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { type Course } from '../types';
import { api } from '../services/api';

interface CourseListProps {
  studentId: number;
  onRegister: () => void;
}

const CourseList: React.FC<CourseListProps> = ({ studentId, onRegister }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const availableCourses = await api.getAvailableCourses();
      setCourses(availableCourses);
    } catch (err) {
      setError('Failed to load courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (courseId: number) => {
    try {
      await api.registerCourse(studentId, courseId);
      alert('Successfully registered for course!');
      onRegister();
      loadCourses(); // Refresh available courses
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.response?.status === 400) {
        alert('Already registered for this course or course is full!');
      } else {
        alert('Failed to register for course');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Link 
                  to={`/courses/${course.id}`} 
                  className="text-blue-600 hover:text-blue-800 font-medium block mb-1"
                >
                  <h3 className="text-lg font-semibold text-gray-800 hover:underline">{course.code}</h3>
                </Link>
                <h4 className="text-md font-medium text-gray-700">{course.title}</h4>
              </div>
              <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
                {course.credits} credits
              </span>
            </div>
            
            <p className="text-gray-600 mb-4">{course.description}</p>
            
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <span className="font-medium">Capacity:</span> {course.capacity}
              </div>
              <div className="text-sm text-gray-500">
                <span className="font-medium">Enrolled:</span> {course.enrolled}
              </div>
              <div className="text-sm">
                <span className={`font-medium ${course.capacity - course.enrolled <= 5 ? 'text-red-600' : 'text-green-600'}`}>
                  {course.capacity - course.enrolled} seats left
                </span>
              </div>
            </div>
            
            <button
              onClick={() => handleRegister(course.id)}
              disabled={course.enrolled >= course.capacity}
              className="btn-primary w-full"
            >
              {course.enrolled >= course.capacity ? 'Course Full' : 'Register'}
            </button>
          </div>
        ))}
      </div>
      
      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses available for registration.</p>
        </div>
      )}
    </div>
  );
};

export default CourseList;