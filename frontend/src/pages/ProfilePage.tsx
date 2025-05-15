import { fakeUsers } from "@/constants/mockData";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Award, Mail, Leaf, TreePine, CalendarDays } from "lucide-react";
import axios from "axios";

interface IUser {
  id: number | string;
  username: string;
  email: string;
  avatar: string;
  created_at: string;
}

const ProfilePage = () => {
  const { id } = useParams();
  const userId = id ? parseInt(id) : null;
  const user = userId ? fakeUsers.find((user) => user.id === userId) : null;
  const [userData, setUserData] = useState<null | IUser>(null);
  const [username, setUsername] = useState(userData?.username);
  const [avatar, setAvatar] = useState<string>("");
  const [email, setEmail] = useState(userData?.email);
  const [createdAt, setCreatedAt] = useState<Date | undefined>(undefined);

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const fetchUserData = async () => {
    try {
      const response: IUser = (
        await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${id}`
        )
      ).data;

      setUserData(response);
      setUsername(response?.username);
      setAvatar(response.avatar);
      setEmail(response?.email);
      setCreatedAt(new Date(response.created_at));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        fetchUserData();
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  if (!user) {
    return (
      <div className="pt-32 md:pt-20 px-4 md:px-6">
        <h1 className="text-2xl font-bold text-white">User not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-dark-secondary rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Ava */}
            <div className="relative">
              <img
                src={avatar}
                alt={username}
                className="w-32 h-32 rounded-full object-cover border-4 border-primary-green/30"
              />
              <div className="absolute -bottom-2 -right-2 bg-primary-green rounded-full p-2">
                <Award className="w-6 h-6 text-black" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white mb-2">{username}</h1>

              <div className="flex flex-wrap flex-col md:justify-start gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarDays className="w-4 h-4" />
                  <span>
                    Member since:{" "}
                    {createdAt ? formatDate(createdAt) : "Unknown"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Leaf className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">Points</h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {user.points.toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Total contribution points
            </p>
          </div>

          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <TreePine className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">
                Trees Planted
              </h3>
            </div>
            <p className="text-3xl font-bold text-white">
              {(user.points / 10).toLocaleString()}
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Trees planted through contributions
            </p>
          </div>

          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <div className="flex items-center gap-3 mb-2">
              <Award className="w-6 h-6 text-primary-green" />
              <h3 className="text-xl font-semibold text-white">Rank</h3>
            </div>
            <p className="text-3xl font-bold text-white">#{user.id}</p>
            <p className="text-sm text-gray-400 mt-1">
              Current leaderboard position
            </p>
          </div>
        </div>

        {/* Activity */}
        <div className="mt-6 bg-dark-secondary rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-white mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-3 rounded-lg bg-dark-color/50"
              >
                <div className="w-10 h-10 rounded-full bg-primary-green/20 flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-primary-green" />
                </div>
                <div>
                  <p className="text-white font-medium">Completed a route</p>
                  <p className="text-sm text-gray-400">Earned 10 points</p>
                </div>
                <div className="ml-auto text-sm text-gray-400">2h ago</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
