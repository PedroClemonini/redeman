export type User = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Coordinator' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Inactive';
  avatar: string;
};

export type Agency = {
  code: string;
  name: string;
  city: string;
  state: string;
  switchCount: number;
  migrationDate: string;
  status: 'Completed' | 'In Progress' | 'Pending' | 'Awaiting';
};

export type Switch = {
  serialNumber: string;
  model: string;
  hostname: string;
  agencyCode: string;
  role: 'Access' | 'Distribution' | 'Core';
  status: 'In Stock' | 'Deployed' | 'Faulty' | 'Migrated';
};

export type MigrationFlow = {
  id: string;
  agencyCode: string;
  agencyName: string;
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
