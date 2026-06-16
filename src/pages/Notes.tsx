import React, { useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import { useAuth } from '../hooks/useAuth';
import { NoteCard } from '../components/NoteCard';
import { NoteEditor } from '../components/NoteEditor';
import { Sidebar } from '../components/Sidebar';
import { Button } from '../components/ui/Button';
import { Note } from '../lib/types';
import { 
  Plus, 
  Search,
  X,
  Sparkles,
  RefreshCcw,
  Menu
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
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

  if (editingNote || isCreating) {
    return (
      <div className="h-screen flex bg-background">
        <div className={`${sidebarCollapsed ? 'w-16' : 'w-56'} shrink-0 hidden md:block`}>
          <Sidebar
            onNewNote={() => setIsCreating(true)}
            collapsed={sidebarCollapsed}
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          />
        </div>
        <div className="flex-1 flex flex-col min-w-0">
          <NoteEditor
            note={editingNote || undefined}
            onSave={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={() => { setEditingNote(null); setIsCreating(false); }}
            onSummarize={handleSummarizeNote}
            isSummarizing={isSummarizing}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-background">
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-56'} shrink-0 hidden md:block`}>
        <Sidebar
          onNewNote={() => setIsCreating(true)}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-56 animate-in">
            <Sidebar onNewNote={() => { setIsCreating(true); setMobileSidebarOpen(false); }} />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center gap-3 px-4 shrink-0 bg-background">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="h-8 w-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex-1 max-w-md">
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Search className="h-4 w-4" />
              </div>
              <input
                type="text"
                placeholder="Search notes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex h-9 w-full rounded-lg border border-input bg-background pl-10 pr-8 py-2 text-sm placeholder:text-muted-foreground/60 transition-colors duration-150 hover:border-foreground/20 focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
          <Button onClick={() => setIsCreating(true)} size="sm">
            <Plus className="h-4 w-4 mr-1.5" />
            <span className="hidden sm:inline">New Note</span>
          </Button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <NoteCardSkeleton key={i} />
              ))}
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center h-full p-8">
              <div className="text-center max-w-sm">
                <div className="h-16 w-16 rounded-2xl bg-destructive-muted flex items-center justify-center mx-auto mb-5">
                  <X className="h-7 w-7 text-destructive" />
                </div>
                <h2 className="text-lg font-semibold mb-2">Failed to load notes</h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {error instanceof Error ? error.message : 'An unexpected error occurred'}
                </p>
                <Button onClick={() => refetch()}>
                  <RefreshCcw className="h-4 w-4 mr-1.5" />
                  Try Again
                </Button>
              </div>
            </div>
          ) : filteredNotes.length === 0 ? (
            searchQuery ? (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center max-w-sm">
                  <div className="h-16 w-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
                    <Search className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">No matching notes</h2>
                  <p className="text-sm text-muted-foreground mb-6">
                    Try a different search term or clear your search.
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery('')}>
                    <X className="h-4 w-4 mr-1.5" />
                    Clear Search
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full p-8">
                <div className="text-center max-w-sm">
                  <div className="h-16 w-16 rounded-2xl bg-primary-muted flex items-center justify-center mx-auto mb-5">
                    <Sparkles className="h-7 w-7 text-primary" />
                  </div>
                  <h2 className="text-lg font-semibold mb-2">Create your first note</h2>
                  <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                    Start capturing your ideas and let AI help you organize them.
                  </p>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-1.5" />
                    Create Note
                  </Button>
                </div>
              </div>
            )
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
              {filteredNotes.map(note => (
                <NoteCard
                  key={note.id}
                  note={note}
                  onEdit={(note) => setEditingNote(note)}
                  onDelete={handleDeleteNote}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function NoteCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 space-y-3 animate-pulse">
      <div className="h-5 w-2/3 bg-muted rounded-md" />
      <div className="h-4 w-full bg-muted rounded-md" />
      <div className="h-4 w-3/4 bg-muted rounded-md" />
      <div className="pt-2 flex items-center justify-between">
        <div className="h-3 w-20 bg-muted rounded-md" />
        <div className="h-8 w-16 bg-muted rounded-md" />
      </div>
    </div>
  );
}