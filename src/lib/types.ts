
export type User = {
  id: string;
  nome: string;
  email: string;
  cargo: 'Administrador' | 'Coordenador' | 'Analista' | 'Visualizador';
  status: 'ativo' | 'inativo';
  avatar?: string;
  nivel: 'Sênior' | 'Pleno' | 'Júnior';
  telefone?: string;
  fotoUrl?: string;
};

export type Site = {
  id: string;
  codigo: string;
  nome:string;
  cidade: string;
  estado: string;
  endereco: string;
  qtd_switches: number;
  data_prevista: string;
  status: string;
};

export type Switch = {
  id: string;
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

    
