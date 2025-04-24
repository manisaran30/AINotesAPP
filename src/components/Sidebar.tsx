import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { 
  LogOut, 
  NotebookPen, 
  PlusCircle, 
  Settings, 
  Home 
} from 'lucide-react';

interface SidebarProps {
  onNewNote: () => void;
}

export function Sidebar({ onNewNote }: SidebarProps) {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full h-full flex flex-col bg-card border-r">
      <div className="p-4 flex items-center justify-center border-b">
        <NotebookPen className="w-6 h-6 text-primary mr-2" />
        <h1 className="text-xl font-bold">AI Notes</h1>
      </div>
      
      <div className="flex-1 overflow-auto p-4">
        <nav className="space-y-2">
          <Button
            variant={location.pathname === '/' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigate('/')}
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          
          <Button
            variant={location.pathname === '/notes' ? 'default' : 'ghost'}
            className="w-full justify-start"
            onClick={() => navigate('/notes')}
          >
            <NotebookPen className="mr-2 h-4 w-4" />
            Notes
          </Button>
          
          <Button
            variant="outline"
            className="w-full justify-start mt-6"
            onClick={onNewNote}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Note
          </Button>
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex flex-col gap-2">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => navigate('/settings')}
          >
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
          
          <Button
            variant="ghost"
            className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => signOut()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
}