
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface TimecardGridProps {
  analistas: string[];
  nomes: { [key: string]: string };
}

// Mock initial data - in a real app this would come from a database
const initialTimecardData: any = {
  // 'paulo': { '17/11 a 22/11/2025': [[...], [...]] }
};

export function TimecardGrid({ analistas, nomes }: TimecardGridProps) {
  const [currentAnalista, setCurrentAnalista] = useState('');
  const [timecardData, setTimecardData] = useState(initialTimecardData);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, you might fetch existing timecard data for the selected analyst.
    // For now, we just log that the analyst has changed.
    console.log(`Switched to analyst: ${currentAnalista}`);
  }, [currentAnalista]);

  const handleTimecardChange = (dayIndex: number, hour: number, checked: boolean) => {
    if (!currentAnalista) return;

    setTimecardData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const week = '17/11 a 22/11/2025';
      
      // Initialize data structure if it doesn't exist
      if (!newData[currentAnalista]) {
        newData[currentAnalista] = {};
      }
      if (!newData[currentAnalista][week]) {
        newData[currentAnalista][week] = Array(6).fill(null).map(() => Array(16).fill(false));
      }
      
      const daySchedule = [...(newData[currentAnalista][week][dayIndex] || Array(16).fill(false))];
      daySchedule[hour - 8] = checked;
      
      const weekSchedule = [...newData[currentAnalista][week]];
      weekSchedule[dayIndex] = daySchedule;
      
      newData[currentAnalista][week] = weekSchedule;
      return newData;
    });
  };

  const handleSave = () => {
    if (!currentAnalista) {
       toast({
        variant: "destructive",
        title: "Nenhum analista selecionado",
        description: "Por favor, selecione um analista para salvar os apontamentos.",
      });
      return;
    }
    // In a real app, this would send the data to a backend API.
    console.log('Saving timecard data:', timecardData[currentAnalista]);
    toast({
      title: "Apontamentos Salvos!",
      description: `As horas para ${nomes[currentAnalista]} foram salvas com sucesso.`,
    });
  };

  const week = '17/11 a 22/11/2025';
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8h to 23h
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const { dailyTotals, weekTotal } = useMemo(() => {
    if (!currentAnalista || !timecardData[currentAnalista]?.[week]) {
      return { dailyTotals: Array(6).fill(0), weekTotal: 0 };
    }
    
    const currentWeekData = timecardData[currentAnalista][week];
    const totals = currentWeekData.map((daySchedule: boolean[]) => {
      if (!daySchedule) return 0;
      return daySchedule.filter(Boolean).length;
    });
    
    const totalSum = totals.reduce((sum: number, total: number) => sum + total, 0);

    return { dailyTotals: totals, weekTotal: totalSum };
  }, [currentAnalista, timecardData, week]);


  return (
    <Card>
      <CardHeader>
        <CardTitle>Cartão de Ponto (08h–23h)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6 w-full md:w-auto">
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
        <div className="overflow-x-auto">
          <Table className="border min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border-r p-2">Hora</TableHead>
                {days.map((day, i) => (
                  <TableHead key={day} className="text-center p-2">{`${day}`}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hours.map((hour) => (
                <TableRow key={hour}>
                  <TableCell className="font-medium border-r p-2 text-right pr-3">{`${hour.toString().padStart(2, '0')}:00`}</TableCell>
                  {days.map((_, dayIndex) => (
                    <TableCell key={dayIndex} className="text-center p-2">
                      {currentAnalista && (
                        <Checkbox
                          checked={timecardData[currentAnalista]?.[week]?.[dayIndex]?.[hour - 8] || false}
                          onCheckedChange={(checked) => handleTimecardChange(dayIndex, hour, !!checked)}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                <TableRow className='bg-muted/50'>
                    <TableCell className="font-medium border-r p-2 text-right pr-3">Total Horas</TableCell>
                    {dailyTotals.map((total, index) => (
                        <TableCell key={index} className="text-center p-2 font-bold">
                            {currentAnalista ? total : '-'}
                        </TableCell>
                    ))}
                </TableRow>
            </TableFooter>
          </Table>
        </div>
      </CardContent>
       {currentAnalista && (
        <CardFooter className="flex-col items-start gap-4 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xl font-bold">
                Total de Horas na Semana: <span className="text-primary">{weekTotal}</span>
            </div>
            <Button onClick={handleSave}>Salvar Apontamentos</Button>
        </CardFooter>
      )}
    </Card>
  );
}
