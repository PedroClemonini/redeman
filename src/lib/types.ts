export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Coordinator' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar: string;
};

export type Site = {
  code: string;
  name: string;
  city: string;
  state: string;
  distSwitchCount: number;
  accessSwitchCount: number;
  migrationDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Awaiting';
};

export type Switch = {
  serialNumber: string;
  model: string;
  hostname: string;
  siteCode: string;
  role: 'Access' | 'Distribution' | 'Core';
  status: 'In Stock' | 'Deployed' | 'Faulty' | 'Migrated';
};

export type MigrationFlow = {
  id: string;
  siteCode: string;
  siteName: string;
  status:
    | 'Planning'
    | 'Site Survey'
    | 'Configuration'
    | 'Deployment'
    | 'Validation'
    | 'Completed';
  assignedAnalyst: string;
  lastUpdate: string;
};
