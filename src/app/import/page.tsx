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
    description: 'Template for analyst data.',
    model: 'users',
  },
  {
    name: 'Agencies',
    description: 'Template for BB agency data.',
    model: 'agencias',
  },
  {
    name: 'Switches',
    description: 'Template for switch inventory.',
    model: 'switches',
  },
];

export default function ImportPage() {
  return (
    <div className="space-y-8">
      <PageHeader
        title="Import / Export"
        description="Bulk manage your data using CSV or JSON files."
      />

      <section>
        <h2 className="mb-4 font-headline text-2xl font-semibold">
          1. Download a Template
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
          2. Import Data
        </h2>
        <ImportForm />
      </section>
    </div>
  );
}
