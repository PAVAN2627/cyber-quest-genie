import { useState, useEffect, useCallback } from 'react';
import { useSound } from '@/hooks/useSound';
import { Shield } from 'lucide-react';

interface TerminalIntroProps {
  onComplete: () => void;
}

const bootSequence = [
  { text: "INITIALIZING CYBER SECURITY TRAINING SYSTEM...", delay: 100 },
  { text: "LOADING SECURITY PROTOCOLS...", delay: 80 },
  { text: "[OK] Firewall modules loaded", delay: 60 },
  { text: "[OK] Encryption algorithms initialized", delay: 60 },
  { text: "[OK] Threat detection online", delay: 60 },
  { text: "[OK] Neural network calibrated", delay: 60 },
  { text: "", delay: 200 },
  { text: "RUNNING SECURITY DIAGNOSTICS...", delay: 100 },
  { text: "████████████████████████████████ 100%", delay: 40 },
  { text: "", delay: 200 },
  { text: "[SUCCESS] All systems operational", delay: 80 },
  { text: "", delay: 300 },
  { text: "WELCOME TO CYBER GUARDIAN", delay: 120 },
  { text: "Your journey to cyber safety begins now...", delay: 80 },
];

export const TerminalIntro = ({ onComplete }: TerminalIntroProps) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const { playTypingSound, playBootSound } = useSound();

  useEffect(() => {
    playBootSound();
    const skipTimer = setTimeout(() => setShowSkip(true), 1000);
    return () => clearTimeout(skipTimer);
  }, [playBootSound]);

  useEffect(() => {
    if (currentLineIndex >= bootSequence.length) {
      setIsTyping(false);
      const timer = setTimeout(onComplete, 1500);
      return () => clearTimeout(timer);
    }

    const currentLine = bootSequence[currentLineIndex];
    
    if (currentCharIndex < currentLine.text.length) {
      const timer = setTimeout(() => {
        setDisplayedLines(prev => {
          const newLines = [...prev];
          if (newLines.length === currentLineIndex) {
            newLines.push(currentLine.text.charAt(0));
          } else {
            newLines[currentLineIndex] = currentLine.text.substring(0, currentCharIndex + 1);
          }
          return newLines;
        });
        setCurrentCharIndex(prev => prev + 1);
        if (currentLine.text.charAt(currentCharIndex) !== ' ') {
          playTypingSound();
        }
      }, currentLine.delay);
      return () => clearTimeout(timer);
    } else {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
        setCurrentCharIndex(0);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex, currentCharIndex, onComplete, playTypingSound]);

  const handleSkip = useCallback(() => {
    setDisplayedLines(bootSequence.map(line => line.text));
    setIsTyping(false);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 scanlines">
      <div className="w-full max-w-3xl">
        <div className="cyber-card p-6 md:p-8">
          {/* Terminal header */}
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-primary/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-destructive" />
              <div className="w-3 h-3 rounded-full bg-warning" />
              <div className="w-3 h-3 rounded-full bg-success" />
            </div>
            <div className="flex-1 text-center">
              <span className="text-muted-foreground text-sm font-mono">
                CYBER_GUARDIAN_v2.0 — SECURE TERMINAL
              </span>
            </div>
            <Shield className="w-5 h-5 text-primary animate-pulse-glow" />
          </div>

          {/* Terminal content */}
          <div className="font-mono text-sm md:text-base space-y-1 min-h-[400px]">
            {displayedLines.map((line, index) => (
              <div 
                key={index} 
                className={`
                  ${line.startsWith('[OK]') ? 'text-success' : ''}
                  ${line.startsWith('[SUCCESS]') ? 'text-success font-bold' : ''}
                  ${line.includes('WELCOME') ? 'text-secondary text-lg md:text-xl font-display mt-4' : ''}
                  ${line.includes('journey') ? 'text-muted-foreground italic' : ''}
                  ${line.includes('████') ? 'text-primary' : ''}
                  ${!line.startsWith('[') && !line.includes('WELCOME') && !line.includes('journey') && !line.includes('████') ? 'text-primary' : ''}
                  terminal-text
                `}
              >
                {line.startsWith('>') ? (
                  <span className="text-secondary">&gt;</span>
                ) : null}
                {line}
              </div>
            ))}
            
            {isTyping && (
              <span className="typing-cursor" />
            )}
          </div>

          {/* Skip button */}
          {showSkip && isTyping && (
            <button
              onClick={handleSkip}
              className="mt-6 text-muted-foreground hover:text-primary transition-colors text-sm underline"
            >
              Skip intro →
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
