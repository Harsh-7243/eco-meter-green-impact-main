
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
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

const EcoQA = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const { toast } = useToast();

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

    if (selectedOption === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job! You got it right.",
      });
    } else {
      toast({
        title: "Not quite right",
        description: "Better luck on the next question!",
        variant: "destructive",
      });
    }

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
    setQuizCompleted(false);
    setShowExplanation(false);
  };

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
                  <span>Score: {score}/{questions.length}</span>
                </div>
                
                <h3 className="text-xl font-medium mb-6">{questions[currentQuestion].text}</h3>
                
                {!showExplanation ? (
                  <>
                    <div className="space-y-3">
                      {questions[currentQuestion].options.map((option, index) => (
                        <div
                          key={index}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
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
                        className="bg-eco hover:bg-eco-dark text-white w-full"
                      >
                        Check Answer
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="mt-4">
                    <div className={`p-4 rounded-lg ${
                      selectedOption === questions[currentQuestion].correctAnswer
                        ? "bg-green-100 border border-green-300"
                        : "bg-red-100 border border-red-300"
                    }`}>
                      <p className="font-medium mb-2">
                        {selectedOption === questions[currentQuestion].correctAnswer
                          ? "Correct!"
                          : "Incorrect!"}
                      </p>
                      <p>{questions[currentQuestion].explanation}</p>
                    </div>
                    
                    <Button 
                      onClick={handleContinue}
                      className="mt-4 bg-eco hover:bg-eco-dark text-white w-full"
                    >
                      {currentQuestion < questions.length - 1 ? "Next Question" : "See Results"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-6">
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
      </div>
    </div>
  );
};

export default EcoQA;
