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
import { switches } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Download, MoreHorizontal, Plus, Upload } from 'lucide-react';

export default function SwitchesPage() {
  const statusColors = {
    'In Stock': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
    Deployed: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400',
    Migrated: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
    Faulty: 'bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400',
  };
  
  return (
    <div>
      <PageHeader
        title="Switches"
        description="Manage Huawei switch data."
      />
      <div className="mb-4 flex items-center justify-end gap-2">
        <Button variant="outline">
          <Download className="mr-2" />
          Export
        </Button>
        <Button variant="outline">
          <Upload className="mr-2" />
          Import
        </Button>
        <Button>
          <Plus className="mr-2" />
          Add Switch
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Switch Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Serial Number</TableHead>
                <TableHead>Model</TableHead>
                <TableHead>Hostname</TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {switches.map((sw) => (
                <TableRow key={sw.serialNumber}>
                  <TableCell className="font-mono text-xs">{sw.serialNumber}</TableCell>
                  <TableCell>{sw.model}</TableCell>
                  <TableCell>{sw.hostname}</TableCell>
                  <TableCell>{sw.siteCode}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[sw.status]}>
                      {sw.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 dark:text-red-500">
                          Delete
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
    </div>
  );
}
