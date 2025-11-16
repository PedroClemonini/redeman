
import type { User, Site, Switch, MigrationFlow, WeeklySchedule } from './types';

export const users: User[] = [
  {
    id: 'usr_001',
    name: 'Administrador',
    email: 'admin@v2mr.com',
    role: 'Administrador',
    status: 'Ativo',
    avatar: '/avatars/01.png',
    nivel: 'Sênior',
    telefone: '(11) 99999-0001'
  },
  {
    id: 'usr_002',
    name: 'Coordenador Geral',
    email: 'coordenador@v2mr.com',
    role: 'Coordenador',
    status: 'Ativo',
    avatar: '/avatars/02.png',
    nivel: 'Sênior',
    telefone: '(11) 99999-0002'
  },
  {
    id: 'usr_003',
    name: 'Paulo Borges',
    email: 'paulo.borges@v2mr.com',
    role: 'Analista',
    status: 'Ativo',
    avatar: '/avatars/03.png',
    nivel: 'Pleno',
    telefone: '(11) 99999-0003'
  },
  {
    id: 'usr_004',
    name: 'Raissa Moreira',
    email: 'raissa.moreira@v2mr.com',
    role: 'Analista',
    status: 'Ativo',
    avatar: '/avatars/04.png',
    nivel: 'Júnior',
    telefone: '(11) 99999-0004'
  },
  {
    id: 'usr_005',
    name: 'Pedro Rocha',
    email: 'pedro.rocha@v2mr.com',
    role: 'Visualizador',
    status: 'Ativo',
    avatar: '/avatars/05.png',
    nivel: 'Pleno',
    telefone: '(11) 99999-0005'
  },
];

