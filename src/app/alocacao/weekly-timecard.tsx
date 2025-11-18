
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface WeeklyTimecardProps {
  analistas: string[];
  nomes: { [key: string]: string };
}

type TimeEntry = {
  start: string;
  end: string;
};

export function WeeklyTimecard({ analistas, nomes }: WeeklyTimecardProps) {
  const [currentAnalista, setCurrentAnalista] = useState('');
  const [timecard, setTimecard] = useState<Record<string, TimeEntry>>({});

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const handleTimeChange = (day: string, type: 'start' | 'end', value: string) => {
    setTimecard(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [type]: value,
      },
    }));
  };

  const calculateTotalHours = useMemo(() => {
    let totalMinutes = 0;
    Object.values(timecard).forEach(({ start, end }) => {
      if (start && end) {
        const startMinutes = parseInt(start.split(':')[0]) * 60 + parseInt(start.split(':')[1]);
        const endMinutes = parseInt(end.split(':')[0]) * 60 + parseInt(end.split(':')[1]);
        if (endMinutes > startMinutes) {
          totalMinutes += endMinutes - startMinutes;
        }
      }
    });
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    // Arredonda para a próxima meia hora se os minutos forem > 0
    if (minutes > 0 && minutes <= 30) {
        return `${hours}.5`;
    } else if (minutes > 30) {
        return `${hours + 1}`;
    }
    return `${hours}`;
  }, [timecard]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cartão de Ponto Semanal</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="w-full md:w-1/2">
          <Label>Selecione um Analista</Label>
          <Select onValueChange={setCurrentAnalista} value={currentAnalista}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione um analista" />
            </SelectTrigger>
            <SelectContent>
              {analistas.map((a) => (
                <SelectItem key={a} value={a}>
                  {nomes[a]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {currentAnalista && (
          <div className="space-y-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="grid grid-cols-1 md:grid-cols-3 items-end gap-4 p-4 border rounded-lg">
                <div className="font-semibold text-lg">{day}</div>
                <div className="space-y-2">
                  <Label htmlFor={`${day}-start`}>Início</Label>
                  <Input 
                    id={`${day}-start`}
                    type="time" 
                    onChange={e => handleTimeChange(day, 'start', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor={`${day}-end`}>Término</Label>
                  <Input 
                    id={`${day}-end`}
                    type="time" 
                    onChange={e => handleTimeChange(day, 'end', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
       {currentAnalista && (
        <CardFooter className="flex-col items-start gap-4 border-t pt-6">
            <div className="text-xl font-bold">
                Total de Horas na Semana: <span className="text-primary">{calculateTotalHours}</span>
            </div>
             <p className="text-sm text-muted-foreground">
                As horas são arredondadas para a próxima meia hora.
            </p>
            <Button>Salvar Apontamentos</Button>
        </CardFooter>
      )}
    </Card>
  );
}
