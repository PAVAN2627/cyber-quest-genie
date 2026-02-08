import { useState } from 'react';
import { TerminalIntro } from '@/components/TerminalIntro';
import { NameInput } from '@/components/NameInput';
import { DifficultySelect } from '@/components/DifficultySelect';
import { QuizGame } from '@/components/QuizGame';
import { ResultScreen } from '@/components/ResultScreen';

type GameState = 'intro' | 'name' | 'difficulty' | 'quiz' | 'result';

interface GameData {
  playerName: string;
  difficulty: string;
  score: number;
  total: number;
}

const Index = () => {
  const [gameState, setGameState] = useState<GameState>('intro');
  const [gameData, setGameData] = useState<GameData>({
    playerName: '',
    difficulty: '',
    score: 0,
    total: 10,
  });

  const handleIntroComplete = () => {
    setGameState('name');
  };

  const handleNameSubmit = (name: string) => {
    setGameData(prev => ({ ...prev, playerName: name }));
    setGameState('difficulty');
  };

  const handleDifficultySelect = (difficulty: string) => {
    setGameData(prev => ({ ...prev, difficulty }));
    setGameState('quiz');
  };

  const handleQuizComplete = (score: number, total: number) => {
    setGameData(prev => ({ ...prev, score, total }));
    setGameState('result');
  };

  const handleRestart = () => {
    setGameState('difficulty');
    setGameData(prev => ({ ...prev, score: 0 }));
  };

  return (
    <div className="min-h-screen bg-background">
      {gameState === 'intro' && (
        <TerminalIntro onComplete={handleIntroComplete} />
      )}
      
      {gameState === 'name' && (
        <NameInput onSubmit={handleNameSubmit} />
      )}
      
      {gameState === 'difficulty' && (
        <DifficultySelect 
          playerName={gameData.playerName} 
          onSelect={handleDifficultySelect} 
        />
      )}
      
      {gameState === 'quiz' && (
        <QuizGame
          playerName={gameData.playerName}
          difficulty={gameData.difficulty}
          onComplete={handleQuizComplete}
        />
      )}
      
      {gameState === 'result' && (
        <ResultScreen
          playerName={gameData.playerName}
          score={gameData.score}
          total={gameData.total}
          difficulty={gameData.difficulty}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
};

export default Index;
