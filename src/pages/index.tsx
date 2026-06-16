import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { Sparkles, FileText, Shield, ArrowRight } from 'lucide-react';

export function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-base">AI Notes</span>
          </div>
          <div>
            {user ? (
              <Button onClick={() => navigate('/notes')} size="sm">
                Go to Notes
              </Button>
            ) : (
              <Button onClick={() => navigate('/auth')} size="sm">
                Sign In
              </Button>
            )}
          </div>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-6 pt-24 pb-16">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            Powered by AI
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            Smarter notes with
            <span className="text-primary"> AI</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto text-balance">
            Capture your thoughts and let AI organize them. Create, summarize, and search your notes with the power of artificial intelligence.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {user ? (
              <Button size="lg" onClick={() => navigate('/notes')}>
                Go to My Notes
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <Button size="lg" onClick={() => navigate('/auth')}>
                Get Started Free
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<FileText className="h-5 w-5" />}
            title="Smart Notes"
            description="Write naturally while AI helps you organize and structure your thoughts."
          />
          <FeatureCard
            icon={<Sparkles className="h-5 w-5" />}
            title="AI Summaries"
            description="Generate concise summaries of your notes with a single click."
          />
          <FeatureCard
            icon={<Shield className="h-5 w-5" />}
            title="Private & Secure"
            description="Your notes are encrypted and only accessible by you."
          />
        </div>
      </section>

      <section className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-semibold mb-3">Start taking smarter notes today</h2>
          <p className="text-muted-foreground mb-8">Join people who use AI to capture and organize their ideas.</p>
          {!user && (
            <Button size="lg" onClick={() => navigate('/auth')}>
              Create Your Free Account
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          )}
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="max-w-6xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">AI Notes</span>
          </div>
          <p>&copy; 2025 AI Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="rounded-xl border bg-card p-6 transition-all duration-150 hover:border-foreground/20">
      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="font-semibold mb-1.5">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}