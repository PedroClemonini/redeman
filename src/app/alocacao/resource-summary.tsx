'use client';

import { useState } from 'react';
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

interface ResourceSummaryProps {
  disponibilidade: any;
  analistas: string[];
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

export function ResourceSummary({ disponibilidade, analistas }: ResourceSummaryProps) {
  const [currentWeek, setCurrentWeek] = useState(weeks[1]);

  const calculateAvailability = (week: string, dayIndex: number, period: typeof periods[keyof typeof periods]) => {
    let count = 0;
    for (const analista of analistas) {
      const analistaWeekData = disponibilidade[analista]?.[week];
      if (analistaWeekData && analistaWeekData[dayIndex]) {
        // Check if the analyst is available for at least one hour in the period
        let isAvailableInPeriod = false;
        for (let hour = period.start; hour <= period.end; hour++) {
          if (analistaWeekData[dayIndex][hour - 8]) {
            isAvailableInPeriod = true;
            break;
          }
        }
        if (isAvailableInPeriod) {
          count++;
        }
      }
    }
    return count;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo de Recursos Disponíveis</CardTitle>
        <CardDescription>
          Contagem de analistas disponíveis por período para a semana selecionada.
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
          <Table className="border">
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
                    const count = calculateAvailability(currentWeek, dayIndex, periods[periodName]);
                    return (
                      <TableCell key={dayIndex} className="text-center font-bold text-lg">
                        <span className={count > 0 ? 'text-primary' : 'text-muted-foreground'}>
                            {count}
                        </span>
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
