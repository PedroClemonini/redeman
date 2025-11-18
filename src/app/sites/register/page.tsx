

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
import { X, Plus, ExternalLink, Video, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { registeredSites, type SiteEntry, type Person } from '@/lib/registered-sites';
import { unifiedTasks } from '@/lib/tasks-data';

type Status = 'Completo' | 'Em Andamento' | 'Pendente' | 'Não Iniciado';

const statusClasses: Record<Status, string> = {
  'Completo': 'status-concluido',
  'Em Andamento': 'status-execucao',
  'Pendente': 'status-pendente',
  'Não Iniciado': 'status-nao-iniciado',
};

const statusColors: Record<Status, string> = {
  'Completo': 'bg-green-500',
  'Em Andamento': 'bg-blue-500',
  'Pendente': 'bg-yellow-500',
  'Não Iniciado': 'bg-gray-500',
};

const TeamsIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" {...props}>
        <path d="M9.186 4.797a2.42 2.42 0 1 0-2.86-2.448h1.178c.929 0 1.682.753 1.682 1.682zm-4.295 7.738h2.613c.929 0 1.682-.753 1.682-1.682V5.58h2.783a.7.7 0 0 1 .682.716v4.294a4.197 4.197 0 0 1-4.093 4.293c-1.618-.04-3-.99-3.667-2.35Zm10.737-9.372a1.674 1.674 0 1 1-3.349 0 1.674 1.674 0 0 1 3.349 0m-2.238 9.488-.12-.002a5.2 5.2 0 0 0 .381-2.07V6.306a1.7 1.7 0 0 0-.15-.725h1.792c.39 0 .707.317.707.707v3.765a2.6 2.6 0 0 1-2.598 2.598z"/>
        <path d="M.682 3.349h6.822c.377 0 .682.305.682.682v6.822a.68.68 0 0 1-.682.682H.682A.68.68 0 0 1 0 10.853V4.03c0-.377.305-.682.682-.682Zm5.206 2.596v-.72h-3.59v.72h1.357V9.66h.87V5.945z"/>
    </svg>
);


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
  const [localidade, setLocalidade] = useState('');
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
      localidade,
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
    setLocalidade('');
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

      let currentPhase: 'Planejamento' | 'Preparação' | 'Migração' | 'Concluído' = 'Planejamento';
      if (planningStatus !== 'Completo') {
        currentPhase = 'Planejamento';
      } else if (preparationStatus !== 'Completo') {
        currentPhase = 'Preparação';
      } else if (migrationStatus !== 'Completo') {
        currentPhase = 'Migração';
      } else {
        currentPhase = 'Concluído';
      }

      return {
        ...site,
        planningStatus,
        preparationStatus,
        migrationStatus,
        currentPhase,
        currentStatus: planningStatus === 'Completo' ? (preparationStatus === 'Completo' ? migrationStatus : preparationStatus) : planningStatus,
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

  const getAnalystsString = (people?: Person[]) => {
      if (!people || people.length === 0) return null;
      return people.map(p => p.name).join(', ');
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
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
                <Label htmlFor="localidade" className="mb-2 block">LOCALIDADE</Label>
                <Input id="localidade" value={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder="ex: Taguatinga/DF" required />
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
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-white">
              <table className="w-full min-w-[1200px] border-collapse text-left text-sm text-gray-600">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900">Site</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Etapa Atual</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Técnico(s)</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Observação</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Teams</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sitesByWeek[week].map(site => {
                    const { planningStatus, preparationStatus, migrationStatus, currentPhase, currentStatus } = site;
                    const meetingLink = getMeetingLink(site);
                    const analysts = site.planejamento.v2mr || [];
                    
                    const phaseToBadgeColor: Record<string, string> = {
                        'Planejamento': 'bg-blue-50 text-blue-700',
                        'Preparação': 'bg-yellow-50 text-yellow-700',
                        'Migração': 'bg-green-50 text-green-700',
                        'Concluído': 'bg-gray-50 text-gray-700',
                    }

                    return (
                      <tr key={site.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-4">
                            <div className="h-10 w-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-md flex items-center justify-center text-white font-bold text-sm tracking-wider">
                              {site.sigla}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{site.descricaoBreve}</div>
                              <div className="text-xs text-gray-500">{site.localidade}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                           <span className={cn("inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold", phaseToBadgeColor[currentPhase])}>
                            {currentPhase}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                           <span className={cn("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", statusClasses[currentStatus])}>
                            <span className={cn("h-2 w-2 rounded-full", statusColors[currentStatus])}></span>
                            {currentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex -space-x-2">
                             {analysts.slice(0, 3).map(analyst => (
                               <div key={analyst.id} title={analyst.name} className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                                   {getInitials(analyst.name)}
                               </div>
                             ))}
                          </div>
                          {analysts.length > 0 && <span className="ml-3 text-sm font-medium text-gray-700">{getAnalystsString(analysts)}</span>}
                        </td>
                        <td className="px-6 py-5 text-gray-600">
                          {/* Placeholder for observation */}
                        </td>
                        <td className="px-6 py-5">
                            {meetingLink ? (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href={meetingLink} target="_blank">
                                        <TeamsIcon className="mr-2 h-4 w-4" />
                                        Link
                                    </Link>
                                </Button>
                            ) : (
                                <Button variant="outline" size="sm" disabled>
                                    <TeamsIcon className="mr-2 h-4 w-4" />
                                    Link
                                </Button>
                            )}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className='flex items-center justify-end gap-1 flex-shrink-0'>
                              <Button variant="outline" size="sm" asChild>
                                  <Link href={`/tarefa?siteId=${site.id}`} title="Ver Tarefas">
                                     <ListTodo className="mr-2 h-4 w-4"/> 
                                     Ver Tarefas
                                  </Link>
                              </Button>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
             <div className="mt-6 text-center text-sm text-gray-500">
                Total: <strong>{sitesByWeek[week].length} sites</strong> • {week}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

    