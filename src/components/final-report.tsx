
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Download } from 'lucide-react';

interface FinalReportProps {
  phase: string;
  title: string;
}

export function FinalReport({ phase, title }: FinalReportProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          Gere o relatório final para a fase: {phase}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="report-notes">Notas Adicionais</Label>
          <Textarea id="report-notes" placeholder="Adicione observações relevantes aqui..." />
        </div>
        <Button>
          <Download className="mr-2" />
          Gerar e Baixar Relatório
        </Button>
      </CardContent>
    </Card>
  );
}

