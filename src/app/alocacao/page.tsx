
'use client';

import { PageHeader } from '@/components/page-header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AllocationTable } from './allocation-table';
import { AvailabilityGrid } from './availability-grid';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { alocacao, disponibilidade, analistas, nomes } from '@/lib/data';
import { TimecardGrid } from './timecard-grid';
import { ResourceSummary } from './resource-summary';

export default function AlocacaoPage() {

  const handleExport = () => {
    // In a real scenario, this would trigger a PDF generation.
    // For now, we can just log to the console.
    console.log('Exporting to PDF...');
    alert('Função de exportar para PDF a ser implementada.');
  };

  return (
    <div>
      <PageHeader
        title="REDEMAP – Alocação & Ponto"
        description="Planejamento de alocação e registro de horas dos analistas."
      />
      <div className="mb-4 flex justify-end">
        <Button onClick={handleExport}>
          <Download className="mr-2" />
          Baixar PDF
        </Button>
      </div>
      <Tabs defaultValue="allocation">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="allocation">Alocação por Analista</TabsTrigger>
          <TabsTrigger value="availability">Grade de Disponibilidade</TabsTrigger>
          <TabsTrigger value="resources">Recursos</TabsTrigger>
          <TabsTrigger value="timecard">Cartão de Ponto (Grid)</TabsTrigger>
        </TabsList>
        <TabsContent value="allocation">
          <AllocationTable alocacao={alocacao} disponibilidade={disponibilidade} analistas={analistas} nomes={nomes} />
        </TabsContent>
        <TabsContent value="availability">
          <AvailabilityGrid disponibilidade={disponibilidade} analistas={analistas} nomes={nomes} />
        </TabsContent>
        <TabsContent value="resources">
          <ResourceSummary disponibilidade={disponibilidade} analistas={analistas} nomes={nomes} />
        </TabsContent>
        <TabsContent value="timecard">
            <TimecardGrid analistas={analistas} nomes={nomes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
