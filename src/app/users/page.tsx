
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

  const defaultAvatar = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACfUlEQVRYR+2Wz0sUYRzHP3/vjM6yK05CSguR4qEQFvQDpWlI8dDDR/8DCSk8dGgoiIeKPAQRRARRKLQgHlJKS0lJkV5CehQpXWdmdt5jZ3ZnZtf5bO/B8z7v8z7P+/N93x8eRjCg/g9I9YcK/M8PyH59+o8/xZcWnxxr5dC8qjGqZXyVquWk+k6aB6T6YFz5JflX2l+svxReeYQJ4d0J3YfHj6D+fPCu+bQnOqD2jc1YnhYcv6nUvHsm70U/D5+lK4a6Ak0y3YUd7s+K9fQ6w4Y0D51y//9Cg/PmjgWqI4fXFjYv352y310TKVx/LBCW5/c54s53n88s8iP8/Vd3hNaD/pAFpyAyuMvLCPdDtkfAEsD2o/hL8dM/X2/i70eX+3+nJqJGBGgA3gSgKuyz2A/x4c449t5Uv36d2c49uXyB/b2/i8NnEV3m/X6o/fX/Hl3fL1H+g/v28eF6uA1wD9x2/w4I5j3/cZfXz+vP/u7C+/X9zs/L1Ifv3E/v6iYgGAAiYAdgT4AYB/BsBfAHgA4P/GgO9sB7gBwFbgaq/uFih8P8S8L8T793w8UDD/Z4Bqj8P/0/o/fL14gO8BwB/xMgA/AkBvAQSAM4qU+aEEeP5WwO0mAPo0AJ/j/ZcD6v2AK4DdBOAIAE8Clks2n893LgKYA1bA+78w4IsA7ADwFwBuFqh+fQE3gNcA3BGAo/Fm3b08fzrwGgAHAJzH0K8D2J8BvAVgAHA3gC8DGFeA7z8B+BTA93vVb+IAfA/gFwB3gAcA3wK4uQLvPwB4B+DuBqj+/QE3gGcAvgTwL4C/A/g3gOcA/gxwG/BrgK4G6LcDvAD4MMD/pwB/Ange4NcAnwI4BPi3D+BvAf4O4EcAZwI453L6+wBGAIAfAngfwK8B/A3gpwD+CfAnAOcD3AVwL8BXARwG8K8D/gZwF8A7D9D3AK4BfAfgiwD+CuBfB+wD/A1gFsC/DPgjwD8AfAPwOQAPAjgD4DcAdx0g7wDcA3gEYBmA8QC2AnAPgC0AmwC2AbgE4A7AJgCPAbgI4GkAxwM4DeDRkEwBcB/gDIBfAmARgC0AjwG4EOBGAI8C2AvgRQAPAq8CuBvAswDuAtgG4GkARwI4BfBPgN8C+AvAhwC+DPAYwK8BvAq8CuAtAOcDfA7gSgBvAwgA/3k0j03gYgH2y//9kXwA2wAfAQgAfgP4Yw/AX//iB3i+AcCqgL/B/4n/A20fAbT5hYF2AAAAAElFTkSuQmCC";

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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogDescription>
              Faça alterações no perfil do usuário aqui. Clique em salvar quando terminar.
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <form onSubmit={handleEditSubmit} className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome</Label>
                <Input id="name" name="name" defaultValue={selectedUser.nome} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" defaultValue={selectedUser.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" name="phone" type="tel" defaultValue={selectedUser.telefone} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="photoUrl">URL da Foto</Label>
                <Input id="photoUrl" name="photoUrl" type="url" defaultValue={selectedUser.fotoUrl} placeholder="https://..." />
              </div>
              <div className="grid grid-cols-2 gap-4">
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
              <div className="grid grid-cols-2 gap-4">
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
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Usuário</DialogTitle>
            <DialogDescription>
              Preencha os dados para criar um novo usuário.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit} className="grid gap-4 py-4">
             <div className="space-y-2">
              <Label htmlFor="add-name">Nome</Label>
              <Input id="add-name" name="name" placeholder="Nome completo" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="add-email">Email</Label>
              <Input id="add-email" name="email" type="email" placeholder="email@v2mr.com" required />
            </div>
             <div className="space-y-2">
              <Label htmlFor="add-phone">Telefone</Label>
              <Input id="add-phone" name="phone" type="tel" placeholder="(00) 00000-0000" />
            </div>
             <div className="space-y-2">
                <Label htmlFor="add-photoUrl">URL da Foto</Label>
                <Input id="add-photoUrl" name="photoUrl" type="url" placeholder="https://..." />
              </div>
            <div className="grid grid-cols-2 gap-4">
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
             <div className="grid grid-cols-2 gap-4">
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

    