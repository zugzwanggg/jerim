import { Link } from "react-router-dom";

interface User {
  id: number;
  username: string;
  avatar: string;
  points: number;
  rank_num: number;
}

interface UserCardProps {
  user: User;
  rank: number;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link
      to={`/profile/${user.id}`}
      className="block transition-all duration-300 hover:scale-[1.02]"
    >
      <div className="flex items-center gap-4">
        <div
          className={`w-12 h-12 flex items-center justify-center rounded-full shadow-lg bg-gradient-to-br`}
        >
          <img src={user.avatar} alt={user.username} className="rounded-full" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-lg text-white truncate">
            {user.username}
          </h3>
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
