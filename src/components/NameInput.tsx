import { useState } from 'react';
import { User, ArrowRight, Shield } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

export const NameInput = ({ onSubmit }: NameInputProps) => {
  const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 scanlines">
      <div className="w-full max-w-md">
        <div className="cyber-card p-8 animate-fade-in-up">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 animate-pulse-glow">
              <Shield className="w-10 h-10 text-primary" />
            </div>
            <h1 className="font-display text-2xl md:text-3xl cyber-text mb-2">
              IDENTIFY YOURSELF
            </h1>
            <p className="text-muted-foreground text-sm">
              Enter your name to begin the cyber security training
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div 
                className={`
                  flex items-center gap-3 p-4 rounded-lg border-2 transition-all duration-300
                  ${isFocused 
                    ? 'border-primary bg-primary/5 shadow-[0_0_20px_hsl(142_70%_45%_/_0.2)]' 
                    : 'border-border bg-input'
                  }
                `}
              >
                <User className={`w-5 h-5 transition-colors ${isFocused ? 'text-primary' : 'text-muted-foreground'}`} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your name..."
                  className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground font-mono"
                  maxLength={30}
                  autoFocus
                />
              </div>
              
              {/* Animated border effect */}
              {isFocused && (
                <div className="absolute inset-0 rounded-lg pointer-events-none">
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={!name.trim()}
              className={`
                w-full flex items-center justify-center gap-2 p-4 rounded-lg font-display font-bold
                transition-all duration-300 group
                ${name.trim() 
                  ? 'bg-primary text-primary-foreground hover:shadow-[0_0_30px_hsl(142_70%_45%_/_0.4)] cursor-pointer' 
                  : 'bg-muted text-muted-foreground cursor-not-allowed'
                }
              `}
            >
              <span>PROCEED</span>
              <ArrowRight className={`w-5 h-5 transition-transform ${name.trim() ? 'group-hover:translate-x-1' : ''}`} />
            </button>
          </form>

          {/* Decorative elements */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex justify-between text-xs text-muted-foreground font-mono">
              <span>STATUS: AWAITING_INPUT</span>
              <span className="animate-pulse">●</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
