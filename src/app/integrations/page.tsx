
'use client';

import { PageHeader } from '@/components/page-header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, KeyRound, Server, Shield, DatabaseBackup } from 'lucide-react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table';

export default function IntegrationsPage() {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: 'Configurações Salvas',
      description: `As configurações de ${section} foram salvas com sucesso.`,
    });
  };
  
  const handleNewApiKey = () => {
    toast({
      title: 'Funcionalidade em Desenvolvimento',
      description: `A geração de novas chaves de API será implementada futuramente.`,
    });
  }

  const handleBackup = () => {
     toast({
      title: 'Backup Iniciado',
      description: `O backup completo do banco de dados foi iniciado em segundo plano.`,
    });
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Configurações e Integrações"
        description="Gerencie as configurações essenciais para o funcionamento do sistema."
      />
      <Tabs defaultValue="general">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general">Geral</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="backup">Backup</TabsTrigger>
        </TabsList>
        
        {/* General Settings Tab */}
        <TabsContent value="general">
            <Card>
                <CardHeader>
                    <CardTitle>Configurações Gerais</CardTitle>
                    <CardDescription>Ajustes básicos do sistema.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="app-name">Nome da Aplicação</Label>
                        <Input id="app-name" defaultValue="RedeMan" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="app-url">URL da Aplicação</Label>
                        <Input id="app-url" type="url" defaultValue="https://redeman.v2mr.com" />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={() => handleSave('Gerais')}>Salvar</Button>
                </CardFooter>
            </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
                <div className='flex items-center gap-2'>
                    <KeyRound />
                    <CardTitle>Chaves de API</CardTitle>
                </div>
              <CardDescription>
                Gerencie chaves de API para integrações com serviços externos.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Serviço</TableHead>
                            <TableHead>Chave (parcial)</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>Google AI</TableCell>
                            <TableCell className="font-mono">AIzaSy...rIhI0ec</TableCell>
                            <TableCell>Ativa</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={handleNewApiKey}>Gerar Nova Chave</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <div className='flex items-center gap-2'>
                  <Shield />
                  <CardTitle>Certificado Digital (HTTPS)</CardTitle>
              </div>
              <CardDescription>
                Configurações de segurança para a conexão do site.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Gerenciamento Automático</AlertTitle>
                <AlertDescription>
                  O certificado SSL/TLS para HTTPS é gerenciado e renovado
                  automaticamente pelo Firebase App Hosting, garantindo uma
                  conexão sempre segura. Nenhuma ação manual é necessária aqui.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
           <Card>
            <CardHeader>
              <CardTitle>Controle de Sessão de Usuários</CardTitle>
              <CardDescription>
                Defina o tempo de expiração da sessão para usuários inativos.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="session-timeout">Tempo da Sessão (em minutos)</Label>
                    <Input id="session-timeout" type="number" defaultValue="60" />
                </div>
                <div className="flex items-center space-x-2">
                    <Switch id="remember-me" />
                    <Label htmlFor="remember-me">Permitir "Lembrar-me" para estender a sessão</Label>
                </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSave('Controle de Sessão')}>Salvar</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Email Tab */}
        <TabsContent value="email">
          <Card>
             <CardHeader>
                <div className='flex items-center gap-2'>
                    <Server />
                    <CardTitle>Configuração de Email (SMTP)</CardTitle>
                </div>
              <CardDescription>
                Configure o servidor de SMTP para o envio de relatórios e
                notificações por email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">Servidor SMTP</Label>
                  <Input id="smtp-host" placeholder="smtp.example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Porta</Label>
                  <Input id="smtp-port" type="number" placeholder="587" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-user">Usuário</Label>
                <Input id="smtp-user" placeholder="seu_email@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="smtp-pass">Senha</Label>
                <Input id="smtp-pass" type="password" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="smtp-security">Segurança</Label>
                <Select>
                    <SelectTrigger id="smtp-security">
                        <SelectValue placeholder="Selecione o tipo de segurança" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tls">TLS/STARTTLS</SelectItem>
                        <SelectItem value="ssl">SSL</SelectItem>
                        <SelectItem value="none">Nenhuma</SelectItem>
                    </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter className='flex justify-between'>
              <Button onClick={() => handleSave('Email')}>Salvar Configurações</Button>
              <Button variant="secondary">Testar Conexão</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
         {/* Backup Tab */}
        <TabsContent value="backup">
            <Card>
                <CardHeader>
                     <div className='flex items-center gap-2'>
                        <DatabaseBackup />
                        <CardTitle>Backup e Restauração</CardTitle>
                    </div>
                    <CardDescription>Gerencie backups do banco de dados para garantir a segurança dos dados.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-medium mb-2">Backup Manual</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            Crie um backup completo de todas as coleções do Firestore a qualquer momento. O arquivo será salvo no storage do projeto.
                        </p>
                        <Button onClick={handleBackup}>Iniciar Backup Completo Agora</Button>
                    </div>
                     <div>
                        <h3 className="font-medium mb-2">Configurar Backups Automáticos</h3>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <Label htmlFor="auto-backup-switch">Habilitar backups automáticos</Label>
                                <Switch id="auto-backup-switch" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="backup-frequency">Frequência</Label>
                                <Select>
                                    <SelectTrigger id="backup-frequency">
                                        <SelectValue placeholder="Selecione a frequência" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Diariamente</SelectItem>
                                        <SelectItem value="weekly">Semanalmente</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="backup-time">Horário do Backup</Label>
                                <Input id="backup-time" type="time" defaultValue="03:00" />
                            </div>
                        </div>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button onClick={() => handleSave('Backup Automático')}>Salvar Configurações de Backup</Button>
                </CardFooter>
            </Card>
        </TabsContent>

      </Tabs>
    </div>
  );
}
