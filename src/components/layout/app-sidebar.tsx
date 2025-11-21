
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
  GanttChartSquare,
  LogOut,
  Settings,
  Link2,
  Workflow,
  UserCog,
} from 'lucide-react';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/sites/register',
    label: 'Cadastro Sites',
    icon: Building2,
  },
  {
    href: '/tarefa',
    label: 'Tarefas',
    icon: GanttChartSquare,
  },
  {
    href: '/alocacao',
    label: 'Alocação',
    icon: Users,
  },
  {
    href: '/links',
    label: 'Links Importantes',
    icon: Link2,
  },
  {
    href: '/import',
    label: 'Import/Export',
    icon: GitCompareArrows,
  },
];

const managementMenuItems = [
    {
        href: '/sites',
        label: 'Sites',
        icon: Building2,
    },
    {
        href: '/switches',
        label: 'Switches',
        icon: Router,
    },
    {
        href: '/users',
        label: 'Users',
        icon: UserCog,
    },
    {
        href: '/integrations',
        label: 'Integrações',
        icon: Workflow,
    },
]

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
          <span className="font-headline text-xl font-semibold text-sidebar-primary group-data-[state=collapsed]:hidden">
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
                  <span className="group-data-[state=collapsed]:hidden">{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
           <SidebarMenuSub>
                <SidebarMenuSubTrigger tooltip="Gerenciamento">
                    <Settings />
                    <span className="group-data-[state=collapsed]:hidden">Gerenciamento</span>
                </SidebarMenuSubTrigger>
                <SidebarMenuSubContent>
                    {managementMenuItems.map((item) => (
                        <SidebarMenuSubItem key={item.href}>
                            <SidebarMenuSubButton href={item.href} asChild isActive={isActive(item.href)}>
                                <Link href={item.href}>
                                  <item.icon />
                                  <span>{item.label}</span>
                                </Link>
                            </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                    ))}
                </SidebarMenuSubContent>
            </SidebarMenuSub>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Logout">
              <Link href="#">
                <LogOut />
                <span className="group-data-[state=collapsed]:hidden">Logout</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
