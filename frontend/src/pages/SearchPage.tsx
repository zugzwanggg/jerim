import UserCard from "@/components/UserCard";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

interface IUser {
  id: number;
  username: string;
  avatar: string;
  points: number;
  rank_num: number;
}

const SearchPage = () => {
  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ");
  const [query] = useState(removeSpace);

  const [users, setUsers] = useState<IUser[]>([]);

  const fetchUsers = async () => {
    try {
      const response = (
        await axios.get(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/api/search?q=${query}`
        )
      ).data;

      setUsers(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    try {
      fetchUsers();
    } catch (error) {
      console.log(error);
    }
  });

  if (!users[0]) {
    return (
      <div className="pt-32 md:pt-20 px-4 md:px-6">
        <h1 className="text-2xl font-bold text-white">User not found</h1>
      </div>
    );
  }

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">
        Search - <span className="text-primary-green">"{query}"</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <UserCard key={user.id} user={user} rank={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
