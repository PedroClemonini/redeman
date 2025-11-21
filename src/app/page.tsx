
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Building2, CheckCircle, Clock, GanttChartSquare } from 'lucide-react';
import { useState, useEffect, useMemo } from 'react';
import { unifiedTasks } from '@/lib/tasks-data';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import type { Site } from '@/lib/types';

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

export default function Dashboard() {
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const firestore = useFirestore();

  const sitesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);
  const { data: registeredSites, isLoading: sitesLoading } = useCollection<Site>(sitesQuery);


  useEffect(() => {
    // In a real app, this might be a global state or fetched from a DB.
    // For now, we listen to localStorage changes to sync across tabs.
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

  const siteProgress = useMemo(() => {
    if (!registeredSites) return [];
    return registeredSites.map(site => {
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
      
      // If previous stage is not complete, later stages are pending
      if (planningStatus !== 'Completo') {
         preparationStatus = 'Pendente';
         migrationStatus = 'Pendente';
      }
      if (preparationStatus !== 'Completo') {
         migrationStatus = 'Pendente';
      }


      return {
        id: site.id,
        siteName: `${site.codigo} - ${site.nome}`,
        planning: planningStatus,
        preparation: preparationStatus,
        migration: migrationStatus,
      };
    });
  }, [completedTasks, registeredSites]);

  const overallProgress = useMemo(() => {
    const totalSites = registeredSites?.length || 0;
    if (totalSites === 0) {
      return {
        completedSites: 0,
        planningPercent: 0,
        preparationPercent: 0,
        migrationPercent: 0,
      };
    }

    const completedSites = siteProgress.filter(p => p.migration === 'Completo').length;
    
    // Calculate percentage based on how many sites have COMPLETED the phase
    const planningCompleted = siteProgress.filter(p => p.planning === 'Completo').length;
    const preparationCompleted = siteProgress.filter(p => p.preparation === 'Completo').length;
    const migrationCompleted = siteProgress.filter(p => p.migration === 'Completo').length;

    return {
      completedSites,
      planningPercent: Math.round((planningCompleted / totalSites) * 100),
      preparationPercent: Math.round((preparationCompleted / totalSites) * 100),
      migrationPercent: Math.round((migrationCompleted / totalSites) * 100),
    };
  }, [siteProgress, registeredSites]);


  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <span className="text-green-500">{overallProgress.completedSites}</span>
              <span className="text-muted-foreground">/{registeredSites?.length || 0}</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Sites concluídos / Cadastrados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Planejamento
            </CardTitle>
            <GanttChartSquare className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.planningPercent}%</div>
            <p className="text-xs text-muted-foreground">
              {siteProgress.filter(p => p.planning === 'Completo').length} de {registeredSites?.length || 0} sites concluídos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Preparação
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.preparationPercent}%</div>
             <p className="text-xs text-muted-foreground">
              {siteProgress.filter(p => p.preparation === 'Completo').length} de {registeredSites?.length || 0} sites concluídos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Migração
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallProgress.migrationPercent}%</div>
            <p className="text-xs text-muted-foreground">
              {siteProgress.filter(p => p.migration === 'Completo').length} de {registeredSites?.length || 0} sites concluídos
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Progresso da Migração</CardTitle>
            <CardDescription>
              Status de cada etapa da migração por site, alimentado pela tela de Tarefas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site</TableHead>
                  <TableHead>Planejamento</TableHead>
                  <TableHead>Preparação</TableHead>
                  <TableHead>Migração</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sitesLoading && <TableRow><TableCell colSpan={4} className="text-center">Carregando...</TableCell></TableRow>}
                {siteProgress.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-medium">{site.siteName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[site.planning]}>
                        {site.planning}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[site.preparation]}>
                        {site.preparation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant="secondary" className={statusColors[site.migration]}>
                        {site.migration}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
