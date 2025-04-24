import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Button } from '../components/ui/Button';
import { NotebookPen, Sparkles, BrainCircuit, Shield } from 'lucide-react';

export function Index() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <header className="container mx-auto py-6 px-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <NotebookPen className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">AI Notes</span>
        </div>
        <div>
          {user ? (
            <Button onClick={() => navigate('/notes')}>Go to Notes</Button>
          ) : (
            <Button onClick={() => navigate('/auth')}>Sign In</Button>
          )}
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-emerald-600">
              Smarter Notes with AI
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Capture your thoughts and let AI organize them. Never lose track of important ideas again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {user ? (
                <Button
                  size="lg"
                  onClick={() => navigate('/notes')}
                  className="group"
                >
                  <span>Go to My Notes</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </Button>
              ) : (
                <>
                  <Button
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="group"
                  >
                    <span>Get Started</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => window.open('https://github.com/yourusername/ai-notes-app', '_blank')}
                  >
                    Learn More
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            <FeatureCard
              icon={<Sparkles className="h-10 w-10 text-amber-500" />}
              title="AI Summaries"
              description="Automatically generate concise summaries of your notes using advanced AI technology."
            />
            <FeatureCard
              icon={<BrainCircuit className="h-10 w-10 text-primary" />}
              title="Smart Organization"
              description="Focus on writing while AI helps you organize and connect your ideas."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-emerald-600" />}
              title="Private & Secure"
              description="Your notes are encrypted and only accessible by you."
            />
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl mx-auto">
            <div className="p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
                Start taking smarter notes today
              </h2>
              <p className="text-gray-600 text-center mb-8">
                Join thousands of people who use AI Notes to capture and organize their ideas.
              </p>
              {!user && (
                <div className="flex justify-center">
                  <Button
                    size="lg"
                    onClick={() => navigate('/auth')}
                    className="group"
                  >
                    <span>Create Your Free Account</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-50 py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <NotebookPen className="h-5 w-5 text-primary" />
            <span className="font-bold">AI Notes</span>
          </div>
          <p>© 2025 AI Notes. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}