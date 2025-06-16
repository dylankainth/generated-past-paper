
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Flame, Calendar } from 'lucide-react';

const StreakTracker = () => {
  const currentStreak = 7;
  const longestStreak = 15;
  
  return (
    <div className="flex items-center gap-3">
      <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
        <CardContent className="p-3 flex items-center gap-2">
          <Flame className="w-5 h-5" />
          <div className="text-center">
            <div className="text-lg font-bold">{currentStreak}</div>
            <div className="text-xs opacity-90">day streak</div>
          </div>
        </CardContent>
      </Card>
      
      <Badge variant="secondary" className="gap-1">
        <Calendar className="w-3 h-3" />
        Best: {longestStreak}
      </Badge>
    </div>
  );
};

export default StreakTracker;
