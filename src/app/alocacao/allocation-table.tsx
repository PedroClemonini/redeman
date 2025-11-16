
'use client';

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

interface AllocationTableProps {
  alocacao: any;
  analistas: string[];
  nomes: { [key: string]: string };
}

export function AllocationTable({ alocacao, analistas, nomes }: AllocationTableProps) {
  const datas = [
    '17/11/2025',
    '18/11/2025',
    '19/11/2025',
    '20/11/2025',
    '21/11/2025',
    '22/11/2025',
  ];

  const getDayFromDate = (dateString: string) => {
    return dateString.split('/')[0];
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Alocação por Analista – Semana 2</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Analista</TableHead>
              <TableHead>Seg ({getDayFromDate(datas[0])})</TableHead>
              <TableHead>Ter ({getDayFromDate(datas[1])})</TableHead>
              <TableHead>Qua ({getDayFromDate(datas[2])})</TableHead>
              <TableHead>Qui ({getDayFromDate(datas[3])})</TableHead>
              <TableHead>Sex ({getDayFromDate(datas[4])})</TableHead>
              <TableHead>Sáb ({getDayFromDate(datas[5])})</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {analistas.map((usuario) => (
              <TableRow key={usuario}>
                <TableCell className="font-medium">{nomes[usuario]}</TableCell>
                {datas.map((data) => {
                  let cellContent = <span className="italic text-muted-foreground">—</span>;
                  let cellClass = "";

                  if (alocacao[data]) {
                    for (const site in alocacao[data]) {
                      if (alocacao[data][site].includes(usuario)) {
                        const isMigracao = site.includes('MCI');
                        cellClass = isMigracao ? 'bg-green-50 text-green-800 dark:bg-green-900/50 dark:text-green-400' : 'bg-blue-50 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400';
                        cellContent = (
                          <div className='flex flex-col'>
                            <span className="font-semibold">{site}</span>
                            {alocacao[data][site].length > 1 && (
                              <small>({alocacao[data][site].length} analistas)</small>
                            )}
                          </div>
                        );
                        break;
                      }
                    }
                  }
                  return (
                    <TableCell key={data} className={`text-center ${cellClass} rounded-md p-2`}>
                      {cellContent}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
