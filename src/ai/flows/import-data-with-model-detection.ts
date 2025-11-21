'use server';
/**
 * @fileOverview A data import AI agent that identifies the model type of each line from a template and imports the data.
 *
 * - importDataWithModelDetection - A function that handles the data import process.
 * - ImportDataInput - The input type for the importDataWith-ModelDetection function.
 * - ImportDataOutput - The return type for the importDataWithModelDetection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { collection, doc, setDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';

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


const identifyAndSaveTool = ai.defineTool(
    {
      name: 'identifyAndSave',
      description: 'Identifies the model for each record and saves it to Firestore.',
      inputSchema: z.object({
        records: z.array(z.any()),
      }),
      outputSchema: z.string(),
    },
    async ({ records }) => {
        const firestore = useFirestore();
        let userCount = 0;
        let siteCount = 0;
        let switchCount = 0;
        let errors: string[] = [];

        for (const record of records) {
            try {
                if (record.cargo && record.nivel) { // Likely a User
                    const usersCollection = collection(firestore, 'users');
                    const newDocRef = doc(usersCollection, record.id || undefined);
                    await setDoc(newDocRef, { id: newDocRef.id, ...record });
                    userCount++;
                } else if (record.codigo && record.qtd_switches) { // Likely a Site/Agencia
                    const agenciasCollection = collection(firestore, 'agencias');
                    const newDocRef = doc(agenciasCollection, record.id || undefined);
                    await setDoc(newDocRef, { id: newDocRef.id, ...record });
                    siteCount++;
                } else if (record.numero_serie && record.hostname) { // Likely a Switch
                    const switchesCollection = collection(firestore, 'switches');
                    const newDocRef = doc(switchesCollection, record.id || undefined);
                    await setDoc(newDocRef, { id: newDocRef.id, ...record });
                    switchCount++;
                } else {
                   errors.push(`Could not identify model for record: ${JSON.stringify(record)}`);
                }
            } catch (e: any) {
                errors.push(`Error saving record ${JSON.stringify(record)}: ${e.message}`);
            }
        }
        
        let summary = 'Import completed.\n';
        if (userCount > 0) summary += `- ${userCount} user records processed.\n`;
        if (siteCount > 0) summary += `- ${siteCount} site records processed.\n`;
        if (switchCount > 0) summary += `- ${switchCount} switch records processed.\n`;
        if (errors.length > 0) summary += `\nErrors:\n- ${errors.join('\n- ')}`;

        return summary;
    }
);


export async function importDataWithModelDetection(input: ImportDataInput): Promise<ImportDataOutput> {
  return importDataWithModelDetectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'importDataWithModelDetectionPrompt',
  input: {schema: ImportDataInputSchema},
  output: {schema: ImportDataOutputSchema},
  tools: [identifyAndSaveTool],
  prompt: `You are an expert data processing agent.

You will receive a data file as input. The file may contain records for different data models (users, agencies, switches, etc.).
Your task is to:
1.  Parse the file content into a JSON array of records.
2.  Use the 'identifyAndSave' tool to process and save each record to the database.
3.  Provide a summary of the import process based on the tool's output.

Here is the data file content:

{{#if fileDataUri}}
\`\`\`
{{{fileDataUri}}}
\`\`\`
{{/if}}`,
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
