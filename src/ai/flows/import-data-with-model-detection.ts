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
import { initializeFirebase } from '@/firebase';

const ImportDataInputSchema = z.object({
  fileDataUri: z
    .string()
    .describe(
      'The data file as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'. ' + 
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
        const { firestore } = initializeFirebase();
        let userCount = 0;
        let siteCount = 0;
        let switchCount = 0;
        let errors: string[] = [];

        for (const record of records) {
            try {
                // Ensure the record is a plain object
                const recordData = JSON.parse(JSON.stringify(record));
                const recordId = recordData.id || doc(collection(firestore, 'temporary')).id; // Generate ID if missing
                delete recordData.id;


                if (recordData.cargo && recordData.nivel) { // Likely a User
                    const usersCollection = collection(firestore, 'users');
                    const newDocRef = doc(usersCollection, recordId);
                    await setDoc(newDocRef, { id: newDocRef.id, ...recordData });
                    userCount++;
                } else if (recordData.codigo && recordData.qtd_switches) { // Likely a Site/Agencia
                    const agenciasCollection = collection(firestore, 'agencias');
                    const newDocRef = doc(agenciasCollection, recordId);
                    await setDoc(newDocRef, { id: newDocRef.id, ...recordData });
                    siteCount++;
                } else if (recordData.numero_serie && recordData.hostname) { // Likely a Switch
                    const switchesCollection = collection(firestore, 'switches');
                    const newDocRef = doc(switchesCollection, recordId);
                    await setDoc(newDocRef, { id: newDocRef.id, ...recordData });
                    switchCount++;
                } else {
                   errors.push(`Could not identify model for record: ${JSON.stringify(recordData)}`);
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

const prompt = ai.definePrompt({
  name: 'importDataWithModelDetectionPrompt',
  input: {schema: ImportDataInputSchema},
  output: {schema: ImportDataOutputSchema},
  tools: [identifyAndSaveTool],
  prompt: `You are an expert data processing agent. You will receive a data file as a data URI. Your task is to:
1. Decode the Base64 content of the data URI.
2. Determine if the content is JSON or CSV.
3. Parse the content into a JSON array of records.
4. Use the 'identifyAndSave' tool to process the array of records.
5. Provide a summary of the import process based on the tool's output.

Here is the data file content:

{{#if fileDataUri}}
{{{fileDataUri}}}
{{/if}}`,
});

export const importDataWithModelDetectionFlow = ai.defineFlow(
  {
    name: 'importDataWithModelDetectionFlow',
    inputSchema: ImportDataInputSchema,
    outputSchema: ImportDataOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('AI failed to process the import.');
    }
    return { importSummary: output.importSummary };
  }
);
