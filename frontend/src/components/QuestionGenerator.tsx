
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Zap, Settings, Sparkles } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface QuestionGeneratorProps {
  files: File[];
  onQuestionsGenerated: (questions: any[]) => void;
}

const QuestionGenerator = ({ files, onQuestionsGenerated }: QuestionGeneratorProps) => {
  const [generating, setGenerating] = useState(false);
  const [questionType, setQuestionType] = useState('mixed');
  const [questionCount, setQuestionCount] = useState([5]);
  const [difficulty, setDifficulty] = useState('medium');

  const generateQuestions = async () => {
    setGenerating(true);
    
    // Simulate AI generation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock generated questions
    const mockQuestions = Array.from({ length: questionCount[0] }, (_, i) => ({
      id: i + 1,
      question: `Based on your uploaded materials, which of the following best describes the key concept discussed in section ${i + 1}?`,
      type: questionType === 'mixed' ? (i % 2 === 0 ? 'mcq' : 'short') : questionType,
      options: questionType === 'mcq' || questionType === 'mixed' ? [
        'The fundamental principle that governs the relationship between variables',
        'A secondary concept that supports the main theory',
        'An example used to illustrate the practical application',
        'A counterargument to the established framework'
      ] : undefined,
      correctAnswer: 0,
      difficulty: difficulty,
      source: files[i % files.length].name
    }));
    
    onQuestionsGenerated(mockQuestions);
    setGenerating(false);
    
    toast({
      title: "Questions generated successfully!",
      description: `Created ${questionCount[0]} practice questions from your materials.`,
    });
  };

  return (
    <Card className="border-2 border-dashed border-blue-300 bg-blue-50/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-blue-600" />
          Generate Practice Questions
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Question Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Question Type</label>
            <Select value={questionType} onValueChange={setQuestionType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mcq">Multiple Choice</SelectItem>
                <SelectItem value="short">Short Answer</SelectItem>
                <SelectItem value="long">Long Answer</SelectItem>
                <SelectItem value="mixed">Mixed Types</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Difficulty */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Difficulty</label>
            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Question Count */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Questions: {questionCount[0]}
            </label>
            <Slider
              value={questionCount}
              onValueChange={setQuestionCount}
              max={20}
              min={1}
              step={1}
              className="w-full"
            />
          </div>
        </div>

        {/* Generate Button */}
        <div className="flex justify-center pt-4">
          <Button
            onClick={generateQuestions}
            disabled={generating}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 gap-2 px-8"
          >
            {generating ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                Generating Questions...
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                Generate {questionCount[0]} Questions
              </>
            )}
          </Button>
        </div>

        {generating && (
          <div className="text-center space-y-2 p-4 bg-white/60 rounded-lg">
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Settings className="w-5 h-5 animate-spin" />
              <span className="font-medium">AI is analyzing your materials...</span>
            </div>
            <p className="text-sm text-gray-600">
              This may take a few moments depending on the size of your documents
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuestionGenerator;
