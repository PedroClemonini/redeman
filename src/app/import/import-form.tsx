'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal, UploadCloud, Loader2, CheckCircle } from 'lucide-react';
import {
  importDataWithModelDetection,
  type ImportDataOutput,
} from '@/ai/flows/import-data-with-model-detection';
import { useToast } from '@/hooks/use-toast';

export function ImportForm() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ImportDataOutput | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      setResult(null); // Reset result when a new file is chosen
    }
  };

  const readFileAsDataURI = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      toast({
        variant: 'destructive',
        title: 'No file selected',
        description: 'Please select a file to import.',
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const fileDataUri = await readFileAsDataURI(file);
      const output = await importDataWithModelDetection({ fileDataUri });
      setResult(output);
      toast({
        title: 'Import Processed',
        description: 'The AI has analyzed your file.',
      });
    } catch (error) {
      console.error('Import failed:', error);
      toast({
        variant: 'destructive',
        title: 'Import Failed',
        description:
          'An error occurred while processing your file. Check the console for details.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Upload File</CardTitle>
            <CardDescription>
              Drag and drop your file or click to browse.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center w-full">
              <Label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    CSV or JSON files
                  </p>
                  {file && (
                    <p className="mt-4 text-sm font-medium text-foreground">
                      Selected file: {file.name}
                    </p>
                  )}
                </div>
                <Input
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".csv,.json"
                />
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="replace-duplicates" />
              <Label htmlFor="replace-duplicates">
                Replace records with matching identifiers
              </Label>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={loading || !file}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? 'Processing...' : 'Import'}
            </Button>
          </CardFooter>
        </Card>
      </form>

      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="text-green-500" />
              Import Summary
            </CardTitle>
            <CardDescription>
              The AI has analyzed your file and here is the summary.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>AI Analysis</AlertTitle>
              <AlertDescription className="whitespace-pre-wrap font-mono text-sm">
                {result.importSummary}
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      )}
    </>
  );
}
