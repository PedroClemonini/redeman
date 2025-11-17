export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Administrador' | 'Coordenador' | 'Analista' | 'Visualizador';
  status: 'Ativo' | 'Inativo';
  avatar: string;
  nivel: 'Sênior' | 'Pleno' | 'Júnior';
  telefone: string;
};

export type Site = {
  code: string;
  name:string;
  uf: string;
  distSwitchCount: number;
  accessSwitchCount: number;
};

export type Switch = {
  serialNumber: string;
  model: string;
  hostname: string;
  siteCode: string;
  role: 'Access' | 'Distribution' | 'Core';
  status: 'In Stock' | 'Deployed' | 'Faulty' | 'Migrated';
  managementIp?: string;
  migrationDate?: string;
};

export type MigrationFlow = {
  id: string;
  siteCode: string;
  siteName: string;
  status:
    | 'Planning'
    | 'Site Survey'
    | 'Configuration'
    | 'Deployment'
    | 'Validation'
    | 'Completed';
  assignedAnalyst: string;
  lastUpdate: string;
};

export type WeeklySchedule = {
  id: string;
  site: string;
  step: 'Planejamento' | 'Preparação' | 'Migração';
  v2mrAnalyst: string;
  zoomtechTechnician: string;
  date: string;
};
