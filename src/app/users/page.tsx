
'use client';

import React, { useState } from 'react';
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
import { Download, MoreHorizontal, Plus, Upload } from 'lucide-react';
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
    
    // Note: Password change logic should be handled separately and securely
    // For this prototype, we are not implementing the actual password update.
    
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

    const newUserPayload = {
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
                <TableHead>Nome</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Função</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Status</TableHead>
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
              {!isLoading && users?.length === 0 && (
                <TableRow>
                    <TableCell colSpan={6} className='text-center text-muted-foreground'>Nenhum usuário cadastrado.</TableCell>
                </TableRow>
              )}
              {users && users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.fotoUrl || `https://i.pravatar.cc/40?u=${user.id}`} alt={user.nome} />
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
                      className={
                        user.status === 'ativo'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400'
                      }>
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
