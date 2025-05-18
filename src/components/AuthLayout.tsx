import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface AuthLayoutProps {
  children: ReactNode;
  showLogout?: boolean;
}

const AuthLayout = ({ children, showLogout = false }: AuthLayoutProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700 auth-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <Icon
                name="LayoutDashboard"
                className="h-8 w-8 text-indigo-600"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Система управления
          </h1>
          <p className="text-indigo-100">Автоматизация бизнес-процессов</p>
        </div>

        {children}

        {showLogout && (
          <div className="mt-6 text-center">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate("/")}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Выйти из аккаунта</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;
