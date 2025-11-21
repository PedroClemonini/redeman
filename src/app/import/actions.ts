'use server';

import {
  importDataWithModelDetectionFlow,
  type ImportDataInput,
} from '@/ai/flows/import-data-with-model-detection';

// This function is now the server action that Next.js will call.
export async function handleImport(input: ImportDataInput) {
  try {
    const result = await importDataWithModelDetectionFlow(input);
    return result;
  } catch (e: any) {
    console.error('Flow execution failed', e);
    // Return a structured error to the client
    return {
      importSummary: `An error occurred during the import process: ${e.message || 'Unknown error'}`,
      error: true,
    };
  }
}
