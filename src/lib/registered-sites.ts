
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

export const registeredSites: SiteEntry[] = [
    { id: 1, sigla: "ARN01", descricaoBreve: "Arniqueiras", semana: "Semana 2", planejamento: { date: "2025-11-17", v2mr: [{id: 1, name: "RUAN (M)"}] }, preparacao: { date: "2025-11-18" }, migracao: { date: "2025-11-19" }, linkWhatsapp: '' },
    { id: 2, sigla: "BVA02", descricaoBreve: "Bela Vista", semana: "Semana 2", planejamento: { date: "2025-11-17", v2mr: [{id: 1, name: "GLORIA (M)"}] }, preparacao: { date: "2025-11-18" }, migracao: { date: "2025-11-19", v2mr: [{id: 1, name: "PAULO"}] }, linkWhatsapp: '' },
];
