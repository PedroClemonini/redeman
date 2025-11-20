
'use client';
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


export default function SitesPage() {
  const firestore = useFirestore();
  const sitesQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'agencias'));
  }, [firestore]);

  const { data: sites, isLoading } = useCollection<Site>(sitesQuery);
  
  return (
    <div>
      <PageHeader
        title="Sites"
        description="Manage Banco do Brasil site data."
      />

      <div className="mb-4 flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search sites..." className="pl-9" />
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <Button variant="outline">
            <Download className="mr-2" />
            Export
          </Button>
          <Button variant="outline">
            <Upload className="mr-2" />
            Import
          </Button>
          <Button>
            <Plus className="mr-2" />
            Add Site
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Site List</CardTitle>
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
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-500">
                          Delete
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
    </div>
  );
}
