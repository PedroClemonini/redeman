'use server';

/**
 * @fileOverview A data import AI agent that identifies the model type of each line from a template and imports the data.
 *
 * - importDataWithModelDetection - A function that handles the data import process.
 * - ImportDataInput - The input type for the importDataWithModelDetection function.
 * - ImportDataOutput - The return type for the importDataWithModelDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ImportDataInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      'The data file as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' + 
      'The file should contain data in CSV or JSON format.'
    ),
});
export type ImportDataInput = z.infer<typeof ImportDataInputSchema>;

const ImportDataOutputSchema = z.object({
  importSummary: z.string().describe('A summary of the data import process, including the number of records processed for each model type and any errors encountered.'),
});
export type ImportDataOutput = z.infer<typeof ImportDataOutputSchema>;

export async function importDataWithModelDetection(input: ImportDataInput): Promise<ImportDataOutput> {
  return importDataWithModelDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importDataWithModelDetectionPrompt',
  input: {schema: ImportDataInputSchema},
  output: {schema: ImportDataOutputSchema},
  prompt: `You are an expert data processing agent.

You will receive a data file as input. The file may contain records for different data models (users, agencies, switches, etc.).
Your task is to:
1.  Identify the model type for each line in the file.
2.  Provide a summary of how many records have been processed per model.

Here is the data file:

{{fileDataUri}}`,
});

const importDataWithModelDetectionFlow = ai.defineFlow(
  {
    name: 'importDataWithModelDetectionFlow',
    inputSchema: ImportDataInputSchema,
    outputSchema: ImportDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
