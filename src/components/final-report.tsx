
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import type { SiteEntry } from '@/lib/registered-sites';
import { RichTextEditor } from './rich-text-editor';

interface FinalReportProps {
  phase: string | null;
  title: string;
  site: SiteEntry | null;
}

export function FinalReport({ phase, title, site }: FinalReportProps) {
  const [reportContent, setReportContent] = useState('');
  const [status, setStatus] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [fieldTechs, setFieldTechs] = useState('');
  const { toast } = useToast();

  if (!phase || !site) return null;

  const generateAndDownload = () => {
    if (!reportContent.trim() || !status.trim()) {
       toast({
            variant: "destructive",
            title: "Campos Obrigatórios",
            description: "Status e o corpo do relatório são obrigatórios.",
        });
      return;
    }
      
    const phaseKey = phase as keyof Pick<SiteEntry, 'planejamento' | 'preparacao' | 'migracao'>;
    const phaseData = site[phaseKey];
    
    const responsavelTecnico = [
      ...(phaseData?.v2mr?.map(p => p.name) || []),
    ].join(', ');

    const reportFileContent = `
###[${phase.charAt(0).toUpperCase() + phase.slice(1)}] – ${site.sigla} Finalização ###

**Hora de Inicio:** ${startTime || new Date(phaseData.date + 'T08:00:00').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}
**Intervalo:** ${breakTime || 'N/A'}
**Hora de Término:** ${endTime || new Date(phaseData.date + 'T18:00:00').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'})}
**Data:** ${phaseData?.date ? new Date(phaseData.date + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}
**Local:** ${site.sigla} - ${site.descricaoBreve}
**Template:** N/A
**Switches novos:** N/A
**Status:** ${status}
**Técnico em campo:** ${fieldTechs || 'N/A'}
**Responsável técnico:** ${responsavelTecnico || 'N/A'}

---
**RELATÓRIO DE ATIVIDADES:**

${reportContent}

---
**Atualizado por:** [Nome do Usuário Logado]
    `.trim();

    const blob = new Blob([reportFileContent], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Relatorio_${phase}_${site.sigla}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast({
        title: "Relatório Gerado",
        description: "O download do seu arquivo de relatório foi iniciado.",
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>
            Preencha os detalhes da fase de {phase} para gerar o relatório de atividades.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
             <div>
                <Label htmlFor="report-status">Status (Obrigatório)</Label>
                <Input
                  id="report-status"
                  placeholder="Ex: Concluído, Feito parcialmente..."
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
               <div>
                <Label htmlFor="field-techs">Técnicos em Campo</Label>
                <Input
                  id="field-techs"
                  placeholder="Ex: Márcio, Marcos"
                  value={fieldTechs}
                  onChange={(e) => setFieldTechs(e.target.value)}
                />
              </div>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-time">Hora Início</Label>
                <Input id="start-time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="break-time">Intervalo</Label>
                <Input id="break-time" placeholder="Ex: 12h - 13h" value={breakTime} onChange={e => setBreakTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="end-time">Hora Término</Label>
                <Input id="end-time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
              </div>
           </div>
          
          <div>
            <Label>Relatório de Atividades (Obrigatório)</Label>
            <div className='mt-2'>
              <RichTextEditor
                  content={reportContent}
                  onChange={setReportContent}
                  placeholder="Descreva as atividades, insira checklists e observações aqui..."
              />
            </div>
          </div>
          <Button onClick={generateAndDownload} className="w-full">
            <Download className="mr-2" />
            Gerar e Baixar Relatório
          </Button>
        </CardContent>
      </Card>
    </>
  );
}
