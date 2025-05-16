import { Link } from "react-router-dom";
import { Medal, Trophy, Star } from "lucide-react";

interface User {
  id: number;
  name: string;
  email: string;
  bio: string;
  points: number;
  image: string;
}

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard = ({ user, rank }: UserCardProps) => {
  const getRankIcon = () => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5" />;
      case 2:
      case 3:
        return <Medal className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
  };

  const getRankColor = () => {
    switch (rank) {
      case 1:
        return 'from-yellow-400 to-yellow-600';
      case 2:
        return 'from-gray-300 to-gray-400';
      case 3:
        return 'from-amber-500 to-amber-700';
      default:
        return 'from-gray-600 to-gray-700';
    }
  };

  return (
    <Link 
      to={`/profile/${user.id}`} 
      className="block transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-br ${getRankColor()}`}>
          {getRankIcon()}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-white truncate">{user.name}</h3>
          <div className="flex items-center gap-2">
            <p className="text-gray-300">{user.points.toLocaleString()}</p>
            <span className="text-xs text-gray-400">points</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;