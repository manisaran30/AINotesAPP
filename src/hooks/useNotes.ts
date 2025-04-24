import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchNotes, fetchNote, createNote, updateNote, deleteNote, summarizeNote } from '../lib/api';
import { Note } from '../lib/types';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';

export function useNotes() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  // Get all notes
  const notesQuery = useQuery({
    queryKey: ['notes'],
    queryFn: fetchNotes,
    enabled: !!user,
  });

  // Get a single note
  const useNote = (id: string) => {
    return useQuery({
      queryKey: ['notes', id],
      queryFn: () => fetchNote(id),
      enabled: !!id && !!user,
    });
  };

  // Create a new note
  const createNoteMutation = useMutation({
    mutationFn: (note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) => 
      createNote(note),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully');
    },
    onError: (error) => {
      toast.error(`Failed to create note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  // Update a note
  const updateNoteMutation = useMutation({
    mutationFn: ({ id, ...note }: { id: string } & Partial<Omit<Note, 'id' | 'created_at' | 'updated_at'>>) => 
      updateNote(id, note),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] });
      toast.success('Note updated successfully');
    },
    onError: (error) => {
      toast.error(`Failed to update note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  // Delete a note
  const deleteNoteMutation = useMutation({
    mutationFn: (id: string) => deleteNote(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted successfully');
    },
    onError: (error) => {
      toast.error(`Failed to delete note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  // Summarize note content
  const summarizeNoteMutation = useMutation({
    mutationFn: async ({ id, content }: { id: string, content: string }) => {
      const summary = await summarizeNote(content);
      if (summary) {
        return updateNote(id, { summary });
      }
      throw new Error('Failed to generate summary');
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['notes', data.id] });
      toast.success('Note summarized successfully');
    },
    onError: (error) => {
      toast.error(`Failed to summarize note: ${error instanceof Error ? error.message : 'Unknown error'}`);
    },
  });

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    error: notesQuery.error,
    refetch: notesQuery.refetch,
    useNote,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    summarizeNote: summarizeNoteMutation.mutate,
    isSummarizing: summarizeNoteMutation.isLoading,
  };
}