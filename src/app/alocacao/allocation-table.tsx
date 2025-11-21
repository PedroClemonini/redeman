
'use client';

import {
  Card,
  CardContent,
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
import { cn } from '@/lib/utils';

interface AllocationTableProps {
  alocacao: any;
  disponibilidade: any;
  analistas: string[];
  nomes: { [key: string]: string };
}

export function AllocationTable({ alocacao, disponibilidade, analistas, nomes }: AllocationTableProps) {
  const weekName = "Semana 2 (17/11 a 22/11/2025)";
  const datas = [
    '17/11/2025',
    '18/11/2025',
    '19/11/2025',
    '20/11/2025',
    '21/11/2025',
    '22/11/2025',
  ];

  const getDayFromDate = (dateString: string) => {
    return dateString.split('/')[0];
  }

  const isAnalystAvailableOnDay = (analistaId: string, dayIndex: number) => {
    const weekData = disponibilidade[analistaId]?.[weekName];
    if (weekData && weekData[dayIndex]) {
      // Check if there's any available hour in that day
      return weekData[dayIndex].some((isAvailable: boolean) => isAvailable);
    }
    return false;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alocação por Analista – Semana 2</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Analista</TableHead>
              <TableHead>Seg ({getDayFromDate(datas[0])})</TableHead>
              <TableHead>Ter ({getDayFromDate(datas[1])})</TableHead>
              <TableHead>Qua ({getDayFromDate(datas[2])})</TableHead>
              <TableHead>Qui ({getDayFromDate(datas[3])})</TableHead>
              <TableHead>Sex ({getDayFromDate(datas[4])})</TableHead>
              <TableHead>Sáb ({getDayFromDate(datas[5])})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analistas.map((usuario) => (
              <TableRow key={usuario}>
                <TableCell className="font-medium">{nomes[usuario]}</TableCell>
                {datas.map((data, dayIndex) => {
                  let cellContent: React.ReactNode = <span className="italic text-muted-foreground">—</span>;
                  let cellClass = "";
                  
                  const assignments: React.ReactNode[] = [];

                  if (alocacao[data]) {
                    for (const site in alocacao[data]) {
                      if (alocacao[data][site].includes(usuario)) {
                        const isMigracao = site.includes('MCI');
                        const teamSize = alocacao[data][site].length;
                        assignments.push(
                          <div key={site} className={`p-1.5 rounded-md text-xs ${isMigracao ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800' : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800'}`}>
                            <div className='font-semibold'>{site} ({isMigracao ? 'Mig' : 'Prep'})</div>
                            {teamSize > 1 && <div className='text-xs'>({teamSize} analistas)</div>}
                          </div>
                        );
                      }
                    }
                  }

                  if (assignments.length > 0) {
                    cellContent = <div className="flex flex-col gap-1">{assignments}</div>;
                  } else if (isAnalystAvailableOnDay(usuario, dayIndex)) {
                     cellClass = "bg-gray-100 dark:bg-gray-800/30";
                     cellContent = <span className="italic text-muted-foreground text-xs">Disponível</span>
                  }


                  return (
                    <TableCell key={data} className={cn("text-center align-top p-2 min-w-[150px]", cellClass)}>
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
