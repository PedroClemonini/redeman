
import type { User, Site, Switch, MigrationFlow, WeeklySchedule } from './types';

export const switches: Switch[] = [
    { id: 'sw_BGH01', serialNumber: '', model: '', hostname: '', siteCode: 'BGH01', role: 'Access', status: 'In Stock', managementIp: '10.101.9.3' },
    { id: 'sw_CZS01', serialNumber: '', model: '', hostname: '', siteCode: 'CZS01', role: 'Access', status: 'In Stock', managementIp: '10.101.40.3' },
    { id: 'sw_RBO01', serialNumber: '', model: '', hostname: '', siteCode: 'RBO01', role: 'Distribution', status: 'Deployed', managementIp: '10.101.0.3' },
    { id: 'sw_ARCA1', serialNumber: '', model: '', hostname: '', siteCode: 'ARCA1', role: 'Access', status: 'Migrated', managementIp: '10.111.130.3' },
    { id: 'sw_MCO01', serialNumber: '', model: '', hostname: '', siteCode: 'MCO01', role: 'Access', status: 'Faulty', managementIp: '10.111.128.3' },
    { id: 'sw_MCO02', serialNumber: '', model: '', hostname: '', siteCode: 'MCO02', role: 'Access', status: 'In Stock', managementIp: '10.111.129.3' },
    { id: 'sw_TRC01', serialNumber: '', model: '', hostname: '', siteCode: 'TRC01', role: 'Access', status: 'In Stock', managementIp: '10.111.135.3' },
    { id: 'sw_MCP01', serialNumber: '', model: '', hostname: '', siteCode: 'MCP01', role: 'Access', status: 'In Stock', managementIp: '10.103.64.3' },
    { id: 'sw_MCP02', serialNumber: '', model: '', hostname: '', siteCode: 'MCP02', role: 'Access', status: 'In Stock', managementIp: '10.103.65.3' },
    { id: 'sw_SNA01', serialNumber: '', model: '', hostname: '', siteCode: 'SNA01', role: 'Access', status: 'In Stock', managementIp: '10.103.66.3' },
    { id: 'sw_ADP01', serialNumber: '', model: '', hostname: '', siteCode: 'ADP01', role: 'Access', status: 'In Stock', managementIp: '10.102.131.3' },
    { id: 'sw_CMO02', serialNumber: '', model: '', hostname: '', siteCode: 'CMO02', role: 'Access', status: 'In Stock', managementIp: '10.102.136.3' },
    { id: 'sw_MAN01', serialNumber: '', model: '', hostname: '', siteCode: 'MAN01', role: 'Distribution', status: 'Deployed', managementIp: '10.102.128.3' },
    { id: 'sw_PTN01', serialNumber: '', model: '', hostname: '', siteCode: 'PTN01', role: 'Access', status: 'In Stock', managementIp: '10.102.144.3' },
    { id: 'sw_AJU01', serialNumber: '', model: '', hostname: '', siteCode: 'AJU01', role: 'Access', status: 'In Stock', managementIp: '10.105.194.3' },
    { id: 'sw_BAS01', serialNumber: '', model: '', hostname: '', siteCode: 'BAS01', role: 'Access', status: 'In Stock', managementIp: '10.105.201.3' },
    { id: 'sw_BRS01', serialNumber: '', model: '', hostname: '', siteCode: 'BRS01', role: 'Access', status: 'In Stock', managementIp: '10.105.192.3' },
    { id: 'sw_ILH01', serialNumber: '', model: '', hostname: '', siteCode: 'ILH01', role: 'Access', status: 'In Stock', managementIp: '10.105.210.3' },
    { id: 'sw_ITB01', serialNumber: '', model: '', hostname: '', siteCode: 'ITB01', role: 'Access', status: 'In Stock', managementIp: '10.105.211.3' },
    { id: 'sw_JZO01', serialNumber: '', model: '', hostname: '', siteCode: 'JZO01', role: 'Access', status: 'In Stock', managementIp: '10.105.213.3' },
    { id: 'sw_LPD01', serialNumber: '', model: '', hostname: '', siteCode: 'LPD01', role: 'Access', status: 'In Stock', managementIp: '10.105.131.3' },
    { id: 'sw_PFO01', serialNumber: '', model: '', hostname: '', siteCode: 'PFO01', role: 'Access', status: 'In Stock', managementIp: '10.105.218.3' },
    { id: 'sw_PSA01', serialNumber: '', model: '', hostname: '', siteCode: 'PSA01', role: 'Access', status: 'In Stock', managementIp: '10.105.220.3' },
    { id: 'sw_SDV01', serialNumber: '', model: '', hostname: '', siteCode: 'SDV01', role: 'Access', status: 'In Stock', managementIp: '10.105.132.3' },
    { id: 'sw_SDV02', serialNumber: '', model: '', hostname: '', siteCode: 'SDV02', role: 'Access', status: 'In Stock', managementIp: '10.105.133.3' },
    { id: 'sw_SDV03', serialNumber: '', model: '', hostname: '', siteCode: 'SDV03', role: 'Distribution', status: 'Deployed', managementIp: '10.105.128.3' },
    { id: 'sw_SDV04', serialNumber: '', model: '', hostname: '', siteCode: 'SDV04', role: 'Access', status: 'In Stock', managementIp: '10.105.134.3' },
    { id: 'sw_SDV05', serialNumber: '', model: '', hostname: '', siteCode: 'SDV05', role: 'Access', status: 'In Stock', managementIp: '10.105.135.3' },
    { id: 'sw_SLA01', serialNumber: '', model: '', hostname: '', siteCode: 'SLA01', role: 'Access', status: 'In Stock', managementIp: '10.105.223.3' },
    { id: 'sw_TFR01', serialNumber: '', model: '', hostname: '', siteCode: 'TFR01', role: 'Access', status: 'In Stock', managementIp: '10.105.224.3' },
    { id: 'sw_VCA01', serialNumber: '', model: '', hostname: '', siteCode: 'VCA01', role: 'Access', status: 'In Stock', managementIp: '10.105.225.3' },
    { id: 'sw_JZO02', serialNumber: '', model: '', hostname: '', siteCode: 'JZO02', role: 'Access', status: 'In Stock', managementIp: '10.106.195.3' },
    { id: 'sw_FTL01', serialNumber: '', model: '', hostname: '', siteCode: 'FTL01', role: 'Distribution', status: 'Deployed', managementIp: '10.106.129.3' },
    { id: 'sw_FTL02', serialNumber: '', model: '', hostname: '', siteCode: 'FTL02', role: 'Access', status: 'In Stock', managementIp: '10.106.130.3' },
    { id: 'sw_FTL03', serialNumber: '', model: '', hostname: '', siteCode: 'FTL03', role: 'Access', status: 'In Stock', managementIp: '10.106.128.3' },
    { id: 'sw_FTL04', serialNumber: '', model: '', hostname: '', siteCode: 'FTL04', role: 'Access', status: 'In Stock', managementIp: '10.106.131.3' },
    { id: 'sw_FTL05', serialNumber: '', model: '', hostname: '', siteCode: 'FTL05', role: 'Access', status: 'In Stock', managementIp: '10.106.132.3' },
    { id: 'sw_MCA01', serialNumber: '', model: '', hostname: '', siteCode: 'MCA01', role: 'Access', status: 'In Stock', managementIp: '10.106.199.3' },
    { id: 'sw_SOE01', serialNumber: '', model: '', hostname: '', siteCode: 'SOE01', role: 'Access', status: 'In Stock', managementIp: '10.106.204.3' },
    { id: 'sw_BSB01', serialNumber: '', model: '', hostname: '', siteCode: 'BSB01', role: 'Distribution', status: 'Deployed', managementIp: '10.128.1.3' },
    { id: 'sw_BSB02', serialNumber: '', model: '', hostname: '', siteCode: 'BSB02', role: 'Access', status: 'In Stock', managementIp: '10.128.2.3' },
    { id: 'sw_BSB03', serialNumber: '', model: '', hostname: '', siteCode: 'BSB03', role: 'Access', status: 'In Stock', managementIp: '10.128.130.3' },
    { id: 'sw_BSB04', serialNumber: '', model: '', hostname: '', siteCode: 'BSB04', role: 'Distribution', status: 'Deployed', managementIp: '10.128.0.3' },
    { id: 'sw_CEI01', serialNumber: '', model: '', hostname: '', siteCode: 'CEI01', role: 'Access', status: 'In Stock', managementIp: '10.128.66.3' },
    { id: 'sw_GMA01', serialNumber: '', model: '', hostname: '', siteCode: 'GMA01', role: 'Access', status: 'In Stock', managementIp: '10.128.65.3' },
    { id: 'sw_TGA01', serialNumber: '', model: '', hostname: '', siteCode: 'TGA01', role: 'Distribution', status: 'Deployed', managementIp: '10.128.64.3' },
];

