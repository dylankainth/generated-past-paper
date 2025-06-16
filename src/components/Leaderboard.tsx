
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Medal, Award, Flame, Target } from 'lucide-react';

const Leaderboard = () => {
  const leaderboardData = [
    { rank: 1, name: 'Sarah Chen', streak: 23, score: 1240, avatar: '👩‍🎓' },
    { rank: 2, name: 'Alex Kumar', streak: 19, score: 1180, avatar: '👨‍💻' },
    { rank: 3, name: 'You', streak: 7, score: 890, avatar: '🎯', isCurrentUser: true },
    { rank: 4, name: 'Emma Davis', streak: 12, score: 850, avatar: '👩‍🔬' },
    { rank: 5, name: 'Jake Wilson', streak: 8, score: 720, avatar: '👨‍🎓' },
  ];

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-6 h-6 flex items-center justify-center bg-gray-100 rounded-full text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-white border-0">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl">
            <Trophy className="w-8 h-8" />
            Weekly Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg opacity-90">
            Compete with your study buddies and climb the ranks!
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {leaderboardData.map((user) => (
          <Card 
            key={user.rank} 
            className={`transition-all duration-200 hover:shadow-lg ${
              user.isCurrentUser 
                ? 'ring-2 ring-blue-500 bg-blue-50 border-blue-200' 
                : 'hover:bg-gray-50'
            }`}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getRankIcon(user.rank)}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{user.avatar}</div>
                    <div>
                      <h3 className={`font-semibold ${user.isCurrentUser ? 'text-blue-700' : 'text-gray-900'}`}>
                        {user.name}
                        {user.isCurrentUser && (
                          <Badge className="ml-2 bg-blue-600">You</Badge>
                        )}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {user.score} total points
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <div className="flex items-center gap-1 text-orange-600">
                      <Flame className="w-4 h-4" />
                      <span className="font-bold">{user.streak}</span>
                    </div>
                    <span className="text-xs text-gray-500">day streak</span>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">{user.score}</div>
                    <span className="text-xs text-gray-500">points</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gray-50">
        <CardContent className="p-6 text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-700 mb-2">Keep Practicing!</h3>
          <p className="text-gray-600 text-sm">
            Answer more questions and maintain your streak to climb higher on the leaderboard.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Leaderboard;
