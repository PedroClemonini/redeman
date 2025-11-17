
"use client"

import { useState, useEffect } from "react"
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
import Link from "next/link"
import { ProjectInfoForm } from "@/components/project-info-form"
import { FinalReport } from "@/components/final-report"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { registeredSites, type SiteEntry } from "@/lib/registered-sites"

// Dados unificados de todas as fases
const unifiedTasks = [
  // Fase: Planejamento
  {
    id: "plan-1",
    title: "Coleta de configuração dos switches legados",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-2",
    title: "Análise dos arquivos coletados (configurações, CDP/LLDP)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-3",
    title: "Análise de saúde da rede (portas com erros CRC, STP, UDLD, etc.)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-4",
    title: "Desenho da topologia lógica",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-5",
    title: "Mapeamento detalhado de portas (PORT_MAPPING_RPO25_ACCESS.xlsx)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-6-1",
    title: "Script de Onboarding",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM",
  },
  {
    id: "plan-6-2",
    title: "Script de Optimization",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM",
  },
  {
    id: "plan-6-3",
    title: "Script Python para identificação de APs",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM",
  },
  {
    id: "plan-7",
    title: "Criação e validação dos Templates de configuração",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-8",
    title: "Criação do Site e cadastro dos equipamentos no iMaster NCE Campus",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-9",
    title: "Teste dos templates no ambiente de laboratório (TENANT-LAB)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-10",
    title: "Criação da MOP (Method of Procedure)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },
  {
    id: "plan-11",
    title: "Abertura e aprovação da RFC (com revisão e validação por Huawei e BB)",
    phase: "planejamento",
    phaseTitle: "Planejamento",
    responsible: "ZOOM"
  },

  // Fase: Preparação
  {
    id: "prep-1-1",
    title: "Solicitar credenciais de acesso às instalações",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-1-2",
    title: "Validar acesso físico às salas técnicas",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-1-3",
    title: "Confirmar horário e ponto de contato local",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-2-1",
    title: "Realizar reunião de alinhamento presencial",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-2-2",
    title: "Configurar canal Teams para suporte remoto",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-2-3",
    title: "Distribuir responsabilidades entre equipes",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },
  {
    id: "prep-2-4",
    title: "Confirmar disponibilidade de todos os envolvidos",
    phase: "preparacao",
    phaseTitle: "Preparação",
    responsible: "Field"
  },

  // Fase: Migração
  {
    id: "mig-1-1",
    title: "Criar pasta do site dentro da pasta 'Rollout'",
    phase: "migracao",
    phaseTitle: "Migração",
    responsible: "ZOOM/Field"
  },
  {
    id: "mig-1-2",
    title: "Acessar ferramenta NNMI",
    phase: "migracao",
    phaseTitle: "Migração",
    responsible: "ZOOM"
  },
  {
    id: "mig-1-3",
    title: "Identificar site a ser migrado e coletar IPs ou ranges",
    phase: "migracao",
    phaseTitle: "Migração",
    responsible: "ZOOM"
  },
];

// Interface para o timer
interface PhaseTimer {
  phaseId: string;
  startTime: number;
  elapsedTime: number;
  isRunning: boolean;
}

export default function UnifiedTasksPage() {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set())
  const [progress, setProgress] = useState(0)
  const [activePhase, setActivePhase] = useState<string | null>(null)
  const [timers, setTimers] = useState<Record<string, PhaseTimer>>({})
  const [selectedSite, setSelectedSite] = useState<SiteEntry | null>(null)

  // Filtra tarefas baseado na fase selecionada
  const filteredTasks = activePhase
    ? unifiedTasks.filter(task => task.phase === activePhase)
    : []

  // Agrupa tarefas por fase para exibição
  const tasksByPhase = filteredTasks.reduce((acc, task) => {
    if (!acc[task.phase]) {
      acc[task.phase] = []
    }
    acc[task.phase].push(task)
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
    localStorage.setItem("unified-tasks-checklist", JSON.stringify([...completedItems]))
    setProgress((completedItems.size / unifiedTasks.length) * 100)
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
    setTimers(prev => {
      const newTimers = { ...prev }
      delete newTimers[phaseId]
      return newTimers
    })
  }

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }

  const resetChecklist = () => {
    if (confirm("Tem certeza que deseja resetar todo o checklist? Todos os dados serão perdidos.")) {
      setCompletedItems(new Set())
      setTimers({})
      localStorage.removeItem("unified-tasks-checklist")
      localStorage.removeItem("unified-tasks-timers")
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
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Link href="/">
                  <Button variant="ghost" size="sm">
                    <ArrowLeft className="mr-2 size-4" />
                    Voltar
                  </Button>
                </Link>
                <div>
                  <h1 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
                    Checklist de Tarefas - Projeto Huawei
                  </h1>
                  <p className="text-sm text-muted-foreground">Selecione um site para ver as fases do projeto</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-8 md:px-6">
          <div className="max-w-md mx-auto mb-8">
            <label className="text-sm font-medium mb-2 block">Selecione um Site</label>
            <Select onValueChange={handleSiteChange}>
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
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 md:px-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => setActivePhase(null)}>
                <ArrowLeft className="mr-2 size-4" />
                Voltar
              </Button>
              <div>
                <h1 className="text-balance text-xl font-semibold tracking-tight md:text-2xl">
                  Checklist: {selectedSite?.sigla} - {tasksByPhase[activePhase]?.[0]?.phaseTitle}
                </h1>
                <p className="text-sm text-muted-foreground">Acompanhe as tarefas da fase selecionada</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={resetChecklist}>
              <RotateCcw className="mr-2 size-4" />
              Resetar
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          
          {Object.entries(tasksByPhase).map(([phase, tasks]) => {
            const phaseProgress = getPhaseProgress(phase)
            const phaseTitle = tasks[0]?.phaseTitle || phase
            const timer = timers[phase];

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
                    <div className="flex items-center gap-4">
                      {/* Controles do Timer */}
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

                      <div className="text-right">
                        <div className="text-sm font-medium">Progresso</div>
                        <div className="text-lg font-semibold text-primary">{Math.round(phaseProgress)}%</div>
                      </div>
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
                          className={`flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-opacity ${
                            isCompleted ? "opacity-60" : ""
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
              </Card>
            )
          })}

          <FinalReport phase={activePhase} title={`Relatório da Fase: ${activePhase}`} />
        </div>
      </main>
    </div>
  )
}
