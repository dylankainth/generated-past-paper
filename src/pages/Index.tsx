
import { useState } from 'react';
import { Upload, BookOpen, Target, Users, TrendingUp, FileText, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import UploadSection from '@/components/UploadSection';
import QuestionGenerator from '@/components/QuestionGenerator';
import StreakTracker from '@/components/StreakTracker';
import Leaderboard from '@/components/Leaderboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('upload');
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleQuestionsGenerated = (questions: any[]) => {
    setGeneratedQuestions(questions);
    setActiveTab('practice');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  StudyAI
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Practice Questions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StreakTracker />
              <Button variant="outline" className="gap-2">
                <Users className="w-4 h-4" />
                Friends
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-2 mb-8 bg-white/60 backdrop-blur-sm rounded-2xl p-2">
          {[
            { id: 'upload', label: 'Upload Materials', icon: Upload },
            { id: 'practice', label: 'Practice Questions', icon: BookOpen },
            { id: 'progress', label: 'Progress', icon: Target },
            { id: 'leaderboard', label: 'Leaderboard', icon: TrendingUp }
          ].map(tab => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'default' : 'ghost'}
              className={`flex-1 gap-2 py-3 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-white/80'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Welcome Section */}
              <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
                <CardContent className="p-8">
                  <h2 className="text-3xl font-bold mb-4">
                    Transform Your Study Materials into Practice Questions
                  </h2>
                  <p className="text-lg opacity-90 mb-6">
                    Upload your PDFs, notes, or past papers and let AI generate personalized questions for better exam prep.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4" />
                      </div>
                      <span>Upload PDFs</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Zap className="w-4 h-4" />
                      </div>
                      <span>AI Generation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                        <Target className="w-4 h-4" />
                      </div>
                      <span>Practice & Improve</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <UploadSection onFileUpload={handleFileUpload} uploadedFiles={uploadedFiles} />
              
              {uploadedFiles.length > 0 && (
                <QuestionGenerator 
                  files={uploadedFiles} 
                  onQuestionsGenerated={handleQuestionsGenerated}
                />
              )}
            </div>
          )}

          {activeTab === 'practice' && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Practice Questions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {generatedQuestions.length > 0 ? (
                    <div className="space-y-4">
                      {generatedQuestions.map((question, index) => (
                        <Card key={index} className="border-l-4 border-l-blue-500">
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">Question {index + 1}</h3>
                            <p className="text-gray-700 mb-4">{question.question}</p>
                            <div className="space-y-2">
                              {question.options?.map((option: string, optIndex: number) => (
                                <Button
                                  key={optIndex}
                                  variant="outline"
                                  className="w-full justify-start text-left"
                                >
                                  {String.fromCharCode(65 + optIndex)}. {option}
                                </Button>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-600 mb-2">No Questions Yet</h3>
                      <p className="text-gray-500 mb-4">Upload some study materials to generate practice questions</p>
                      <Button onClick={() => setActiveTab('upload')} className="gap-2">
                        <Upload className="w-4 h-4" />
                        Upload Materials
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'progress' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Current Streak</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-emerald-600 mb-2">7 days</div>
                  <Progress value={70} className="mb-2" />
                  <p className="text-sm text-gray-600">Keep it up! 3 more days to beat your record</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Questions Answered</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600 mb-2">142</div>
                  <p className="text-sm text-gray-600">This week: +23</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Accuracy Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600 mb-2">85%</div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-sm text-gray-600">Improving! +5% from last week</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === 'leaderboard' && <Leaderboard />}
        </div>
      </div>
    </div>
  );
};

export default Index;
