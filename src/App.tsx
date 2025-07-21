import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/layout/Navbar';
import { AuthModal } from './components/auth/AuthModal';
import { Landing } from './pages/Landing';
import { JobSeeker } from './pages/JobSeeker';
import { JobCreator } from './pages/JobCreator';

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen">
          <Navbar onAuthClick={() => setIsAuthModalOpen(true)} />
          <Routes>
            <Route path="/" element={<Landing onAuthClick={() => setIsAuthModalOpen(true)} />} />
            <Route path="/job-seeker" element={<JobSeeker />} />
            <Route path="/job-creator" element={<JobCreator />} />
          </Routes>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
          />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;