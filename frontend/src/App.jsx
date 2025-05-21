import { Navigate, Route, Routes, Outlet } from "react-router";

import HomePage from "./pages/HomePage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotificationsPage from "./pages/NotificationsPage.jsx";
import CallPage from "./pages/CallPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import OnboardingPage from "./pages/OnboardingPage.jsx";

import { Toaster } from "react-hot-toast";

import PageLoader from "./components/PageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
import Layout from "./components/Layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";
import useNotificationPoller from "./hooks/useNotificationPoller.js";

const App = () => {
  const { isLoading, authUser } = useAuthUser();
  const { theme } = useThemeStore();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        {/* PUBLIC ROUTES */}
        {!isAuthenticated && (
          <>
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        {/* PROTECTED ROUTES - USER NOT ONBOARDED */}
        {isAuthenticated && !isOnboarded && (
          <>
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="*" element={<Navigate to="/onboarding" />} />
          </>
        )}

        {/* PROTECTED ROUTES - USER ONBOARDED */}
        {isAuthenticated && isOnboarded && (
          <>
            <Route path="/" element={<ProtectedRoute showSidebar={true} />}>
              <Route index element={<HomePage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
            </Route>
            <Route path="/chat/:chatId" element={<ChatPage />} />
            <Route path="/call/:callId" element={<CallPage />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </div>
  );
};

const ProtectedRoute = ({ showSidebar = true }) => {
  // Use the notification poller in protected routes
  useNotificationPoller();
  
  return (
    <Layout showSidebar={showSidebar}>
      <Outlet />
    </Layout>
  );
};

export default App;
