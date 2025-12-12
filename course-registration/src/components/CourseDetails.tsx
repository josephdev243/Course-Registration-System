// components/CourseDetails.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import type { Course } from '../types';

const CourseDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await api.getCourseById(parseInt(id));
        setCourse(data);
      } catch (err) {
        setError('Failed to load course details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <Link to="/courses" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">Course not found</p>
        <Link to="/courses" className="text-blue-600 hover:text-blue-800 mt-4 inline-block">
          ← Back to Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Link to="/courses" className="text-blue-600 hover:text-blue-800 mb-6 inline-block">
        ← Back to Courses
      </Link>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{course.title}</h1>
            <p className="text-lg text-gray-600">{course.code}</p>
          </div>
          <div className="flex flex-col items-end">
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
              {course.credits} Credits
            </span>
            <span className={`mt-2 px-4 py-1 rounded-full text-sm font-medium ${
              course.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {course.available ? 'Available' : 'Full'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.description || 'No description available for this course.'}
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Course Details</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Capacity</p>
                <p className="font-medium">{course.capacity} students</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <p className="font-medium">{course.available ? 'Open for registration' : 'Course full'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Prerequisites</p>
                <p className="font-medium">{course.prerequisites || 'None'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Registration</h3>
          {course.available ? (
            <button className="btn-primary">
              Register for this Course
            </button>
          ) : (
            <p className="text-gray-500 italic">This course is currently full. Please check back later.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;