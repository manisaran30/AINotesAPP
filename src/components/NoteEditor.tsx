import React, { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Note } from '../lib/types';
import { X, Save, Sparkles } from 'lucide-react';

interface NoteEditorProps {
  note?: Note;
  onSave: (note: Partial<Note>) => void;
  onCancel: () => void;
  onSummarize?: (note: Partial<Note>) => void;
  isSummarizing?: boolean;
}

export function NoteEditor({ 
  note, 
  onSave, 
  onCancel, 
  onSummarize,
  isSummarizing = false
}: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      return;
    }
    
    onSave({
      ...(note || {}),
      title,
      content,
    });

    if (!isEditing) {
      setTitle('');
      setContent('');
    }
  };

  const handleSummarize = () => {
    if (onSummarize && content.trim().length > 50) {
      onSummarize({
        ...(note || {}),
        id: note?.id,
        content
      });
    }
  };

  return (
    <Card className="w-full">
      <form onSubmit={handleSubmit}>
        <CardHeader className="pb-4">
          <CardTitle className="text-xl flex justify-between items-center">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="w-full bg-transparent border-b border-input px-2 py-1 focus:outline-none focus:border-primary transition-colors"
              required
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note content here..."
            className="w-full h-64 bg-muted/30 rounded-md p-4 focus:outline-none focus:ring-2 focus:ring-primary resize-none transition-all"
            required
          />
          {note?.summary && (
            <div className="mt-4 p-3 bg-secondary/20 rounded-md">
              <p className="text-xs font-medium text-secondary-foreground">AI Summary</p>
              <p className="text-sm">{note.summary}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-4">
          <div className="flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onCancel}
              className="flex items-center gap-1"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button 
              type="submit"
              className="flex items-center gap-1"
            >
              <Save className="h-4 w-4" />
              <span>{isEditing ? 'Update' : 'Save'}</span>
            </Button>
          </div>
          
          {isEditing && onSummarize && (
            <Button
              type="button"
              variant="secondary"
              onClick={handleSummarize}
              disabled={isSummarizing || content.length < 50}
              className="flex items-center gap-1"
            >
              <Sparkles className="h-4 w-4" />
              <span>{isSummarizing ? 'Summarizing...' : 'Summarize'}</span>
            </Button>
          )}
        </CardFooter>
      </form>
    </Card>
  );
}