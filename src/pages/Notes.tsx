import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { Note } from '../lib/types';
import { 
  PlusCircle, 
  RefreshCcw, 
  X, 
  Sparkles,
  Search 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function Notes() {
  const { user } = useAuth();
  const { 
    notes, 
    isLoading, 
    isError, 
    error, 
    refetch, 
    createNote, 
    updateNote, 
    deleteNote,
    summarizeNote,
    isSummarizing 
  } = useNotes();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (!user) {
    navigate('/');
    return null;
  }

  const handleCreateNote = (note: Partial<Note>) => {
    if (user) {
      createNote({
        title: note.title || '',
        content: note.content || '',
        summary: null,
        user_id: user.id,
      });
    }
    setIsCreating(false);
  };

  const handleUpdateNote = (note: Partial<Note>) => {
    if (note.id) {
      updateNote({
        id: note.id,
        title: note.title,
        content: note.content
      });
    }
    setEditingNote(null);
  };

  const handleDeleteNote = (id: string) => {
    if (confirm('Are you sure you want to delete this note?')) {
      deleteNote(id);
      if (editingNote?.id === id) {
        setEditingNote(null);
      }
    }
  };

  const handleSummarizeNote = (note: Partial<Note>) => {
    if (note.id && note.content) {
      summarizeNote({
        id: note.id,
        content: note.content
      });
    }
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your notes...</p>
          </div>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="text-center p-6 bg-destructive/10 rounded-lg">
            <p className="text-destructive mb-4">Error loading notes</p>
            <p className="text-sm text-muted-foreground mb-4">
              {error instanceof Error ? error.message : 'Unknown error occurred'}
            </p>
            <Button onClick={() => refetch()} className="flex items-center gap-1">
              <RefreshCcw className="h-4 w-4" />
              <span>Try Again</span>
            </Button>
          </div>
        </div>
      );
    }

    if (editingNote) {
      return (
        <div className="max-w-3xl mx-auto p-4">
          <NoteEditor 
            note={editingNote} 
            onSave={handleUpdateNote} 
            onCancel={() => setEditingNote(null)}
            onSummarize={handleSummarizeNote}
            isSummarizing={isSummarizing}
          />
        </div>
      );
    }

    if (isCreating) {
      return (
        <div className="max-w-3xl mx-auto p-4">
          <NoteEditor 
            onSave={handleCreateNote} 
            onCancel={() => setIsCreating(false)} 
          />
        </div>
      );
    }

    if (filteredNotes.length === 0) {
      if (searchQuery) {
        return (
          <div className="flex flex-col items-center justify-center h-64">
            <Search className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold">No matching notes found</h3>
            <p className="text-muted-foreground">
              Try a different search term or clear your search
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => setSearchQuery('')}
            >
              Clear Search
            </Button>
          </div>
        );
      }
      
      return (
        <div className="flex flex-col items-center justify-center h-64">
          <NotesEmptyState onCreateNote={() => setIsCreating(true)} />
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {filteredNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={(note) => setEditingNote(note)}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <div className="w-full md:w-64 flex-shrink-0 md:h-screen">
        <Sidebar onNewNote={() => setIsCreating(true)} />
      </div>
      
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="p-4 border-b flex justify-between items-center bg-background sticky top-0 z-10">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-md bg-muted focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          
          <div className="ml-4 flex items-center">
            {!isCreating && !editingNote && (
              <Button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-1"
              >
                <PlusCircle className="h-4 w-4" />
                <span className="hidden sm:inline">New Note</span>
              </Button>
            )}
          </div>
        </header>
        
        <main className="flex-1 overflow-auto bg-background">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

function NotesEmptyState({ onCreateNote }: { onCreateNote: () => void }) {
  return (
    <div className="text-center p-6 max-w-md mx-auto">
      <div className="bg-primary/10 p-6 rounded-full inline-flex items-center justify-center mb-6">
        <Sparkles className="h-10 w-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2">Create your first note</h3>
      <p className="text-muted-foreground mb-6">
        Start capturing your ideas and let AI help you organize them
      </p>
      <Button onClick={onCreateNote} className="flex items-center gap-1 mx-auto">
        <PlusCircle className="h-4 w-4" />
        <span>Create Note</span>
      </Button>
    </div>
  );
}