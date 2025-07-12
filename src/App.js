import React from 'react';
import { ResumeProvider } from './context/ResumeContext';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';
import ResumeEditor from './components/ResumeEditor';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = React.useState('login');
  const [currentResumeId, setCurrentResumeId] = React.useState(null);

  const navigateTo = (page, resumeId = null) => {
    setCurrentPage(page);
    if (resumeId) {
      setCurrentResumeId(resumeId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={() => navigateTo('dashboard')} />;
      case 'dashboard':
        return <Dashboard onEditResume={(resumeId) => navigateTo('editor', resumeId)} />;
      case 'editor':
        return <ResumeEditor 
          resumeId={currentResumeId} 
          onBack={() => navigateTo('dashboard')} 
        />;
      default:
        return <LoginPage onLogin={() => navigateTo('dashboard')} />;
    }
  };

  return (
    <ResumeProvider>
      <div className="App min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {renderPage()}
      </div>
    </ResumeProvider>
  );
}

export default App; 