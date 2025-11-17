
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
import { Building2, CheckCircle, Clock, Router, GanttChartSquare } from 'lucide-react';
import { weeklySchedule, sites } from '@/lib/data';
import { useMemo } from 'react';

// This would come from your data source in a real app
const getSiteProgress = () => {
  // In a real scenario, this data would be fetched or calculated.
  // Here, we are using a simplified version based on initial data.
  // We'll map over the sites and generate some mock progress.
  return sites.slice(0, 10).map((site, index) => {
    const statuses = ['Completo', 'Pendente', 'Em Andamento', 'Não Iniciado'];
    
    // Create some variation for demonstration
    const getStatus = (base: number) => {
        const statusIndex = (index + base) % statuses.length;
        return statuses[statusIndex];
    };
    
    return {
      id: site.code,
      siteName: site.name,
      planning: getStatus(0),
      preparation: getStatus(1),
      migration: getStatus(2),
    };
  });
};

type Status = 'Completo' | 'Pendente' | 'Em Andamento' | 'Não Iniciado';

const statusColors: Record<Status, string> = {
  'Completo': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
  'Pendente': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
  'Em Andamento': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
  'Não Iniciado': 'bg-gray-100 text-gray-500 dark:bg-gray-900/50 dark:text-gray-400',
};


export default function Dashboard() {
  const siteProgress = useMemo(() => getSiteProgress(), []);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sites.length}</div>
            <p className="text-xs text-muted-foreground">
              All sites in project
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
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-muted-foreground">
              70% completo
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
            <div className="text-2xl font-bold">120</div>
             <p className="text-xs text-muted-foreground">
              55% completo
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
            <div className="text-2xl font-bold">110</div>
            <p className="text-xs text-muted-foreground">
              50% completo
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Switches em Estoque
            </CardTitle>
            <Router className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-muted-foreground">
              Prontos para envio
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
          <CardHeader>
            <CardTitle>Progresso da Migração</CardTitle>
            <CardDescription>
              Status de cada etapa da migração por site.
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
                {siteProgress.map((site) => (
                  <TableRow key={site.id}>
                    <TableCell className="font-medium">{site.siteName}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[site.planning as Status]}>
                        {site.planning}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={statusColors[site.preparation as Status]}>
                        {site.preparation}
                      </Badge>
                    </TableCell>
                    <TableCell>
                       <Badge variant="secondary" className={statusColors[site.migration as Status]}>
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
