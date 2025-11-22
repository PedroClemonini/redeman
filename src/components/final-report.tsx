
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import type { SiteEntry } from '@/lib/registered-sites';
import { RichTextEditor } from './rich-text-editor';
import { nomes as analistasNomes } from '@/lib/data';
import { DialogClose } from '@radix-ui/react-dialog';

interface FinalReportProps {
  phase: string | null;
  site: SiteEntry | null;
}

const generateUniqueEmail = (fullName: string) => {
  const parts = fullName.toLowerCase().split(' ');
  const firstName = parts[0];
  const lastName = parts.length > 1 ? parts[1].substring(0, 1) : '';
  return `${firstName}${lastName}@v2mr.com`;
};


// Mock de emails, em um app real viria de um backend
const preRegisteredEmails = Object.values(analistasNomes).map(nome => ({
    name: `${nome} (V2MR)`,
    email: generateUniqueEmail(nome)
}));
preRegisteredEmails.push({ name: 'Irlei Rodrigues (ZOOM)', email: 'irlei@zoom.com'});


export function FinalReport({ phase, site }: FinalReportProps) {
  const [reportContent, setReportContent] = useState('');
  const [status, setStatus] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [fieldTechs, setFieldTechs] = useState('');
  const [additionalEmails, setAdditionalEmails] = useState('');
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const { toast } = useToast();

  if (!phase || !site) return null;

  const handleEmailSubmit = () => {
     if (selectedEmails.length === 0 && !additionalEmails.trim()) {
       toast({
            variant: "destructive",
            title: "Nenhum email selecionado",
            description: "Selecione ao menos um destinatário ou adicione um email.",
        });
      return;
    }
    toast({
        title: "Funcionalidade em Desenvolvimento",
        description: "O envio de email ainda não foi implementado.",
    });
    console.log({
        selectedEmails,
        additionalEmails,
        reportContent,
    });
  }

  const handleSave = () => {
       toast({
        title: "Atualização Salva",
        description: "As informações do relatório foram salvas.",
    });
  }

  return (
    <>
      <Card className="border-0 shadow-none">
        <CardContent className="space-y-6 pt-6">
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
             <div>
                <Label htmlFor="report-status">Status (Obrigatório)</Label>
                <Input
                  id="report-status"
                  placeholder="Ex: Concluído, Feito parcialmente..."
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </div>
               <div>
                <Label htmlFor="field-techs">Técnicos em Campo</Label>
                <Input
                  id="field-techs"
                  placeholder="Ex: Márcio, Marcos"
                  value={fieldTechs}
                  onChange={(e) => setFieldTechs(e.target.value)}
                />
              </div>
          </div>
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="start-time">Hora Início</Label>
                <Input id="start-time" type="time" value={startTime} onChange={e => setStartTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="break-time">Intervalo</Label>
                <Input id="break-time" placeholder="Ex: 12h - 13h" value={breakTime} onChange={e => setBreakTime(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="end-time">Hora Término</Label>
                <Input id="end-time" type="time" value={endTime} onChange={e => setEndTime(e.target.value)} />
              </div>
           </div>
          
          <div>
            <Label htmlFor="report-notes">Notas</Label>
            <div className='mt-2'>
              <RichTextEditor
                  content={reportContent}
                  onChange={setReportContent}
                  placeholder="Descreva as atividades, insira checklists e observações aqui..."
              />
            </div>
            <p className="mt-4 text-sm text-muted-foreground text-center">
              Obrigado pela atenção e colaboração na execução desta atividade!
              <br/>
              Para atualizações, contate o responsável técnico.
            </p>
          </div>
          
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Enviar Relatório por Email</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <div>
                  <Label htmlFor="pre-registered-emails">Emails Pré-Cadastrados:</Label>
                  <select
                    id="pre-registered-emails"
                    multiple
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm h-32 border p-2 bg-background"
                    value={selectedEmails}
                    onChange={(e) => setSelectedEmails(Array.from(e.target.selectedOptions, option => option.value))}
                  >
                    {preRegisteredEmails.map(person => (
                      <option key={person.email} value={person.email}>{person.name}</option>
                    ))}
                  </select>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Segure Ctrl (ou Cmd no Mac) para selecionar múltiplos.
                  </p>
               </div>
               <div>
                 <Label htmlFor="additional-emails">Adicionar Email na Hora (separados por vírgula):</Label>
                  <Input
                    id="additional-emails"
                    placeholder="ex: novo@email.com, outro@email.com"
                    value={additionalEmails}
                    onChange={(e) => setAdditionalEmails(e.target.value)}
                  />
               </div>
               <Button onClick={handleEmailSubmit} className="w-full">
                 Enviar por Email
               </Button>
            </CardContent>
          </Card>

        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            <DialogClose asChild>
                <Button variant="secondary">Fechar</Button>
            </DialogClose>
            <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">Salvar Atualização</Button>
        </CardFooter>
      </Card>
    </>
  );
}
