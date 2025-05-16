import UserCard from "@/components/UserCard"
import { fakeUsers } from "@/constants/mockData"
import { Trophy, Sparkles } from "lucide-react"

const Leaderboard = () => {
  const sortedUsers = [...fakeUsers].sort((a, b) => b.points - a.points);
  const [firstPlace, secondPlace, thirdPlace, ...restUsers] = sortedUsers;

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6 min-h-screen bg-gradient-to-b from-dark-color to-dark-secondary">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 bg-dark-secondary/50 px-6 py-3 rounded-full mb-4 backdrop-blur-sm border border-white/5">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h1 className="text-2xl font-bold text-white">Global Leaderboard</h1>
          </div>
          <p className="text-gray-400">Top contributors making Atyrau a cleaner place</p>
        </div>

        {/* Podium Section */}
        <div className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Second Place */}
            <div className="md:mt-16 order-2 md:order-1">
              {secondPlace && (
                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-gray-400 to-gray-500 text-white px-6 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>2nd Place</span>
                    </div>
                  </div>
                  <div className="bg-dark-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-300 hover:shadow-xl hover:shadow-gray-500/10 min-h-[140px] flex items-center">
                    <UserCard 
                      user={secondPlace} 
                      rank={2}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* First Place */}
            <div className="order-1 md:order-2">
              {firstPlace && (
                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-4 h-4" />
                      <span>1st Place</span>
                    </div>
                  </div>
                  <div className="bg-dark-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 group-hover:border-yellow-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20 min-h-[150px] flex items-center">
                    <UserCard 
                      user={firstPlace} 
                      rank={1}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Third Place */}
            <div className="md:mt-20 order-3">
              {thirdPlace && (
                <div className="relative group">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-600 to-amber-700 text-white px-6 py-2 rounded-full text-sm font-medium z-10 shadow-lg">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      <span>3rd Place</span>
                    </div>
                  </div>
                  <div className="bg-dark-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/20 group-hover:border-amber-600/30 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 min-h-[140px] flex items-center">
                    <UserCard 
                      user={thirdPlace} 
                      rank={3}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Rest of the Leaderboard */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-gray-400" />
            Other Contributors
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restUsers.map((user, index) => (
              <div key={user.id} className="group">
                <div className="bg-dark-secondary/80 backdrop-blur-sm rounded-xl p-4 border border-gray-800/50 group-hover:border-gray-700/50 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/5">
                  <UserCard 
                    user={user} 
                    rank={index + 4}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;