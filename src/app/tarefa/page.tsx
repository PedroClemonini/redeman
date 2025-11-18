

"use client"

import { useState, useEffect } from "react"
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
import { CheckCircle2, Circle, ArrowLeft, RotateCcw, Play, Pause, Square, Calendar } from 'lucide-react'
import { FinalReport } from "@/components/final-report"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registeredSites, type SiteEntry } from "@/lib/registered-sites"
import { unifiedTasks } from "@/lib/tasks-data"
import { PageHeader } from "@/components/page-header"
import { Label } from "@/components/ui/label"

// Interface para o timer
interface PhaseTimer {
  phaseId: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
}

export default function UnifiedTasksPage() {
  const searchParams = useSearchParams();
  const siteIdFromQuery = searchParams.get('siteId');

  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [timers, setTimers] = useState<Record<string, PhaseTimer>>({})
  const [selectedSite, setSelectedSite] = useState<SiteEntry | null>(null)
  const [activePhase, setActivePhase] = useState<string | null>(null)

  // Initialize site and phase from URL params
  useEffect(() => {
    if (siteIdFromQuery) {
        const site = registeredSites.find(s => s.id.toString() === siteIdFromQuery) || null;
        setSelectedSite(site);
        // If you want to go directly to a phase, you'd need a phase param as well
        // e.g., const phaseFromQuery = searchParams.get('phase');
        // setActivePhase(phaseFromQuery);
    }
  }, [siteIdFromQuery]);

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
    const saved = localStorage.getItem("unified-tasks-checklist")
    if (saved) {
      setCompletedItems(new Set(JSON.parse(saved)))
    }

    const savedTimers = localStorage.getItem("unified-tasks-timers")
    if (savedTimers) {
      setTimers(JSON.parse(savedTimers))
    }
  }, [])

  useEffect(() => {
    // Notify other tabs/windows of the change
    window.dispatchEvent(new Event('storage'));
    localStorage.setItem("unified-tasks-checklist", JSON.stringify([...completedItems]))
  }, [completedItems])

  useEffect(() => {
    localStorage.setItem("unified-tasks-timers", JSON.stringify(timers))
  }, [timers])

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
    const site = registeredSites.find(s => s.id.toString() === siteId) || null
    setSelectedSite(site)
    setActivePhase(null) // Reset phase when site changes
    
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
    const newCompleted = new Set(completedItems)
    if (newCompleted.has(id)) {
      newCompleted.delete(id)
    } else {
      newCompleted.add(id)
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
    if (confirm("Tem certeza que deseja resetar todo o checklist para este site?")) {
      setCompletedItems(new Set())
      setTimers({})
    }
  }

  const getPhaseProgress = (phase: string) => {
    const phaseTasks = unifiedTasks.filter(task => task.phase === phase)
    if (phaseTasks.length === 0) return 0;
    const completed = phaseTasks.filter(task => completedItems.has(task.id)).length
    return (completed / phaseTasks.length) * 100
  }

  const phaseCards = [
    { id: 'planejamento', title: 'Planejamento', date: selectedSite?.planejamento.date },
    { id: 'preparacao', title: 'Preparação', date: selectedSite?.preparacao?.date },
    { id: 'migracao', title: 'Migração', date: selectedSite?.migracao?.date },
  ];

  if (!activePhase) {
    return (
      <div>
        <PageHeader
          title="Checklist de Tarefas"
          description="Selecione um site para ver as fases do projeto."
        />

        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="max-w-md mx-auto mb-8">
            <Label className="text-sm font-medium mb-2 block">Selecione um Site</Label>
            <Select onValueChange={handleSiteChange} value={selectedSite?.id.toString()}>
              <SelectTrigger>
                <SelectValue placeholder="Escolha um site..." />
              </SelectTrigger>
              <SelectContent>
                {registeredSites.map(site => (
                  <SelectItem key={site.id} value={site.id.toString()}>
                    {site.sigla} - {site.descricaoBreve}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedSite && (
            <div className="grid md:grid-cols-3 gap-6">
              {phaseCards.map(phase => (
                <Card key={phase.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>{phase.title}</CardTitle>
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
                          {tasks.filter(task => completedItems.has(task.id)).length}/{tasks.length}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Responsável: {tasks[0]?.responsible}
                      </CardDescription>
                    </div>
                  </div>
                  <Progress value={phaseProgress} className="mt-4 h-2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tasks.map((task) => {
                      const isCompleted = completedItems.has(task.id)
                      
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
                        <FinalReport site={selectedSite} phase={activePhase} title={`Relatório da Fase: ${activePhase}`} />
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

    