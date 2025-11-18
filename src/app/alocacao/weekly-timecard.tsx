
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
import { Plus, X } from 'lucide-react';

interface WeeklyTimecardProps {
  analistas: string[];
  nomes: { [key: string]: string };
}

type TimeEntry = {
  id: number;
  start: string;
  end: string;
};

export function WeeklyTimecard({ analistas, nomes }: WeeklyTimecardProps) {
  const [currentAnalista, setCurrentAnalista] = useState('');
  // Each day can have multiple time entries
  const [timecard, setTimecard] = useState<Record<string, TimeEntry[]>>({});

  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

  const addTimeEntry = (day: string) => {
    setTimecard(prev => {
      const dayEntries = prev[day] || [];
      return {
        ...prev,
        [day]: [...dayEntries, { id: Date.now(), start: '', end: '' }],
      };
    });
  };

  const removeTimeEntry = (day: string, entryId: number) => {
    setTimecard(prev => {
      const dayEntries = prev[day] || [];
      return {
        ...prev,
        [day]: dayEntries.filter(entry => entry.id !== entryId),
      };
    });
  };

  const handleTimeChange = (day: string, entryId: number, type: 'start' | 'end', value: string) => {
    setTimecard(prev => {
      const dayEntries = prev[day] || [];
      const updatedEntries = dayEntries.map(entry =>
        entry.id === entryId ? { ...entry, [type]: value } : entry
      );
      return {
        ...prev,
        [day]: updatedEntries,
      };
    });
  };

  const calculateTotalHours = useMemo(() => {
    let totalMinutes = 0;
    Object.values(timecard).flat().forEach(({ start, end }) => {
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
          <Select onValueChange={(value) => { setCurrentAnalista(value); setTimecard({}); }} value={currentAnalista}>
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
              <div key={day} className="p-4 border rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">{day}</h3>
                    <Button variant="outline" size="sm" onClick={() => addTimeEntry(day)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Adicionar Período
                    </Button>
                </div>
                <div className="space-y-4">
                    {(timecard[day] || []).length === 0 && <p className="text-sm text-muted-foreground">Nenhum período adicionado.</p>}
                    {timecard[day]?.map((entry) => (
                         <div key={entry.id} className="grid grid-cols-1 md:grid-cols-[1fr,1fr,auto] items-end gap-4">
                            <div className="space-y-2">
                                <Label htmlFor={`${day}-${entry.id}-start`}>Início</Label>
                                <Input 
                                    id={`${day}-${entry.id}-start`}
                                    type="time" 
                                    value={entry.start}
                                    onChange={e => handleTimeChange(day, entry.id, 'start', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${day}-${entry.id}-end`}>Término</Label>
                                <Input 
                                    id={`${day}-${entry.id}-end`}
                                    type="time"
                                    value={entry.end} 
                                    onChange={e => handleTimeChange(day, entry.id, 'end', e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeTimeEntry(day, entry.id)} className="text-muted-foreground hover:text-destructive">
                                <X className="h-4 w-4"/>
                                <span className="sr-only">Remover</span>
                            </Button>
                        </div>
                    ))}
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
