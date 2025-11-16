
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Checkbox } from '@/components/ui/checkbox';

interface AvailabilityGridProps {
  disponibilidade: any;
  analistas: string[];
  nomes: { [key: string]: string };
}

export function AvailabilityGrid({ disponibilidade, analistas, nomes }: AvailabilityGridProps) {
  const [currentAnalista, setCurrentAnalista] = useState('');
  const [availabilityData, setAvailabilityData] = useState(disponibilidade);

  useEffect(() => {
    setAvailabilityData(disponibilidade);
  }, [disponibilidade]);

  const handleAvailabilityChange = (dayIndex: number, hour: number, checked: boolean) => {
    if (!currentAnalista) return;

    setAvailabilityData((prevData: any) => {
      const newData = JSON.parse(JSON.stringify(prevData));
      const week = '17/11 a 22/11/2025';
      if (!newData[currentAnalista]) {
        newData[currentAnalista] = {};
      }
      if (!newData[currentAnalista][week]) {
        newData[currentAnalista][week] = Array(6).fill(Array(16).fill(false));
      }
      // Ensure the day's array is a mutable copy
      const daySchedule = [...newData[currentAnalista][week][dayIndex]];
      daySchedule[hour - 8] = checked;
      // Ensure the week's array is a mutable copy
      const weekSchedule = [...newData[currentAnalista][week]];
      weekSchedule[dayIndex] = daySchedule;
      
      newData[currentAnalista][week] = weekSchedule;
      return newData;
    });
  };


  const week = '17/11 a 22/11/2025';
  const hours = Array.from({ length: 16 }, (_, i) => i + 8); // 8h to 23h
  const days = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Grade de Disponibilidade (08h–23h)</CardTitle>
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
          <Table className="border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px] border-r">Hora</TableHead>
                {days.map((day) => (
                  <TableHead key={day} className="text-center">{day}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {hours.map((hour) => (
                <TableRow key={hour}>
                  <TableCell className="font-medium border-r">{`${hour.toString().padStart(2, '0')}:00`}</TableCell>
                  {days.map((_, dayIndex) => (
                    <TableCell key={dayIndex} className="text-center">
                      {currentAnalista && (
                        <Checkbox
                          checked={availabilityData[currentAnalista]?.[week]?.[dayIndex]?.[hour - 8] || false}
                          onCheckedChange={(checked) => handleAvailabilityChange(dayIndex, hour, !!checked)}
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
