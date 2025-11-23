'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { User } from '@/lib/types';


interface ResourceSummaryProps {
  disponibilidade: any;
  analistas: string[];
  nomes: { [key: string]: string };
}

const weeks = [
    "Semana 1 (10/11 a 15/11/2025)",
    "Semana 2 (17/11 a 22/11/2025)",
    "Semana 3 (24/11 a 29/11/2025)",
    "Semana 4 (01/12 a 06/12/2025)",
];

const periods = {
  'Manhã (08-12h)': { start: 8, end: 12 },
  'Tarde (13-18h)': { start: 13, end: 18 },
  'Noite (19-23h)': { start: 19, end: 23 },
};
const periodNames = Object.keys(periods) as (keyof typeof periods)[];
const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const getInitials = (name: string) => {
    return name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '';
}

export function ResourceSummary({ disponibilidade, analistas, nomes }: ResourceSummaryProps) {
  const [currentWeek, setCurrentWeek] = useState(weeks[0]);
  const firestore = useFirestore();

  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'));
  }, [firestore]);
  const { data: usersData } = useCollection<User>(usersQuery);

  const usersMap = useMemo(() => {
    if (!usersData) return new Map();
    return new Map(usersData.map(user => [user.id, user]));
  }, [usersData]);

  const getAvailableAnalysts = (week: string, dayIndex: number, period: typeof periods[keyof typeof periods]) => {
    const available: string[] = [];
    for (const analista of analistas) {
      const analistaWeekData = disponibilidade[analista]?.[week];
      if (analistaWeekData && analistaWeekData[dayIndex]) {
        let isAvailableInPeriod = false;
        for (let hour = period.start; hour <= period.end; hour++) {
          if (analistaWeekData[dayIndex][hour - 8]) {
            isAvailableInPeriod = true;
            break;
          }
        }
        if (isAvailableInPeriod) {
          available.push(analista);
        }
      }
    }
    return available;
  };

  return (
    <TooltipProvider>
      <Card>
        <CardHeader>
          <CardTitle>Resumo de Recursos Disponíveis</CardTitle>
          <CardDescription>
            Analistas disponíveis por período para a semana selecionada.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6 max-w-sm">
            <Label>Semana</Label>
            <Select onValueChange={setCurrentWeek} value={currentWeek}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione a semana" />
              </SelectTrigger>
              <SelectContent>
                {weeks.map((week) => (
                  <SelectItem key={week} value={week}>
                    {week}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="overflow-x-auto">
            <Table className="border min-w-[800px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Período</TableHead>
                  {daysOfWeek.map((day) => (
                    <TableHead key={day} className="text-center">{day}</TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {periodNames.map((periodName) => (
                  <TableRow key={periodName}>
                    <TableCell className="font-medium">{periodName}</TableCell>
                    {daysOfWeek.map((_, dayIndex) => {
                      const availableAnalysts = getAvailableAnalysts(currentWeek, dayIndex, periods[periodName]);
                      return (
                        <TableCell key={dayIndex} className="text-center">
                          {availableAnalysts.length > 0 ? (
                            <div className="flex justify-center -space-x-2">
                              {availableAnalysts.map((analistaId) => {
                                const user = usersMap.get(analistaId);
                                const userName = nomes[analistaId] || 'Analista';
                                return (
                                  <Tooltip key={analistaId}>
                                    <TooltipTrigger asChild>
                                      <Avatar className="h-8 w-8 border-2 border-background">
                                        <AvatarImage src={user?.fotoUrl || ''} alt={userName} />
                                        <AvatarFallback>{getInitials(userName)}</AvatarFallback>
                                      </Avatar>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>{userName}</p>
                                    </TooltipContent>
                                  </Tooltip>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
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
    </TooltipProvider>
  );
}
