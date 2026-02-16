import { Route, Routes } from "react-router-dom";
import AuthenticationRoute from "./components/auth/AuthenticationRoute";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import LoadingScreen from "./components/common/LoadingScreen";
import { useAuthContext } from "./contexts/AuthContext";
import Landing from "./pages/Landing";
import ViewPost from "./pages/ViewPost";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Member/Profile";
import ResetPassword from "./pages/Member/ResetPassword";
import AdminLogin from "./pages/Admin/Login";
import AdminArticle from "./pages/Admin/Article";
import AdminCategory from "./pages/Admin/Category";
import AdminProfile from "./pages/Admin/Profile";
import AdminNotification from "./pages/Admin/Notification";
import AdminResetPassword from "./pages/Admin/ResetPassword";

function AppRoutes() {
  const { isGetUserLoading } = useAuthContext();

  return isGetUserLoading ? (
    <LoadingScreen />
  ) : (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/post/:postId" element={<ViewPost />} />
      <Route path="*" element={<NotFound />} />

      {/* Authentication Section */}
      <Route
        path="/signup"
        element={
          <AuthenticationRoute>
            <Signup />
          </AuthenticationRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthenticationRoute>
            <Login />
          </AuthenticationRoute>
        }
      />

      {/* User Section */}
      <Route
        path="/profile"
        element={
          <ProtectedRoute requiredRole="user">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reset-password"
        element={
          <ProtectedRoute requiredRole="user">
            <ResetPassword />
          </ProtectedRoute>
        }
      />

      {/* Admin Section */}
      <Route
        path="/admin"
        element={
          <AuthenticationRoute>
            <AdminLogin />
          </AuthenticationRoute>
        }
      />
      <Route
        path="/admin/article"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminArticle />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/category"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminCategory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/profile"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/notification"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminNotification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/reset-password"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminResetPassword />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
