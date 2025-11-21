
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, query } from 'firebase/firestore';
import type { Site, Switch } from '@/lib/types';
import { Download, Plus, Upload, MoreHorizontal, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ImportDialog } from '@/components/import-dialog';
import { Input } from '@/components/ui/input';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';


export default function SwitchesPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  
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
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedSwitch, setSelectedSwitch] = useState<Switch | null>(null);

  const getSiteInfo = (agenciaId: string) => {
    if (!agencias) return { nome: 'Carregando...', estado: '...' };
    const agencia = agencias.find(a => a.id === agenciaId);
    return agencia ? { nome: agencia.nome, estado: agencia.estado } : { nome: 'Não encontrado', estado: 'N/A' };
  };

  const handleDeleteClick = (sw: Switch) => {
    setSelectedSwitch(sw);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedSwitch || !firestore) return;
    
    const switchRef = doc(firestore, 'switches', selectedSwitch.id);
    deleteDocumentNonBlocking(switchRef);

    toast({
        title: "Switch Deletado",
        description: `O switch ${selectedSwitch.hostname} foi deletado com sucesso.`
    });

    setIsDeleteDialogOpen(false);
    setSelectedSwitch(null);
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
            <Button disabled>
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
                      <TableCell colSpan={5} className="text-center text-muted-foreground">
                          Carregando switches...
                      </TableCell>
                  </TableRow>
              )}
              {!isLoadingSwitches && switches?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={5} className='text-center text-muted-foreground'>Nenhum switch cadastrado.</TableCell>
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
                            <DropdownMenuItem disabled>Editar</DropdownMenuItem>
                            <DropdownMenuItem disabled>Ver Detalhes</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDeleteClick(sw)} className="text-red-600 dark:text-red-500 focus:text-red-600 dark:focus:text-red-500">
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

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso irá deletar permanentemente o switch
                    <span className='font-bold'> {selectedSwitch?.hostname}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">Deletar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
