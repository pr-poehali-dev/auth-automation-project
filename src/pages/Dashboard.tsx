import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart3,
  UserPlus,
  Bell,
  AlertTriangle,
  FileText,
  DollarSign,
  Users,
  LogOut,
  Home,
  HelpCircle,
  User,
  UserCog,
  MessageCircle,
  PhoneCall,
  Shield,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();

  // Данные заглушки для примера
  const stats = [
    {
      id: 1,
      title: "Всего пользователей",
      value: "124",
      icon: Users,
      change: "+12%",
      trend: "up",
    },
    {
      id: 2,
      title: "Выговоров (месяц)",
      value: "8",
      icon: AlertTriangle,
      change: "-5%",
      trend: "down",
    },
    {
      id: 3,
      title: "Логи (месяц)",
      value: "472",
      icon: FileText,
      change: "+18%",
      trend: "up",
    },
    {
      id: 4,
      title: "Общий заработок",
      value: "248,500₽",
      icon: DollarSign,
      change: "+14%",
      trend: "up",
    },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Боковая панель - скрыта на мобильных устройствах */}
      <aside className="w-64 bg-card border-r flex-shrink-0 flex-col hidden md:flex">
        <div className="p-4 flex items-center gap-2 border-b">
          <Icon name="LayoutDashboard" className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-lg">Управление</h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              <span>Главная</span>
            </Button>

            <p className="text-xs font-semibold text-muted-foreground px-3 pt-4 pb-1">
              АДМИНИСТРИРОВАНИЕ
            </p>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/role-permissions")}
            >
              <Shield className="h-4 w-4" />
              <span>Изменить права ролям</span>
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start gap-2"
              onClick={() => navigate("/add-log")}
            >
              <FileText className="h-4 w-4" />
              <span>Добавить лог</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserCog className="h-4 w-4" />
              <span>Хелперы</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <User className="h-4 w-4" />
              <span>Рекрутёры</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Чаттеры</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <PhoneCall className="h-4 w-4" />
              <span>Войсеры/Коллеры</span>
            </Button>

            <p className="text-xs font-semibold text-muted-foreground px-3 pt-4 pb-1">
              ПОЛЬЗОВАТЕЛИ
            </p>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              <span>Все пользователи</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              <span>Логи</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Выговоры</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <DollarSign className="h-4 w-4" />
              <span>Заработок</span>
            </Button>
          </div>
        </nav>

        <div className="p-4 border-t">
          <Button variant="outline" className="w-full justify-start gap-2">
            <HelpCircle className="h-4 w-4" />
            <span>Помощь</span>
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2 mt-2 text-red-500 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
            <span>Выйти</span>
          </Button>
        </div>
      </aside>

      {/* Основное содержимое */}
      <main className="flex-1 overflow-y-auto flex flex-col">
        {/* Верхняя панель */}
        {/* Верхняя панель */}
        <header className="border-b bg-card p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2">
            {/* Кнопка меню для мобильных устройств */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon name="Menu" className="h-5 w-5" />
            </Button>
            <h2 className="font-semibold text-lg">Панель управления</h2>
          </div>
          <div className="flex items-center gap-4">
            {/* Добавлено поле быстрого поиска */}
            <div className="relative hidden md:block w-64">
              <Input
                type="search"
                placeholder="Поиск пользователей..."
                className="w-full pl-9 h-9"
              />
              <Icon
                name="Search"
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
            </div>
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                A
              </div>
              <span className="font-medium text-sm hidden md:block">
                Администратор
              </span>
            </div>
          </div>
        </header>

        {/* Контент */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">
                Добро пожаловать, Администратор
              </h1>
              <p className="text-muted-foreground">
                Управляйте пользователями и отслеживайте статистику
              </p>
            </div>
            <div className="flex gap-2">
              <Button className="gap-2" onClick={() => navigate("/add-log")}>
                👉👉
                <FileText className="h-4 w-4" />
                <span>Добавить лог</span>
              </Button>
              <Button className="gap-2">
                <UserPlus className="h-4 w-4" />
                <span>Добавить пользователя</span>
              </Button>
            </div>
          </div>

          {/* Карточки статистики */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.id}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p
                    className={`text-xs ${stat.trend === "up" ? "text-green-500" : "text-red-500"}`}
                  >
                    {stat.change} к прошлому месяцу
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Вкладки содержимого */}
          <Tabs
            defaultValue="overview"
            className="mt-6"
            onValueChange={setActiveTab}
          >
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="overview">Обзор</TabsTrigger>
                <TabsTrigger value="users">Пользователи</TabsTrigger>
                <TabsTrigger value="logs">Логи</TabsTrigger>
                <TabsTrigger value="earnings">Заработок</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Активность за месяц</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-12 w-12" />
                    <p>График активности появится здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>Пользователи системы</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users className="h-12 w-12" />
                    <p>Список пользователей появится здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>Логи пользователей</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="h-12 w-12" />
                    <p>Логи пользователей появятся здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Заработок</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-12 w-12" />
                    <p>Отчет о заработке появится здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
