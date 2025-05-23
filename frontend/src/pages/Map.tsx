import axios from "axios";
import { Leaf, Info } from "lucide-react"
import { useEffect, useState } from "react"
import { useWindowSize } from "@/hooks/useWindowSize";
import { ViewMap } from "@/components/map/ViewMap";

const Map = () => {
  const { isMobile } = useWindowSize();
  const [reports, setReports] = useState([]);

  const getReports = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/reports`);
      setReports(res.data);
      console.log(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=> {
    getReports();
  }, [])

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">JERIM Navigation</h1>
          <p className="text-gray-400">Find the most eco-friendly routes and discover clean areas around you</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-dark-secondary rounded-xl p-4 shadow-lg">
              <div className={`${isMobile ? 'h-[400px]' : 'h-[600px]'} rounded-lg overflow-hidden`}>
                <ViewMap predefinedLocations={reports} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Stats */}
            <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Leaf className="w-5 h-5 text-primary-green" />
                Today's Impact
              </h2>
              <div className="space-y-4">
                <div className="bg-dark-color rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Clean Areas Visited</p>
                  <p className="text-2xl font-bold text-white">12</p>
                </div>
                <div className="bg-dark-color rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Points Earned</p>
                  <p className="text-2xl font-bold text-white">150</p>
                </div>
                <div className="bg-dark-color rounded-lg p-4">
                  <p className="text-gray-400 text-sm">Trees Planted</p>
                  <p className="text-2xl font-bold text-white">15</p>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Info className="w-5 h-5 text-primary-green" />
                Tips
              </h2>
              <div className="space-y-3 text-gray-400">
                <p className="text-sm">• Green routes are optimized for eco-friendly travel</p>
                <p className="text-sm">• Visit clean areas to earn points</p>
                <p className="text-sm">• Report dirty areas to help the community</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Map