import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface AISummaryProps {
  summary: string | null;
  isLoading?: boolean;
}

export function AISummary({ summary, isLoading }: AISummaryProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-primary/20 bg-primary-muted/50 p-4 animate-in">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-5 w-5 rounded-md bg-primary/15 flex items-center justify-center">
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
          <span className="text-xs font-medium text-primary">AI Summary</span>
          <div className="flex items-center gap-1 ml-1">
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="typing-dot h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="h-3 rounded-full bg-primary/10 w-full" />
          <div className="h-3 rounded-full bg-primary/10 w-3/4" />
          <div className="h-3 rounded-full bg-primary/10 w-1/2" />
        </div>
      </div>
    );
  }

  if (!summary) return null;

  return (
    <div className="rounded-xl border border-primary/20 bg-primary-muted/30 p-4 animate-in">
      <div className="flex items-center gap-2 mb-2">
        <div className="h-5 w-5 rounded-md bg-primary/15 flex items-center justify-center">
          <Sparkles className="h-3 w-3 text-primary" />
        </div>
        <span className="text-xs font-medium text-primary">AI Summary</span>
      </div>
      <p className="text-sm text-foreground/80 leading-relaxed">{summary}</p>
    </div>
  );
}