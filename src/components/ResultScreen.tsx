import { useEffect, useRef } from 'react';
import { Trophy, Medal, Target, RotateCcw, Shield, Award } from 'lucide-react';
import { useSound } from '@/hooks/useSound';

interface ResultScreenProps {
  playerName: string;
  score: number;
  total: number;
  difficulty: string;
  onRestart: () => void;
}

export const ResultScreen = ({ playerName, score, total, difficulty, onRestart }: ResultScreenProps) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const { playVictorySound } = useSound();
  
  const percentage = (score / total) * 100;
  const isPerfect = score === total;
  const isGood = percentage >= 60;

  useEffect(() => {
    if (isPerfect) {
      playVictorySound();
    }
  }, [isPerfect, playVictorySound]);

  const getPerformance = () => {
    if (percentage === 100) return { title: "CYBER CHAMPION", icon: Trophy, color: "text-warning" };
    if (percentage >= 80) return { title: "SECURITY EXPERT", icon: Award, color: "text-success" };
    if (percentage >= 60) return { title: "GOOD EFFORT", icon: Medal, color: "text-secondary" };
    return { title: "NEEDS TRAINING", icon: Target, color: "text-muted-foreground" };
  };

  const performance = getPerformance();
  const PerformanceIcon = performance.icon;

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 scanlines">
      <div className="w-full max-w-3xl">
        {/* Result Summary */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className={`
            inline-flex items-center justify-center w-24 h-24 rounded-full mb-6
            ${isPerfect ? 'bg-warning/20 animate-pulse-glow' : isGood ? 'bg-success/20' : 'bg-muted'}
          `}>
            <PerformanceIcon className={`w-12 h-12 ${performance.color}`} />
          </div>
          
          <h1 className={`font-display text-3xl md:text-4xl mb-2 ${performance.color}`}>
            {performance.title}
          </h1>
          
          <p className="text-muted-foreground mb-4">
            Assessment Complete • {difficulty.toUpperCase()} Mode
          </p>
          
          <div className="inline-flex items-center gap-4 p-4 cyber-card">
            <div className="text-center px-4">
              <div className="font-display text-4xl text-primary">{score}</div>
              <div className="text-xs text-muted-foreground">CORRECT</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center px-4">
              <div className="font-display text-4xl text-muted-foreground">{total}</div>
              <div className="text-xs text-muted-foreground">TOTAL</div>
            </div>
            <div className="w-px h-12 bg-border" />
            <div className="text-center px-4">
              <div className={`font-display text-4xl ${performance.color}`}>{percentage}%</div>
              <div className="text-xs text-muted-foreground">SCORE</div>
            </div>
          </div>
        </div>

        {/* Certificate */}
        <div 
          ref={certificateRef}
          className="cyber-card p-8 md:p-12 relative overflow-hidden animate-fade-in-up-delay-1"
          style={{
            backgroundColor: '#0a0f1a',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            color: '#ffffff',
            minHeight: '400px',
            width: '100%'
          }}
        >
          {/* Decorative corners */}
          <div 
            className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary" 
            style={{ borderColor: '#22c55e' }} 
          />
          <div 
            className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary" 
            style={{ borderColor: '#22c55e' }} 
          />
          <div 
            className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary" 
            style={{ borderColor: '#22c55e' }} 
          />
          <div 
            className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary" 
            style={{ borderColor: '#22c55e' }} 
          />

          <div className="text-center">
            {/* Certificate header */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <Shield className="w-8 h-8 text-primary" style={{ color: '#22c55e' }} />
              <h2 className="font-display text-xl md:text-2xl cyber-text" style={{ color: '#ffffff', fontSize: '1.5rem', fontWeight: 'bold' }}>
                CYBER GUARDIAN
              </h2>
              <Shield className="w-8 h-8 text-primary" style={{ color: '#22c55e' }} />
            </div>

            <div className="text-xs text-muted-foreground tracking-widest mb-8" style={{ color: '#94a3b8' }}>
              CERTIFICATE OF COMPLETION
            </div>

            {/* Recipient name */}
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2" style={{ color: '#94a3b8' }}>This certifies that</div>
              <div 
                className="font-display text-2xl md:text-3xl cyber-text-cyan py-2 border-b border-secondary/30" 
                style={{ 
                  color: '#06b6d4', 
                  fontSize: '2rem', 
                  fontWeight: 'bold',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
                  paddingBottom: '8px'
                }}
              >
                {playerName.toUpperCase()}
              </div>
            </div>

            {/* Achievement */}
            <div className="mb-8">
              <div className="text-sm text-muted-foreground mb-2" style={{ color: '#94a3b8' }}>has successfully completed the</div>
              <div className="font-display text-lg text-foreground mb-2" style={{ color: '#ffffff', fontSize: '1.125rem', fontWeight: 'bold' }}>
                CYBER SECURITY AWARENESS TRAINING
              </div>
              <div className="text-sm text-muted-foreground" style={{ color: '#94a3b8' }}>
                {difficulty.toUpperCase()} Level • Score: {score}/{total} ({percentage}%)
              </div>
            </div>

            {/* Badge */}
            <div 
              className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6 border-2 border-primary/30" 
              style={{ 
                backgroundColor: 'rgba(34, 197, 94, 0.1)', 
                border: '2px solid rgba(34, 197, 94, 0.3)' 
              }}
            >
              <PerformanceIcon 
                className={`w-10 h-10 ${performance.color}`} 
                style={{ 
                  color: performance.color.includes('success') ? '#22c55e' : 
                        performance.color.includes('warning') ? '#f59e0b' : 
                        performance.color.includes('secondary') ? '#6b7280' : '#9ca3af' 
                }} 
              />
            </div>

            <div 
              className={`font-display text-lg ${performance.color} mb-6`} 
              style={{ 
                color: performance.color.includes('success') ? '#22c55e' : 
                      performance.color.includes('warning') ? '#f59e0b' : 
                      performance.color.includes('secondary') ? '#6b7280' : '#9ca3af',
                fontSize: '1.125rem',
                fontWeight: 'bold' 
              }}
            >
              {performance.title}
            </div>

            {/* Date and ID */}
            <div 
              className="flex items-center justify-between text-xs text-muted-foreground pt-6 border-t border-border" 
              style={{ 
                color: '#94a3b8', 
                paddingTop: '24px', 
                borderTop: '1px solid rgba(255, 255, 255, 0.1)' 
              }}
            >
              <span>Date: {currentDate}</span>
              <span>ID: CG-{Date.now().toString(36).toUpperCase()}</span>
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-center mt-8 animate-fade-in-up-delay-2">
          <button
            onClick={onRestart}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-lg
              bg-primary text-primary-foreground font-display font-bold text-lg
              hover:shadow-[0_0_30px_hsl(142_70%_45%_/_0.4)] transition-all duration-300"
          >
            <RotateCcw className="w-6 h-6" />
            TRY AGAIN
          </button>
        </div>
      </div>
    </div>
  );
};
