
import type { User, Site, Switch, MigrationFlow, WeeklySchedule } from './types';

export const sites: Site[] = [
    { code: 'BGH01', name: 'AC - RIO BRANCO - BOSQUE', uf: 'AC', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'CZS01', name: 'AC - CRUZEIRO DO SUL - CENTRO', uf: 'AC', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'RBO01', name: 'AC - RIO BRANCO - CENTRO', uf: 'AC', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'ARCA1', name: 'AL - ARAPIRACA - CENTRO', uf: 'AL', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'MCO01', name: 'AL - MACEIO - CENTRO', uf: 'AL', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'MCO02', name: 'AL - MACEIO - PAJUCARA', uf: 'AL', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'TRC01', name: 'AL - MACEIO - TABULEIRO DO MARTINS', uf: 'AL', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'MCP01', name: 'AP - MACAPA - CENTRO', uf: 'AP', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'MCP02', name: 'AP - MACAPA - TREM', uf: 'AP', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'SNA01', name: 'AP - SANTANA - CENTRO', uf: 'AP', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'ADP01', name: 'AM - MANAUS - ADRIANOPOLIS', uf: 'AM', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'CMO02', name: 'AM - MANAUS - CIDADE NOVA', uf: 'AM', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'MAN01', name: 'AM - MANAUS - CENTRO', uf: 'AM', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'PTN01', name: 'AM - PARINTINS - CENTRO', uf: 'AM', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'AJU01', name: 'BA - ALAGOINHAS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'BAS01', name: 'BA - BARREIRAS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'BRS01', name: 'BA - FEIRA DE SANTANA - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'ILH01', name: 'BA - ILHEUS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'ITB01', name: 'BA - ITABUNA - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'JZO01', name: 'BA - JUAZEIRO - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'LPD01', name: 'BA - LAURO DE FREITAS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'PFO01', name: 'BA - PAULO AFONSO - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'PSA01', name: 'BA - PORTO SEGURO - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 1 },
    { code: 'SDV01', name: 'BA - SALVADOR - CABULA', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'SDV02', name: 'BA - SALVADOR - CAMINHO DAS ARVORES', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'SDV03', name: 'BA - SALVADOR - COMERCIO', uf: 'BA', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'SDV04', name: 'BA - SALVADOR - IGUATEMI', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'SDV05', name: 'BA - SALVADOR - ITAPUA', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'SLA01', name: 'BA - SANTO ANTONIO DE JESUS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'TFR01', name: 'BA - TEIXEIRA DE FREITAS - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'VCA01', name: 'BA - VITORIA DA CONQUISTA - CENTRO', uf: 'BA', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'JZO02', name: 'CE - JUAZEIRO DO NORTE - CENTRO', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'FTL01', name: 'CE - FORTALEZA - ALDEOTA', uf: 'CE', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'FTL02', name: 'CE - FORTALEZA - BEIRA MAR', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'FTL03', name: 'CE - FORTALEZA - CENTRO', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'FTL04', name: 'CE - FORTALEZA - PARANGABA', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'FTL05', name: 'CE - FORTALEZA - PAPICU', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'MCA01', name: 'CE - MARACANAU - CENTRO', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'SOE01', name: 'CE - SOBRAL - CENTRO', uf: 'CE', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'BSB01', name: 'DF - BRASILIA - ASA SUL', uf: 'DF', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'BSB02', name: 'DF - BRASILIA - ASA NORTE', uf: 'DF', distSwitchCount: 1, accessSwitchCount: 4 },
    { code: 'BSB03', name: 'DF - BRASILIA - LAGO SUL', uf: 'DF', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'BSB04', name: 'DF - BRASILIA - SETOR COMERCIAL SUL', uf: 'DF', distSwitchCount: 2, accessSwitchCount: 4 },
    { code: 'CEI01', name: 'DF - CEILANDIA - CENTRO', uf: 'DF', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'GMA01', name: 'DF - GAMA - SETOR CENTRAL', uf: 'DF', distSwitchCount: 1, accessSwitchCount: 2 },
    { code: 'TGA01', name: 'DF - TAGUATINGA - CENTRO', uf: 'DF', distSwitchCount: 2, accessSwitchCount: 4 },
];

export const switches: Switch[] = [
    { serialNumber: '', model: '', hostname: '', siteCode: 'BGH01', role: 'Access', status: 'In Stock', managementIp: '10.101.9.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'CZS01', role: 'Access', status: 'In Stock', managementIp: '10.101.40.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'RBO01', role: 'Distribution', status: 'Deployed', managementIp: '10.101.0.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'ARCA1', role: 'Access', status: 'Migrated', managementIp: '10.111.130.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MCO01', role: 'Access', status: 'Faulty', managementIp: '10.111.128.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MCO02', role: 'Access', status: 'In Stock', managementIp: '10.111.129.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'TRC01', role: 'Access', status: 'In Stock', managementIp: '10.111.135.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MCP01', role: 'Access', status: 'In Stock', managementIp: '10.103.64.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MCP02', role: 'Access', status: 'In Stock', managementIp: '10.103.65.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SNA01', role: 'Access', status: 'In Stock', managementIp: '10.103.66.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'ADP01', role: 'Access', status: 'In Stock', managementIp: '10.102.131.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'CMO02', role: 'Access', status: 'In Stock', managementIp: '10.102.136.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MAN01', role: 'Distribution', status: 'Deployed', managementIp: '10.102.128.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'PTN01', role: 'Access', status: 'In Stock', managementIp: '10.102.144.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'AJU01', role: 'Access', status: 'In Stock', managementIp: '10.105.194.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BAS01', role: 'Access', status: 'In Stock', managementIp: '10.105.201.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BRS01', role: 'Access', status: 'In Stock', managementIp: '10.105.192.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'ILH01', role: 'Access', status: 'In Stock', managementIp: '10.105.210.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'ITB01', role: 'Access', status: 'In Stock', managementIp: '10.105.211.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'JZO01', role: 'Access', status: 'In Stock', managementIp: '10.105.213.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'LPD01', role: 'Access', status: 'In Stock', managementIp: '10.105.131.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'PFO01', role: 'Access', status: 'In Stock', managementIp: '10.105.218.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'PSA01', role: 'Access', status: 'In Stock', managementIp: '10.105.220.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SDV01', role: 'Access', status: 'In Stock', managementIp: '10.105.132.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SDV02', role: 'Access', status: 'In Stock', managementIp: '10.105.133.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SDV03', role: 'Distribution', status: 'Deployed', managementIp: '10.105.128.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SDV04', role: 'Access', status: 'In Stock', managementIp: '10.105.134.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SDV05', role: 'Access', status: 'In Stock', managementIp: '10.105.135.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SLA01', role: 'Access', status: 'In Stock', managementIp: '10.105.223.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'TFR01', role: 'Access', status: 'In Stock', managementIp: '10.105.224.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'VCA01', role: 'Access', status: 'In Stock', managementIp: '10.105.225.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'JZO02', role: 'Access', status: 'In Stock', managementIp: '10.106.195.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'FTL01', role: 'Distribution', status: 'Deployed', managementIp: '10.106.129.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'FTL02', role: 'Access', status: 'In Stock', managementIp: '10.106.130.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'FTL03', role: 'Access', status: 'In Stock', managementIp: '10.106.128.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'FTL04', role: 'Access', status: 'In Stock', managementIp: '10.106.131.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'FTL05', role: 'Access', status: 'In Stock', managementIp: '10.106.132.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'MCA01', role: 'Access', status: 'In Stock', managementIp: '10.106.199.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'SOE01', role: 'Access', status: 'In Stock', managementIp: '10.106.204.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BSB01', role: 'Distribution', status: 'Deployed', managementIp: '10.128.1.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BSB02', role: 'Access', status: 'In Stock', managementIp: '10.128.2.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BSB03', role: 'Access', status: 'In Stock', managementIp: '10.128.130.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'BSB04', role: 'Distribution', status: 'Deployed', managementIp: '10.128.0.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'CEI01', role: 'Access', status: 'In Stock', managementIp: '10.128.66.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'GMA01', role: 'Access', status: 'In Stock', managementIp: '10.128.65.3' },
    { serialNumber: '', model: '', hostname: '', siteCode: 'TGA01', role: 'Distribution', status: 'Deployed', managementIp: '10.128.64.3' },
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


export const analistas = ['paulo','raissa','pedro','marcelo','lailton','fernando','augusto','nicolas','angel','gloria','joao','heloisa', 'ruan', 'samuel'];
export const nomes: { [key: string]: string } = { paulo: 'Paulo Borges', raissa: 'Raissa Moreira Martins', pedro: 'Pedro Marques Clemonini', marcelo: 'Marcelo dos Anjos Fernandes', lailton: 'Lailton Bezerra de Abreu', fernando: 'Fernando Luis Da Silva Loiola', augusto: 'Luiz Augusto', nicolas: 'Nicolas de Sousa Soares', angel: 'Angel Coello', gloria: 'Glória Maria de Andrade Alves', joao: 'João Ruffino dos Santos', heloisa: 'Heloisa Silva Carvalho', ruan: 'Ruan Italo da Silva Carvalho', samuel: 'Samuel Pereira' };

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
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,true,false,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,true,false,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,true,true,true,true,true,true,true,true,true,false],[true,true,true,true,true,false,false,false,false,false,false,false,false,false,false,false]]
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
    "Semana 2 (17/11 a 22/11/2025)": [[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[true,true,true,true,true,true,true,true,true,true,true,true,true,true,true,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],[false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]]
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
    

    


