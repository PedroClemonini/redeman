
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ProjectInfoFormProps {
  phase: string;
}

export function ProjectInfoForm({ phase }: ProjectInfoFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações do Projeto ({phase})</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="site-id">ID do Site</Label>
              <Input id="site-id" placeholder="Ex: ARN01" />
            </div>
            <div>
              <Label htmlFor="rfc">Número da RFC</Label>
              <Input id="rfc" placeholder="Ex: 123456" />
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
