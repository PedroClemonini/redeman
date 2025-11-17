
'use client';

import { useState, useMemo } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

type Person = { id: number; name: string };
type Stage = {
  date: string;
  link: string;
  v2mr: Person[];
  zoom: Person[];
  bts: Person[];
};

type SiteEntry = {
  id: number;
  sigla: string;
  descricaoBreve: string;
  semana: string;
  planejamento: Partial<Stage>;
  preparacao: Partial<Stage>;
  migracao: Partial<Stage>;
  linkWhatsapp: string;
};

const initialSiteData: SiteEntry[] = [
    { id: 1, sigla: "ARN01", descricaoBreve: "Arniqueiras", semana: "Semana 2", planejamento: { data: "2025-11-17", v2mr: [{id: 1, name: "RUAN (M)"}] }, preparacao: { data: "2025-11-18" }, migracao: { data: "2025-11-19" }, linkWhatsapp: '' },
    { id: 2, sigla: "BVA02", descricaoBreve: "Bela Vista", semana: "Semana 2", planejamento: { data: "2025-11-17", v2mr: [{id: 1, name: "GLORIA (M)"}] }, preparacao: { data: "2025-11-18" }, migracao: { data: "2025-11-19", v2mr: [{id: 1, name: "PAULO"}] }, linkWhatsapp: '' },
];