export const sites: Site[] = [
  { code: 'BGH01', name: 'AC - RIO BRANCO - BOSQUE', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'CZS01', name: 'AC - CRUZEIRO DO SUL - CENTRO', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'RBO01', name: 'AC - RIO BRANCO - CENTRO', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'ARCA1', name: 'AL - ARAPIRACA - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'MCO01', name: 'AL - MACEIO - CENTRO', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'MCO02', name: 'AL - MACEIO - PAJUCARA', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'TRC01', name: 'AL - MACEIO - TABULEIRO DO MARTINS', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'MCP01', name: 'AP - MACAPA - CENTRO', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'MCP02', name: 'AP - MACAPA - TREM', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'SNA01', name: 'AP - SANTANA - CENTRO', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'ADP01', name: 'AM - MANAUS - ADRIANOPOLIS', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'CMO02', name: 'AM - MANAUS - CIDADE NOVA', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'MAN01', name: 'AM - MANAUS - CENTRO', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'PTN01', name: 'AM - PARINTINS - CENTRO', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'AJU01', name: 'BA - ALAGOINHAS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'BAS01', name: 'BA - BARREIRAS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'BRS01', name: 'BA - FEIRA DE SANTANA - CENTRO', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'ILH01', name: 'BA - ILHEUS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'ITB01', name: 'BA - ITABUNA - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'JZO01', name: 'BA - JUAZEIRO - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'LPD01', name: 'BA - LAURO DE FREITAS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'PFO01', name: 'BA - PAULO AFONSO - CENTRO', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'PSA01', name: 'BA - PORTO SEGURO - CENTRO', distSwitchCount: 1, accessSwitchCount: 1 },
  { code: 'SDV01', name: 'BA - SALVADOR - CABULA', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'SDV02', name: 'BA - SALVADOR - CAMINHO DAS ARVORES', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'SDV03', name: 'BA - SALVADOR - COMERCIO', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'SDV04', name: 'BA - SALVADOR - IGUATEMI', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'SDV05', name: 'BA - SALVADOR - ITAPUA', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'SLA01', name: 'BA - SANTO ANTONIO DE JESUS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'TFR01', name: 'BA - TEIXEIRA DE FREITAS - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'VCA01', name: 'BA - VITORIA DA CONQUISTA - CENTRO', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'JZO02', name: 'CE - JUAZEIRO DO NORTE - CENTRO', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'FTL01', name: 'CE - FORTALEZA - ALDEOTA', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'FTL02', name: 'CE - FORTALEZA - BEIRA MAR', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'FTL03', name: 'CE - FORTALEZA - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'FTL04', name: 'CE - FORTALEZA - PARANGABA', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'FTL05', name: 'CE - FORTALEZA - PAPICU', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'MCA01', name: 'CE - MARACANAU - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'SOE01', name: 'CE - SOBRAL - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'BSB01', name: 'DF - BRASILIA - ASA SUL', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'BSB02', name: 'DF - BRASILIA - ASA NORTE', distSwitchCount: 1, accessSwitchCount: 4 },
  { code: 'BSB03', name: 'DF - BRASILIA - LAGO SUL', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'BSB04', name: 'DF - BRASILIA - SETOR COMERCIAL SUL', distSwitchCount: 2, accessSwitchCount: 4 },
  { code: 'CEI01', name: 'DF - CEILANDIA - CENTRO', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'GMA01', name: 'DF - GAMA - SETOR CENTRAL', distSwitchCount: 1, accessSwitchCount: 2 },
  { code: 'TGA01', name: 'DF - TAGUATINGA - CENTRO', distSwitchCount: 2, accessSwitchCount: 4 },
];

export const switches: Switch[] = [
  {
    serialNumber: 'SN123456',
    model: 'S5735-S24T4X',
    hostname: 'SW-AGBGH01-01',
    siteCode: 'BGH01',
    role: 'Access',
    status: 'In Stock',
  },
  {
    serialNumber: 'SN234567',
    model: 'S5735-S48T4X',
    hostname: 'SW-AGCZS01-01',
    siteCode: 'CZS01',
    role: 'Access',
    status: 'In Stock',
  },
  {
    serialNumber: 'SN345678',
    model: 'S6730-H24X6C',
    hostname: 'DS-SPRBO01-01',
    siteCode: 'RBO01',
    role: 'Distribution',
    status: 'Deployed',
  },
  {
    serialNumber: 'SN456789',
    model: 'S5735-S24T4X',
    hostname: 'SW-AGARCA1-01',
    siteCode: 'ARCA1',
    role: 'Access',
    status: 'Migrated',
  },
  {
    serialNumber: 'SN567890',
    model: 'S5735-S24T4X',
    hostname: 'SW-AGMCO01-01',
    siteCode: 'MCO01',
    role: 'Access',
    status: 'Faulty',
  },
];

export const migrationFlows: MigrationFlow[] = [
  {
    id: 'flow_001',
    siteCode: 'BGH01',
    siteName: 'AC - RIO BRANCO - BOSQUE',
    status: 'Planning',
    assignedAnalyst: 'João Silva',
    lastUpdate: '2024-06-18',
  },
  {
    id: 'flow_002',
    siteCode: 'CZS01',
    siteName: 'AC - CRUZEIRO DO SUL - CENTRO',
    status: 'Site Survey',
    assignedAnalyst: 'Mariana Costa',
    lastUpdate: '2024-06-17',
  },
  {
    id: 'flow_003',
    siteCode: 'RBO01',
    siteName: 'AC - RIO BRANCO - CENTRO',
    status: 'Configuration',
    assignedAnalyst: 'João Silva',
    lastUpdate: '2024-06-19',
  },
  {
    id: 'flow_004',
    siteCode: 'ARCA1',
    siteName: 'AL - ARAPIRACA - CENTRO',
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


export const analistas = ['paulo','raissa','pedro','marcelo','lailton','fernando','augusto','nicolas','angel','gloria','joao','heloisa'];
export const nomes: { [key: string]: string } = { paulo: 'Paulo Borges', raissa: 'Raissa Moreira', pedro: 'Pedro Clemonini', marcelo: 'Marcelo Anjos', lailton: 'Lailton Abreu', fernando: 'Fernando Loiola', augusto: 'Augusto Moura', nicolas: 'Nicolas Soares', angel: 'Angel Coello', gloria: 'Glória Alves', joao: 'João Ruffino', heloisa: 'Heloisa Silva' };

export const alocacao = {
  "17/11/2025": { "ARN01": ["paulo"], "PAE15": ["raissa"], "RV003": ["pedro"], "SNO01": ["marcelo"] },
  "18/11/2025": { "BVA02": ["lailton"], "DOS01": ["fernando"], "SLA01": ["augusto"], "FNS47": ["nicolas"], "MCO02": ["angel"] },
  "19/11/2025": { "IUB01": ["gloria"], "RVD07": ["joao"], "ANS01": ["paulo"], "CTA36": ["raissa"] },
  "20/11/2025": { "PAE77": ["pedro"], "TSA02": ["marcelo"], "BRU01": ["lailton"], "JFA01": ["fernando"], "MCI 01": ["augusto"] },
  "21/11/2025": { "PAS01": ["nicolas"], "VTA01": ["angel"], "TSA01": ["gloria"] },
  "22/11/2025": { "BRU01": ["joao", "paulo"], "JFA01": ["raissa", "pedro"], "PAS01": ["marcelo", "lailton"], "VTA01": ["fernando", "augusto"], "TSA01": ["nicolas", "angel"] }
};

export const disponibilidade = {
  "paulo": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "raissa": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,true,true,true,false,false,false,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "pedro": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "marcelo": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,true,true,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,true,true,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "lailton": {"17/11 a 22/11/2025": [[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "fernando": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "augusto": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "nicolas": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "angel": {"17/11 a 22/11/2025": [[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "gloria": {"17/11 a 22/11/2025": [[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "joao": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]},
  "heloisa": {"17/11 a 22/11/2025": [[false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]}
};


    
