'use client';
import {
  Card,
  CardContent,
  CardDescription,
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
import { Badge } from '@/components/ui/badge';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';
import { Building2, CheckCircle, Clock, Router } from 'lucide-react';
import type { ChartConfig } from '@/components/ui/chart';
import { weeklySchedule, sites } from '@/lib/data';

const chartData = [
  { month: 'January', migrated: 18, pending: 205 },
  { month: 'February', migrated: 30, pending: 193 },
  { month: 'March', migrated: 52, pending: 171 },
  { month: 'April', migrated: 78, pending: 145 },
  { month: 'May', migrated: 90, pending: 133 },
  { month: 'June', migrated: 110, pending: 113 },
];

const chartConfig = {
  migrated: {
    label: 'Migrated',
    color: 'hsl(var(--primary))',
  },
  pending: {
    label: 'Pending',
    color: 'hsl(var(--muted-foreground))',
  },
} satisfies ChartConfig;

export default function Dashboard() {
  const stepColors: { [key: string]: string } = {
    Preparação:
      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400',
    Migração:
      'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400',
    Planejamento:
      'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400',
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sites</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sites.length}</div>
            <p className="text-xs text-muted-foreground">
              All sites in the project scope
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Switches Migrated
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">110</div>
            <p className="text-xs text-muted-foreground">+20 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Migrations
            </CardTitle>
            <Clock className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">113</div>
            <p className="text-xs text-muted-foreground">
              Sites awaiting migration
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Switches in Stock
            </CardTitle>
            <Router className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">542</div>
            <p className="text-xs text-muted-foreground">
              Ready for deployment
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Migration Progress</CardTitle>
            <CardDescription>
              Number of sites migrated per month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-[250px] w-full">
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Bar
                  dataKey="migrated"
                  fill="var(--color-migrated)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Agenda da Semana</CardTitle>
            <CardDescription>
              Programação de migrações para a semana.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Site</TableHead>
                  <TableHead>Etapa</TableHead>
                  <TableHead>Analista V2MR</TableHead>
                  <TableHead>Técnico Zoomtech</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {weeklySchedule.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="font-medium">{item.site}</div>
                      <div className="hidden text-sm text-muted-foreground md:inline">
                        {item.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={stepColors[item.step]}
                      >
                        {item.step}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.v2mrAnalyst}</TableCell>
                    <TableCell>{item.zoomtechTechnician}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
