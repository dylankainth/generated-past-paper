
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, BookOpen, Target, Users, TrendingUp, FileText, Zap, ArrowRight, Star, Clock, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FBBC04] rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
                  Scinapse
                </h1>
                <p className="text-sm text-gray-600">AI-Powered Practice Questions</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              <Button asChild>
                <Link to="/newmodule">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-[#4285F4] to-[#34A853] bg-clip-text text-transparent">
            Transform Your Study Materials into Practice Questions
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Upload your PDFs, notes, or past papers and let AI generate personalized questions for better exam prep. 
            Track your progress and compete with friends!
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/dashboard">
                <BookOpen className="w-5 h-5" />
                Start Practicing
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="gap-2" asChild>
              <Link to="/newmodule">
                <Upload className="w-5 h-5" />
                Upload Materials
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">How Scinapse Works</h2>
          <p className="text-gray-600 text-lg">Three simple steps to better exam preparation</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#4285F4] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload Materials</h3>
              <p className="text-gray-600">Upload your PDFs, lecture notes, or past papers</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#34A853] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Generation</h3>
              <p className="text-gray-600">Our AI creates personalized practice questions</p>
            </CardContent>
          </Card>

          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-[#ea4335] rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Practice & Improve</h3>
              <p className="text-gray-600">Practice questions and track your progress</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/60 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Scinapse?</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Save Time</h3>
              <p className="text-sm text-gray-600">No more searching for practice questions</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Personalized</h3>
              <p className="text-sm text-gray-600">Questions tailored to your materials</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-2">Track Progress</h3>
              <p className="text-sm text-gray-600">Monitor streaks and improvements</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Compete</h3>
              <p className="text-sm text-gray-600">Challenge friends and classmates</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-[#4285F4] to-[#34A853] text-white border-0">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Ace Your Exams?</h2>
            <p className="text-lg opacity-90 mb-8">
              Join thousands of students who have improved their exam performance with Scinapse
            </p>
            <Button size="lg" variant="secondary" className="gap-2" asChild>
              <Link to="/dashboard">
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Index;
