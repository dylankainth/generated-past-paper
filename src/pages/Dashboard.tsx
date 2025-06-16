
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Search, Plus, Users, Target, TrendingUp, Zap, FileText, Clock } from 'lucide-react';
import StreakTracker from '@/components/StreakTracker';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const modules = [
    {
      id: 'cs101',
      name: 'Computer Science 101',
      description: 'Introduction to Programming',
      papers: 12,
      questions: 156,
      lastActivity: '2 days ago',
      progress: 75,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'math201',
      name: 'Mathematics 201',
      description: 'Calculus and Linear Algebra',
      papers: 8,
      questions: 89,
      lastActivity: '1 day ago',
      progress: 60,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'phys101',
      name: 'Physics 101',
      description: 'Classical Mechanics',
      papers: 15,
      questions: 203,
      lastActivity: '3 days ago',
      progress: 45,
      color: 'from-emerald-500 to-teal-500'
    },
    {
      id: 'chem102',
      name: 'Chemistry 102',
      description: 'Organic Chemistry Basics',
      papers: 6,
      questions: 67,
      lastActivity: '1 week ago',
      progress: 30,
      color: 'from-orange-500 to-red-500'
    }
  ];

  const filteredModules = modules.filter(module =>
    module.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Scinapse
                  </h1>
                  <p className="text-sm text-gray-600">Dashboard</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <StreakTracker />
              <Button className="gap-2" asChild>
                <Link to="/newmodule">
                  <Plus className="w-4 h-4" />
                  New Module
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
          <p className="text-gray-600">Continue your learning journey with your study modules</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Modules</p>
                  <p className="text-2xl font-bold">{modules.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Papers</p>
                  <p className="text-2xl font-bold">{modules.reduce((sum, m) => sum + m.papers, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Questions Practiced</p>
                  <p className="text-2xl font-bold">{modules.reduce((sum, m) => sum + m.questions, 0)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold">{Math.round(modules.reduce((sum, m) => sum + m.progress, 0) / modules.length)}%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search modules..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredModules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
              <CardHeader className="pb-3">
                <div className={`w-full h-3 bg-gradient-to-r ${module.color} rounded-full mb-4`} />
                <CardTitle className="text-xl">{module.name}</CardTitle>
                <p className="text-gray-600 text-sm">{module.description}</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{module.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`bg-gradient-to-r ${module.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${module.progress}%` }}
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {module.papers} Papers
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {module.questions} Questions
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    Last activity: {module.lastActivity}
                  </div>

                  <Button className="w-full gap-2" asChild>
                    <Link to={`/module/${module.id}`}>
                      <BookOpen className="w-4 h-4" />
                      Continue Learning
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredModules.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No modules found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or create a new module</p>
            <Button asChild>
              <Link to="/newmodule">Create New Module</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
