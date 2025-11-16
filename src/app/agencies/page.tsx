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
import { agencies } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Download, MoreHorizontal, Plus, Upload } from 'lucide-react';

export default function AgenciesPage() {
  const statusColors = {
    Awaiting: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
    Pending: 'bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-400',
    'In Progress': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
  };
  
  return (
    <div>
      <PageHeader
        title="Agencies"
        description="Manage Banco do Brasil agency data."
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
          Add Agency
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Agency List</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Switches</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {agencies.map((agency) => (
                <TableRow key={agency.code}>
                  <TableCell className="font-medium">{agency.code}</TableCell>
                  <TableCell>{agency.name}</TableCell>
                  <TableCell>
                    {agency.city}, {agency.state}
                  </TableCell>
                  <TableCell>{agency.switchCount}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[agency.status]}>
                      {agency.status}
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
