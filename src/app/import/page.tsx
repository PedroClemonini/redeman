import { PageHeader } from '@/components/page-header';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileJson, FileText } from 'lucide-react';
import { ImportForm } from './import-form';

const templates = [
  {
    name: 'Users',
    description: 'Template para dados de analistas.',
    model: 'users',
  },
  {
    name: 'Sites',
    description: 'Template para dados de sites do BB.',
    model: 'sites',
  },
  {
    name: 'Switches',
    description: 'Template para inventário de switches.',
    model: 'switches',
  },
];

export default function ImportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Importar / Exportar"
        description="Gerencie seus dados em massa usando arquivos CSV ou JSON."
      />

      <section>
        <h2 className="mb-4 font-headline text-2xl font-semibold">
          1. Baixar um Modelo
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <Card key={template.model}>
              <CardHeader>
                <CardTitle>{template.name}</CardTitle>
                <CardDescription>{template.description}</CardDescription>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Button variant="outline" size="sm">
                  <FileText className="mr-2" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  <FileJson className="mr-2" />
                  JSON
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 font-headline text-2xl font-semibold">
          2. Importar Dados (com Detecção de IA)
        </h2>
        <ImportForm />
      </section>
    </div>
  );
}
