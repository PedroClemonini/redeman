
export type Person = { id: number; name: string };
export type Stage = {
  date: string;
  link: string;
  v2mr: Person[];
  zoom: Person[];
  bts: Person[];
};

export type SiteEntry = {
  id: string;
  sigla: string;
  descricaoBreve: string;
  localidade: string;
  semana: string;
  planejamento: Partial<Stage>;
  preparacao: Partial<Stage>;
  migracao: Partial<Stage>;
  linkWhatsapp: string;
};

// Helper to convert date from DD/MM/YYYY to YYYY-MM-DD
const parseDate = (dateString: string | null): string => {
  if (!dateString) return "";
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const year = parts[2].length === 4 ? parts[2] : `20${parts[2]}`;
    return `${year}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return "";
};

// Helper to parse analyst names
const parseAnalysts = (analystString: string | null): Person[] => {
    if (!analystString) return [];
    return analystString.split(/[/,]/).map((name, index) => ({ id: Date.now() + Math.random() + index, name: name.trim() }));
};

export const registeredSites: SiteEntry[] = [
    { 
        id: "site_1", 
        sigla: "ARN01", 
        descricaoBreve: "Arniqueiras", 
        localidade: "Taguatinga/DF",
        semana: "Semana 2", 
        planejamento: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("RUAN (M)") }, 
        preparacao: { date: parseDate("17/11/2025") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (T)") }, 
        linkWhatsapp: '' 
    },
    { 
        id: "site_2", 
        sigla: "BVA02", 
        descricaoBreve: "Bela Vista", 
        localidade: "Goiânia/GO",
        semana: "Semana 2", 
        planejamento: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("GLORIA (M)") }, 
        preparacao: { date: parseDate("17/11/2025") }, 
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("PAULO") }, 
        linkWhatsapp: '' 
    },
    { 
        id: "site_3", 
        sigla: "JBN01", 
        descricaoBreve: "Jardim Botânico",
        localidade: "Brasília/DF",
        semana: "Semana 2", 
        planejamento: {},
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("ANGEL (M)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("AUGUSTO") }, 
        linkWhatsapp: '' 
    },
    {
        id: "site_4",
        sigla: "PAE15",
        descricaoBreve: "Pacaembu",
        localidade: "São Paulo/SP",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: ''
    },
    {
        id: "site_5",
        sigla: "RVD03",
        descricaoBreve: "Rio Verde",
        localidade: "Goiás/GO",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("HELOISA (T)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO (T)") },
        linkWhatsapp: ''
    },
    {
        id: "site_6",
        sigla: "SNO01",
        descricaoBreve: "Sinop",
        localidade: "Mato Grosso/MT",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("RUAN (T)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (M)") },
        linkWhatsapp: ''
    },
    {
        id: "site_7",
        sigla: "SPO27",
        descricaoBreve: "São Paulo",
        localidade: "São Paulo/SP",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("PAULO (N)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: "site_9",
        sigla: "BRS02",
        descricaoBreve: "Feira de Santana",
        localidade: "Bahia/BA",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("JOAO RUFINO") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: "site_10",
        sigla: "DOS01",
        descricaoBreve: "Dourados",
        localidade: "Mato Grosso do Sul/MS",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("ANGEL (M)") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: ''
    },
    {
        id: "site_11",
        sigla: "FNS47",
        descricaoBreve: "Fortaleza",
        localidade: "Ceará/CE",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: ''
    },
    {
        id: "site_12",
        sigla: "SLA01",
        descricaoBreve: "Santo Antonio de Jesus",
        localidade: "Bahia/BA",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: "site_13",
        sigla: "BRU04",
        descricaoBreve: "Bauru",
        localidade: "São Paulo/SP",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RAISSA") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: "site_14",
        sigla: "CAS05",
        descricaoBreve: "Cascavel",
        localidade: "Paraná/PR",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("ABILIO (T)") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: "site_15",
        sigla: "CTA36",
        descricaoBreve: "Curitiba",
        localidade: "Paraná/PR",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("AUGUSTO (M)") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: ''
    },
    {
        id: "site_16",
        sigla: "IUB01",
        descricaoBreve: "Itumbiara",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("LAILTON") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PAULO") },
        linkWhatsapp: ''
    },
    {
        id: "site_17",
        sigla: "MCO02",
        descricaoBreve: "Maceió",
        localidade: "Alagoas/AL",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PEDRO CLEMONINI") },
        linkWhatsapp: ''
    },
    {
        id: "site_18",
        sigla: "RVD07",
        descricaoBreve: "Rio Verde",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("RAISSA") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("PAULO SILVA/NICOLAS") }, 
        linkWhatsapp: '' 
    },
    {
        id: "site_19",
        sigla: "ANS01",
        descricaoBreve: "Anápolis",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("RAISSA/ABILIO") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: "site_20",
        sigla: "PAE77",
        descricaoBreve: "Pacaembu",
        localidade: "São Paulo/SP",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("JOAO RUFINO, HELOISA (T)") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: "site_21",
        sigla: "TSA02",
        descricaoBreve: "Teresina",
        localidade: "Piauí/PI",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("NICOLAS") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("ABILIO/PAULO BORGES") },
        linkWhatsapp: ''
    },
    {
        id: "site_22",
        sigla: "ARC01",
        descricaoBreve: "Aracaju",
        localidade: "Sergipe/SE",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("RUAN") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: "site_23",
        sigla: "BRU01",
        descricaoBreve: "Brusque",
        localidade: "Santa Catarina/SC",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: "site_24",
        sigla: "JFA01",
        descricaoBreve: "Juiz de Fora",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: "site_25",
        sigla: "MCL01",
        descricaoBreve: "Montes Claros",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LAILTON (M)") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("HELOISA") },
        linkWhatsapp: ''
    },
    {
        id: "site_26",
        sigla: "PAS01",
        descricaoBreve: "Passo Fundo",
        localidade: "Rio Grande do Sul/RS",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LAILTON/HELOISA") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("SAMUEL") },
        linkWhatsapp: ''
    },
    {
        id: "site_27",
        sigla: "VTA01",
        descricaoBreve: "Vitória",
        localidade: "Espírito Santo/ES",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LUCAS/SAMUEL") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("PAULO SILVA") },
        linkWhatsapp: ''
    },
    {
        id: "site_28",
        sigla: "BHE05",
        descricaoBreve: "Belo Horizonte",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LUCAS (M)/RAISSA (T)") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("RAISSA") },
        linkWhatsapp: ''
    },
    {
        id: "site_29",
        sigla: "BLM31",
        descricaoBreve: "Belém",
        localidade: "Pará/PA",
        semana: "Semana 4",
        planejamento: { },
        preparacao: { date: parseDate("24/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("25/11/2025"), v2mr: parseAnalysts("LAILTON") },
        linkWhatsapp: ''
    },
    {
        id: "site_30",
        sigla: "AJU01",
        descricaoBreve: "Aracaju",
        localidade: "Sergipe/SE",
        semana: "Semana 4",
        planejamento: { },
        preparacao: { date: parseDate("28/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("29/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        linkWhatsapp: ''
    },
    {
        id: "site_31",
        sigla: "TSA01",
        descricaoBreve: "Teresina",
        localidade: "Piauí/PI",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("RUAN/NICOLAS") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: "site_32",
        sigla: "CSL01",
        descricaoBreve: "Cascavel",
        localidade: "Paraná/PR",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("LAILTON/PEDRO CLEMONINI") },
        linkWhatsapp: ''
    }
];
