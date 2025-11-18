
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubTrigger,
  SidebarMenuSubContent,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import {
  LayoutDashboard,
  Building2,
  Router,
  Users,
  GitCompareArrows,
  ListTodo,
  LogOut,
  Settings,
  CalendarDays,
  PlusCircle,
  Link2,
  Lock,
  KeyRound,
  UserCog,
} from 'lucide-react';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/sites',
    label: 'Sites',
    icon: Building2,
  },
   {
    href: '/tarefa',
    label: 'Tarefas',
    icon: ListTodo,
  },
  {
    href: '/switches',
    label: 'Switches',
    icon: Router,
  },
  {
    href: '/users',
    label: 'Users',
    icon: Users,
  },
  {
    href: '/alocacao',
    label: 'Alocação',
    icon: CalendarDays,
  },
  {
    href: '/sites/register',
    label: 'Cadastro Sites',
    icon: PlusCircle,
  },
  {
    href: '/import',
    label: 'Import/Export',
    icon: GitCompareArrows,
  },
  {
    href: '/links',
    label: 'Links Importantes',
    icon: Link2,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="size-8 text-sidebar-primary" />
          <span className="font-headline text-xl font-semibold text-sidebar-primary">
            RedeMan
          </span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
             <SidebarMenuSub>
                <SidebarMenuSubTrigger tooltip="Settings">
                    <Settings />
                    <span>Configurações</span>
                </SidebarMenuSubTrigger>
                <SidebarMenuSubContent>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">CRUD</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">Permissões e Acessos</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">Alterar Senha</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                    <SidebarMenuSubItem>
                        <SidebarMenuSubButton href="#">Alterar Perfil</SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                </SidebarMenuSubContent>
            </SidebarMenuSub>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="#">
                <LogOut />
                <span>Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
