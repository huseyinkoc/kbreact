import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider, useAuth } from './context/AuthProvider';
import SignIn from './pages/sign-in-1/page';
import { SiteConfigProvider } from './context/SiteConfigContext';
import MetaProvider from './context/MetaProvider';
import Test from './pages/Test';
import FileDashboard from './shared/file/dashboard';
import { Toaster } from 'react-hot-toast';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import BlankPage from './pages/hydrogen-dashboard/blank/page';
import HydrogenLayout from './layouts/hydrogen/layout';

const HomeRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  return (

    <SiteConfigProvider>
      <MetaProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path='/signin' element={<SignIn />} />
              <Route path='/test' element={<Test />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <FileDashboard />
                    <Toaster />
                    <GlobalDrawer />
                    <GlobalModal />
                  </ProtectedRoute>
                }
              />
              {/* Diğer rotalar */}
            </Routes>
          </Router>
        </AuthProvider>
      </MetaProvider>
    </SiteConfigProvider>

  );
};

export default App;
