
'use client';

import React, { useState, useMemo } from 'react';
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
import { Badge } from '@/components/ui/badge';
import { Download, MoreHorizontal, Plus, Upload, ArrowUpDown } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { User } from '@/lib/types';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, doc, query } from 'firebase/firestore';
import { setDocumentNonBlocking, updateDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { ImportDialog } from '@/components/import-dialog';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

type SortKey = keyof User;

export default function UsersPage() {
  const firestore = useFirestore();
  const { toast } = useToast();
  const usersQuery = useMemoFirebase(() => {
    if (!firestore) return null;
    return query(collection(firestore, 'users'));
  }, [firestore]);
  const { data: users, isLoading } = useCollection<User>(usersQuery);

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isImportDialogOpen, setIsImportDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey | null; direction: 'ascending' | 'descending' }>({ key: 'nome', direction: 'ascending' });

  const sortedUsers = useMemo(() => {
    let sortableUsers = users ? [...users] : [];
    if (sortConfig.key !== null) {
      sortableUsers.sort((a, b) => {
        const aValue = a[sortConfig.key!];
        const bValue = b[sortConfig.key!];
        
        if (aValue === undefined || aValue === null) return 1;
        if (bValue === undefined || bValue === null) return -1;
        
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableUsers;
  }, [users, sortConfig]);

  const requestSort = (key: SortKey) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: SortKey) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="ml-2 h-4 w-4 opacity-0 group-hover:opacity-50" />;
    }
    return sortConfig.direction === 'ascending' ? (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    );
  };


  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!selectedUser || !firestore) return;
    
    const userRef = doc(firestore, 'users', selectedUser.id);
    deleteDocumentNonBlocking(userRef);

    toast({
        title: "Usuário Deletado",
        description: `O usuário ${selectedUser.nome} foi deletado com sucesso.`
    });

    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedUser || !firestore) return;

    const formData = new FormData(event.currentTarget);
    const updatedUser: Partial<User> = {
      nome: formData.get('name') as string,
      email: formData.get('email') as string,
      telefone: formData.get('phone') as string,
      fotoUrl: formData.get('photoUrl') as string,
      cargo: formData.get('cargo') as User['cargo'],
      nivel: formData.get('nivel') as User['nivel'],
      status: formData.get('status') as User['status'],
    };
    
    const userRef = doc(firestore, 'users', selectedUser.id);
    updateDocumentNonBlocking(userRef, updatedUser);

    toast({
      title: 'Usuário Atualizado',
      description: `As informações de ${updatedUser.nome} foram salvas.`,
    });

    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleAddSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!firestore) return;

    const formData = new FormData(event.currentTarget);
    const usersCollection = collection(firestore, 'users');
    
    const newDocRef = doc(usersCollection);

    const newUserPayload: User = {
      id: newDocRef.id,
      nome: formData.get('name') as string,
      email: formData.get('email') as string,
      telefone: formData.get('phone') as string,
      fotoUrl: formData.get('photoUrl') as string,
      cargo: formData.get('cargo') as User['cargo'],
      nivel: formData.get('nivel') as User['nivel'],
      status: formData.get('status') as User['status'],
    };

    setDocumentNonBlocking(newDocRef, newUserPayload, { merge: false });

    toast({
      title: 'Usuário Adicionado',
      description: `${newUserPayload.nome} foi adicionado com sucesso.`,
    });

    setIsAddDialogOpen(false);
  };

  const defaultAvatar = "data:image/png;base64,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";

  return (
    <div>
      <PageHeader
        title="Usuários"
        description="Gerencie contas e permissões de usuários."
      />
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button variant="outline">
          <Download className="mr-2" />
          Exportar
        </Button>
        <Button variant="outline" onClick={() => setIsImportDialogOpen(true)}>
          <Upload className="mr-2" />
          Importar
        </Button>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="mr-2" />
          Adicionar Usuário
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuários</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                    <button onClick={() => requestSort('nome')} className="group flex items-center">
                        Nome {getSortIcon('nome')}
                    </button>
                </TableHead>
                <TableHead>
                    <button onClick={() => requestSort('nivel')} className="group flex items-center">
                        Nível {getSortIcon('nivel')}
                    </button>
                </TableHead>
                <TableHead>
                    <button onClick={() => requestSort('cargo')} className="group flex items-center">
                        Função {getSortIcon('cargo')}
                    </button>
                </TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>
                    <button onClick={() => requestSort('status')} className="group flex items-center">
                        Status {getSortIcon('status')}
                    </button>
                </TableHead>
                <TableHead>
                  <span className="sr-only">Ações</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading && (
                <TableRow>
                    <TableCell colSpan={6} className='text-center text-muted-foreground'>Carregando usuários...</TableCell>
                </TableRow>
              )}
              {!isLoading && sortedUsers.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className='text-center text-muted-foreground'>Nenhum usuário cadastrado.</TableCell>
                </TableRow>
              )}
              {sortedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.fotoUrl || defaultAvatar} alt={user.nome} />
                        <AvatarFallback>
                          {user.nome
                            ?.split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid gap-0.5">
                        <span className="font-medium">{user.nome}</span>
                        <span className="text-xs text-muted-foreground">{user.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{user.nivel}</TableCell>
                  <TableCell>{user.cargo}</TableCell>
                  <TableCell>{user.telefone}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'ativo' ? 'default' : 'destructive'}
                      className={cn('capitalize',
                        user.status === 'ativo'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                      )}>
                      {user.status}
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
                        <DropdownMenuItem onClick={() => handleEditClick(user)}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteClick(user)} className="text-red-600 dark:text-red-500 focus:text-red-600 dark:focus:text-red-500">
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
      
      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Faça alterações no perfil do usuário aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input id="name" name="name" defaultValue={selectedUser.nome} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" defaultValue={selectedUser.email} />
                </div>
              </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" name="phone" type="tel" defaultValue={selectedUser.telefone} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="photoUrl">URL da Foto</Label>
                    <Input id="photoUrl" name="photoUrl" type="url" defaultValue={selectedUser.fotoUrl} placeholder="https://..." />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="role">Função</Label>
                    <Select name="cargo" defaultValue={selectedUser.cargo}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Coordenador">Coordenador</SelectItem>
                        <SelectItem value="Analista">Analista</SelectItem>
                        <SelectItem value="Visualizador">Visualizador</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="nivel">Nível</Label>
                    <Select name="nivel" defaultValue={selectedUser.nivel}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Sênior">Sênior</SelectItem>
                        <SelectItem value="Pleno">Pleno</SelectItem>
                        <SelectItem value="Júnior">Júnior</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select name="status" defaultValue={selectedUser.status}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                    </SelectContent>
                    </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="newPassword">Nova Senha</Label>
                    <Input id="newPassword" name="newPassword" type="password" placeholder="Deixe em branco para não alterar"/>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                    <Input id="confirmPassword" name="confirmPassword" type="password" />
                </div>
              </div>

              <DialogFooter className='pt-4'>
                <Button type="submit">Salvar alterações</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo usuário.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="add-name">Nome</Label>
                    <Input id="add-name" name="name" placeholder="Nome completo" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="add-email">Email</Label>
                    <Input id="add-email" name="email" type="email" placeholder="email@v2mr.com" required />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="add-phone">Telefone</Label>
                    <Input id="add-phone" name="phone" type="tel" placeholder="(00) 00000-0000" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="add-photoUrl">URL da Foto</Label>
                    <Input id="add-photoUrl" name="photoUrl" type="url" placeholder="https://..." />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="add-role">Função</Label>
                    <Select name="cargo" defaultValue="Analista" required>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Administrador">Administrador</SelectItem>
                        <SelectItem value="Coordenador">Coordenador</SelectItem>
                        <SelectItem value="Analista">Analista</SelectItem>
                        <SelectItem value="Visualizador">Visualizador</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="add-nivel">Nível</Label>
                    <Select name="nivel" defaultValue="Júnior" required>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="Sênior">Sênior</SelectItem>
                        <SelectItem value="Pleno">Pleno</SelectItem>
                        <SelectItem value="Júnior">Júnior</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="add-status">Status</Label>
                    <Select name="status" defaultValue="ativo" required>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="inativo">Inativo</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <Label htmlFor="add-password">Senha</Label>
                    <Input id="add-password" name="password" type="password" required />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="add-confirmPassword">Confirmar Senha</Label>
                    <Input id="add-confirmPassword" name="confirmPassword" type="password" required />
                </div>
              </div>
            <DialogFooter className='pt-4'>
               <Button variant="outline" type="button" onClick={() => setIsAddDialogOpen(false)}>Cancelar</Button>
              <Button type="submit">Criar Usuário</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Dialog */}
       <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
                <AlertDialogDescription>
                    Esta ação não pode ser desfeita. Isso irá deletar permanentemente o usuário
                    <span className='font-bold'> {selectedUser?.nome}</span>.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                <AlertDialogAction onClick={handleConfirmDelete} className="bg-destructive hover:bg-destructive/90">Deletar</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>


      <ImportDialog modelName="User" open={isImportDialogOpen} onOpenChange={setIsImportDialogOpen} />
    </div>
  );
}

    

    