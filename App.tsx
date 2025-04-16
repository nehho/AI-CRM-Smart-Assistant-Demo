import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import { ThemeProvider } from './context/ThemeContext';

// 导入页面组件（稍后创建）
const Dashboard = React.lazy(() => import('./components/modules/Dashboard'));
const VoiceRecording = React.lazy(() => import('./components/modules/VoiceRecording'));
const TranscriptionReview = React.lazy(() => import('./components/modules/TranscriptionReview'));
const UserProfile = React.lazy(() => import('./components/modules/UserProfile'));
const Questionnaire = React.lazy(() => import('./components/modules/Questionnaire'));
const ClientTable = React.lazy(() => import('./components/modules/ClientTable'));

// 加载中组件
const LoadingFallback = () => (
  <div className="flex items-center justify-center h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <Router>
        <React.Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="voice" element={<VoiceRecording />} />
              <Route path="transcription" element={<TranscriptionReview />} />
              <Route path="profile" element={<UserProfile />} />
              <Route path="questionnaire" element={<Questionnaire />} />
              <Route path="clients" element={<ClientTable />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </React.Suspense>
      </Router>
    </ThemeProvider>
  );
}

export default App;
