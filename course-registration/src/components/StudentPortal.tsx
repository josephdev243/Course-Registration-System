import React, { useState, } from 'react';
import CourseList from './CourseList';
import RegisteredCourses from './RegisteredCourses';

const StudentPortal: React.FC = () => {
  // Default student ID for demonstration
  const [studentId, setStudentId] = useState<number>(1);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRegister = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  const handleDrop = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">University Course Registration</h1>
              <p className="text-gray-600 mt-2">Student Portal - Register and manage your courses</p>
            </div>
            <div className="flex items-center space-x-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Student ID</label>
                <select
                  value={studentId}
                  onChange={(e) => setStudentId(Number(e.target.value))}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                >
                  <option value={1}>John Doe (ID: 1)</option>
                  <option value={2}>Jane Smith (ID: 2)</option>
                  <option value={3}>Bob Johnson (ID: 3)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-blue-700">
                  Welcome! Select courses from available list and register. You can drop courses from your registered list.
                </p>
              </div>
            </div>
          </div>

          {/* Registered Courses Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <RegisteredCourses 
              key={`registered-${refreshTrigger}`}
              studentId={studentId} 
              onDrop={handleDrop} 
            />
          </div>

          {/* Available Courses Section */}
          <div className="bg-white shadow rounded-lg p-6">
            <CourseList 
              key={`courses-${refreshTrigger}`}
              studentId={studentId} 
              onRegister={handleRegister} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default StudentPortal;