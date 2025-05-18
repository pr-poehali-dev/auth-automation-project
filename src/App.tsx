
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import HelperDashboard from "./pages/HelperDashboard";
import NotFound from "./pages/NotFound";
import RolePermissions from "./pages/RolePermissions";
import AddLog from "./pages/AddLog";

const queryClient = new QueryClient();

// Компонент для защищенных маршрутов
interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: string;
}

const ProtectedRoute = ({ children, requiredRole }: ProtectedRouteProps) => {
  const location = useLocation();
  
  // В реальном приложении здесь была бы проверка авторизации
  // Например, проверка токена в localStorage и роли пользователя
  const isAuthenticated = localStorage.getItem("auth_token") !== null;
  
  // Упрощенная проверка для демонстрации
  // В реальности здесь должна быть проверка роли из state или API
  const userRole = localStorage.getItem("user_role") || "admin";
  
  if (!isAuthenticated) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/not-authorized" replace />;
  }
  
  return <>{children}</>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Защищенные маршруты администратора */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requiredRole="admin">
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/role-permissions" 
            element={
              <ProtectedRoute requiredRole="admin">
                <RolePermissions />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-log" 
            element={
              <ProtectedRoute>
                <AddLog />
              </ProtectedRoute>
            } 
          />
          
          {/* Защищенный маршрут для хелпера */}
          <Route 
            path="/helper" 
            element={
              <ProtectedRoute requiredRole="helper">
                <HelperDashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* Страница ошибки 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
