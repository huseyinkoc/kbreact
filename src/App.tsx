import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignIn from './pages/sign-in-1/page';
import Test from './pages/Test';
import FileDashboard from './shared/file/dashboard';
import BlankPage from './pages/hydrogen-dashboard/blank/page';

// Sağlayıcılar ve UI bileşenleri
import { AuthProvider, useAuth } from './context/AuthProvider';
import { SiteConfigProvider } from './context/SiteConfigContext';
import MetaProvider from './context/MetaProvider';
import { JotaiProvider, ThemeProvider } from './shared/theme-provider';
import { Toaster } from 'react-hot-toast';
import GlobalDrawer from './shared/drawer-views/container';
import GlobalModal from './shared/modal-views/container';
import HydrogenLayout from './layouts/hydrogen/layout';
import ProtectedRoute from './components/ProtectedRoute';
import BerylliumLayout from './layouts/beryllium/beryllium-layout';

// Hydrogen Layout İçeren Yeni Sayfa
const DashboardWithLayout: React.FC = () => {
  return (
    <BerylliumLayout>
      <FileDashboard />
    </BerylliumLayout>
  );
};

// Giriş yapmış kullanıcıları `/dashboard` sayfasına yönlendirme
const HomeRedirect: React.FC = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  return (
    <SiteConfigProvider>
      <MetaProvider>
        <AuthProvider>
          <ThemeProvider>
            <JotaiProvider>
              <Router>
                <Routes>
                  <Route path="/" element={<HomeRedirect />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signin" element={<SignIn />} />
                  <Route path="/test" element={<Test />} />
                  <Route path="/blank" element={<BlankPage />} />
                  <Route
                    path="/dashboard"
                    element={
                      <ProtectedRoute>
                        <DashboardWithLayout /> {/* HydrogenLayout ile sarmalanmış dashboard */}
                      </ProtectedRoute>
                    }
                  />
                </Routes>
                <Toaster />
                <GlobalDrawer />
                <GlobalModal />
              </Router>
            </JotaiProvider>
          </ThemeProvider>
        </AuthProvider>
      </MetaProvider>
    </SiteConfigProvider>
  );
};

export default App;
