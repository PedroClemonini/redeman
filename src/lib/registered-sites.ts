
export type Person = { id: number; name: string };
export type Stage = {
  date: string;
  link: string;
  v2mr: Person[];
  zoom: Person[];
  bts: Person[];
};

export type SiteEntry = {
  id: number;
  sigla: string;
  descricaoBreve: string;
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
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
  return "";
};

// Helper to parse analyst names
const parseAnalysts = (analystString: string | null): Person[] => {
    if (!analystString) return [];
    return analystString.split(/[/,]/).map((name, index) => ({ id: Date.now() + index, name: name.trim() }));
};

export const registeredSites: SiteEntry[] = [
    { 
        id: 1, 
        sigla: "ARN01", 
        descricaoBreve: "Arniqueiras", 
        semana: "Semana 2", 
        planejamento: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("RUAN (M)") }, 
        preparacao: { date: parseDate("17/11/2025") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (T)") }, 
        linkWhatsapp: '' 
    },
    { 
        id: 2, 
        sigla: "BVA02", 
        descricaoBreve: "Bela Vista", 
        semana: "Semana 2", 
        planejamento: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("GLORIA (M)") }, 
        preparacao: { date: parseDate("17/11/2025") }, 
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("PAULO") }, 
        linkWhatsapp: '' 
    },
    { 
        id: 3, 
        sigla: "JBN01", 
        descricaoBreve: "Jardim Botânico", 
        semana: "Semana 2", 
        planejamento: {},
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("ANGEL (M)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("AUGUSTO") }, 
        linkWhatsapp: '' 
    },
    {
        id: 4,
        sigla: "PAE15",
        descricaoBreve: "Pacaembu",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: ''
    },
    {
        id: 5,
        sigla: "RVD03",
        descricaoBreve: "Rio Verde",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("HELOISA (T)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO (T)") },
        linkWhatsapp: ''
    },
    {
        id: 6,
        sigla: "SNO01",
        descricaoBreve: "Sinop",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("RUAN (T)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (M)") },
        linkWhatsapp: ''
    },
    {
        id: 7,
        sigla: "SPO27",
        descricaoBreve: "São Paulo",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("PAULO (N)") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 8,
        sigla: "BRS02",
        descricaoBreve: "Feira de Santana",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("ABILIO (T)") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("PAULO") },
        linkWhatsapp: ''
    },
    {
        id: 9,
        sigla: "BRS02",
        descricaoBreve: "Feira de Santana",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("JOAO RUFINO") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: 10,
        sigla: "DOS01",
        descricaoBreve: "Dourados",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("ANGEL (M)") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: ''
    },
    {
        id: 11,
        sigla: "FNS47",
        descricaoBreve: "Fortaleza",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: ''
    },
    {
        id: 12,
        sigla: "SLA01",
        descricaoBreve: "Santo Antonio de Jesus",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: 13,
        sigla: "BRU04",
        descricaoBreve: "Bauru",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RAISSA") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: 14,
        sigla: "CAS05",
        descricaoBreve: "Cascavel",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("ABILIO (T)") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: 15,
        sigla: "CTA36",
        descricaoBreve: "Curitiba",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("AUGUSTO (M)") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: ''
    },
    {
        id: 16,
        sigla: "IUB01",
        descricaoBreve: "Itumbiara",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("LAILTON") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PAULO") },
        linkWhatsapp: ''
    },
    {
        id: 17,
        sigla: "MCO02",
        descricaoBreve: "Maceió",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PEDRO CLEMONINI") },
        linkWhatsapp: ''
    },
    {
        id: 18,
        sigla: "RVD07",
        descricaoBreve: "Rio Verde",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("RAISSA") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("LUCAS/LAILTON") },
        linkWhatsapp: ''
    },
    {
        id: 19,
        sigla: "ANS01",
        descricaoBreve: "Anápolis",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("RAISSA / ABILIO") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 20,
        sigla: "PAE77",
        descricaoBreve: "Pacaembu",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("JOAO RUFINO / HELOISA (T)") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 21,
        sigla: "TSA02",
        descricaoBreve: "Teresina",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("NICOLAS") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 22,
        sigla: "ARC01",
        descricaoBreve: "Aracaju",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("RUAN") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 23,
        sigla: "BRU01",
        descricaoBreve: "Brusque",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("MARCELO") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: ''
    },
    {
        id: 24,
        sigla: "JFA01",
        descricaoBreve: "Juiz de Fora",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: ''
    },
    {
        id: 25,
        sigla: "MCL01",
        descricaoBreve: "Montes Claros",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LAILTON (M)") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("HELOISA") },
        linkWhatsapp: ''
    },
    {
        id: 26,
        sigla: "PAS01",
        descricaoBreve: "Passo Fundo",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("PAULO") },
        linkWhatsapp: ''
    },
    {
        id: 27,
        sigla: "VTA01",
        descricaoBreve: "Vitória",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("NICOLAS") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("PEDRO CLEMONINI") },
        linkWhatsapp: ''
    },
    {
        id: 28,
        sigla: "BHE05",
        descricaoBreve: "Belo Horizonte",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("LUCAS (M) / RAISSA (T)") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("RAISSA") },
        linkWhatsapp: ''
    },
    {
        id: 29,
        sigla: "BLM31",
        descricaoBreve: "Belém",
        semana: "Semana 4",
        planejamento: { },
        preparacao: { date: parseDate("24/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("25/11/2025"), v2mr: parseAnalysts("LAILTON") },
        linkWhatsapp: ''
    },
    {
        id: 30,
        sigla: "AJU01",
        descricaoBreve: "Aracaju",
        semana: "Semana 4",
        planejamento: { },
        preparacao: { date: parseDate("28/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("29/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        linkWhatsapp: ''
    },
    {
        id: 31,
        sigla: "TSA01",
        descricaoBreve: "Teresina",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("NICOLAS") },
        linkWhatsapp: ''
    }
];
