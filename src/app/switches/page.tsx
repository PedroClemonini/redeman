
'use client';
import { useState } from 'react';
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
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Site, Switch } from '@/lib/types';
import { Download, Plus, Upload, MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ImportDialog } from '@/components/import-dialog';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';


export default function SwitchesPage() {
  const firestore = useFirestore();
  
  const switchesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'switches'));
  }, [firestore]);

  const agenciasQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);

  const { data: switches, isLoading: isLoadingSwitches } = useCollection<Switch>(switchesQuery);
  const { data: agencias, isLoading: isLoadingAgencias } = useCollection<Site>(agenciasQuery);

  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);

  const getSiteInfo = (agenciaId: string) => {
    if (!agencias) return { nome: 'Carregando...', estado: '...' };
    const agencia = agencias.find(a => a.id === agenciaId);
    return agencia ? { nome: agencia.nome, estado: agencia.estado } : { nome: 'Não encontrado', estado: 'N/A' };
  };

  return (
    <div>
      <PageHeader
        title="Gerenciamento de Switches"
        description="Gerencie o inventário de switches."
      />
      <div className="mb-4 flex items-center justify-between gap-2">
         <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por hostname, modelo..." className="pl-9" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
            <Button variant="outline">
              <Download className="mr-2" />
              Exportar
            </Button>
            <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
              <Upload className="mr-2" />
              Importar
            </Button>
            <Button>
              <Plus className="mr-2" />
              Adicionar Switch
            </Button>
        </div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Inventário de Switches</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hostname</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Modelo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(isLoadingSwitches || isLoadingAgencias) && (
                  <TableRow>
                      <TableCell colSpan={5} className="text-center">
                          Carregando switches...
                      </TableCell>
                  </TableRow>
              )}
              {switches && switches.map((sw) => {
                const siteInfo = getSiteInfo(sw.id);
                return (
                  <TableRow key={sw.id}>
                    <TableCell className="font-medium">{sw.hostname}</TableCell>
                    <TableCell>{siteInfo.nome}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono">{sw.modelo}</Badge>
                    </TableCell>
                    <TableCell>
                         <Badge variant={sw.status === 'estoque' ? 'default' : 'secondary'}>
                            {sw.status}
                        </Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Abrir menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 dark:text-red-500">
                              Deletar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ImportDialog modelName="Switch" open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen} />
    </div>
  );
}

