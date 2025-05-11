import { Link } from "react-router-dom";

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
  const isTopThree = rank <= 3;
  
  return (
    <Link to={`/profile/${user.id}`} className={`p-4 rounded-lg shadow-lg transition-all duration-300 hover:scale-[1.02] ${
      isTopThree 
        ? rank === 1 
          ? 'bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-2 border-yellow-500/50' 
          : rank === 2 
            ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/50 border-2 border-gray-400/50'
            : 'bg-gradient-to-r from-amber-900/50 to-amber-800/50 border-2 border-amber-600/50'
        : 'bg-dark-secondary hover:bg-dark-secondary/80'
    }`}>
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg ${
          rank === 1 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' : 
          rank === 2 ? 'bg-gradient-to-br from-gray-300 to-gray-400' : 
          rank === 3 ? 'bg-gradient-to-br from-amber-500 to-amber-700' : 'bg-gradient-to-br from-gray-600 to-gray-700'
        }`}>
          <span className="font-bold text-white text-lg">{rank}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-white">{user.name}</h3>
          <p className="text-gray-300">{user.points.toLocaleString()} points</p>
        </div>
      </div>
    </Link>
  )
}

export default UserCard