

'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { X, Plus, ListTodo, Upload, Search, ArrowUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SiteEntry, Person } from '@/lib/registered-sites';
import { unifiedTasks } from '@/lib/tasks-data';
import { useCollection, useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, query } from 'firebase/firestore';
import { setDocumentNonBlocking, updateDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';
import { nomes as allAnalysts } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { ImportDialog } from '@/components/import-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


type Status = 'Completo' | 'Em Andamento' | 'Pendente' | 'Não Iniciado';
type SiteWithProgress = SiteEntry & {
    planningStatus: Status;
    preparationStatus: Status;
    migrationStatus: Status;
    currentPhase: 'Planejamento' | 'Preparação' | 'Migração' | 'Concluído';
    currentStatus: Status;
};
type SortKey = keyof SiteWithProgress | 'analysts';


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
  const firestore = useFirestore();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const siteId = searchParams.get('id');

  const siteRef = useMemoFirebase(() => {
    if (!firestore || !siteId) return null;
    return doc(firestore, 'agencias', siteId);
  }, [firestore, siteId]);
  const { data: existingSite, isLoading: isSiteLoading } = useDoc<SiteEntry>(siteRef);

  
  const sitesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);
  const { data: sites, isLoading: sitesLoading } = useCollection<SiteEntry>(sitesQuery);

  // Form state
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
  const [v2mrPreparacao, setV2mrPreparacao] = useState<Person[]>([]);
  const [dataMigracao, setDataMigracao] = useState('');
  const [linkMigracao, setLinkMigracao] = useState('');
  const [zoomMigracao, setZoomMigracao] = useState<Person[]>([]);
  const [btsMigracao, setBtsMigracao] = useState<Person[]>([]);
  const [v2mrMigracao, setV2mrMigracao] = useState<Person[]>([]);
  const [linkWhatsapp, setLinkWhatsapp] = useState('');

  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [isImportMigrationOpen, setIsImportMigrationOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: 'ascending' | 'descending' }>({ key: 'sigla', direction: 'ascending' });
  const [selectedWeekFilter, setSelectedWeekFilter] = useState<string>('all');


  useEffect(() => {
    if (siteId && existingSite) {
        setSigla(existingSite.sigla || '');
        setDescricaoBreve(existingSite.descricaoBreve || '');
        setLocalidade(existingSite.localidade || '');
        setSemana(existingSite.semana || 'Semana 2');
        setLinkWhatsapp(existingSite.linkWhatsapp || '');

        setDataPlanejamento(existingSite.planejamento?.date || '');
        setLinkPlanejamento(existingSite.planejamento?.link || '');
        setV2mrPlanejamento(existingSite.planejamento?.v2mr || []);

        setDataPreparacao(existingSite.preparacao?.date || '');
        setLinkPreparacao(existingSite.preparacao?.link || '');
        setZoomPreparacao(existingSite.preparacao?.zoom || []);
        setBtsPreparacao(existingSite.preparacao?.bts || []);
        setV2mrPreparacao(existingSite.preparacao?.v2mr || []);

        setDataMigracao(existingSite.migracao?.date || '');
        setLinkMigracao(existingSite.migracao?.link || '');
        setZoomMigracao(existingSite.migracao?.zoom || []);
        setBtsMigracao(existingSite.migracao?.bts || []);
        setV2mrMigracao(existingSite.migracao?.v2mr || []);
    }
  }, [siteId, existingSite]);


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
  
  const handleAnalystSelection = (
    analystName: string, 
    isChecked: boolean, 
    list: Person[], 
    setter: React.Dispatch<React.SetStateAction<Person[]>>
  ) => {
      if (isChecked) {
          setter([...list, { id: Date.now() + Math.random(), name: analystName }]);
      } else {
          setter(list.filter(p => p.name !== analystName));
      }
  };

  const removePerson = (list: Person[], setter: React.Dispatch<React.SetStateAction<Person[]>>, id: number) => {
    setter(list.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firestore || sigla.length > 5 || !sigla || !descricaoBreve || !semana) return;

    const siteData: Omit<SiteEntry, 'id'> = {
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
        v2mr: v2mrPreparacao,
      },
      migracao: {
        date: dataMigracao,
        link: linkMigracao,
        zoom: zoomMigracao,
        bts: btsMigracao,
        v2mr: v2mrMigracao,
      },
      linkWhatsapp,
    };

    if (siteId && siteRef) { // Update existing site
      updateDocumentNonBlocking(siteRef, siteData);
      toast({
          title: "Site Atualizado!",
          description: `O site ${siteData.sigla} foi atualizado com sucesso.`
      });
    } else { // Create new site
      const newSiteId = doc(collection(firestore, 'agencias')).id;
      const newSite: SiteEntry = { id: newSiteId, ...siteData };
      const docRef = doc(firestore, 'agencias', newSiteId);
      setDocumentNonBlocking(docRef, newSite, { merge: false });

      toast({
          title: "Site Cadastrado!",
          description: `O site ${newSite.sigla} foi adicionado com sucesso.`
      });
    }

    router.push('/sites');
  };

  const siteProgress = useMemo<SiteWithProgress[]>(() => {
    if (!sites) return [];
    return sites.map(site => {
      const getPhaseStatus = (tasks: typeof unifiedTasks) => {
        if (tasks.length === 0) return 'Completo';
        const completedCount = tasks.filter(task => completedTasks.has(`${site.id}-${task.id}`)).length;
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


  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-50" />;
    }
    return <ArrowUpDown className="ml-2 h-4 w-4" />;
  };

  const getAnalystsString = (people?: Person[]) => {
      if (!people || people.length === 0) return "";
      return people.map(p => p.name).join(', ');
  }

  const sitesByWeek = useMemo(() => {
    let filteredSites = siteProgress.filter(site => {
        const weekMatch = selectedWeekFilter === 'all' || site.semana === selectedWeekFilter;
        if (!weekMatch) return false;

        if (searchTerm === '') return true;
        const searchLower = searchTerm.toLowerCase();

        const formatDateForSearch = (dateStr: string) => {
            if (!dateStr) return '';
            const [year, month, day] = dateStr.split('-');
            return `${day}/${month}/${year}`;
        }
        
        const datePlanejamento = formatDateForSearch(site.planejamento?.date || '');
        const datePreparacao = formatDateForSearch(site.preparacao?.date || '');
        const dateMigracao = formatDateForSearch(site.migracao?.date || '');
        const analysts = getAnalystsString(site.planejamento?.v2mr || site.preparacao?.v2mr || site.migracao?.v2mr).toLowerCase();


        return (
            site.sigla.toLowerCase().includes(searchLower) ||
            site.descricaoBreve.toLowerCase().includes(searchLower) ||
            datePlanejamento.includes(searchLower) ||
            datePreparacao.includes(searchLower) ||
            dateMigracao.includes(searchLower) ||
            analysts.includes(searchLower)
        );
    });

    if (sortConfig.key) {
        filteredSites.sort((a, b) => {
            let aValue: any, bValue: any;

            if (sortConfig.key === 'analysts') {
                aValue = getAnalystsString(a.planejamento?.v2mr || a.preparacao?.v2mr || a.migracao?.v2mr).toLowerCase();
                bValue = getAnalystsString(b.planejamento?.v2mr || b.preparacao?.v2mr || b.migracao?.v2mr).toLowerCase();
            } else {
                aValue = a[sortConfig.key as keyof SiteWithProgress];
                bValue = b[sortConfig.key as keyof SiteWithProgress];
            }
            
            if (aValue < bValue) return sortConfig.direction === 'ascending' ? -1 : 1;
            if (aValue > bValue) return sortConfig.direction === 'ascending' ? 1 : -1;
            return 0;
        });
    }
    
    // This part is now just returning the filtered and sorted list, not grouping by week.
    return filteredSites;
  }, [siteProgress, searchTerm, sortConfig, selectedWeekFilter]);
  
  const allWeeks = useMemo(() => {
    if (!siteProgress) return [];
    const weeks = new Set(siteProgress.map(s => s.semana).filter(Boolean));
    return ['all', ...Array.from(weeks).sort()];
  }, [siteProgress]);

  
  const getInitials = (name: string) => {
    if (!name) return '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }

  const getMeetingLink = (site: SiteWithProgress) => {
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
  
  if (isSiteLoading && siteId) {
      return <div className="text-center p-8">Carregando dados do site...</div>;
  }

  const AnalystSelector = ({ list, setter, buttonColor }: { list: Person[], setter: React.Dispatch<React.SetStateAction<Person[]>>, buttonColor: string }) => (
    <div>
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
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal h-9 text-sm">
                    <Plus className="mr-2" /> Selecionar Analistas
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-0">
                <div className="p-2 space-y-1 max-h-60 overflow-y-auto">
                    {Object.entries(allAnalysts).map(([key, name]) => (
                        <div key={key} className="flex items-center space-x-2 p-1">
                            <Checkbox 
                                id={`analyst-${key}`}
                                checked={list.some(p => p.name === name)}
                                onCheckedChange={(checked) => handleAnalystSelection(name, !!checked, list, setter)}
                            />
                            <Label htmlFor={`analyst-${key}`} className="font-normal text-sm">{name}</Label>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    </div>
);
  
  return (
    <div className="space-y-8">
      <PageHeader title={siteId ? "Editar Site" : "Cadastro de Sites"} />
      <Card>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-6">
                {/* Coluna da Esquerda: Informações Gerais */}
                <div className="space-y-4">
                  <CardTitle>Informações Gerais</CardTitle>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <Label htmlFor="sigla">SIGLA (máx. 5)</Label>
                        <Input id="sigla" value={sigla} onChange={(e) => setSigla(e.target.value)} maxLength={5} placeholder="ex: ARN01" required />
                        {sigla.length > 5 && <p className="text-red-500 text-xs mt-1">Máx. 5 caracteres!</p>}
                    </div>
                    <div>
                        <Label htmlFor="descricaoBreve">DESCRIÇÃO BREVE</Label>
                        <Input id="descricaoBreve" value={descricaoBreve} onChange={(e) => setDescricaoBreve(e.target.value)} placeholder="ex: Arniqueiras" required />
                    </div>
                    <div>
                        <Label htmlFor="localidade">LOCALIDADE</Label>
                        <Input id="localidade" value={localidade} onChange={(e) => setLocalidade(e.target.value)} placeholder="ex: Taguatinga/DF" required />
                    </div>
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 items-end'>
                    <div>
                      <Label htmlFor="semanaSelect">SEMANA</Label>
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
                    <Button variant="outline" type="button" onClick={() => setIsImportMigrationOpen(true)}>
                        <Upload className="mr-2" />
                        Importar JSON
                    </Button>
                  </div>
                   <div>
                    <Label htmlFor="linkWhatsapp">Grupo WhatsApp do Site</Label>
                    <Input id="linkWhatsapp" type="url" value={linkWhatsapp} onChange={e => setLinkWhatsapp(e.target.value)} placeholder="https://chat.whatsapp.com/..." />
                </div>
                </div>

                {/* Coluna da Direita: Etapas */}
                <div className="space-y-4">
                   <CardTitle>Etapas da Migração</CardTitle>
                   <Tabs defaultValue="planejamento">
                      <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="planejamento">Planejamento</TabsTrigger>
                          <TabsTrigger value="preparacao">Preparação</TabsTrigger>
                          <TabsTrigger value="migracao">Migração</TabsTrigger>
                      </TabsList>
                      <TabsContent value="planejamento" className="border rounded-b-lg rounded-tr-lg p-4">
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input type="date" value={dataPlanejamento} onChange={e => setDataPlanejamento(e.target.value)} />
                            <Input type="url" value={linkPlanejamento} onChange={e => setLinkPlanejamento(e.target.value)} placeholder="Link da Reunião" />
                          </div>
                          <div>
                            <Label>Analistas V2MR</Label>
                            <AnalystSelector list={v2mrPlanejamento} setter={setV2mrPlanejamento} buttonColor="bg-blue-600 hover:bg-blue-700 text-white" />
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="preparacao" className="border rounded-b-lg rounded-tr-lg p-4">
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input type="date" value={dataPreparacao} onChange={e => setDataPreparacao(e.target.value)} />
                            <Input type="url" value={linkPreparacao} onChange={e => setLinkPreparacao(e.target.value)} placeholder="Link da Reunião" />
                          </div>
                          <div className="space-y-4">
                            <div>
                              <Label>Analistas V2MR</Label>
                              <AnalystSelector list={v2mrPreparacao} setter={setV2mrPreparacao} buttonColor="bg-blue-600 hover:bg-blue-700 text-white" />
                            </div>
                            <div>
                              <Label>Técnicos Zoomtech</Label>
                              <AnalystSelector list={zoomPreparacao} setter={setZoomPreparacao} buttonColor="bg-green-600 hover:bg-green-700 text-white" />
                            </div>
                             <div>
                              <Label>Técnicos BBTS (In Loco)</Label>
                              <AnalystSelector list={btsPreparacao} setter={setBtsPreparacao} buttonColor="bg-purple-600 hover:bg-purple-700 text-white" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="migracao" className="border rounded-b-lg rounded-tr-lg p-4">
                        <div className="space-y-4">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input type="date" value={dataMigracao} onChange={e => setDataMigracao(e.target.value)} />
                            <Input type="url" value={linkMigracao} onChange={e => setLinkMigracao(e.target.value)} placeholder="Link da Reunião" />
                          </div>
                          <div className="space-y-4">
                             <div>
                              <Label>Analistas V2MR</Label>
                              <AnalystSelector list={v2mrMigracao} setter={setV2mrMigracao} buttonColor="bg-blue-600 hover:bg-blue-700 text-white" />
                            </div>
                            <div>
                              <Label>Técnicos Zoomtech</Label>
                              <AnalystSelector list={zoomMigracao} setter={setZoomMigracao} buttonColor="bg-green-600 hover:bg-green-700 text-white" />
                            </div>
                             <div>
                              <Label>Técnicos BBTS (In Loco)</Label>
                              <AnalystSelector list={btsMigracao} setter={setBtsMigracao} buttonColor="bg-purple-600 hover:bg-purple-700 text-white" />
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                   </Tabs>
                </div>
            </div>
            
            <Button type="submit" className="w-full text-lg h-12 mt-6">{siteId ? "ATUALIZAR SITE" : "CADASTRAR SITE"}</Button>
          </form>
        </CardContent>
      </Card>
      
      <div className="space-y-6 mt-8">
        <div>
            <div className="flex justify-between items-center mb-4">
                <div className="w-full max-w-sm">
                    <Label>Filtrar por Semana</Label>
                    <Select value={selectedWeekFilter} onValueChange={setSelectedWeekFilter}>
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {allWeeks.map(week => (
                                <SelectItem key={week} value={week}>
                                    {week === 'all' ? 'Todas as Semanas' : week}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="relative w-full max-w-sm">
                    <Label>Buscar</Label>
                    <Search className="absolute left-3 top-[calc(1.5rem+8px)] -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                        placeholder="Buscar por sigla, nome, data..." 
                        className="pl-9"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md bg-white">
              <table className="w-full min-w-[1200px] border-collapse text-left text-sm text-gray-600">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                        <button onClick={() => requestSort('sigla')} className="group flex items-center">
                            Site {getSortIcon('sigla')}
                        </button>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                         <button onClick={() => requestSort('currentPhase')} className="group flex items-center">
                            Etapa Atual {getSortIcon('currentPhase')}
                        </button>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                        <button onClick={() => requestSort('currentStatus')} className="group flex items-center">
                            Status {getSortIcon('currentStatus')}
                        </button>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">
                        <button onClick={() => requestSort('analysts')} className="group flex items-center">
                           Analista(s) V2MR {getSortIcon('analysts')}
                        </button>
                    </th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Observação</th>
                    <th className="px-6 py-4 font-semibold text-gray-900">Teams</th>
                    <th className="px-6 py-4 font-semibold text-gray-900 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sitesLoading && <tr><td colSpan={7} className='text-center p-4'>Carregando...</td></tr>}
                  {sitesByWeek && sitesByWeek.length > 0 ? (
                    sitesByWeek.map(site => {
                      const { currentPhase, currentStatus } = site;
                      const meetingLink = getMeetingLink(site);
                      
                      const analysts = site.planejamento.v2mr || site.preparacao.v2mr || site.migracao.v2mr || [];
                      
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
                            <div className="flex flex-col items-center gap-2">
                                <div className="flex -space-x-2">
                                  {analysts.slice(0, 3).map(analyst => (
                                    <div key={analyst.id} title={analyst.name} className="h-8 w-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs font-bold ring-2 ring-white">
                                        {getInitials(analyst.name)}
                                    </div>
                                  ))}
                                </div>
                                {analysts.length > 0 && <span className="text-sm font-medium text-gray-700">{getAnalystsString(analysts)}</span>}
                            </div>
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
                    })
                  ) : (
                    <tr><td colSpan={7} className='text-center p-4 text-muted-foreground'>Nenhum site encontrado para esta busca.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
             <div className="mt-6 text-center text-sm text-gray-500">
                Total: <strong>{sitesByWeek?.length || 0} sites</strong>
            </div>
          </div>
      </div>
      <ImportDialog modelName="SiteMigration" open={isImportMigrationOpen} onOpenChange={setIsImportMigrationOpen} />
    </div>
  );
}
