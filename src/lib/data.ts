import type { User, Site, Switch, MigrationFlow, WeeklySchedule } from './types';

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Admin',
    email: 'admin@v2mr.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/avatars/01.png',
  },
  {
    id: 'usr_002',
    name: 'Carla Dias',
    email: 'carla.dias@v2mr.com',
    role: 'Coordinator',
    status: 'Active',
    avatar: '/avatars/02.png',
  },
  {
    id: 'usr_003',
    name: 'João Silva',
    email: 'joao.silva@v2mr.com',
    role: 'Analyst',
    status: 'Active',
    avatar: '/avatars/03.png',
  },
  {
    id: 'usr_004',
    name: 'Mariana Costa',
    email: 'mariana.costa@v2mr.com',
    role: 'Analyst',
    status: 'Inactive',
    avatar: '/avatars/04.png',
  },
  {
    id: 'usr_005',
    name: 'Pedro Rocha',
    email: 'pedro.rocha@v2mr.com',
    role: 'Viewer',
    status: 'Active',
    avatar: '/avatars/05.png',
  },
];

export const sites: Site[] = [
  {
    code: '1227-0',
    name: 'Site Centro',
    distSwitchCount: 1,
    accessSwitchCount: 3,
  },
  {
    code: '3456-1',
    name: 'Site Paulista',
    distSwitchCount: 2,
    accessSwitchCount: 6,
  },
  {
    code: '7890-2',
    name: 'Site Faria Lima',
    distSwitchCount: 2,
    accessSwitchCount: 4,
  },
  {
    code: '4321-3',
    name: 'Site Rio Branco',
    distSwitchCount: 1,
    accessSwitchCount: 4,
  },
  {
    code: '8765-4',
    name: 'Site Batel',
    distSwitchCount: 1,
    accessSwitchCount: 2,
  },
];

export const switches: Switch[] = [
  {
    serialNumber: 'SN123456',
    model: 'S5735-S24T4X',
    hostname: 'SW-AG1227-01',
    siteCode: '1227-0',
    role: 'Access',
    status: 'In Stock',
  },
  {
    serialNumber: 'SN234567',
    model: 'S5735-S48T4X',
    hostname: 'SW-AG3456-01',
    siteCode: '3456-1',
    role: 'Access',
    status: 'In Stock',
  },
  {
    serialNumber: 'SN345678',
    model: 'S6730-H24X6C',
    hostname: 'DS-SP-CENTRO-01',
    siteCode: '1227-0',
    role: 'Distribution',
    status: 'Deployed',
  },
  {
    serialNumber: 'SN456789',
    model: 'S5735-S24T4X',
    hostname: 'SW-AG4321-01',
    siteCode: '4321-3',
    role: 'Access',
    status: 'Migrated',
  },
  {
    serialNumber: 'SN567890',
    model: 'S5735-S24T4X',
    hostname: 'SW-AG8765-01',
    siteCode: '8765-4',
    role: 'Access',
    status: 'Faulty',
  },
];

export const migrationFlows: MigrationFlow[] = [
  {
    id: 'flow_001',
    siteCode: '1227-0',
    siteName: 'Site Centro',
    status: 'Planning',
    assignedAnalyst: 'João Silva',
    lastUpdate: '2024-06-18',
  },
  {
    id: 'flow_002',
    siteCode: '3456-1',
    siteName: 'Site Paulista',
    status: 'Site Survey',
    assignedAnalyst: 'Mariana Costa',
    lastUpdate: '2024-06-17',
  },
  {
    id: 'flow_003',
    siteCode: '7890-2',
    siteName: 'Site Faria Lima',
    status: 'Configuration',
    assignedAnalyst: 'João Silva',
    lastUpdate: '2024-06-19',
  },
  {
    id: 'flow_004',
    siteCode: '4321-3',
    siteName: 'Site Rio Branco',
    status: 'Completed',
    assignedAnalyst: 'Carla Dias',
    lastUpdate: '2024-05-30',
  },
];

export const weeklySchedule: WeeklySchedule[] = [
  {
    id: 'SCHED-001',
    site: 'ARN01',
    step: 'Preparação',
    v2mrAnalyst: 'RUAN (M)',
    zoomtechTechnician: 'Técnico Zoom',
    date: '2025-11-17',
  },
  {
    id: 'SCHED-002',
    site: 'ARN01',
    step: 'Migração',
    v2mrAnalyst: 'RUAN (T)',
    zoomtechTechnician: 'Técnico Zoom',
    date: '2025-11-18',
  },
  {
    id: 'SCHED-003',
    site: 'BVA02',
    step: 'Preparação',
    v2mrAnalyst: 'GLORIA (M)',
    zoomtechTechnician: 'Técnico Zoom',
    date: '2025-11-17',
  },
  {
    id: 'SCHED-004',
    site: 'BVA02',
    step: 'Migração',
    v2mrAnalyst: 'PAULO',
    zoomtechTechnician: 'Técnico Zoom',
    date: '2025-11-18',
  },
  {
    id: 'SCHED-005',
    site: 'JBN01',
    step: 'Preparação',
    v2mrAnalyst: 'ANGEL (M)',
    zoomtechTechnician: 'Técnico Huawei',
    date: '2025-11-17',
  },
  {
    id: 'SCHED-006',
    site: 'JBN01',
    step: 'Migração',
    v2mrAnalyst: 'AUGUSTO',
    zoomtechTechnician: 'Técnico Huawei',
    date: '2025-11-18',
  },
];
