import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, XCircle, Award, Star } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizHistoryEntry {
  id: number;
  question: string;
  selected: string;
  correct: string;
  isCorrect: boolean;
  timestamp: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Which of these actions reduces your carbon footprint the most?",
    options: [
      "Using paper straws instead of plastic",
      "Taking shorter showers",
      "Switching to a plant-based diet",
      "Turning off lights when not in use"
    ],
    correctAnswer: 2,
    explanation: "While all of these help, switching to a plant-based diet can reduce your carbon footprint by up to 73%."
  },
  {
    id: 2,
    text: "Which transportation method has the lowest environmental impact?",
    options: [
      "Electric car",
      "Bus",
      "Walking or cycling",
      "Hybrid car"
    ],
    correctAnswer: 2,
    explanation: "Walking and cycling produce zero emissions and require minimal resources compared to any form of motorized transport."
  },
  {
    id: 3,
    text: "How many gallons of water does a typical 10-minute shower use?",
    options: [
      "5 gallons",
      "10 gallons",
      "25 gallons",
      "50 gallons"
    ],
    correctAnswer: 2,
    explanation: "A standard showerhead uses about 2.5 gallons per minute, so a 10-minute shower uses approximately 25 gallons."
  }
];

const LOCAL_STORAGE_KEY = 'ecoQuizHistoryV2';

const EcoQA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [history, setHistory] = useState<QuizHistoryEntry[]>([]);
  const { toast } = useToast();

  // Load history from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  // Save history to localStorage on change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
  };

  const handleNextQuestion = () => {
    if (selectedOption === null) {
      toast({
        title: "Select an option",
        description: "Please select an answer before continuing",
        variant: "destructive",
      });
      return;
    }

    const isCorrect = selectedOption === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
        variant: "success",
      });
    } else {
      setStreak(0);
      toast({
        title: "Not quite right",
        description: "Better luck on the next question!",
        variant: "destructive",
      });
    }

    // Save to history
    setHistory(prev => [
      ...prev,
      {
        id: Date.now(),
        question: questions[currentQuestion].text,
        selected: selectedOption !== null ? questions[currentQuestion].options[selectedOption] : '',
        correct: questions[currentQuestion].options[questions[currentQuestion].correctAnswer],
        isCorrect,
        timestamp: new Date().toLocaleString()
      }
    ]);

    setShowExplanation(true);
  };

  const handleContinue = () => {
    setShowExplanation(false);
    setSelectedOption(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setStreak(0);
    setQuizCompleted(false);
    setShowExplanation(false);
  };

  const progress = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-eco-dark mb-8">
          Eco Knowledge Quiz
        </h2>
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="bg-eco-gradient text-white">
            <CardTitle>Test Your Environmental Knowledge</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {!quizCompleted ? (
              <>
                <div className="mb-4 flex justify-between text-sm text-gray-500">
                  <span>Question {currentQuestion + 1} of {questions.length}</span>
                  <span>Score: {score}/{questions.length} | Streak: {streak} 🔥</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                  <div className="bg-eco h-2 rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
                </div>
                <h3 className="text-xl font-medium mb-6 animate-fade-in">{questions[currentQuestion].text}</h3>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors animate-fade-in-fast ${
                            selectedOption === index
                              ? "border-eco bg-eco-light"
                              : "hover:bg-gray-50"
                          }`}
                          onClick={() => handleOptionSelect(index)}
                        >
                          <div className="flex items-center">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                              selectedOption === index
                                ? "bg-eco text-white"
                                : "border border-gray-300"
                            }`}>
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6">
                      <Button 
                        onClick={handleNextQuestion}
                    className="bg-eco hover:bg-eco-dark text-white w-full animate-fade-in-fast"
                      >
                        Check Answer
                      </Button>
                    </div>
                {showExplanation && (
                  <div className={`mt-6 p-4 rounded-lg animate-fade-in-fast ${
                    selectedOption === questions[currentQuestion].correctAnswer
                      ? "bg-green-100 border border-green-300 text-green-700"
                      : "bg-red-100 border border-red-300 text-red-700"
                  } flex items-center gap-3`}
                  >
                    {selectedOption === questions[currentQuestion].correctAnswer ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <XCircle className="h-6 w-6 text-red-500" />
                    )}
                    <div>
                      <div className="font-bold mb-1">
                        {selectedOption === questions[currentQuestion].correctAnswer ? "Correct!" : "Incorrect!"}
                      </div>
                      <div>{questions[currentQuestion].explanation}</div>
                    </div>
                    <Button 
                      onClick={handleContinue}
                      className="ml-auto bg-eco hover:bg-eco-dark text-white"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6 animate-fade-in">
                <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
                <p className="text-lg mb-4">
                  Your score: <span className="font-bold text-eco">{score}/{questions.length}</span>
                </p>
                <div className="mb-8">
                  {score === questions.length ? (
                    <p className="text-green-600">Perfect score! You're an eco-expert! 🌟</p>
                  ) : score >= questions.length / 2 ? (
                    <p className="text-eco">Good job! You know your environmental facts! 🌱</p>
                  ) : (
                    <p className="text-orange-500">There's room to improve your eco-knowledge. Keep learning! 📚</p>
                  )}
                </div>
                <Button 
                  onClick={restartQuiz}
                  className="bg-eco hover:bg-eco-dark text-white"
                >
                  Restart Quiz
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Quiz History Section */}
        <div className="max-w-2xl mx-auto mt-10">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-eco" />
            Your Quiz History
          </h3>
          <Card>
            <CardContent className="p-4">
              {history.length === 0 ? (
                <p className="text-gray-500">No quiz history yet. Start playing to see your progress!</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-eco bg-opacity-10 text-left">
                        <th className="py-2 px-3 border-b">Time</th>
                        <th className="py-2 px-3 border-b">Question</th>
                        <th className="py-2 px-3 border-b">Your Answer</th>
                        <th className="py-2 px-3 border-b">Correct Answer</th>
                        <th className="py-2 px-3 border-b">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      {history.slice().reverse().map((entry) => (
                        <tr key={entry.id} className="hover:bg-gray-50">
                          <td className="py-2 px-3 border-b whitespace-nowrap">{entry.timestamp}</td>
                          <td className="py-2 px-3 border-b">{entry.question}</td>
                          <td className="py-2 px-3 border-b">{entry.selected}</td>
                          <td className="py-2 px-3 border-b">{entry.correct}</td>
                          <td className="py-2 px-3 border-b">
                            {entry.isCorrect ? (
                              <span className="text-green-600 font-bold flex items-center gap-1"><CheckCircle className="h-4 w-4" /> Correct</span>
                            ) : (
                              <span className="text-red-600 font-bold flex items-center gap-1"><XCircle className="h-4 w-4" /> Incorrect</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EcoQA;