export const migrationFlows: MigrationFlow[] = [
  {
    id: 'flow_001',
    siteCode: 'BGH01',
    siteName: 'AC - RIO BRANCO - BOSQUE',
    status: 'Planning',
    assignedAnalyst: 'paulo',
    lastUpdate: '2024-06-18',
  },
  {
    id: 'flow_002',
    siteCode: 'CZS01',
    siteName: 'AC - CRUZEIRO DO SUL - CENTRO',
    status: 'Site Survey',
    assignedAnalyst: 'raissa',
    lastUpdate: '2024-06-17',
  },
  {
    id: 'flow_003',
    siteCode: 'RBO01',
    siteName: 'AC - RIO BRANCO - CENTRO',
    status: 'Configuration',
    assignedAnalyst: 'pedro',
    lastUpdate: '2024-06-19',
  },
  {
    id: 'flow_004',
    siteCode: 'ARCA1',
    siteName: 'AL - ARAPIRACA - CENTRO',
    status: 'Completed',
    assignedAnalyst: 'marcelo',
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


export const analistas = ['paulo','raissa','pedro','marcelo','lailton','fernando','augusto','nicolas','angel','gloria','joao','heloisa', 'ruan', 'samuel', 'abilio', 'lucas'];
export const nomes: { [key: string]: string } = { paulo: 'Paulo Borges', raissa: 'Raissa Moreira Martins', pedro: 'Pedro Marques Clemonini', marcelo: 'Marcelo dos Anjos Fernandes', lailton: 'Lailton Bezerra de Abreu', fernando: 'Fernando Luis Da Silva Loiola', augusto: 'Luiz Augusto', nicolas: 'Nicolas de Sousa Soares', angel: 'Angel Coello', gloria: 'Glória Maria de Andrade Alves', joao: 'João Ruffino dos Santos', heloisa: 'Heloisa Silva Carvalho', ruan: 'Ruan Italo da Silva Carvalho', samuel: 'Samuel Pereira', abilio: 'Pedro Abílio Dota de Mesquita', lucas: 'Lucas de Lima Araújo'};

export const alocacao = {
  "17/11/2025": { "ARN01": ["paulo"], "PAE15": ["raissa"], "RV003": ["pedro"], "SNO01": ["marcelo"] },
  "18/11/2025": { "BVA02": ["lailton"], "DOS01": ["fernando"], "SLA01": ["augusto"], "FNS47": ["nicolas"], "MCO02": ["angel"] },
  "19/11/2025": { "IUB01": ["gloria"], "RVD07": ["joao"], "ANS01": ["paulo"], "CTA36": ["raissa"] },
  "20/11/2025": { "PAE77": ["pedro"], "TSA02": ["marcelo"], "BRU01": ["lailton"], "JFA01": ["fernando"], "MCI 01": ["augusto"] },
  "21/11/2025": { "PAS01": ["nicolas"], "VTA01": ["angel"], "TSA01": ["gloria"] },
  "22/11/2025": { "BRU01": ["joao", "paulo"], "JFA01": ["raissa", "pedro"], "PAS01": ["marcelo", "lailton"], "VTA01": ["fernando", "augusto"], "TSA01": ["nicolas", "angel"] }
};

export const disponibilidade = {
  "nicolas": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false],[false,false,false,false,false,false,true,true,false,true,true,true,true,true,false,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,true,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,true,true,false,true,true,true,true,true,true,true,false],[false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,true,true,false,true,true,true,true,true,true,true,false],[false,false,false,false,false,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "pedro": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "joao": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,true,true,false,false,false,false,false],[false,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "samuel": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "paulo": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "lailton": {
    "Semana 1 (10/11 a 15/11/2025)": [[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "augusto": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,true,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[true,true,true,true,true,true,true,false,false,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "marcelo": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,true,true,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,true,true,false,false,false,false,false,false,true,true,true,true,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,true,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,true,true,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "heloisa": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,true,false,false,false,false,false,true,true,true,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,true,false,false,false,false,false,true,true,true,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "raissa": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false],[false,false,true,true,false,false,true,true,true,true,true,true,false,false,false,false],[false,true,true,true,false,false,true,true,true,true,true,false,false,false,false,false],[false,true,true,true,false,false,true,true,true,true,true,true,true,false,false,false],[false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,true,true,true,false,false,false,false,false,false],[false,true,true,true,false,false,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,true,true,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "gloria": {
    "Semana 1 (10/11 a 15/11/2025)": [[true,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[true,true,true,true,false,false,false,false,false,false,true,true,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,false,false,false],[false,false,false,false,false,false,false,false,true,true,false,false,false,false,false,false]]
  },
  "fernando": {
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "angel": {
    "Semana 2 (17/11 a 22/11/2025)": [[true,true,true,true,false,false,false,false,false,false,false,false,true,true,false,false],[true,true,true,true,false,false,false,false,false,false,false,true,true,true,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,true,true,true,false,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "ruan": {
    "Semana 2 (17/11 a 22/11/2025)": [[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "lucas": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,true,true,true,true,true,false,false,false,false,false,false],[true,true,true,true,false,false,true,true,true,true,false,false,false,false,false,false],[false,false,false,false,false,false,true,true,true,true,false,false,false,false,false,false],[true,true,true,true,false,false,true,true,true,false,false,false,false,false,false,false],[true,true,true,true,true,true,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  },
  "abilio": {
    "Semana 1 (10/11 a 15/11/2025)": [[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,true,false,false,false,false,false,false,false,false,false,false,false,false,false]],
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,true,true,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[true,false,false,false,false,true,true,true,true,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
  }
};
