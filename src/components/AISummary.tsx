import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Sparkles } from 'lucide-react';

interface AISummaryProps {
  summary: string | null;
}

export function AISummary({ summary }: AISummaryProps) {
  if (!summary) return null;

  return (
    <Card className="w-full bg-secondary/10">
      <CardHeader className="pb-2">
        <CardTitle className="text-md flex items-center">
          <Sparkles className="h-4 w-4 mr-2 text-primary" />
          AI Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm">{summary}</p>
      </CardContent>
    </Card>
  );
}