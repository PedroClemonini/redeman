
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, MoreHorizontal, Plus, Search, Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query } from 'firebase/firestore';
import type { Site } from '@/lib/types';
import { ImportDialog } from '@/components/import-dialog';


export default function SitesPage() {
  const firestore = useFirestore();
  const router = useRouter();
  const sitesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);

  const { data: sites, isLoading } = useCollection<Site>(sitesQuery);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  
  return (
    <div>
      <PageHeader
        title="Sites"
        description="Gerencie os dados dos sites do Banco do Brasil."
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar sites..." className="pl-9" />
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
          <Button onClick={() => router.push('/sites/register')}>
            <Plus className="mr-2" />
            Adicionar Site
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Sites</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sigla</TableHead>
                <TableHead>Nome</TableHead>
                <TableHead>SW Dist (nº)</TableHead>
                <TableHead>SW Acesso (nº)</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && <TableRow><TableCell colSpan={5} className='text-center'>Carregando sites...</TableCell></TableRow>}
              {sites && sites.map((site) => (
                <TableRow key={site.id}>
                  <TableCell className="font-medium">{site.codigo}</TableCell>
                  <TableCell>{site.nome}</TableCell>
                  <TableCell>{1}</TableCell>
                  <TableCell>{site.qtd_switches}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <ImportDialog modelName="Site" open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen} />
    </div>
  );
}
