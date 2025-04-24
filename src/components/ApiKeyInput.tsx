import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Key } from 'lucide-react';

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
    <div className="bg-card rounded-lg border shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-2 flex items-center">
        <Key className="h-5 w-5 mr-2" />
        AI API Key
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Enter your AI API key to enable summarization features
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
        <div className="relative">
          <input
            type={showApiKey ? "text" : "password"}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="w-full p-2 pr-24 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-primary hover:underline focus:outline-none"
            onClick={() => setShowApiKey(!showApiKey)}
          >
            {showApiKey ? "Hide" : "Show"}
          </button>
        </div>
        <Button type="submit" className="w-full">
          Save API Key
        </Button>
      </form>
    </div>
  );
}