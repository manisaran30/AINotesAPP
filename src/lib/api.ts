import { supabase } from './supabase';
import type { Note } from './types';

export async function fetchNotes() {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .order('updated_at', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Note[];
}

export async function fetchNote(id: string) {
  const { data, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Note;
}

export async function createNote(note: Omit<Note, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('notes')
    .insert([note])
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Note;
}

export async function updateNote(id: string, note: Partial<Omit<Note, 'id' | 'created_at' | 'updated_at'>>) {
  const { data, error } = await supabase
    .from('notes')
    .update({
      ...note,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data as Note;
}

export async function deleteNote(id: string) {
  const { error } = await supabase
    .from('notes')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
  
  return true;
}

export async function summarizeNote(content: string) {
  try {
    const apiKey = import.meta.env.VITE_AI_API_KEY;

    if (!apiKey) {
      throw new Error('API key not found. Please set VITE_AI_API_KEY in your environment variables.');
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant that creates concise summaries of text.'
          },
          {
            role: 'user',
            content: `Please summarize the following text concisely: ${content}`
          }
        ],
        temperature: 0.3,
        max_tokens: 150
      })
    });

    // ✅ Response processing starts here
    const contentType = response.headers.get('Content-Type') || '';

    if (!response.ok) {
      // Handle error response
      if (contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error('API Error (JSON):', errorData);
        throw new Error(errorData.error?.message || 'Failed to summarize note');
      } else {
        const errorText = await response.text();
        console.error('API Error (Text):', errorText);
        throw new Error(errorText || 'Failed to summarize note');
      }
    }

    // Handle successful response
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return data.choices[0].message.content || 'Unable to generate summary';
    } else {
      const textResponse = await response.text();
      console.warn('Unexpected response format:', textResponse);
      throw new Error('Received non-JSON response from API');
    }
  } catch (error) {
    console.error('Error summarizing note:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to summarize note');
  }
}
