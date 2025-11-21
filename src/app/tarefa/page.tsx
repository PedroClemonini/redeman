

"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, ArrowLeft, RotateCcw, Play, Pause, Square, Calendar, Search, MoreHorizontal } from 'lucide-react'
import { FinalReport } from "@/components/final-report"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SiteEntry } from "@/lib/registered-sites"
import { unifiedTasks } from "@/lib/tasks-data"
import { PageHeader } from "@/components/page-header"
import { Label } from "@/components/ui/label"
import { useCollection, useFirestore, useMemoFirebase } from "@/firebase"
import { collection, doc, query } from 'firebase/firestore'
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"


// Interface para o timer
interface PhaseTimer {
  phaseId: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
}

type Status = 'Completo' | 'Em Andamento' | 'Pendente' | 'Não Iniciado';

export default function UnifiedTasksPage() {
  const searchParams = useSearchParams();
  const siteIdFromQuery = searchParams.get('siteId');
  const firestore = useFirestore();

  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [timers, setTimers] = useState<Record<string, PhaseTimer>>({})
  const [selectedSite, setSelectedSite] = useState<SiteEntry | null>(null)
  const [activePhase, setActivePhase] = useState<string | null>(null)
  const [phaseFilter, setPhaseFilter] = useState('all');
  const [openCombobox, setOpenCombobox] = useState(false)

  const sitesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);
  const { data: registeredSites, isLoading: sitesLoading } = useCollection<SiteEntry>(sitesQuery);


  // Initialize site and phase from URL params
  useEffect(() => {
    if (siteIdFromQuery && registeredSites) {
        const site = registeredSites.find(s => s.id.toString() === siteIdFromQuery) || null;
        setSelectedSite(site);
    }
  }, [siteIdFromQuery, registeredSites]);

  // Filtra tarefas baseado na fase selecionada
  const filteredTasks = activePhase
    ? unifiedTasks.filter(task => task.phase === activePhase)
    : []

  // Agrupa tarefas por fase para exibição
  const tasksByPhase = filteredTasks.reduce((acc, task) => {
    const key = task.phase;
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(task)
    return acc
  }, {} as Record<string, typeof unifiedTasks>)

  useEffect(() => {
    if (!selectedSite) return;
    const saved = localStorage.getItem(`tasks-${selectedSite.id}`);
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)))
    } else {
      setCompletedItems(new Set());
    }

    const savedTimers = localStorage.getItem(`timers-${selectedSite.id}`)
    if (savedTimers) {
      setTimers(JSON.parse(savedTimers))
    } else {
      setTimers({});
    }
  }, [selectedSite])

  useEffect(() => {
    if (!selectedSite) return;
    localStorage.setItem(`tasks-${selectedSite.id}`, JSON.stringify([...completedItems]))
    window.dispatchEvent(new Event('storage'));
  }, [completedItems, selectedSite])

  useEffect(() => {
    if (!selectedSite) return;
    localStorage.setItem(`timers-${selectedSite.id}`, JSON.stringify(timers))
  }, [timers, selectedSite])


  // Atualiza os timers a cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prev => {
        const updated = { ...prev }
        let changed = false

        Object.keys(updated).forEach(phaseId => {
          if (updated[phaseId].isRunning) {
            updated[phaseId].elapsedTime = Date.now() - updated[phaseId].startTime
            changed = true
          }
        })

        return changed ? updated : prev
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleSiteChange = (siteId: string) => {
    if (!registeredSites) return;
    const site = registeredSites.find(s => s.id.toString() === siteId) || null
    setSelectedSite(site)
    setActivePhase(null) // Reset phase when site changes
    setOpenCombobox(false)
    
    // Update URL
    const params = new URLSearchParams(window.location.search);
    params.set('siteId', siteId);
    window.history.pushState(null, '', `?${params.toString()}`);
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Data não definida';
    const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
    return date.toLocaleDateString('pt-BR');
  };

  const toggleItem = (id: string) => {
    if (!selectedSite) return;
    const itemId = `${selectedSite.id}-${id}`;
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(itemId)) {
      newCompleted.delete(itemId)
    } else {
      newCompleted.add(itemId)
    }
    setCompletedItems(newCompleted)
  }

  const startTimer = (phaseId: string) => {
    setTimers(prev => ({
      ...prev,
      [phaseId]: {
        phaseId,
        startTime: Date.now() - (prev[phaseId]?.elapsedTime || 0),
        elapsedTime: prev[phaseId]?.elapsedTime || 0,
        isRunning: true
      }
    }))
  }

  const pauseTimer = (phaseId: string) => {
    setTimers(prev => ({
      ...prev,
      [phaseId]: {
        ...prev[phaseId],
        isRunning: false
      }
    }))
  }

  const stopTimer = (phaseId: string) => {
    setTimers(prev => ({
        ...prev,
        [phaseId]: {
            ...prev[phaseId],
            isRunning: false,
        }
    }));
  }

  const resetChecklist = () => {
    if (!selectedSite) return;
    if (confirm("Tem certeza que deseja resetar todo o checklist para este site?")) {
      setCompletedItems(new Set())
      setTimers({})
      localStorage.removeItem(`tasks-${selectedSite.id}`);
      localStorage.removeItem(`timers-${selectedSite.id}`);
    }
  }

  const getPhaseProgress = (phase: string) => {
    if (!selectedSite) return 0;
    const phaseTasks = unifiedTasks.filter(task => task.phase === phase)
    if (phaseTasks.length === 0) return 0;
    const completed = phaseTasks.filter(task => completedItems.has(`${selectedSite?.id}-${task.id}`)).length
    return (completed / phaseTasks.length) * 100
  }
  
  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const phaseCards = [
    { id: 'planejamento', title: 'Planejamento', date: selectedSite?.planejamento.date },
    { id: 'preparacao', title: 'Preparação', date: selectedSite?.preparacao?.date },
    { id: 'migracao', title: 'Migração', date: selectedSite?.migracao?.date },
  ];

  const getPhaseStatus = (site: SiteEntry, phase: 'planejamento' | 'preparacao' | 'migracao'): Status => {
      const phaseTasks = unifiedTasks.filter(t => t.phase === phase);
      if (phaseTasks.length === 0) return 'Completo';
      const completedCount = phaseTasks.filter(task => completedItems.has(`${site.id}-${task.id}`)).length;
      if (completedCount === phaseTasks.length) return 'Completo';
      if (completedCount > 0) return 'Em Andamento';
      return 'Não Iniciado';
  };

  const getCurrentPhaseName = (site: SiteEntry): string => {
      const planningStatus = getPhaseStatus(site, 'planejamento');
      if (planningStatus !== 'Completo') return 'Em planejamento';
      
      const preparationStatus = getPhaseStatus(site, 'preparacao');
      if (preparationStatus !== 'Completo') return 'Em preparação';
      
      const migrationStatus = getPhaseStatus(site, 'migracao');
      if (migrationStatus !== 'Completo') return 'Em migração';
      
      return 'Concluído';
  };

  const filteredSitesForSelection = useMemo(() => {
    if (!registeredSites) return [];

    return registeredSites.filter(site => {
        if (phaseFilter === 'all') {
            return true;
        }

        const planningStatus = getPhaseStatus(site, 'planejamento');
        if (phaseFilter === 'planejamento' && planningStatus !== 'Completo') return true;

        const preparationStatus = getPhaseStatus(site, 'preparacao');
        if (phaseFilter === 'preparacao' && planningStatus === 'Completo' && preparationStatus !== 'Completo') return true;

        const migrationStatus = getPhaseStatus(site, 'migracao');
        if (phaseFilter === 'migracao' && preparationStatus === 'Completo' && migrationStatus !== 'Completo') return true;
        
        return false;
    });
}, [registeredSites, phaseFilter, completedItems]);


  if (!activePhase) {
    return (
      <div>
        <PageHeader
          title="Checklist de Tarefas"
          description="Selecione um site para ver as fases do projeto."
        />

        <main className="container mx-auto px-4 py-8 md:px-6">
            <Card className="max-w-2xl mx-auto mb-8">
                <CardHeader>
                    <CardTitle>Filtro de Sites</CardTitle>
                    <CardDescription>Use os campos abaixo para encontrar um site e visualizar suas tarefas.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2">
                    <div>
                        <Label htmlFor="phase-filter">Filtrar por Etapa</Label>
                        <Select value={phaseFilter} onValueChange={setPhaseFilter}>
                            <SelectTrigger id="phase-filter">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas as Etapas</SelectItem>
                                <SelectItem value="planejamento">Planejamento</SelectItem>
                                <SelectItem value="preparacao">Preparação</SelectItem>
                                <SelectItem value="migracao">Migração</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                     <div>
                        <Label htmlFor="site-select">Selecione um Site</Label>
                        {sitesLoading ? <p className="text-sm text-muted-foreground mt-2">Carregando sites...</p> : 
                          <Popover open={openCombobox} onOpenChange={setOpenCombobox}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openCombobox}
                                className="w-full justify-between"
                              >
                                {selectedSite
                                  ? `${selectedSite.sigla} - ${selectedSite.descricaoBreve}`
                                  : "Escolha um site da lista..."}
                                <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                              <Command>
                                <CommandInput placeholder="Buscar site..." />
                                <CommandList>
                                  <CommandEmpty>Nenhum site encontrado.</CommandEmpty>
                                  <CommandGroup>
                                    {filteredSitesForSelection.map((site) => (
                                      <CommandItem
                                        key={site.id}
                                        value={`${site.sigla} - ${site.descricaoBreve}`}
                                        onSelect={() => handleSiteChange(site.id.toString())}
                                      >
                                        <Check
                                          className={cn(
                                            "mr-2 h-4 w-4",
                                            selectedSite?.id === site.id ? "opacity-100" : "opacity-0"
                                          )}
                                        />
                                        {`${site.sigla} - ${site.descricaoBreve} (${getCurrentPhaseName(site)})`}
                                      </CommandItem>
                                    ))}
                                  </CommandGroup>
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        }
                    </div>
                </CardContent>
            </Card>


          {selectedSite && (
            <div className="grid md:grid-cols-3 gap-6">
              {phaseCards.map(phase => (
                <Card key={phase.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{phase.title}</CardTitle>
                     <Progress value={getPhaseProgress(phase.id)} className="mt-4 h-2" />
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm text-muted-foreground">
                       <Calendar className="mr-2 h-4 w-4" />
                       <span>Início: {formatDate(phase.date)}</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => setActivePhase(phase.id)}>
                      Ver Checklist
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    );
  }

  return (
    <div>
       <PageHeader
        title={`Checklist: ${selectedSite?.sigla} - ${tasksByPhase[activePhase]?.[0]?.phaseTitle}`}
        description="Acompanhe as tarefas da fase selecionada"
       />
        <div className="container mx-auto px-4 md:px-6 mb-4">
            <div className="flex items-center justify-between">
                <Button variant="outline" size="sm" onClick={() => setActivePhase(null)}>
                    <ArrowLeft className="mr-2 size-4" />
                    Voltar para Fases
                </Button>
                 <Button variant="destructive" size="sm" onClick={resetChecklist}>
                    <RotateCcw className="mr-2 size-4" />
                    Resetar Checklist
                </Button>
            </div>
        </div>


      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {Object.entries(tasksByPhase).map(([phase, tasks]) => {
            const phaseProgress = getPhaseProgress(phase)
            const phaseTitle = tasks[0]?.phaseTitle || phase
            const timer = timers[phase];
            const allTasksCompleted = phaseProgress === 100;

            return (
              <Card key={phase}>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                      <CardTitle className="flex items-center gap-2">
                        {phaseTitle}
                        <Badge variant="secondary">
                          {tasks.filter(task => completedItems.has(`${selectedSite?.id}-${task.id}`)).length}/{tasks.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Responsável: {tasks[0]?.responsible}
                      </CardDescription>
                    </div>
                     <Dialog>
                        <DialogTrigger asChild>
                           <Button variant="outline" size="sm">
                                Report
                                <MoreHorizontal className="ml-2 h-4 w-4" />
                           </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
                           <DialogHeader>
                              <DialogTitle>Relatório da Fase: {activePhase}</DialogTitle>
                              <DialogDescription>
                                Preencha os detalhes da fase de {activePhase} para gerar o relatório de atividades.
                              </DialogDescription>
                            </DialogHeader>
                            <FinalReport site={selectedSite} phase={activePhase} />
                        </DialogContent>
                     </Dialog>
                  </div>
                  <Progress value={phaseProgress} className="mt-4 h-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => {
                      const isCompleted = completedItems.has(`${selectedSite?.id}-${task.id}`)
                      
                      return (
                        <div
                          key={task.id}
                          className={`flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                            isCompleted ? "opacity-60 bg-muted/30" : "bg-card"
                          }`}
                        >
                          <Checkbox
                            id={task.id}
                            checked={isCompleted}
                            onCheckedChange={() => toggleItem(task.id)}
                            className="mt-1"
                          />
                          
                          <div className="flex-1">
                            <label
                              htmlFor={task.id}
                              className={`cursor-pointer text-sm font-medium ${
                                isCompleted ? "text-muted-foreground line-through" : "text-foreground"
                              }`}
                            >
                              {task.title}
                            </label>
                          </div>

                          <div className="flex items-center gap-2">
                            {isCompleted ? (
                              <CheckCircle2 className="size-5 text-green-500" />
                            ) : (
                              <Circle className="size-5 text-muted-foreground/50" />
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                 {allTasksCompleted && (
                    <CardFooter className="flex-col items-start gap-4">
                         <div className="flex items-center gap-4 w-full">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-mono text-muted-foreground">
                                {formatTime(timer?.elapsedTime || 0)}
                                </span>
                                <div className="flex gap-1">
                                {!timer?.isRunning ? (
                                    <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => startTimer(phase)}
                                    className="h-7 px-2"
                                    >
                                    <Play className="size-3 mr-1" /> Iniciar
                                    </Button>
                                ) : (
                                    <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => pauseTimer(phase)}
                                    className="h-7 px-2"
                                    >
                                    <Pause className="size-3 mr-1" /> Pausar
                                    </Button>
                                )}
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => stopTimer(phase)}
                                    className="h-7 px-2"
                                >
                                    <Square className="size-3" />
                                </Button>
                                </div>
                            </div>

                            <div className="text-right flex-1">
                                <div className="text-sm font-medium">Progresso</div>
                                <div className="text-lg font-semibold text-primary">{Math.round(phaseProgress)}%</div>
                            </div>
                        </div>
                    </CardFooter>
                 )}
              </Card>
            )
          })}

        </div>
      </main>
    </div>
  )
}
