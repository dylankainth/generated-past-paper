
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Clock, Target, CheckCircle2, Play, Zap } from 'lucide-react';

const ModulePage = () => {
  const { moduleId } = useParams();
  const [module, setModule] = useState(null);

  // get modules from /api/modules endpoint using fetch
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch('/api/dashboardData');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);

        for (const mod of data.modules) {
          if (mod.id == moduleId) {
            setModule(mod);
            break;
          }
        }

      } catch (error) {
        console.error('Error fetching modules:', error);
      }
    };

    fetchModules();
  }, []);


  if (!module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Module Not Found</h1>
          <Button asChild>
            <Link to="/dashboard">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const completionPercentage = (completed: number, total: number) =>
    Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Link>
              </Button>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">{module.name}</h1>
                <p className="text-sm text-gray-600">{module.description}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Module Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className={`w-full h-4 bg-gradient-to-r ${module.color} rounded-full mb-6`} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">{module.papers.length}</div>
                <div className="text-sm text-gray-600">Total Papers</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Papers List */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Practice Papers</h2>

          <div className="grid gap-6">
            {module.papers.map((paper) => {


              return (
                <Card key={paper.id} className="hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2 flex items-center gap-2">
                          {paper.name}

                        </CardTitle>
                        <div className="flex gap-2 mb-3">
                          <Badge className={getDifficultyColor(paper.difficulty)}>
                            {paper.difficulty}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Clock className="w-3 h-3" />
                            {paper.timeLimit}
                          </Badge>

                        </div>
                      </div>
                      <Button className="gap-2" asChild>
                        <Link to={`/paper/${paper.id}`}>
                          <Play className="w-4 h-4" />
                          {paper.completed === 0 ? 'Start' : 'Continue'}
                        </Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">



                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModulePage;
