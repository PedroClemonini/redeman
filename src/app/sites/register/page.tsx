
'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/page-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

type SiteEntry = {
  id: number;
  site: string;
  equipamentos: number;
  dia: string;
  prep: string[];
  mig: string[];
};

const weekDays = [
  { id: 'seg', label: 'Segunda (17/11)' },
  { id: 'ter', label: 'Terça (18/11)' },
  { id: 'qua', label: 'Quarta (19/11)' },
  { id: 'qui', label: 'Quinta (20/11)' },
  { id: 'sex', label: 'Sexta (21/11)' },
  { id: 'sab', label: 'Sábado (22/11)' },
];

export default function RegisterSitePage() {
  const [sites, setSites] = useState<SiteEntry[]>([
    { id: 1, site: 'ARN01', equipamentos: 4, dia: 'Terça', prep: ['seg', 'ter'], mig: ['qua', 'qui'] },
    { id: 2, site: 'PAE15', equipamentos: 4, dia: 'Terça', prep: ['seg'], mig: ['ter', 'qua'] },
  ]);

  const [prepDays, setPrepDays] = useState<string[]>([]);
  const [migDays, setMigDays] = useState<string[]>([]);

  const handleCheckboxChange = (
    dayId: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (list.includes(dayId)) {
      setter(list.filter((d) => d !== dayId));
    } else {
      setter([...list, dayId]);
    }
  };

  const addSite = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const site = formData.get('site') as string;
    const equipamentos = Number(formData.get('equipamentos'));
    const dia = formData.get('dia') as string;

    const newSite: SiteEntry = {
      id: Date.now(),
      site: site.toUpperCase(),
      equipamentos,
      dia,
      prep: prepDays,
      mig: migDays,
    };
    
    setSites([...sites, newSite]);
    e.currentTarget.reset();
    setPrepDays([]);
    setMigDays([]);
  };

  const removeSite = (id: number) => {
    setSites(sites.filter((s) => s.id !== id));
  };
  
  const DayCheckbox = ({ day, type, list, setter }: { day: {id: string, label: string}, type: string, list: string[], setter: React.Dispatch<React.SetStateAction<string[]>>}) => {
    const isChecked = list.includes(day.id);
    return (
      <div className="flex items-center">
        <Checkbox
          id={`${type}-${day.id}`}
          checked={isChecked}
          onCheckedChange={() => handleCheckboxChange(day.id, list, setter)}
          className="hidden"
        />
        <Label
          htmlFor={`${type}-${day.id}`}
          className={cn(
            "flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 text-center text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground",
            isChecked && "border-primary bg-primary/10 text-primary"
          )}
        >
          {day.label.split(' ')[0]}
          <span className="block font-normal text-muted-foreground">{day.label.split(' ')[1]}</span>
        </Label>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Cadastro de Sites – Semana 2"
        description="Preencha para cada site: Equipamentos, Dia, Preparação e Migração por data (17/11 a 22/11)"
      />

      <Card>
        <CardContent className="p-6">
          <form onSubmit={addSite} className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Input name="site" placeholder="SITE (ex: ARN01)" required />
            <Input name="equipamentos" type="number" placeholder="EQUIPAMENTOS (ex: 4)" required />
            <Select name="dia" required>
              <SelectTrigger>
                <SelectValue placeholder="DIA" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Terça">Terça (17/11)</SelectItem>
                <SelectItem value="Quarta">Quarta (18/11)</SelectItem>
                <SelectItem value="Quinta">Quinta (19/11)</SelectItem>
                <SelectItem value="Sexta">Sexta (20/11)</SelectItem>
                <SelectItem value="Sábado">Sábado (21/11)</SelectItem>
              </SelectContent>
            </Select>
            
            <div className="md:col-span-2 space-y-6">
              <div>
                <Label className="block text-sm font-medium mb-3">PREPARAÇÃO</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {weekDays.map(day => (
                    <DayCheckbox key={`prep-${day.id}`} day={day} type="prep" list={prepDays} setter={setPrepDays} />
                  ))}
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium mb-3">MIGRAÇÃO</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                   {weekDays.map(day => (
                    <DayCheckbox key={`mig-${day.id}`} day={day} type="mig" list={migDays} setter={setMigDays} />
                  ))}
                </div>
              </div>
            </div>

            <Button type="submit" className="md:col-span-2">Adicionar Site</Button>
          </form>

          <div className="space-y-4">
            {sites.map((s) => (
              <div key={s.id} className="p-4 bg-muted/30 rounded-lg border">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{s.site} ({s.equipamentos} equipamentos)</h3>
                    <p className="text-sm text-muted-foreground">Dia: {s.dia}</p>
                    <p className="text-sm text-blue-600">Preparação: {s.prep.join(', ')}</p>
                    <p className="text-sm text-green-600">Migração: {s.mig.join(', ')}</p>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeSite(s.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
