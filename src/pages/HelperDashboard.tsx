
import { useState } from "react";
import { 
  FileText, Users, AlertTriangle, DollarSign, UserPlus, 
  Bell, LogOut, HelpCircle, Home, BarChart3 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";

const HelperDashboard = () => {
  // Данные заглушки для демонстрации
  const stats = [
    { id: 1, title: "Мои пользователи", value: "42", icon: Users, change: "+5%", trend: "up" },
    { id: 2, title: "Выданные выговоры", value: "3", icon: AlertTriangle, change: "-2%", trend: "down" },
    { id: 3, title: "Логи (месяц)", value: "156", icon: FileText, change: "+12%", trend: "up" },
    { id: 4, title: "Мой заработок", value: "28,350₽", icon: DollarSign, change: "+8%", trend: "up" },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Боковая панель */}
      <aside className="w-64 bg-card border-r flex flex-col">
        <div className="p-4 flex items-center gap-2 border-b">
          <Icon name="LayoutDashboard" className="h-6 w-6 text-primary" />
          <h1 className="font-semibold text-lg">Панель Хелпера</h1>
        </div>
        
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Home className="h-4 w-4" />
              <span>Главная</span>
            </Button>
            
            <p className="text-xs font-semibold text-muted-foreground px-3 pt-4 pb-1">УПРАВЛЕНИЕ</p>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Создать пользователя</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <Users className="h-4 w-4" />
              <span>Мои пользователи</span>
            </Button>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <AlertTriangle className="h-4 w-4" />
              <span>Выговоры</span>
            </Button>
            
            <p className="text-xs font-semibold text-muted-foreground px-3 pt-4 pb-1">ОТЧЕТЫ</p>
            <Button variant="ghost" className="w-full justify-start gap-2">
              <FileText className="h-4 w-4" />
              <span>Логи</span>
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
          <Button variant="ghost" className="w-full justify-start gap-2 mt-2 text-red-500 hover:text-red-600 hover:bg-red-50">
            <LogOut className="h-4 w-4" />
            <span>Выйти</span>
          </Button>
        </div>
      </aside>
      
      {/* Основное содержимое */}
      <main className="flex-1 overflow-y-auto">
        {/* Верхняя панель */}
        <header className="border-b bg-card p-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="font-semibold text-lg">Панель Хелпера</h2>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                Х
              </div>
              <span className="font-medium text-sm hidden md:block">Хелпер</span>
            </div>
          </div>
        </header>
        
        {/* Контент */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold">Добро пожаловать, Хелпер</h1>
              <p className="text-muted-foreground">Управляйте пользователями и отслеживайте активность</p>
            </div>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              <span>Создать пользователя</span>
            </Button>
          </div>
          
          {/* Карточки статистики */}
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
            {stats.map((stat) => (
              <Card key={stat.id}>
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className={`text-xs ${stat.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change} к прошлому месяцу
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Вкладки содержимого */}
          <Tabs defaultValue="users" className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <TabsList>
                <TabsTrigger value="users">Мои пользователи</TabsTrigger>
                <TabsTrigger value="warnings">Выговоры</TabsTrigger>
                <TabsTrigger value="logs">Логи</TabsTrigger>
                <TabsTrigger value="earnings">Заработок</TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="users" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Управление пользователями</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <Users className="h-12 w-12" />
                    <p>Список ваших пользователей появится здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="warnings">
              <Card>
                <CardHeader>
                  <CardTitle>Управление выговорами</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <AlertTriangle className="h-12 w-12" />
                    <p>Информация о выговорах появится здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="logs">
              <Card>
                <CardHeader>
                  <CardTitle>Просмотр логов</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <FileText className="h-12 w-12" />
                    <p>Ваши логи появятся здесь</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="earnings">
              <Card>
                <CardHeader>
                  <CardTitle>Расчет заработка</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px] flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2 text-muted-foreground">
                    <BarChart3 className="h-12 w-12" />
                    <p>Отчет о заработке появится здесь</p>
                    <div className="mt-4 text-center max-w-md">
                      <p className="text-sm">• 3% от логов ваших пользователей</p>
                      <p className="text-sm">• 60% от ваших собственных логов</p>
                    </div>
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

export default HelperDashboard;
