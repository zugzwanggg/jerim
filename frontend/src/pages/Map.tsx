import MapWithControls from "@/components/LocatonMap"
import { Leaf, Info } from "lucide-react"

const Map = () => {
  // Example coordinates, we will get this from the backend)
  const predefinedAreas = [
    [
      { lat: 47.1262300592947, lng: 51.90915336778938 },
      { lat: 47.113723007342514, lng: 51.90486081731527 },
      { lat: 47.12026912086247, lng: 51.91979889296519 },
      { lat: 47.12646380797616, lng: 51.91756676671864 }
    ]
  ];

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
              <div className="h-[600px] rounded-lg overflow-hidden">
                <MapWithControls predefinedAreas={predefinedAreas} />
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