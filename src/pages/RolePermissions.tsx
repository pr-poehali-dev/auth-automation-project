
import { useState } from "react";
import { 
  Shield, Save, RotateCcw, ArrowLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

// Тип данных для прав ролей
interface RolePermission {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
}

// Тип данных для ролей
interface Role {
  id: string;
  name: string;
  displayName: string;
  description: string;
  permissions: RolePermission[];
}

const RolePermissions = () => {
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState("helper");
  const [changesMade, setChangesMade] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Список стандартных прав для всех ролей
  const standardPermissions: RolePermission[] = [
    { 
      id: "view_earnings", 
      name: "Просмотр заработка", 
      description: "Возможность просматривать данные о заработке",
      enabled: true 
    },
    { 
      id: "register_users", 
      name: "Регистрация пользователей", 
      description: "Возможность создавать новых пользователей в системе",
      enabled: true 
    },
    { 
      id: "view_subordinates", 
      name: "Просмотр подчиненных", 
      description: "Возможность просматривать список своих подчиненных",
      enabled: true 
    },
    { 
      id: "manage_subordinates", 
      name: "Управление подчиненными", 
      description: "Возможность добавлять и удалять своих подчиненных",
      enabled: false 
    },
    { 
      id: "add_logs", 
      name: "Добавление логов", 
      description: "Возможность добавлять логи для пользователей",
      enabled: false 
    }
  ];

  // Начальное состояние ролей
  const [roles, setRoles] = useState<Role[]>([
    {
      id: "helper",
      name: "helper",
      displayName: "Хелпер",
      description: "Помогает пользователям и управляет их учетными записями",
      permissions: standardPermissions.map(p => ({...p}))
    },
    {
      id: "recruiter",
      name: "recruiter",
      displayName: "Рекрутёр",
      description: "Занимается наймом новых сотрудников",
      permissions: standardPermissions.map(p => ({...p, enabled: p.id === "register_users"}))
    },
    {
      id: "caller",
      name: "caller",
      displayName: "Коллер",
      description: "Совершает звонки клиентам",
      permissions: standardPermissions.map(p => ({...p, enabled: false}))
    },
    {
      id: "voicer",
      name: "voicer",
      displayName: "Войсер",
      description: "Общается с клиентами по голосовой связи",
      permissions: standardPermissions.map(p => ({...p, enabled: false}))
    },
    {
      id: "user",
      name: "user",
      displayName: "Пользователь",
      description: "Обычный пользователь системы",
      permissions: standardPermissions.map(p => ({...p, enabled: false}))
    }
  ]);

  // Обработчик изменения прав
  const handlePermissionChange = (roleId: string, permissionId: string, enabled: boolean) => {
    setRoles(prev => 
      prev.map(role => 
        role.id === roleId 
          ? {
              ...role,
              permissions: role.permissions.map(perm => 
                perm.id === permissionId 
                  ? { ...perm, enabled } 
                  : perm
              )
            }
          : role
      )
    );
    setChangesMade(true);
    setSaveSuccess(false);
  };

  // Обработчик сохранения изменений
  const handleSave = () => {
    // Здесь должна быть логика сохранения в БД
    console.log("Сохранение прав ролей:", roles);
    // Имитация успешного сохранения
    setTimeout(() => {
      setSaveSuccess(true);
      setChangesMade(false);
    }, 800);
  };

  // Обработчик сброса изменений
  const handleReset = () => {
    // Здесь можно запросить данные с сервера или вернуть к исходным значениям
    setRoles([
      {
        id: "helper",
        name: "helper",
        displayName: "Хелпер",
        description: "Помогает пользователям и управляет их учетными записями",
        permissions: standardPermissions.map(p => ({...p}))
      },
      {
        id: "recruiter",
        name: "recruiter",
        displayName: "Рекрутёр",
        description: "Занимается наймом новых сотрудников",
        permissions: standardPermissions.map(p => ({...p, enabled: p.id === "register_users"}))
      },
      {
        id: "caller",
        name: "caller",
        displayName: "Коллер",
        description: "Совершает звонки клиентам",
        permissions: standardPermissions.map(p => ({...p, enabled: false}))
      },
      {
        id: "voicer",
        name: "voicer",
        displayName: "Войсер",
        description: "Общается с клиентами по голосовой связи",
        permissions: standardPermissions.map(p => ({...p, enabled: false}))
      },
      {
        id: "user",
        name: "user",
        displayName: "Пользователь",
        description: "Обычный пользователь системы",
        permissions: standardPermissions.map(p => ({...p, enabled: false}))
      }
    ]);
    setChangesMade(false);
    setSaveSuccess(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-5xl">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Управление правами ролей
            </h1>
            <p className="text-muted-foreground">
              Настройка прав доступа для разных ролей пользователей системы
            </p>
          </div>
        </div>

        {saveSuccess && (
          <Alert className="mb-6 bg-green-50 border-green-200">
            <AlertDescription className="text-green-600">
              Права ролей успешно сохранены!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-8">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center">
                <CardTitle>Настройка прав ролей</CardTitle>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={handleReset}
                    disabled={!changesMade}
                  >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Сбросить
                  </Button>
                  <Button 
                    size="sm"
                    onClick={handleSave}
                    disabled={!changesMade}
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить
                  </Button>
                </div>
              </div>
              <CardDescription>
                Выберите роль и настройте права доступа для неё
              </CardDescription>
            </CardHeader>

            <Tabs defaultValue="helper" value={activeRole} onValueChange={setActiveRole} className="w-full">
              <TabsList className="w-full grid grid-cols-5 mb-4">
                {roles.map(role => (
                  <TabsTrigger 
                    key={role.id} 
                    value={role.id}
                    className="text-sm capitalize"
                  >
                    {role.displayName}
                  </TabsTrigger>
                ))}
              </TabsList>

              {roles.map(role => (
                <TabsContent key={role.id} value={role.id} className="space-y-4">
                  <div className="px-6">
                    <h3 className="text-lg font-medium mb-1">{role.displayName}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{role.description}</p>

                    <Separator className="my-4" />

                    <div className="space-y-4">
                      {role.permissions.map(permission => (
                        <div key={permission.id} className="flex items-center justify-between">
                          <div className="flex-1">
                            <Label 
                              htmlFor={`${role.id}-${permission.id}`} 
                              className="font-medium cursor-pointer"
                            >
                              {permission.name}
                            </Label>
                            <p className="text-sm text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                          <Switch 
                            id={`${role.id}-${permission.id}`}
                            checked={permission.enabled}
                            onCheckedChange={(checked) => 
                              handlePermissionChange(role.id, permission.id, checked)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <CardFooter className="justify-end pt-4 border-t mt-6">
              <Button 
                onClick={handleSave}
                disabled={!changesMade}
              >
                <Save className="mr-2 h-4 w-4" />
                Сохранить изменения
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RolePermissions;
