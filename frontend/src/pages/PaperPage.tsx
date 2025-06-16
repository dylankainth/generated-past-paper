
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Zap, RotateCcw } from 'lucide-react';

const PaperPage = () => {
  const { paperId } = useParams();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{[key: number]: number}>({});
  const [showResults, setShowResults] = useState(false);

  // Mock data - in real app this would come from API
  const paperData = {
    'midterm-2023': {
      name: 'Midterm Exam 2023',
      moduleId: 'cs101',
      moduleName: 'Computer Science 101',
      timeLimit: '90 min',
      difficulty: 'Medium',
      questions: [
        {
          id: 1,
          question: "What is the time complexity of binary search?",
          options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
          correctAnswer: 1,
          explanation: "Binary search divides the search space in half with each iteration, resulting in O(log n) time complexity."
        },
        {
          id: 2,
          question: "Which data structure uses LIFO (Last In, First Out) principle?",
          options: ["Queue", "Stack", "Array", "Linked List"],
          correctAnswer: 1,
          explanation: "A stack follows the LIFO principle where the last element added is the first one to be removed."
        },
        {
          id: 3,
          question: "What does API stand for?",
          options: ["Application Programming Interface", "Advanced Programming Instructions", "Automated Program Integration", "Application Process Integration"],
          correctAnswer: 0,
          explanation: "API stands for Application Programming Interface, which allows different software applications to communicate with each other."
        }
      ]
    }
  };

  const paper = paperData[paperId as keyof typeof paperData];
  
  if (!paper) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Paper Not Found</h1>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion]: answerIndex
    }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const getScore = () => {
    let correct = 0;
    paper.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  const currentQ = paper.questions[currentQuestion];
  const totalQuestions = paper.questions.length;
  const answeredQuestions = Object.keys(selectedAnswers).length;

  if (showResults) {
    const score = getScore();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/module/${paper.moduleId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Module
                </Link>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{paper.name}</h1>
                <p className="text-sm text-gray-600">Results</p>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-4">Quiz Complete!</CardTitle>
              <div className="text-6xl font-bold mb-4">
                <span className={percentage >= 70 ? 'text-green-600' : percentage >= 50 ? 'text-yellow-600' : 'text-red-600'}>
                  {percentage}%
                </span>
              </div>
              <p className="text-xl text-gray-600">
                You got {score} out of {totalQuestions} questions correct
              </p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex gap-4 justify-center">
                <Button onClick={handleReset} variant="outline" className="gap-2">
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </Button>
                <Button asChild>
                  <Link to={`/module/${paper.moduleId}`}>Back to Module</Link>
                </Button>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Review Answers</h3>
                {paper.questions.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;
                  
                  return (
                    <Card key={question.id} className={`border-l-4 ${isCorrect ? 'border-l-green-500' : 'border-l-red-500'}`}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3 mb-3">
                          {isCorrect ? 
                            <CheckCircle2 className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" /> :
                            <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                          }
                          <div className="flex-1">
                            <h4 className="font-semibold mb-2">Question {index + 1}</h4>
                            <p className="mb-3">{question.question}</p>
                            <div className="space-y-2">
                              {question.options.map((option, optIndex) => (
                                <div 
                                  key={optIndex}
                                  className={`p-2 rounded border ${
                                    optIndex === question.correctAnswer 
                                      ? 'bg-green-100 border-green-300 text-green-800'
                                      : optIndex === userAnswer && userAnswer !== question.correctAnswer
                                      ? 'bg-red-100 border-red-300 text-red-800'
                                      : 'bg-gray-50 border-gray-200'
                                  }`}
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                  {optIndex === question.correctAnswer && (
                                    <Badge className="ml-2 bg-green-600">Correct</Badge>
                                  )}
                                  {optIndex === userAnswer && userAnswer !== question.correctAnswer && (
                                    <Badge className="ml-2 bg-red-600">Your Answer</Badge>
                                  )}
                                </div>
                              ))}
                            </div>
                            <div className="mt-3 p-3 bg-blue-50 rounded border-blue-200">
                              <p className="text-sm text-blue-800">
                                <strong>Explanation:</strong> {question.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to={`/module/${paper.moduleId}`}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Module
                </Link>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{paper.name}</h1>
                <p className="text-sm text-gray-600">{paper.moduleName}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                {paper.timeLimit}
              </Badge>
              <Badge>
                {answeredQuestions}/{totalQuestions} Answered
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {totalQuestions}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </CardContent>
          </Card>

          {/* Question Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Question {currentQuestion + 1}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">{currentQ.question}</p>
              <div className="space-y-3">
                {currentQ.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`w-full p-4 text-left border-2 rounded-lg transition-all duration-200 ${
                      selectedAnswers[currentQuestion] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <span className="font-medium">
                      {String.fromCharCode(65 + index)}.
                    </span>{' '}
                    {option}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Previous
            </Button>

            <div className="flex gap-2">
              {paper.questions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`w-8 h-8 rounded-full text-sm font-medium transition-all duration-200 ${
                    index === currentQuestion
                      ? 'bg-blue-600 text-white'
                      : selectedAnswers[index] !== undefined
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            {currentQuestion < totalQuestions - 1 ? (
              <Button
                onClick={() => setCurrentQuestion(prev => Math.min(totalQuestions - 1, prev + 1))}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={answeredQuestions === 0}
                className="gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperPage;
