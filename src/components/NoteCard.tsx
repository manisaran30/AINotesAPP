import React from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/Button';
import { type Note } from '../lib/types';
import { Edit, Trash2, FileDown } from 'lucide-react';
import { truncate } from '../lib/utils';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

export function NoteCard({ note, onEdit, onDelete }: NoteCardProps) {
  return (
    <Card className="h-full flex flex-col transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="line-clamp-1">{note.title}</CardTitle>
        <p className="text-xs text-muted-foreground">
          {format(new Date(note.updated_at), 'MMM d, yyyy')}
        </p>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-2">
          <p className="text-sm line-clamp-3">{truncate(note.content, 150)}</p>
          {note.summary && (
            <div className="mt-4 p-3 bg-secondary/20 rounded-md">
              <p className="text-xs font-medium text-secondary-foreground">AI Summary</p>
              <p className="text-sm">{note.summary}</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => onEdit(note)}
          className="flex items-center gap-1"
        >
          <Edit className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Edit</span>
        </Button>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => onDelete(note.id)}
          className="flex items-center gap-1 text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
          <span className="sr-only sm:not-sr-only sm:ml-1">Delete</span>
        </Button>
      </CardFooter>
    </Card>
  );
}