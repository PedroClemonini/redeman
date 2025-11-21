
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';

interface AvailabilityGridProps {
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

const weekDateMap: Record<string, string[]> = {
    [weeks[0]]: ['10/11', '11/11', '12/11', '13/11', '14/11', '15/11'],
    [weeks[1]]: ['17/11', '18/11', '19/11', '20/11', '21/11', '22/11'],
    [weeks[2]]: ['24/11', '25/11', '26/11', '27/11', '28/11', '29/11'],
    [weeks[3]]: ['01/12', '02/12', '03/12', '04/12', '05/12', '06/12'],
}


export function AvailabilityGrid({ disponibilidade, analistas, nomes }: AvailabilityGridProps) {
  const [currentAnalista, setCurrentAnalista] = useState('');
  const [currentWeek, setCurrentWeek] = useState(weeks[1]);
  const [availabilityData, setAvailabilityData] = useState(disponibilidade);
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, this would be saved to a backend.
    console.log('Availability data changed:', availabilityData);
  }, [availabilityData]);

  useEffect(() => {
    // Update local state when initial props change.
    setAvailabilityData(disponibilidade);
  }, [disponibilidade]);

  const handleAvailabilityChange = (dayIndex: number, hour: number, checked: boolean) => {
    if (!currentAnalista || !currentWeek) return;

    setAvailabilityData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      
      if (!newData[currentAnalista]) {
        newData[currentAnalista] = {};
      }
      if (!newData[currentAnalista][currentWeek]) {
        // Initialize the week with 6 days, each having 16 hours (8-23) set to false
        newData[currentAnalista][currentWeek] = Array(6).fill(null).map(() => Array(16).fill(false));
      }
      
      const daySchedule = [...(newData[currentAnalista][currentWeek][dayIndex] || Array(16).fill(false))];
      daySchedule[hour - 8] = checked;
      
      const weekSchedule = [...newData[currentAnalista][currentWeek]];
      weekSchedule[dayIndex] = daySchedule;
      
      newData[currentAnalista][currentWeek] = weekSchedule;
      return newData;
    });
  };

  const handleClearGrid = () => {
    if (!currentAnalista || !currentWeek) {
        toast({
            variant: "destructive",
            title: "Seleção Incompleta",
            description: "Por favor, selecione um analista e uma semana para limpar a grade.",
        });
        return;
    }

     setAvailabilityData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      if (newData[currentAnalista] && newData[currentAnalista][currentWeek]) {
        newData[currentAnalista][currentWeek] = Array(6).fill(null).map(() => Array(16).fill(false));
      }
      return newData;
    });

    toast({
        title: "Grade Limpa!",
        description: `A disponibilidade de ${nomes[currentAnalista]} para a ${currentWeek.split(' ')[1]} foi resetada.`
    })
  }


  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8h to 23h
  const daysOfWeek = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const currentWeekDates = weekDateMap[currentWeek] || [];

  const dailyTotals = daysOfWeek.map((_, dayIndex) => {
    if (!currentAnalista || !availabilityData[currentAnalista]?.[currentWeek]?.[dayIndex]) {
      return 0;
    }
    return availabilityData[currentAnalista][currentWeek][dayIndex].filter(Boolean).length;
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade de Disponibilidade (08h–23h)</CardTitle>
        <CardDescription>Selecione um analista e a semana para visualizar ou editar as horas disponíveis.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="md:col-span-1">
                <Label>Analista</Label>
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
             <div className="md:col-span-1">
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
            <Button variant="outline" onClick={handleClearGrid} disabled={!currentAnalista}>
                <Trash2 className="mr-2 h-4 w-4" />
                Limpar Grade
            </Button>
        </div>
        <div className="overflow-x-auto">
          <Table className="border min-w-[800px]">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border-r p-2">Hora</TableHead>
                {daysOfWeek.map((day, index) => (
                  <TableHead key={day} className="text-center p-2">{day} ({currentWeekDates[index]})</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hours.map((hour) => (
                <TableRow key={hour}>
                  <TableCell className="font-medium border-r p-2 text-right pr-3">{`${hour.toString().padStart(2, '0')}:00`}</TableCell>
                  {daysOfWeek.map((_, dayIndex) => (
                    <TableCell key={dayIndex} className="text-center p-2">
                      {currentAnalista && (
                        <Checkbox
                          checked={availabilityData[currentAnalista]?.[currentWeek]?.[dayIndex]?.[hour - 8] || false}
                          onCheckedChange={(checked) => handleAvailabilityChange(dayIndex, hour, !!checked)}
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
    </Card>
  );
}
