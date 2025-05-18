import { useState } from "react";
import {
  FileText,
  Save,
  User,
  Calendar,
  DollarSign,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

// Заглушка для списка пользователей
const USERS = [
  { id: "1", name: "Иван Петров", role: "Хелпер" },
  { id: "2", name: "Алексей Сидоров", role: "Хелпер" },
  { id: "3", name: "Мария Иванова", role: "Рекрутёр" },
  { id: "4", name: "Сергей Козлов", role: "Войсер" },
  { id: "5", name: "Екатерина Смирнова", role: "Коллер" },
  { id: "6", name: "Дмитрий Новиков", role: "Пользователь" },
  { id: "7", name: "Ольга Морозова", role: "Пользователь" },
];

// Типы логов (заглушка)
const LOG_TYPES = [
  { id: "task", name: "Выполнение задачи" },
  { id: "support", name: "Поддержка клиента" },
  { id: "sales", name: "Продажа услуги" },
  { id: "meeting", name: "Проведение встречи" },
  { id: "training", name: "Обучение" },
  { id: "other", name: "Другое" },
];

interface LogFormData {
  userId: string;
  logType: string;
  logDate: string;
  amount: string;
  description: string;
}

const AddLog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LogFormData>({
    userId: "",
    logType: "",
    logDate: new Date().toISOString().split("T")[0],
    amount: "",
    description: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrorMessage("");
  };

  const validateForm = (): boolean => {
    if (!formData.userId) {
      setErrorMessage("Выберите пользователя");
      return false;
    }

    if (!formData.logType) {
      setErrorMessage("Выберите тип лога");
      return false;
    }

    if (!formData.amount) {
      setErrorMessage("Укажите сумму");
      return false;
    }

    const amount = parseFloat(formData.amount.replace(",", "."));
    if (isNaN(amount) || amount <= 0) {
      setErrorMessage("Сумма должна быть положительным числом");
      return false;
    }

    if (!formData.description.trim()) {
      setErrorMessage("Добавьте описание лога");
      return false;
    }

    if (formData.description.trim().length < 10) {
      setErrorMessage("Описание должно содержать не менее 10 символов");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Имитация отправки данных на сервер
    setTimeout(() => {
      console.log("Отправка лога:", formData);
      setSuccessMessage("Лог успешно добавлен");
      setIsSubmitting(false);

      // Сбросить форму после успешной отправки
      setTimeout(() => {
        setFormData({
          userId: "",
          logType: "",
          logDate: new Date().toISOString().split("T")[0],
          amount: "",
          description: "",
        });
        setSuccessMessage("");
      }, 3000);
    }, 1000);
  };

  // Получение информации о выбранном пользователе
  const selectedUser = formData.userId
    ? USERS.find((u) => u.id === formData.userId)
    : null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              Добавление лога пользователю
            </h1>
            <p className="text-muted-foreground">
              Фиксирование активности пользователей в системе
            </p>
          </div>
        </div>

        {errorMessage && (
          <Alert className="mb-6 bg-red-50 border-red-200">
            <AlertDescription className="text-red-600">
              {errorMessage}
            </AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-600">
              {successMessage}
            </AlertDescription>
          </Alert>
        )}

        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Новый лог активности</CardTitle>
              <CardDescription>
                Введите информацию о выполненной работе пользователя
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userId">Пользователь</Label>
                <Select
                  value={formData.userId}
                  onValueChange={(value) => handleSelectChange("userId", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    {USERS.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center">
                          <span>{user.name}</span>
                          <span className="ml-2 text-xs text-muted-foreground">
                            ({user.role})
                          </span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedUser && (
                <div className="p-3 bg-muted rounded-md flex items-center gap-3">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {selectedUser.role}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="logType">Тип активности</Label>
                  <Select
                    value={formData.logType}
                    onValueChange={(value) =>
                      handleSelectChange("logType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      {LOG_TYPES.map((type) => (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="logDate">Дата</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="date"
                      id="logDate"
                      name="logDate"
                      value={formData.logDate}
                      onChange={handleInputChange}
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Сумма</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    id="amount"
                    name="amount"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Cумма, которая будет засчитана пользователю
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Описание</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Опишите выполненную работу..."
                  rows={4}
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>
            </CardContent>

            <CardFooter className="justify-between border-t pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/dashboard")}
              >
                Отмена
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                    Сохранение...
                  </span>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить лог
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddLog;
