
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
} from '@/components/ui/sidebar';
import { Logo } from '@/components/icons';
import {
  LayoutDashboard,
  Building2,
  Router,
  Users,
  GitCompareArrows,
  Workflow,
  LogOut,
  Settings,
  CalendarDays,
  PlusCircle,
  Link2,
} from 'lucide-react';

const menuItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    href: '/agencies',
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
    icon: Users,
  },
  {
    href: '/flows',
    label: 'Migration Flows',
    icon: Workflow,
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
    return pathname === path;
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
            <SidebarMenuButton asChild tooltip="Settings">
              <Link href="#">
                <Settings />
                <span>Settings</span>
              </Link>
            </SidebarMenuButton>
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