export default function RegisterSitePage() {
  const [sites, setSites] = useState<SiteEntry[]>(initialSiteData);
  
  const [sigla, setSigla] = useState('');
  const [descricaoBreve, setDescricaoBreve] = useState('');
  const [semana, setSemana] = useState('Semana 2');

  const [dataPlanejamento, setDataPlanejamento] = useState('');
  const [linkPlanejamento, setLinkPlanejamento] = useState('');
  const [v2mrPlanejamento, setV2mrPlanejamento] = useState<Person[]>([]);
  
  const [dataPreparacao, setDataPreparacao] = useState('');
  const [linkPreparacao, setLinkPreparacao] = useState('');
  const [zoomPreparacao, setZoomPreparacao] = useState<Person[]>([]);
  const [btsPreparacao, setBtsPreparacao] = useState<Person[]>([]);

  const [dataMigracao, setDataMigracao] = useState('');
  const [linkMigracao, setLinkMigracao] = useState('');
  const [zoomMigracao, setZoomMigracao] = useState<Person[]>([]);
  const [btsMigracao, setBtsMigracao] = useState<Person[]>([]);

  const [linkWhatsapp, setLinkWhatsapp] = useState('');
  
  const addPerson = (
    list: Person[],
    setter: React.Dispatch<React.SetStateAction<Person[]>>,
    inputElementId: string
  ) => {
    const input = document.getElementById(inputElementId) as HTMLInputElement;
    if (input && input.value.trim()) {
      setter([...list, { id: Date.now(), name: input.value.trim() }]);
      input.value = '';
    }
  };

  const removePerson = (list: Person[], setter: React.Dispatch<React.SetStateAction<Person[]>>, id: number) => {
    setter(list.filter((p) => p.id !== id));
  };

  const addSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sigla.length > 5 || !sigla || !descricaoBreve || !semana) return;

    const newSite: SiteEntry = {
      id: Date.now(),
      sigla: sigla.toUpperCase(),
      descricaoBreve,
      semana,
      planejamento: {
        date: dataPlanejamento,
        link: linkPlanejamento,
        v2mr: v2mrPlanejamento,
      },
      preparacao: {
        date: dataPreparacao,
        link: linkPreparacao,
        zoom: zoomPreparacao,
        bts: btsPreparacao,
      },
      migracao: {
        date: dataMigracao,
        link: linkMigracao,
        zoom: zoomMigracao,
        bts: btsMigracao,
      },
      linkWhatsapp,
    };
    
    setSites([newSite, ...sites]);
    e.currentTarget.reset();
    
    // Clear state
    setSigla('');
    setDescricaoBreve('');
    setSemana('Semana 2');
    setDataPlanejamento('');
    setLinkPlanejamento('');
    setV2mrPlanejamento([]);
    setDataPreparacao('');
    setLinkPreparacao('');
    setZoomPreparacao([]);
    setBtsPreparacao([]);
    setDataMigracao('');
    setLinkMigracao('');
    setZoomMigracao([]);
    setBtsMigracao([]);
    setLinkWhatsapp('');
  };

  const removeSite = (id: number) => {
    setSites(sites.filter((s) => s.id !== id));
  };

  const sitesByWeek = useMemo(() => {
    return sites.reduce((acc, site) => {
      if (!acc[site.semana]) {
        acc[site.semana] = [];
      }
      acc[site.semana].push(site);
      return acc;
    }, {} as Record<string, SiteEntry[]>);
  }, [sites]);

  const PersonInput = ({ list, setter, inputId, buttonColor, placeholder }: { list: Person[], setter: React.Dispatch<React.SetStateAction<Person[]>>, inputId: string, buttonColor: string, placeholder: string }) => (
    <>
      <div className="flex flex-wrap gap-2 mb-2 min-h-[24px]">
        {list.map(p => (
          <Badge key={p.id} variant="secondary" className={cn("flex items-center gap-1.5", buttonColor)}>
            {p.name}
            <button type="button" onClick={() => removePerson(list, setter, p.id)} className="rounded-full hover:bg-black/10">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input id={inputId} placeholder={placeholder} className="h-9 text-sm" onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addPerson(list, setter, inputId); }}}/>
        <Button type="button" size="icon" className={cn("h-9 w-9", buttonColor)} onClick={() => addPerson(list, setter, inputId)}><Plus className="h-4 w-4" /></Button>
      </div>
    </>
  );

  const formatDate = (dateString?: string) => {
    if (!dateString) return '—';
    const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cadastro de Sites"
        description="Fluxo: Planejamento → Preparação → Migração"
      />
      <Card>
        <CardContent className="p-6">
          <form onSubmit={addSite} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="sigla" className="mb-2 block">SIGLA (máx. 5)</Label>
                <Input id="sigla" value={sigla} onChange={(e) => setSigla(e.target.value)} maxLength={5} placeholder="ex: ARN01" required />
                {sigla.length > 5 && <p className="text-red-500 text-xs mt-1">Máx. 5 caracteres!</p>}
              </div>
              <div>
                <Label htmlFor="descricaoBreve" className="mb-2 block">DESCRIÇÃO BREVE</Label>
                <Input id="descricaoBreve" value={descricaoBreve} onChange={(e) => setDescricaoBreve(e.target.value)} placeholder="ex: Arniqueiras" required />
              </div>
              <div>
                <Label htmlFor="semanaSelect" className="mb-2 block">SEMANA</Label>
                <Select value={semana} onValueChange={setSemana} required>
                  <SelectTrigger id="semanaSelect"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Semana 1">Semana 1</SelectItem>
                    <SelectItem value="Semana 2">Semana 2</SelectItem>
                    <SelectItem value="Semana 3">Semana 3</SelectItem>
                    <SelectItem value="Semana 4">Semana 4</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Etapas */}
            <div className="space-y-4">
              {/* Planejamento */}
              <div className="border bg-muted/20 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">1</span>PLANEJAMENTO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="date" value={dataPlanejamento} onChange={e => setDataPlanejamento(e.target.value)} required />
                  <Input type="url" value={linkPlanejamento} onChange={e => setLinkPlanejamento(e.target.value)} placeholder="Link da Reunião" />
                </div>
                <div className="mt-4">
                  <Label className="block text-sm font-medium mb-2">Analistas V2MR</Label>
                  <PersonInput list={v2mrPlanejamento} setter={setV2mrPlanejamento} inputId="v2mr-input-planejamento" placeholder="Nome do analista" buttonColor="bg-blue-600 hover:bg-blue-700 text-white" />
                </div>
              </div>

              {/* Preparação */}
              <div className="border bg-muted/20 rounded-lg p-4">
                <h3 className="text-lg font-bold mb-3 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-yellow-500 text-sm font-bold text-white">2</span>PREPARAÇÃO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="date" value={dataPreparacao} onChange={e => setDataPreparacao(e.target.value)} />
                  <Input type="url" value={linkPreparacao} onChange={e => setLinkPreparacao(e.target.value)} placeholder="Link da Reunião" />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Técnicos Zoomtech</Label>
                    <PersonInput list={zoomPreparacao} setter={setZoomPreparacao} inputId="zoom-input-preparacao" placeholder="Nome do técnico" buttonColor="bg-green-600 hover:bg-green-700 text-white" />
                  </div>
                   <div>
                    <Label className="block text-sm font-medium mb-2">Técnicos BBTS (In Loco)</Label>
                    <PersonInput list={btsPreparacao} setter={setBtsPreparacao} inputId="bts-input-preparacao" placeholder="Nome do técnico" buttonColor="bg-purple-600 hover:bg-purple-700 text-white" />
                  </div>
                </div>
              </div>
              
              {/* Migração */}
              <div className="border bg-muted/20 rounded-lg p-4">
                 <h3 className="text-lg font-bold mb-3 flex items-center gap-3"><span className="flex size-8 items-center justify-center rounded-full bg-green-600 text-sm font-bold text-white">3</span>MIGRAÇÃO</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input type="date" value={dataMigracao} onChange={e => setDataMigracao(e.target.value)} />
                  <Input type="url" value={linkMigracao} onChange={e => setLinkMigracao(e.target.value)} placeholder="Link da Reunião" />
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="block text-sm font-medium mb-2">Técnicos Zoomtech</Label>
                    <PersonInput list={zoomMigracao} setter={setZoomMigracao} inputId="zoom-input-migracao" placeholder="Nome do técnico" buttonColor="bg-green-600 hover:bg-green-700 text-white" />
                  </div>
                   <div>
                    <Label className="block text-sm font-medium mb-2">Técnicos BBTS (In Loco)</Label>
                    <PersonInput list={btsMigracao} setter={setBtsMigracao} inputId="bts-input-migracao" placeholder="Nome do técnico" buttonColor="bg-purple-600 hover:bg-purple-700 text-white" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border bg-muted/20 rounded-lg p-4">
                <Label htmlFor="linkWhatsapp" className="block text-sm font-medium mb-2">Grupo WhatsApp do Site</Label>
                <Input id="linkWhatsapp" type="url" value={linkWhatsapp} onChange={e => setLinkWhatsapp(e.target.value)} placeholder="https://chat.whatsapp.com/..." />
            </div>

            <Button type="submit" className="w-full text-lg h-12">CADASTRAR SITE</Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6 mt-8">
        {Object.keys(sitesByWeek).sort().map(week => (
          <div key={week}>
            <h3 className="text-xl font-bold mb-4 text-primary">{week}</h3>
            {sitesByWeek[week].map(site => (
               <div key={site.id} className="border bg-card rounded-lg p-5 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-bold">{site.sigla} – {site.descricaoBreve}</h4>
                  <Button variant="ghost" size="icon" onClick={() => removeSite(site.id)} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-8 w-8">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <p><strong>Planejamento:</strong> {formatDate(site.planejamento.date)}</p>
                    {site.planejamento.v2mr && site.planejamento.v2mr.length > 0 && 
                      <div className="mt-1 flex flex-wrap gap-1">
                        {site.planejamento.v2mr.map(p => <Badge key={p.id} className="bg-blue-100 text-blue-700">{p.name}</Badge>)}
                      </div>
                    }
                  </div>
                   <div><p><strong>Preparação:</strong> {formatDate(site.preparacao?.date)}</p></div>
                   <div><p><strong>Migração:</strong> {formatDate(site.migracao?.date)}</p></div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

    </div>
  );
}

    