/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useCallback } from 'react';
import { type Registration } from '../types';
import { api } from '../services/api';

interface RegisteredCoursesProps {
  studentId: number;
  onDrop: () => void;
}

const RegisteredCourses: React.FC<RegisteredCoursesProps> = ({ studentId, onDrop }) => {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRegistrations = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.getStudentRegistrations(studentId);
      setRegistrations(data);
    } catch (error) {
      console.error('Failed to load registrations:', error);
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadRegistrations();
  }, [loadRegistrations]);

  const handleDropCourse = async (registrationId: number) => {
    if (window.confirm('Are you sure you want to drop this course?')) {
      try {
        await api.dropCourse(registrationId);
        alert('Course dropped successfully!');
        onDrop();
        loadRegistrations();
      } catch (error) {
        alert('Failed to drop course');
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Your Registered Courses</h2>
      
      {registrations.length === 0 ? (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 text-center">
          <p className="text-gray-500">You haven't registered for any courses yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Code
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Credits
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registration Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {registrations.map((reg) => (
                <tr key={reg.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{reg.course.code}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{reg.course.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {reg.course.credits}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(reg.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleDropCourse(reg.id)}
                      className="btn-danger"
                    >
                      Drop Course
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegisteredCourses;