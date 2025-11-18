
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
        localidade: "Taguatinga/DF",
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
        localidade: "Goiânia/GO",
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
        localidade: "Brasília/DF",
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
        localidade: "São Paulo/SP",
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
        localidade: "Goiás/GO",
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
        localidade: "Mato Grosso/MT",
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
        localidade: "São Paulo/SP",
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
        localidade: "Bahia/BA",
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
        localidade: "Bahia/BA",
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
        localidade: "Mato Grosso do Sul/MS",
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
        localidade: "Ceará/CE",
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
        localidade: "Bahia/BA",
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
        localidade: "São Paulo/SP",
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
        localidade: "Paraná/PR",
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
        localidade: "Paraná/PR",
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
        localidade: "Goiás/GO",
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
        localidade: "Alagoas/AL",
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
        localidade: "Goiás/GO",
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
        localidade: "Goiás/GO",
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
        localidade: "São Paulo/SP",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("JOAO RUFINO, HELOISA (T)") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: ''
    },
    {
        id: 21,
        sigla: "TSA02",
        descricaoBreve: "Teresina",
        localidade: "Piauí/PI",
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
        localidade: "Sergipe/SE",
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
        localidade: "Santa Catarina/SC",
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
        localidade: "Minas Gerais/MG",
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
        localidade: "Minas Gerais/MG",
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
        localidade: "Rio Grande do Sul/RS",
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
        localidade: "Espírito Santo/ES",
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
        localidade: "Minas Gerais/MG",
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
        localidade: "Pará/PA",
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
        localidade: "Sergipe/SE",
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
        localidade: "Piauí/PI",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("A DEFINIR") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("NICOLAS") },
        linkWhatsapp: ''
    }
];
