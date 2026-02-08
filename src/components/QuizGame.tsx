import { useState, useEffect, useCallback } from 'react';
import { Clock, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { questions, difficultyConfigs } from '@/data/quizQuestions';
import { useSound } from '@/hooks/useSound';

interface QuizGameProps {
  playerName: string;
  difficulty: string;
  onComplete: (score: number, total: number) => void;
}

export const QuizGame = ({ playerName, difficulty, onComplete }: QuizGameProps) => {
  const config = difficultyConfigs[difficulty];
  const quizQuestions = questions[difficulty];
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(config.timeLimit);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  const { playCorrectSound, playWrongSound } = useSound();

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      setTimeLeft(config.timeLimit);
    } else {
      onComplete(score, quizQuestions.length);
    }
  }, [currentQuestion, quizQuestions.length, config.timeLimit, score, onComplete]);

  const handleTimeout = useCallback(() => {
    if (!showResult) {
      setShowResult(true);
      setIsCorrect(false);
      playWrongSound();
      setTimeout(handleNextQuestion, 1500);
    }
  }, [showResult, handleNextQuestion, playWrongSound]);

  // Timer effect
  useEffect(() => {
    if (showResult) return;

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, showResult, handleTimeout]);

  const handleAnswer = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    const correct = answerIndex === quizQuestions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
      playCorrectSound();
    } else {
      playWrongSound();
    }
    
    setTimeout(handleNextQuestion, 1500);
  };

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const timerProgress = (timeLeft / config.timeLimit) * 100;
  const isLowTime = timeLeft <= 3;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 scanlines">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 animate-fade-in-up">
          <div className="text-sm font-mono text-muted-foreground">
            PLAYER: <span className="text-secondary">{playerName.toUpperCase()}</span>
          </div>
          <div className={`font-display font-bold ${config.color}`}>
            {config.name.toUpperCase()} MODE
          </div>
          <div className="text-sm font-mono text-muted-foreground">
            SCORE: <span className="text-primary">{score}/{quizQuestions.length}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-6 animate-fade-in-up-delay-1">
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>QUESTION {currentQuestion + 1} OF {quizQuestions.length}</span>
            <span>{Math.round(progress)}% COMPLETE</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 progress-glow"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 animate-fade-in-up-delay-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${isLowTime ? 'text-destructive animate-pulse' : 'text-muted-foreground'}`} />
              <span className={isLowTime ? 'text-destructive font-bold' : 'text-muted-foreground'}>
                {timeLeft}s REMAINING
              </span>
            </div>
            {isLowTime && (
              <span className="text-destructive flex items-center gap-1 animate-pulse">
                <AlertTriangle className="w-4 h-4" />
                HURRY!
              </span>
            )}
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-1000 ${
                isLowTime ? 'bg-destructive' : 'bg-secondary'
              }`}
              style={{ width: `${timerProgress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="cyber-card p-6 md:p-8 animate-fade-in-up-delay-3">
          <h2 className="font-display text-lg md:text-xl text-foreground mb-6">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, index) => {
              const isSelected = selectedAnswer === index;
              const isCorrectAnswer = index === question.correctAnswer;
              
              let buttonStyle = 'border-border hover:border-primary hover:bg-primary/10';
              
              if (showResult) {
                if (isCorrectAnswer) {
                  buttonStyle = 'border-success bg-success/20 text-success';
                } else if (isSelected && !isCorrectAnswer) {
                  buttonStyle = 'border-destructive bg-destructive/20 text-destructive';
                } else {
                  buttonStyle = 'border-border opacity-50';
                }
              } else if (isSelected) {
                buttonStyle = 'border-primary bg-primary/20';
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  disabled={showResult}
                  className={`
                    w-full p-4 rounded-lg border-2 text-left transition-all duration-300
                    flex items-center gap-4 group
                    ${buttonStyle}
                    ${!showResult ? 'cursor-pointer' : 'cursor-default'}
                  `}
                >
                  <div className={`
                    w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                    border-2 transition-all
                    ${showResult && isCorrectAnswer ? 'border-success bg-success text-success-foreground' : ''}
                    ${showResult && isSelected && !isCorrectAnswer ? 'border-destructive bg-destructive text-destructive-foreground' : ''}
                    ${!showResult ? 'border-current group-hover:border-primary group-hover:text-primary' : ''}
                  `}>
                    {showResult && isCorrectAnswer ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : showResult && isSelected && !isCorrectAnswer ? (
                      <XCircle className="w-5 h-5" />
                    ) : (
                      String.fromCharCode(65 + index)
                    )}
                  </div>
                  <span className="flex-1 font-mono text-sm md:text-base">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Result feedback */}
          {showResult && (
            <div className={`
              mt-6 p-4 rounded-lg text-center font-display animate-fade-in-up
              ${isCorrect 
                ? 'bg-success/20 text-success border border-success/50' 
                : 'bg-destructive/20 text-destructive border border-destructive/50'
              }
            `}>
              {isCorrect ? '✓ CORRECT!' : '✗ INCORRECT'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
