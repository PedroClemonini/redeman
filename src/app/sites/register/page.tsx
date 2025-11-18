
'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
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
import { X, Plus, ExternalLink, Video } from 'lucide-react';
import { cn } from '@/lib/utils';
import { registeredSites, type SiteEntry, type Person } from '@/lib/registered-sites';
import { unifiedTasks } from '@/lib/tasks-data';

type Status = 'Completo' | 'Em Andamento' | 'Pendente' | 'Não Iniciado';

const statusColors: Record<Status, string> = {
  'Completo': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
  'Em Andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
  'Pendente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
  'Não Iniciado': 'bg-gray-100 text-gray-500 dark:bg-gray-900/50 dark:text-gray-400',
};

const getPhaseTasks = (phase: 'planejamento' | 'preparacao' | 'migracao') => {
    return unifiedTasks.filter(t => t.phase === phase);
}

const planningTasks = getPhaseTasks('planejamento');
const preparationTasks = getPhaseTasks('preparacao');
const migrationTasks = getPhaseTasks('migracao');


export default function RegisterSitePage() {
  const [sites, setSites] = useState<SiteEntry[]>(registeredSites);
  
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

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    const syncTasks = () => {
      const saved = localStorage.getItem("unified-tasks-checklist");
      if (saved) {
        setCompletedTasks(new Set(JSON.parse(saved)));
      }
    };
    syncTasks();
    window.addEventListener('storage', syncTasks);
    return () => window.removeEventListener('storage', syncTasks);
  }, []);
  
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

  const siteProgress = useMemo(() => {
    return sites.map(site => {
      const getPhaseStatus = (tasks: typeof unifiedTasks) => {
        if (tasks.length === 0) return 'Completo';
        const completedCount = tasks.filter(task => completedTasks.has(task.id)).length;
        if (completedCount === tasks.length) return 'Completo';
        if (completedCount > 0) return 'Em Andamento';
        return 'Não Iniciado';
      };

      const planningStatus = getPhaseStatus(planningTasks);
      let preparationStatus: Status = 'Pendente';
      let migrationStatus: Status = 'Pendente';

      if (planningStatus === 'Completo') {
        preparationStatus = getPhaseStatus(preparationTasks);
      } else if (planningStatus === 'Em Andamento' || planningStatus === 'Não Iniciado') {
        preparationStatus = 'Pendente';
      }

      if (preparationStatus === 'Completo') {
        migrationStatus = getPhaseStatus(migrationTasks);
      } else if (preparationStatus === 'Em Andamento' || preparationStatus === 'Não Iniciado') {
        migrationStatus = 'Pendente';
      }
      
      if (planningStatus !== 'Completo') {
         preparationStatus = 'Pendente';
         migrationStatus = 'Pendente';
      }
      if (preparationStatus !== 'Completo') {
         migrationStatus = 'Pendente';
      }

      return {
        ...site,
        planningStatus,
        preparationStatus,
        migrationStatus,
      };
    });
  }, [sites, completedTasks]);


  const sitesByWeek = useMemo(() => {
    return siteProgress.reduce((acc, site) => {
      if (!acc[site.semana]) {
        acc[site.semana] = [];
      }
      acc[site.semana].push(site);
      return acc;
    }, {} as Record<string, typeof siteProgress>);
  }, [siteProgress]);

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

  const getAnalystsString = (people?: Person[]) => {
      if (!people || people.length === 0) return null;
      return people.map(p => p.name).join(', ');
  }

  const getMeetingLink = (site: SiteEntry & { planningStatus: Status; preparationStatus: Status; migrationStatus: Status; }) => {
    if (site.planningStatus !== 'Completo' && site.planejamento.link) {
        return site.planejamento.link;
    }
    if (site.preparationStatus !== 'Completo' && site.preparacao.link) {
        return site.preparacao.link;
    }
    if (site.migrationStatus !== 'Completo' && site.migracao.link) {
        return site.migracao.link;
    }
    return site.planejamento.link || site.preparacao.link || site.migracao.link || '';
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
            <div className="space-y-4">
            {sitesByWeek[week].map(site => {
                const { planningStatus, preparationStatus, migrationStatus } = site;
                const planningAnalysts = getAnalystsString(site.planejamento.v2mr);
                const prepAnalysts = getAnalystsString(site.preparacao.v2mr);
                const migAnalysts = getAnalystsString(site.migracao.v2mr);
                const meetingLink = getMeetingLink(site);

               return (
               <div key={site.id} className="border bg-card rounded-lg shadow-sm overflow-hidden">
                <div className='p-5'>
                  <div className="flex justify-between items-start mb-3">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="text-lg font-bold">{site.sigla} – {site.descricaoBreve}</h4>
                      </div>
                      <div className='flex items-center gap-2 flex-shrink-0'>
                          <Button variant="outline" size="sm" asChild>
                              <Link href={`/tarefa?siteId=${site.id}`}>
                                 <ExternalLink className="mr-2 h-4 w-4"/> Ver Tarefas
                              </Link>
                          </Button>
                          {meetingLink && (
                            <Button variant="outline" size="sm" asChild>
                              <Link href={meetingLink} target="_blank">
                                <Video className="mr-2 h-4 w-4"/> Reunião
                              </Link>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => removeSite(site.id)} className="text-muted-foreground hover:text-destructive hover:bg-red-50 h-8 w-8">
                              <X className="h-4 w-4" />
                          </Button>
                      </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 border-t">
                  <div className='p-4'>
                    <p className='font-bold text-sm'>Planejamento</p>
                    <p className="text-sm text-muted-foreground">{formatDate(site.planejamento.date)}</p>
                    {planningAnalysts && <p className="text-xs mt-1 text-muted-foreground">Analista(s): {planningAnalysts}</p>}
                    <Badge variant="secondary" className={cn("mt-2 text-xs", statusColors[planningStatus])}>
                      {planningStatus}
                    </Badge>
                  </div>
                   <div className='p-4 border-l border-r'>
                    <p className='font-bold text-sm'>Preparação</p>
                    <p className="text-sm text-muted-foreground">{formatDate(site.preparacao?.date)}</p>
                    {prepAnalysts && <p className="text-xs mt-1 text-muted-foreground">Analista(s): {prepAnalysts}</p>}
                     <Badge variant="secondary" className={cn("mt-2 text-xs", statusColors[preparationStatus])}>
                      {preparationStatus}
                    </Badge>
                   </div>
                   <div className='p-4'>
                     <p className='font-bold text-sm'>Migração</p>
                    <p className="text-sm text-muted-foreground">{formatDate(site.migracao?.date)}</p>
                    {migAnalysts && <p className="text-xs mt-1 text-muted-foreground">Analista(s): {migAnalysts}</p>}
                    <Badge variant="secondary" className={cn("mt-2 text-xs", statusColors[migrationStatus])}>
                      {migrationStatus}
                    </Badge>
                   </div>
                </div>
              </div>
            )})}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

    