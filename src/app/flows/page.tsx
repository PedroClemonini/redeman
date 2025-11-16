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
import { migrationFlows } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Download, MoreHorizontal, Plus, Upload } from 'lucide-react';

export default function MigrationFlowsPage() {
    const statusColors: { [key: string]: string } = {
        'Planning': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400',
        'Site Survey': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400',
        'Configuration': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-400',
        'Deployment': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
        'Validation': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400',
        'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
    };

  return (
    <div>
      <PageHeader
        title="Migration Flows"
        description="Track and manage migration workflows for each agency."
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
          New Flow
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Flows</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Agency</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Assigned Analyst</TableHead>
                <TableHead>Last Update</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {migrationFlows.map((flow) => (
                <TableRow key={flow.id}>
                  <TableCell>
                    <div className="font-medium">{flow.agencyName}</div>
                    <div className="text-sm text-muted-foreground">{flow.agencyCode}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[flow.status]}>
                      {flow.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{flow.assignedAnalyst}</TableCell>
                  <TableCell>{flow.lastUpdate}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Assign Analyst</DropdownMenuItem>
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
