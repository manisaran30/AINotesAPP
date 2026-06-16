import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/Button';
import { useAuth } from '../hooks/useAuth';
import { 
  LogOut, 
  Plus, 
  FileText, 
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface SidebarProps {
  onNewNote: () => void;
  collapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({ onNewNote, collapsed = false, onToggle }: SidebarProps) {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={`h-full flex flex-col bg-card border-r border-border transition-all duration-200 ${collapsed ? 'w-16' : 'w-56'}`}>
      <div className={`flex items-center h-14 border-b border-border ${collapsed ? 'justify-center px-0' : 'px-5'}`}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
            <Sparkles className="h-4 w-4 text-primary-foreground" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-base tracking-tight truncate">AI Notes</span>
          )}
        </div>
        {onToggle && (
          <button
            onClick={onToggle}
            className={`h-7 w-7 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ${collapsed ? '' : 'ml-auto'}`}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        )}
      </div>

      <nav className="flex-1 p-3 space-y-1">
        <NavItem
          icon={<FileText className="h-4 w-4" />}
          label="Notes"
          active={location.pathname === '/notes'}
          collapsed={collapsed}
          onClick={() => navigate('/notes')}
        />

        <div className="pt-4">
          <Button
            variant="default"
            size={collapsed ? 'icon' : 'default'}
            className={`w-full ${collapsed ? '' : 'justify-start gap-2'}`}
            onClick={onNewNote}
          >
            <Plus className="h-4 w-4" />
            {!collapsed && <span>New Note</span>}
          </Button>
        </div>
      </nav>

      <div className={`border-t border-border ${collapsed ? 'p-2' : 'p-3'}`}>
        <div className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3 px-2'} mb-2`}>
          <div className="h-7 w-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <span className="text-xs font-medium text-primary">
              {user?.email?.charAt(0).toUpperCase() || '?'}
            </span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">{user?.email || 'User'}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'sm'}
          className={`w-full ${collapsed ? '' : 'justify-start gap-2'} text-muted-foreground hover:text-destructive`}
          onClick={() => signOut()}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span className="text-xs">Sign out</span>}
        </Button>
      </div>
    </div>
  );
}

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
  onClick: () => void;
  badge?: string | number;
}

function NavItem({ icon, label, active, collapsed, onClick, badge }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 ${
        collapsed ? 'justify-center px-2' : ''
      } ${
        active
          ? 'bg-primary/10 text-primary font-medium'
          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
      }`}
    >
      <span className="shrink-0">{icon}</span>
      {!collapsed && (
        <>
          <span className="flex-1 text-left truncate">{label}</span>
          {badge && (
            <span className="text-xs bg-muted px-1.5 py-0.5 rounded-full">{badge}</span>
          )}
        </>
      )}
    </button>
  );
}