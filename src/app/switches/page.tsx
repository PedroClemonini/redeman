
import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { switches, sites } from '@/lib/data';
import { Download, Plus, Upload } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function SwitchesPage() {
  const getSiteInfo = (siteCode: string) => {
    return sites.find(s => s.code === siteCode);
  };

  return (
    <div>
      <PageHeader
        title="Gerenciamento de IPs"
        description="Gerencie os IPs de gerência dos sites."
      />
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button variant="outline">
          <Download className="mr-2" />
          Exportar
        </Button>
        <Button variant="outline">
          <Upload className="mr-2" />
          Importar
        </Button>
        <Button>
          <Plus className="mr-2" />
          Adicionar IP
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de IPs de Gerência</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
                <TableHead>UF</TableHead>
                <TableHead>IP de Gerência</TableHead>
                <TableHead>Data</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {switches.map((sw, index) => {
                const siteInfo = getSiteInfo(sw.siteCode);
                const isHighlighted = ['SDV03', 'BSB01', 'BSB04', 'TGA01', 'FTL01', 'MAN01'].includes(sw.siteCode);
                return (
                  <TableRow key={sw.siteCode + index} className={isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/50' : ''}>
                    <TableCell className="font-medium">{siteInfo?.name || sw.siteCode}</TableCell>
                    <TableCell>{siteInfo?.uf}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">{sw.managementIp}</Badge>
                    </TableCell>
                    <TableCell>{sw.migrationDate || 'Não definida'}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
