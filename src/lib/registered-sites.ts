
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
  qtd_equipamentos?: number;
};

// Helper to convert date from DD/MM/YYYY to YYYY-MM-DD
const parseDate = (dateString: string | null): string => {
  if (!dateString) return "";
  const parts = dateString.split('/');
  if (parts.length === 3) {
    const year = parts[2].length === 4 ? parts[2] : `20${parts[2]}`;
    return `${year}-${parts[1].padStart(2, '0')}-${parts[0].padStart(2, '0')}`;
  }
  return dateString; // Assume YYYY-MM-DD format if not DD/MM/YYYY
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
        preparacao: { date: parseDate("2025-11-17"), v2mr: parseAnalysts("João Ruffino") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (T)") }, 
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    { 
        id: "site_2", 
        sigla: "BVA02", 
        descricaoBreve: "Bela Vista", 
        localidade: "Goiânia/GO",
        semana: "Semana 2", 
        planejamento: { date: parseDate("17/11/2025"), v2mr: parseAnalysts("GLORIA (M)") }, 
        preparacao: { date: parseDate("2025-11-17"), v2mr: parseAnalysts("Raissa, Abílio, Augusto, João") }, 
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("PAULO") }, 
        linkWhatsapp: '',
        qtd_equipamentos: 4
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
        preparacao: { date: parseDate("2025-11-17"), v2mr: parseAnalysts("Nicolas, Clemonini") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_5",
        sigla: "RVD03",
        descricaoBreve: "Rio Verde",
        localidade: "Goiás/GO",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-17"), v2mr: parseAnalysts("Heloisa") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("FERNANDO (T)") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_6",
        sigla: "SNO01",
        descricaoBreve: "Sinop",
        localidade: "Mato Grosso/MT",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-17"), v2mr: parseAnalysts("João Ruffino, Pedro Clemonini") },
        migracao: { date: parseDate("18/11/2025"), v2mr: parseAnalysts("RUAN (M)") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
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
        preparacao: { date: parseDate("2025-11-18"), v2mr: parseAnalysts("Paulo Borges") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_11",
        sigla: "FNS47",
        descricaoBreve: "Fortaleza",
        localidade: "Ceará/CE",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-18"), v2mr: parseAnalysts("Nicolas, Abílio, Lailton, João Ruffino") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("FERNANDO") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_12",
        sigla: "SLA01",
        descricaoBreve: "Santo Antonio de Jesus",
        localidade: "Bahia/BA",
        semana: "Semana 2",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-18"), v2mr: parseAnalysts("Heloisa") },
        migracao: { date: parseDate("19/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: '',
        qtd_equipamentos: 5
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
        preparacao: { date: parseDate("2025-11-20"), v2mr: parseAnalysts("Pedro Clemonini") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("GLORIA") },
        linkWhatsapp: '',
        qtd_equipamentos: 5
    },
    {
        id: "site_16",
        sigla: "IUB01",
        descricaoBreve: "Itumbiara",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-19"), v2mr: parseAnalysts("João Ruffino, Paulo Eduardo") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PAULO") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_17",
        sigla: "MCO02",
        descricaoBreve: "Maceió",
        localidade: "Alagoas/AL",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-19"), v2mr: parseAnalysts("Lailton") },
        migracao: { date: parseDate("20/11/2025"), v2mr: parseAnalysts("PEDRO CLEMONINI") },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_18",
        sigla: "RVD07",
        descricaoBreve: "Rio Verde",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-19"), v2mr: parseAnalysts("Augusto, Nicolas, João Ruffino") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("PAULO SILVA/NICOLAS") }, 
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_19",
        sigla: "ANS01",
        descricaoBreve: "Anápolis",
        localidade: "Goiás/GO",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-20"), v2mr: parseAnalysts("Samuel Pereira") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: '',
        qtd_equipamentos: 5
    },
    {
        id: "site_20",
        sigla: "PAE77",
        descricaoBreve: "Pacaembu",
        localidade: "São Paulo/SP",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-20"), v2mr: parseAnalysts("Paulo Borges") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_21",
        sigla: "TSA02",
        descricaoBreve: "Teresina",
        localidade: "Piauí/PI",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-20"), v2mr: parseAnalysts("Paulo Borges, João Ruffino") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("ABILIO/PAULO BORGES") },
        linkWhatsapp: '',
        qtd_equipamentos: 5
    },
    {
        id: "site_22",
        sigla: "ARC01",
        descricaoBreve: "Aracaju",
        localidade: "Sergipe/SE",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts(null) },
        linkWhatsapp: '',
        qtd_equipamentos: 8
    },
    {
        id: "site_23",
        sigla: "BRU01",
        descricaoBreve: "Brusque",
        localidade: "Santa Catarina/SC",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("João Ruffino, Clemonini") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("ANGEL") },
        linkWhatsapp: '',
        qtd_equipamentos: 11
    },
    {
        id: "site_24",
        sigla: "JFA01",
        descricaoBreve: "Juiz de Fora",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: '',
        qtd_equipamentos: 11
    },
    {
        id: "site_25",
        sigla: "MCL01",
        descricaoBreve: "Montes Claros",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts(null) },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("HELOISA") },
        linkWhatsapp: '',
        qtd_equipamentos: 10
    },
    {
        id: "site_26",
        sigla: "PAS01",
        descricaoBreve: "Passo Fundo",
        localidade: "Rio Grande do Sul/RS",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("Nicolas, Heloisa, Lailton") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("SAMUEL") },
        linkWhatsapp: '',
        qtd_equipamentos: 8
    },
    {
        id: "site_27",
        sigla: "VTA01",
        descricaoBreve: "Vitória",
        localidade: "Espírito Santo/ES",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("Samuel Pereira") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("PAULO SILVA") },
        linkWhatsapp: '',
        qtd_equipamentos: 14
    },
    {
        id: "site_28",
        sigla: "BHE05",
        descricaoBreve: "Belo Horizonte",
        localidade: "Minas Gerais/MG",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("Paulo Eduardo") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("RAISSA") },
        linkWhatsapp: '',
        qtd_equipamentos: 13
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
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("Nicolas, João R.") },
        migracao: { date: parseDate("22/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: '',
        qtd_equipamentos: 8
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
    },
    {
        id: "site_33",
        sigla: "MNS03",
        descricaoBreve: "Manaus",
        localidade: "Amazonas/AM",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("12/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_34",
        sigla: "SNO03",
        descricaoBreve: "Sinop",
        localidade: "Mato Grosso/MT",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("12/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_35",
        sigla: "GNA04",
        descricaoBreve: "Goiânia",
        localidade: "Goiás/GO",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("12/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_36",
        sigla: "CAH01",
        descricaoBreve: "Cachoeiro de Itapemirim",
        localidade: "Espírito Santo/ES",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("12/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_37",
        sigla: "AIR01",
        descricaoBreve: "Ariquemes",
        localidade: "Rondônia/RO",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("14/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_38",
        sigla: "FLA05",
        descricaoBreve: "Florianópolis",
        localidade: "Santa Catarina/SC",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("13/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_39",
        sigla: "LNS01",
        descricaoBreve: "Lins",
        localidade: "São Paulo/SP",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("13/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_40",
        sigla: "SLS03",
        descricaoBreve: "São Luís",
        localidade: "Maranhão/MA",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("14/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_41",
        sigla: "MRO01",
        descricaoBreve: "Marabá",
        localidade: "Pará/PA",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("14/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_42",
        sigla: "BES01",
        descricaoBreve: "Belém",
        localidade: "Pará/PA",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("14/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 4
    },
    {
        id: "site_43",
        sigla: "SMA01",
        descricaoBreve: "Santa Maria",
        localidade: "Rio Grande do Sul/RS",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("14/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 5
    },
    {
        id: "site_44",
        sigla: "PAA01",
        descricaoBreve: "Palmas",
        localidade: "Tocantins/TO",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("15/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 10
    },
    {
        id: "site_45",
        sigla: "SOO03",
        descricaoBreve: "Sorocaba",
        localidade: "São Paulo/SP",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("15/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 11
    },
    {
        id: "site_46",
        sigla: "VGA01",
        descricaoBreve: "Varginha",
        localidade: "Minas Gerais/MG",
        semana: "Semana 1",
        planejamento: { },
        preparacao: { },
        migracao: { date: parseDate("15/11/2025")},
        linkWhatsapp: '',
        qtd_equipamentos: 8
    },
    {
        id: "site_47",
        sigla: "BRU04",
        descricaoBreve: "Bauru",
        localidade: "São Paulo/SP",
        semana: "Semana 3",
        planejamento: { },
        preparacao: { date: parseDate("2025-11-21"), v2mr: parseAnalysts("Heloisa, Nicolas") },
        migracao: { date: parseDate("21/11/2025"), v2mr: parseAnalysts("AUGUSTO") },
        linkWhatsapp: '',
        qtd_equipamentos: 11
    }
];

    
