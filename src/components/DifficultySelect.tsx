import { Shield, Zap, Skull, Clock } from 'lucide-react';
import { difficultyConfigs } from '@/data/quizQuestions';

interface DifficultySelectProps {
  playerName: string;
  onSelect: (difficulty: string) => void;
}

const difficultyIcons = {
  easy: Shield,
  medium: Zap,
  hard: Skull,
};

export const DifficultySelect = ({ playerName, onSelect }: DifficultySelectProps) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 scanlines">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="font-display text-2xl md:text-3xl cyber-text mb-2">
            WELCOME, <span className="cyber-text-cyan">{playerName.toUpperCase()}</span>
          </h1>
          <p className="text-muted-foreground">
            Select your challenge level to begin the assessment
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {Object.entries(difficultyConfigs).map(([key, config], index) => {
            const Icon = difficultyIcons[key as keyof typeof difficultyIcons];
            
            return (
              <button
                key={key}
                onClick={() => onSelect(key)}
                className={`
                  cyber-card p-6 text-left transition-all duration-300 group
                  hover:scale-105 hover:shadow-[0_0_40px_hsl(142_70%_45%_/_0.3)]
                  animate-fade-in-up
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`
                  inline-flex items-center justify-center w-14 h-14 rounded-lg mb-4
                  transition-all duration-300 group-hover:scale-110
                  ${key === 'easy' ? 'bg-success/20 text-success' : ''}
                  ${key === 'medium' ? 'bg-warning/20 text-warning' : ''}
                  ${key === 'hard' ? 'bg-destructive/20 text-destructive' : ''}
                `}>
                  <Icon className="w-7 h-7" />
                </div>

                <h3 className={`font-display text-xl mb-2 ${config.color}`}>
                  {config.name.toUpperCase()}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {config.description}
                </p>

                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{config.timeLimit}s per question</span>
                </div>

                {/* Hover indicator */}
                <div className={`
                  mt-4 h-1 rounded-full transition-all duration-300
                  ${key === 'easy' ? 'bg-success/30 group-hover:bg-success' : ''}
                  ${key === 'medium' ? 'bg-warning/30 group-hover:bg-warning' : ''}
                  ${key === 'hard' ? 'bg-destructive/30 group-hover:bg-destructive' : ''}
                `} />
              </button>
            );
          })}
        </div>

        {/* Info footer */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground text-sm font-mono">
            5 QUESTIONS PER LEVEL • TIMED CHALLENGE • INSTANT FEEDBACK
          </p>
        </div>
      </div>
    </div>
  );
};
