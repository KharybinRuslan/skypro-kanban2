import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import { useAuth } from "../hooks/useAuth";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import MainPage from "../pages/MainPage";
import CardPage from "../pages/CardPage";
import NewCardPage from "../pages/NewCardPage";
import ExitPage from "../pages/ExitPage";
import NotFoundPage from "../pages/NotFoundPage";
import Loader from "./Loader/Loader";
import { colors } from "../styles/themes";

const LoaderContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.backgroundGray};
`;

const renderLoader = (label) => (
  <LoaderContainer>
    <Loader label={label} />
  </LoaderContainer>
);

function ProtectedRoute({ children }) {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return renderLoader("Проверяем доступ");
  }

  return isAuth ? children : <Navigate to="/login" replace />;
}

function AppRoutes() {
  const { isAuth, isLoading } = useAuth();

  if (isLoading) {
    return renderLoader("Загружаем приложение");
  }

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuth ? <Navigate to="/" replace /> : <LoginPage />}
      />
      <Route
        path="/register"
        element={isAuth ? <Navigate to="/" replace /> : <RegisterPage />}
      />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/card/:id"
        element={
          <ProtectedRoute>
            <CardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/new-card"
        element={
          <ProtectedRoute>
            <NewCardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exit"
        element={
          <ProtectedRoute>
            <ExitPage />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
