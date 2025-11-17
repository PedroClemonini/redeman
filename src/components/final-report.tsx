
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
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Download, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import type { SiteEntry } from '@/lib/registered-sites';

interface FinalReportProps {
  phase: string | null;
  title: string;
  site: SiteEntry | null;
}

export function FinalReport({ phase, title, site }: FinalReportProps) {
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { toast } = useToast();

  if (!phase || !site) return null;

  const handleGenerateReport = () => {
    if (!notes.trim() || !status.trim()) {
      setIsModalOpen(true);
      return;
    }
    generateAndDownload();
  };
  
  const handleModalSubmit = () => {
     if (!notes.trim() || !status.trim()) {
        toast({
            variant: "destructive",
            title: "Campos Obrigatórios",
            description: "Por favor, preencha os campos de status e notas para gerar o relatório.",
        });
        return;
    }
    setIsModalOpen(false);
    generateAndDownload();
  }

  const generateAndDownload = () => {
    const phaseKey = phase as keyof Pick<SiteEntry, 'planejamento' | 'preparacao' | 'migracao'>;
    const phaseData = site[phaseKey];

    const formatPeople = (people: {id: number, name: string}[]) => (people && people.length > 0) ? people.map(p => p.name).join(', ') : 'N/A';

    const technicians = [
        ...(phaseData?.zoom?.map(p => `(zoom) ${p.name}`) || []),
        ...(phaseData?.bts?.map(p => `(bts) ${p.name}`) || [])
    ].join(' - ');
    
    const responsavelTecnico = [
      ...(phaseData?.v2mr?.map(p => p.name) || []),
    ].join(', ');


    const reportContent = `###[${phase.charAt(0).toUpperCase() + phase.slice(1)}] – ${site.sigla} Finalização ###

**Hora:** ${phaseData?.date ? new Date(phaseData.date + 'T00:00:00').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'}) : 'N/A'} - ${phaseData?.date ? new Date(phaseData.date + 'T23:59:59').toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit'}) : 'N/A'} ${phaseData?.date ? new Date(phaseData.date + 'T00:00:00').toLocaleDateString('pt-BR') : 'N/A'}
**Local:** ${site.sigla}
**Template:** N/A
**Switches novos:** N/A
**Status:** ${status}
**Técnico em campo:** ${technicians || 'N/A'}
**Responsável técnico:** ${responsavelTecnico || 'N/A'}
**Notas Adicionais:** ${notes}
**Atualizado por:** [Nome do Usuário Logado]
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/markdown;charset=utf-8' });
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
            Gere o relatório final para a fase: {phase}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            <Label htmlFor="report-notes">Notas Adicionais (Obrigatório)</Label>
            <Textarea
              id="report-notes"
              placeholder="Adicione observações relevantes aqui..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <Button onClick={handleGenerateReport}>
            <Download className="mr-2" />
            Gerar e Baixar Relatório
          </Button>
        </CardContent>
      </Card>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <AlertCircle className="text-yellow-500" />
                    Campos Obrigatórios
                </DialogTitle>
                <DialogDescription>
                    Os campos "Status" e "Notas Adicionais" são obrigatórios para gerar o relatório. Por favor, preencha as informações necessárias.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div>
                  <Label htmlFor="modal-report-status">Status</Label>
                  <Input
                    id="modal-report-status"
                    placeholder="Ex: Concluído, Feito parcialmente..."
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="modal-report-notes">Notas Adicionais</Label>
                  <Textarea
                  id="modal-report-notes"
                  placeholder="Insira suas notas aqui..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="mt-2"
                  />
                </div>
            </div>
            <DialogFooter>
                <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancelar</Button>
                <Button onClick={handleModalSubmit}>Salvar e Gerar Relatório</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
