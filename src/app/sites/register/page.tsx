
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
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <Label className="block text-sm font-medium mb-2">PREPARAÇÃO</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {weekDays.map(day => (
                    <div key={`prep-${day.id}`} className="flex items-center gap-2">
                      <Checkbox 
                        id={`prep-${day.id}`} 
                        onCheckedChange={() => handleCheckboxChange(day.id, prepDays, setPrepDays)}
                        checked={prepDays.includes(day.id)}
                      />
                      <Label htmlFor={`prep-${day.id}`}>{day.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Label className="block text-sm font-medium mb-2">MIGRAÇÃO</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {weekDays.map(day => (
                    <div key={`mig-${day.id}`} className="flex items-center gap-2">
                       <Checkbox 
                        id={`mig-${day.id}`} 
                        onCheckedChange={() => handleCheckboxChange(day.id, migDays, setMigDays)}
                        checked={migDays.includes(day.id)}
                      />
                      <Label htmlFor={`mig-${day.id}`}>{day.label}</Label>
                    </div>
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
