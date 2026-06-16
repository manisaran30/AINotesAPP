import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Key, Eye, EyeOff } from 'lucide-react';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
  currentApiKey?: string;
}

export function ApiKeyInput({ onSubmit, currentApiKey }: ApiKeyInputProps) {
  const [apiKey, setApiKey] = useState(currentApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      onSubmit(apiKey.trim());
    }
  };

  return (
    <div className="rounded-xl border bg-card p-5">
      <h3 className="font-semibold mb-2 flex items-center gap-2">
        <Key className="h-4 w-4 text-primary" />
        AI API Key
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your AI API key to enable summarization features
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 pr-10 text-sm placeholder:text-muted-foreground/60 transition-colors duration-150 hover:border-foreground/20 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
      </form>
    </div>
  );
}