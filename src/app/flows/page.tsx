
'use client';

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
import { migrationFlows as initialMigrationFlows, sites, users } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Download, MoreHorizontal, Plus, Upload } from 'lucide-react';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { MigrationFlow } from '@/lib/types';

const statusOptions: MigrationFlow['status'][] = [
  'Planning',
  'Site Survey',
  'Configuration',
  'Deployment',
  'Validation',
  'Completed',
];

export default function MigrationFlowsPage() {
  const [migrationFlows, setMigrationFlows] = useState(initialMigrationFlows);
  const [open, setOpen] = useState(false);

  const statusColors: { [key: string]: string } = {
    'Planning': 'bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-400',
    'Site Survey': 'bg-purple-100 text-purple-800 dark:bg-purple-900/50 dark:text-purple-400',
    'Configuration': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-400',
    'Deployment': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
    'Validation': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/50 dark:text-indigo-400',
    'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
  };

  const handleNewFlow = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const siteCode = formData.get('site') as string;
    const assignedAnalyst = formData.get('analyst') as string;
    const status = formData.get('status') as MigrationFlow['status'];

    const site = sites.find((s) => s.code === siteCode);
    if (!site) return;

    const newFlow: MigrationFlow = {
      id: `flow_${Date.now()}`,
      siteCode: site.code,
      siteName: site.name,
      assignedAnalyst,
      status,
      lastUpdate: new Date().toISOString().split('T')[0],
    };

    setMigrationFlows([newFlow, ...migrationFlows]);
    setOpen(false);
  };

  return (
    <div>
      <PageHeader
        title="Migration Flows"
        description="Track and manage migration workflows for each site."
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              New Flow
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Migration Flow</DialogTitle>
              <DialogDescription>
                Select a site and assign an analyst to start a new flow.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleNewFlow} className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="site" className="text-right">
                  Site
                </Label>
                <Select name="site" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a site" />
                  </SelectTrigger>
                  <SelectContent>
                    {sites.map((site) => (
                      <SelectItem key={site.code} value={site.code}>
                        {site.code} - {site.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="analyst" className="text-right">
                  Analyst
                </Label>
                <Select name="analyst" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select an analyst" />
                  </SelectTrigger>
                  <SelectContent>
                    {users
                      .filter((user) => user.role === 'Analyst' || user.role === 'Coordinator')
                      .map((user) => (
                        <SelectItem key={user.id} value={user.name}>
                          {user.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select name="status" defaultValue="Planning" required>
                  <SelectTrigger className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button type="submit">Create Flow</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Active Flows</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Site</TableHead>
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
                    <div className="font-medium">{flow.siteName}</div>
                    <div className="text-sm text-muted-foreground">{flow.siteCode}</div>
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
