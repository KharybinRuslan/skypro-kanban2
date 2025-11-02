import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";

function ProtectedRoute({ children, isAuth }) {
  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes({ isAuth, setIsAuth }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage setIsAuth={setIsAuth} />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuth ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage setIsAuth={setIsAuth} />
          )
        }
      />
      <Route
        path="/"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-card"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <NewCardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute isAuth={isAuth}>
            <ExitPage setIsAuth={setIsAuth} />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
