import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/Button';
import { Note } from '../lib/types';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { AISummary } from './AISummary';

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
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  const hasUnsavedChanges = title !== (note?.title || '') || content !== (note?.content || '');

  const handleSubmit = useCallback(() => {
    if (!title.trim() || !content.trim()) return;

    onSave({
      ...(note || {}),
      title: title.trim(),
      content: content.trim(),
    });

    if (!isEditing) {
      setTitle('');
      setContent('');
    }
  }, [title, content, note, onSave, isEditing]);

  const handleCancel = useCallback(() => {
    if (hasUnsavedChanges) {
      const discard = window.confirm('You have unsaved changes. Discard them?');
      if (!discard) return;
    }
    onCancel();
  }, [hasUnsavedChanges, onCancel]);

  const handleSummarize = useCallback(() => {
    if (onSummarize && content.trim().length > 50) {
      onSummarize({
        ...(note || {}),
        id: note?.id,
        content,
      });
    }
  }, [onSummarize, content, note]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  }, [handleSubmit]);

  return (
    <div className="h-full flex flex-col animate-in">
      <div className="flex items-center gap-3 px-6 h-14 border-b border-border shrink-0">
        <button
          onClick={handleCancel}
          className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {isEditing && onSummarize && (
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleSummarize}
              disabled={isSummarizing || content.length < 50}
            >
              <Sparkles className="h-3.5 w-3.5 mr-1.5" />
              {isSummarizing ? 'Summarizing...' : 'Summarize'}
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            onClick={handleSubmit}
            disabled={!title.trim() || !content.trim()}
          >
            {isEditing ? 'Save' : 'Create'}
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          <input
            ref={titleRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
            className="w-full bg-transparent text-3xl font-semibold tracking-tight placeholder:text-muted-foreground/30 focus:outline-none"
            onKeyDown={handleKeyDown}
          />

          <textarea
            ref={contentRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
            className="w-full min-h-[300px] rounded-xl border border-input bg-background px-5 py-4 text-sm transition-colors duration-150 placeholder:text-muted-foreground/60 hover:border-foreground/20 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20 resize-none"
            onKeyDown={handleKeyDown}
          />

          {note?.summary && (
            <div className="pt-4 border-t border-border">
              <AISummary summary={note.summary} isLoading={isSummarizing} />
            </div>
          )}

          {isSummarizing && (
            <div className="pt-4 border-t border-border">
              <AISummary summary={null} isLoading={true} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}