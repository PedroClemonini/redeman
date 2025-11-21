
'use client';

import React from 'react';
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

const periods = {
  'Manhã': { start: 8, end: 12 },
  'Tarde': { start: 13, end: 18 },
  'Noite': { start: 19, end: 23 },
};
const periodNames = Object.keys(periods) as (keyof typeof periods)[];


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
  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];


  const getDayFromDate = (dateString: string) => {
    return dateString.split('/')[0];
  }

  const isAnalystAvailableInPeriod = (analistaId: string, dayIndex: number, period: typeof periods[keyof typeof periods]) => {
    const weekData = disponibilidade[analistaId]?.[weekName];
    if (weekData && weekData[dayIndex]) {
      for (let hour = period.start; hour <= period.end; hour++) {
        // hour is 8-23, array index is 0-15
        if (weekData[dayIndex][hour - 8]) {
          return true; // Found at least one available hour in the period
        }
      }
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
              <TableHead rowSpan={2} className="w-[200px] align-middle text-center border-r">Analista</TableHead>
              {daysOfWeek.map((day, index) => (
                <TableHead key={day} colSpan={3} className="text-center border-x">
                  {day} ({getDayFromDate(datas[index])})
                </TableHead>
              ))}
            </TableRow>
            <TableRow>
              {daysOfWeek.map((day) => (
                <React.Fragment key={`${day}-periods`}>
                  <TableHead className="text-center w-[50px] border-l">M</TableHead>
                  <TableHead className="text-center w-[50px] border-x">T</TableHead>
                  <TableHead className="text-center w-[50px] border-r">N</TableHead>
                </React.Fragment>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {analistas.map((usuario) => (
              <TableRow key={usuario}>
                <TableCell className="font-medium border-r">{nomes[usuario]}</TableCell>
                {datas.map((data, dayIndex) => {
                   // This logic for assignments is simplified. A real app would need to know WHICH period the assignment is for.
                   // For now, we show the assignment in all periods if the analyst is assigned on that day.
                   const dailyAssignments: React.ReactNode[] = [];
                   if (alocacao[data]) {
                     for (const site in alocacao[data]) {
                       if (alocacao[data][site].includes(usuario)) {
                         const isMigracao = site.includes('MCI');
                         const teamSize = alocacao[data][site].length;
                         dailyAssignments.push(
                           <div key={site} className={`p-1.5 rounded-md text-xs ${isMigracao ? 'bg-green-100 text-green-800 border border-green-200 dark:bg-green-900/50 dark:text-green-300 dark:border-green-800' : 'bg-blue-100 text-blue-800 border border-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:border-blue-800'}`}>
                             <div className='font-semibold'>{site} ({isMigracao ? 'Mig' : 'Prep'})</div>
                             {teamSize > 1 && <div className='text-xs'>({teamSize} analistas)</div>}
                           </div>
                         );
                       }
                     }
                   }

                  return (
                    <React.Fragment key={`${usuario}-${data}`}>
                      {periodNames.map((periodName, periodIndex) => {
                          let cellContent: React.ReactNode = <span className="italic text-muted-foreground">—</span>;
                          let cellClass = "";
                          
                          // A more complex logic would check if the assignment falls into this specific period.
                          // For now, if there's any assignment on the day, we show it.
                          // This is a simplification. A better approach would be to have time-aware assignments.
                          if (dailyAssignments.length > 0) {
                              cellContent = <div className="flex flex-col gap-1">{dailyAssignments}</div>;
                          } else if (isAnalystAvailableInPeriod(usuario, dayIndex, periods[periodName])) {
                              cellClass = "bg-gray-100 dark:bg-gray-800/30";
                              cellContent = <span className="italic text-muted-foreground text-xs">Disponível</span>
                          }

                          const borderClass = periodIndex === 0 ? 'border-l' : (periodIndex === 2 ? 'border-r' : 'border-x');

                          return (
                            <TableCell key={`${data}-${periodName}`} className={cn("text-center align-top p-2 min-w-[150px]", cellClass, borderClass)}>
                              {cellContent}
                            </TableCell>
                          );
                      })}
                    </React.Fragment>
                  )
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
