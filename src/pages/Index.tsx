import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { toast } = useToast();

  // Загрузка сохраненного имени пользователя при монтировании
  useEffect(() => {
    const savedUsername = localStorage.getItem("remembered_username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Сохранение имени пользователя, если выбрана опция "Запомнить меня"
    if (rememberMe) {
      localStorage.setItem("remembered_username", username);
    } else {
      localStorage.removeItem("remembered_username");
    }

    // Имитация процесса авторизации
    setTimeout(() => {
      if (
        username === "admin" &&
        password === "Buck`syi\\u$x\\\\1`g;-{j.~$c=8^%\\"
      ) {
        toast({
          title: "Авторизация успешна",
          description: "Добро пожаловать в систему управления",
        });
        // Перенаправление на панель администратора
        window.location.href = "/dashboard";
      } else if (username === "helper" && password === "helper123") {
        toast({
          title: "Авторизация успешна",
          description: "Добро пожаловать, Хелпер!",
        });
        // Перенаправление на панель хелпера
        window.location.href = "/helper";
      } else {
        setError(
          "Неверный логин или пароль. Пожалуйста, проверьте данные и попробуйте снова.",
        );
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-indigo-700 auth-gradient flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Система управления
          </h1>
          <p className="text-indigo-100">Автоматизация бизнес-процессов</p>
        </div>

        <Card className="login-container">
          <CardHeader>
            <CardTitle>Вход в систему</CardTitle>
            <CardDescription>
              Введите свои учетные данные для входа
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin}>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="username">Логин</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите ваш логин"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите ваш пароль"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2 mt-4">
                <Checkbox
                  id="rememberMe"
                  checked={rememberMe}
                  onCheckedChange={(checked) => setRememberMe(checked === true)}
                />
                <Label
                  htmlFor="rememberMe"
                  className="text-sm text-muted-foreground cursor-pointer"
                >
                  Запомнить логин
                </Label>
              </div>
              <Button
                className="w-full mt-6"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Авторизация...
                  </span>
                ) : (
                  "Войти"
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Забыли пароль? Обратитесь к администратору
          </CardFooter>
        </Card>

        <div className="mt-6 text-center text-xs text-white/70">
          <p className="mb-1">Для демонстрации:</p>
          <p>Логин: admin, пароль: Buck`syi\\u$x\\1`g;-&#123;j.~$c=8^%\\</p>
          <p>Или логин: helper, пароль: password</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
