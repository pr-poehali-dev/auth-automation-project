
import { ReactNode } from "react";
import Icon from "@/components/ui/icon";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700 auth-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-full">
              <Icon name="LayoutDashboard" className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Система управления</h1>
          <p className="text-indigo-100">Автоматизация бизнес-процессов</p>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
