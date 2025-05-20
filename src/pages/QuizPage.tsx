
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Trophy, Award, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  percentageScore: number;
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of the following is NOT a renewable energy source?",
    options: ["Solar", "Wind", "Natural Gas", "Hydroelectric"],
    correctAnswer: 2,
    explanation: "Natural gas is a fossil fuel and is not renewable. Solar, wind, and hydroelectric are all renewable energy sources."
  },
  {
    id: 2,
    question: "What percentage of the Earth's surface is covered by water?",
    options: ["50%", "60%", "70%", "80%"],
    correctAnswer: 2,
    explanation: "About 71% of the Earth's surface is covered by water, with oceans holding about 96.5% of all Earth's water."
  },
  {
    id: 3,
    question: "Which of the following actions reduces your carbon footprint the most?",
    options: ["Using paper bags instead of plastic", "Taking shorter showers", "Eating less meat", "Turning off lights when not in use"],
    correctAnswer: 2,
    explanation: "Reducing meat consumption significantly lowers your carbon footprint as livestock farming generates large amounts of greenhouse gases."
  },
  {
    id: 4,
    question: "What is the primary cause of global warming?",
    options: ["Solar radiation", "Greenhouse gas emissions", "Natural climate cycles", "Volcanic eruptions"],
    correctAnswer: 1,
    explanation: "Greenhouse gas emissions from human activities like burning fossil fuels are the primary driver of global warming."
  },
  {
    id: 5,
    question: "Which of these household items should NOT be put in recycling bins?",
    options: ["Plastic bottles", "Aluminum cans", "Greasy pizza boxes", "Newspaper"],
    correctAnswer: 2,
    explanation: "Greasy pizza boxes are contaminated with food residue and can't be recycled properly. They should go in compost or trash."
  },
];

const QuizPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizHistory, setQuizHistory] = useState<QuizResult[]>([]);
  const { toast } = useToast();

  // Load quiz history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('ecoQuizHistory');
    if (savedHistory) {
      setQuizHistory(JSON.parse(savedHistory));
    }
  }, []);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;

  const handleOptionSelect = (optionIndex: number) => {
    if (hasAnswered) return;
    setSelectedOption(optionIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) {
      toast({
        title: "Please select an answer",
        description: "You need to choose an option before submitting",
        variant: "destructive",
      });
      return;
    }

    setHasAnswered(true);
    if (selectedOption === currentQuestion.correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      const finalScore = score + (selectedOption === currentQuestion.correctAnswer ? 1 : 0);
      const percentageScore = (finalScore / quizQuestions.length) * 100;
      
      // Save quiz result to history
      const newResult: QuizResult = {
        id: Date.now().toString(),
        date: new Date().toISOString(),
        score: finalScore,
        totalQuestions: quizQuestions.length,
        percentageScore
      };
      
      const updatedHistory = [...quizHistory, newResult];
      setQuizHistory(updatedHistory);
      
      // Save to localStorage
      localStorage.setItem('ecoQuizHistory', JSON.stringify(updatedHistory));
      
      setQuizCompleted(true);
      toast({
        title: "Quiz Completed!",
        description: `You scored ${finalScore} out of ${quizQuestions.length}.`,
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setHasAnswered(false);
    setScore(0);
    setQuizCompleted(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const renderQuiz = () => (
    <Card className="w-full max-w-3xl mx-auto shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="bg-eco-gradient text-white rounded-t-lg">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Eco Knowledge Quiz</CardTitle>
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {quizQuestions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2 bg-white/20" />
      </CardHeader>
      <CardContent className="pt-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">{currentQuestion.question}</h3>
          <RadioGroup value={selectedOption?.toString()} className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <div 
                key={index}
                className={`
                  flex items-center p-3 rounded-md border cursor-pointer transition-colors
                  ${hasAnswered && index === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500' : ''}
                  ${hasAnswered && selectedOption === index && index !== currentQuestion.correctAnswer ? 'bg-red-50 border-red-500' : ''}
                  ${!hasAnswered ? 'hover:bg-gray-50' : ''}
                `}
                onClick={() => handleOptionSelect(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={hasAnswered} />
                <Label htmlFor={`option-${index}`} className="ml-2 w-full cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {hasAnswered && (
          <Alert className={selectedOption === currentQuestion.correctAnswer ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'}>
            <AlertTitle className={selectedOption === currentQuestion.correctAnswer ? 'text-green-700' : 'text-red-700'}>
              {selectedOption === currentQuestion.correctAnswer ? 'Correct!' : 'Incorrect!'}
            </AlertTitle>
            <AlertDescription className="text-gray-700">
              {currentQuestion.explanation}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>
          <span className="text-sm text-gray-500">
            Score: {score}{hasAnswered && selectedOption === currentQuestion.correctAnswer ? ' + 1' : ''} / {quizQuestions.length}
          </span>
        </div>
        <div>
          {!hasAnswered ? (
            <Button className="bg-eco hover:bg-eco-dark text-white" onClick={handleSubmitAnswer}>
              Submit Answer
            </Button>
          ) : (
            <Button className="bg-eco hover:bg-eco-dark text-white" onClick={handleNextQuestion}>
              {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question' : 'See Results'}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );

  const renderResults = () => {
    const finalScore = score;
    const percentage = (finalScore / quizQuestions.length) * 100;
    
    let message = '';
    if (percentage >= 80) {
      message = 'Excellent! You\'re an eco expert! 🌍';
    } else if (percentage >= 60) {
      message = 'Good job! You know your environmental facts! 🌱';
    } else if (percentage >= 40) {
      message = 'Not bad! You\'re on your way to becoming eco-savvy. 💧';
    } else {
      message = 'Keep learning! There\'s more to discover about our environment. 🌿';
    }

    return (
      <Card className="w-full max-w-3xl mx-auto text-center shadow-md">
        <CardHeader className="bg-eco-gradient text-white rounded-t-lg">
          <CardTitle className="text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent className="pt-8 pb-6">
          <div className="mb-6 flex justify-center">
            <div className="bg-eco-light w-24 h-24 rounded-full flex items-center justify-center">
              <Trophy className="text-eco w-12 h-12" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold mb-2">
            {finalScore} out of {quizQuestions.length} correct
          </h3>
          <p className="text-gray-600 mb-6">{message}</p>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div 
              className="bg-eco h-4 rounded-full" 
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
          
          <div className="p-4 bg-eco-light rounded-lg mb-6">
            <p className="text-gray-700">
              You've earned <span className="font-bold text-eco">{finalScore * 5} points</span> for your eco knowledge!
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button className="bg-eco hover:bg-eco-dark text-white" onClick={handleRestartQuiz}>
            Try Again
          </Button>
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-eco-dark mb-4">
            Eco Knowledge Quiz
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
            Test your environmental knowledge with our quiz! Each correct answer earns you points 
            and helps you learn more about sustainable living.
          </p>
          
          {quizCompleted ? renderResults() : renderQuiz()}
          
          {/* Quiz history section */}
          {quizHistory.length > 0 && (
            <div className="mt-12 max-w-3xl mx-auto">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-eco" />
                Your Quiz History
              </h3>
              
              <Card>
                <CardContent className="p-4">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-eco bg-opacity-10 text-left">
                          <th className="py-2 px-3 border-b">Date</th>
                          <th className="py-2 px-3 border-b">Score</th>
                          <th className="py-2 px-3 border-b">Performance</th>
                        </tr>
                      </thead>
                      <tbody>
                        {quizHistory.slice().reverse().map((result) => (
                          <tr key={result.id} className="hover:bg-gray-50">
                            <td className="py-2 px-3 border-b">{formatDate(result.date)}</td>
                            <td className="py-2 px-3 border-b font-medium">
                              {result.score}/{result.totalQuestions}
                              <span className="ml-2 text-sm text-gray-500">
                                ({result.percentageScore.toFixed(0)}%)
                              </span>
                            </td>
                            <td className="py-2 px-3 border-b">
                              <div className="flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i}
                                    className={`h-4 w-4 ${
                                      i < Math.round(result.percentageScore / 20) 
                                        ? 'fill-amber-400 text-amber-400' 
                                        : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          
          <div className="mt-12 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-semibold mb-4">Why Environmental Knowledge Matters</h3>
            <p className="text-gray-600">
              Understanding environmental issues helps us make better choices in our daily lives. 
              By learning about sustainability, climate change, and conservation, we can take informed actions 
              that reduce our impact on the planet and create a greener future for everyone.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default QuizPage;
