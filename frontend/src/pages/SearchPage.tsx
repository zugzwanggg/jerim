import UserCard from "@/components/UserCard"
import { fakeUsers } from "@/constants/mockData"
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SearchPage = () => {

  const location = useLocation();
  const removeSpace = location?.search?.slice(3)?.split("%20")?.join(" ")
  const [query] = useState(removeSpace)

  const sortedUsers = [...fakeUsers].sort((a, b) => b.points - a.points);

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6">
      <h1 className="text-2xl font-bold mb-6">Search - <span className="text-primary-green">"{query}"</span></h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedUsers.map((user, index) => (
          <UserCard 
            key={user.id} 
            user={user} 
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  )
}

export default SearchPage