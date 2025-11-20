'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Terminal,
  UploadCloud,
  Loader2,
  CheckCircle,
  FileJson,
  FileText,
} from 'lucide-react';
import {
  importDataWithModelDetection,
  type ImportDataOutput,
} from '@/ai/flows/import-data-with-model-detection';
import { useToast } from '@/hooks/use-toast';

interface ImportDialogProps {
  modelName: 'User' | 'Site' | 'Switch' | 'SiteMigration';
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const modelTemplates: Record<
  'User' | 'Site' | 'Switch' | 'SiteMigration',
  { name: string; description: string }
> = {
  User: {
    name: 'Users',
    description: 'Template para dados de analistas.',
  },
  Site: {
    name: 'Sites',
    description: 'Template para dados de sites do BB.',
  },
  Switch: {
    name: 'Switches',
    description: 'Template para inventário de switches.',
  },
  SiteMigration: {
    name: 'Migração de Site',
    description: 'Template para importação de dados de migração.',
  },
};

// Dummy data for templates
const userTemplateJson = `[
  {
    "id": "usr_006",
    "nome": "Novo Usuário",
    "email": "novo@v2mr.com",
    "cargo": "Analista",
    "nivel": "Júnior",
    "status": "ativo",
    "telefone": "(11) 98765-4321"
  }
]`;
const siteTemplateJson = `[
  {
    "id": "site_001",
    "codigo": "NVT01",
    "nome": "Novo Site Teste",
    "cidade": "Brasília",
    "estado": "DF",
    "endereco": "SCS Quadra 1",
    "qtd_switches": 5,
    "data_prevista": "2025-12-01T00:00:00.000Z",
    "status": "aguardando"
  }
]`;
const switchTemplateJson = `[
   {
    "id": "sw_001",
    "numero_serie": "HUA12345678",
    "modelo": "CloudEngine S5735-L",
    "hostname": "NVT01-SW01",
    "agenciaId": "site_001",
    "role": "access",
    "status": "estoque",
    "vrp_version": "V200R019C10",
    "pat_version": "SPH001",
    "observacoes": "Switch novo para o site."
  }
]`;

const siteMigrationTemplateJson = `[
  {
    "sigla": "NVT02",
    "descricaoBreve": "Outro Site",
    "localidade": "São Paulo/SP",
    "semana": "Semana 4"
  }
]`;

const templateData: Record<string, { json: string; csv: string }> = {
  User: { json: userTemplateJson, csv: 'id,nome,email,cargo,nivel,status,telefone' },
  Site: { json: siteTemplateJson, csv: 'id,codigo,nome,cidade,estado,endereco,qtd_switches,data_prevista,status' },
  Switch: { json: switchTemplateJson, csv: 'id,numero_serie,modelo,hostname,agenciaId,role,status,vrp_version,pat_version,observacoes' },
  SiteMigration: { json: siteMigrationTemplateJson, csv: 'sigla,descricaoBreve,localidade,semana' },
};


export function ImportDialog({ modelName, open, onOpenChange }: ImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportDataOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null);
    }
  };

  const handleDownload = (format: 'json' | 'csv') => {
    const data = templateData[modelName][format];
    const mimeType = format === 'json' ? 'application/json' : 'text/csv';
    const filename = `${modelName}_template.${format}`;
    
    const blob = new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async () => {
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'Nenhum arquivo selecionado',
        description: 'Por favor, selecione um arquivo para importar.',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const fileDataUri = await readFileAsDataURI(file);
      const output = await importDataWithModelDetection({ fileDataUri });
      setResult(output);
      toast({
        title: 'Importação Processada',
        description: 'A IA analisou seu arquivo.',
      });
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        variant: 'destructive',
        title: 'Falha na Importação',
        description:
          'Ocorreu um erro ao processar seu arquivo. Verifique o console para mais detalhes.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Importar Dados de {modelTemplates[modelName].name}</DialogTitle>
          <DialogDescription>
            Faça o download do modelo, preencha-o e faça o upload do arquivo para importar os dados em massa.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          {/* Download Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">1. Baixar Template</h3>
            <div className="p-4 border rounded-lg flex flex-col items-center gap-4">
              <p className="text-sm text-center text-muted-foreground">
                {modelTemplates[modelName].description}
              </p>
              <div className="flex gap-4">
                <Button variant="outline" onClick={() => handleDownload('csv')}>
                  <FileText className="mr-2" />
                  CSV
                </Button>
                <Button variant="outline" onClick={() => handleDownload('json')}>
                  <FileJson className="mr-2" />
                  JSON
                </Button>
              </div>
            </div>
          </div>
          {/* Upload Section */}
          <div className="space-y-4">
             <h3 className="font-semibold text-lg">2. Fazer Upload</h3>
             <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="dropzone-file-dialog"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-8 h-8 mb-2 text-muted-foreground" />
                  <p className="mb-1 text-sm text-muted-foreground">
                    <span className="font-semibold">Clique para enviar</span>
                  </p>
                  {file && (
                    <p className="mt-2 text-xs font-medium text-foreground">
                      {file.name}
                    </p>
                  )}
                </div>
                <Input
                  id="dropzone-file-dialog"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv,.json"
                />
              </Label>
            </div>
          </div>
        </div>
        
        {result && (
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Resumo da Análise</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap font-mono text-sm max-h-32 overflow-y-auto">
                {result.importSummary}
              </AlertDescription>
            </Alert>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={loading || !file}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Processando...' : `Importar ${modelTemplates[modelName].name}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
