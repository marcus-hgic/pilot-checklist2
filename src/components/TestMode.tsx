import { useState, useEffect } from 'react';
import { scenarios } from '../data/scenarios';
import { Question } from '../types';

interface Props {
  onComplete: (correct: boolean) => void;
}

export default function TestMode({ onComplete }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!currentQuestion) {
      getRandomQuestion();
    }
  }, []);

  const getRandomQuestion = () => {
    const allQuestions = Object.values(scenarios).flat();
    const unansweredQuestions = allQuestions.filter(q => !answeredQuestions.has(q.id));
    
    if (unansweredQuestions.length === 0) {
      setCurrentQuestion(null);
      return;
    }

    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    setCurrentQuestion(unansweredQuestions[randomIndex]);
    setSelectedAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = (index: number) => {
    if (showFeedback || !currentQuestion) return;
    setSelectedAnswer(index);
    setShowFeedback(true);
    const correct = index === currentQuestion.correctIndex;
    setAnsweredQuestions(prev => new Set([...prev, currentQuestion.id]));
    onComplete(correct);
  };

  const handleNextQuestion = () => {
    getRandomQuestion();
  };

  if (!currentQuestion) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h3 className="text-xl font-semibold mb-4">Test Complete!</h3>
        <p className="text-gray-600">You have answered all available questions.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">{currentQuestion.question}</h3>
      
      <div className="space-y-3">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            disabled={showFeedback}
            className={`w-full p-3 text-left rounded-lg transition-colors ${
              showFeedback
                ? index === currentQuestion.correctIndex
                  ? 'bg-green-100 border-green-500'
                  : index === selectedAnswer
                  ? 'bg-red-100 border-red-500'
                  : 'bg-gray-50 border-gray-200'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200'
            } border`}
          >
            {option}
          </button>
        ))}
      </div>

      {showFeedback && (
        <div className="mt-4">
          <div className={`p-4 rounded-lg mb-4 ${
            selectedAnswer === currentQuestion.correctIndex 
              ? 'bg-green-50 text-green-800' 
              : 'bg-red-50 text-red-800'
          }`}>
            <p className="font-medium mb-2">
              {selectedAnswer === currentQuestion.correctIndex ? '✓ Correct!' : '✗ Not quite right.'}
            </p>
            <p>{currentQuestion.explanation}</p>
          </div>
          
          <button
            onClick={handleNextQuestion}
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  );
}