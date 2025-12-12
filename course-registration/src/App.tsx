import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import StudentPortal from './components/StudentPortal';
import CourseDetails from './components/CourseDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Default route - shows StudentPortal */}
        <Route path="/" element={<StudentPortal />} />
        
        {/* Course details page */}
        <Route path="/courses/:id" element={<CourseDetails />} />
        
        {/* Optional: Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;