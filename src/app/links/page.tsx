
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
import { importantLinks } from '@/lib/links-data';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function ImportantLinksPage() {
  return (
    <div>
      <PageHeader
        title="Links Importantes"
        description="Acesso rápido a arquivos e recursos essenciais do projeto."
      />
      <div className="text-sm text-muted-foreground mb-6">
        <span className="font-semibold text-orange-600 dark:text-orange-400">
          Atenção:
        </span>{' '}
        O acesso aos links do SharePoint requer que você esteja logado na conta
        correta.
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {importantLinks.map((link) => (
          <Card key={link.title} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">{link.title}</CardTitle>
              <CardDescription>{link.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild>
                <Link href={link.url} target="_blank">
                  <ExternalLink className="mr-2" />
                  Clique Aqui
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
