import { useState } from "react";
import { MapPin, AlertTriangle, Loader2 } from "lucide-react";
import MapWithControls from "@/components/LocatonMap";
import L from 'leaflet';
import axios from "axios";

// const COMMON_BRANDS = [
//   "Coca-Cola",
//   "Pepsi",
//   "Nestle",
//   "Danone",
//   "Mars",
//   "Snickers",
//   "Lays",
//   "Pringles",
//   "Heineken",
//   "Carlsberg",
//   "Other"
// ];

const ReportPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<L.LatLng | null>(null);
  // const [placeName, setPlaceName] = useState("");
  // const [dirtLevel, setDirtLevel] = useState<"low" | "medium" | "high">("medium");
  // const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const handleBrandSelect = (brand: string) => {
  //   if (selectedBrands.includes(brand)) {
  //     setSelectedBrands(selectedBrands.filter(b => b !== brand));
  //   } else {
  //     setSelectedBrands([...selectedBrands, brand]);
  //   }
  // };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert("Please select a location on the map first");
      return;
    }

    // const trashBrands = selectedBrands.map(brand => ({
    //   name: brand,
    //   count: 1
    // }));
    setIsLoading(true)
    try {
      
      await axios.post(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/reports`, {
        lat: selectedLocation.lat,
        lng: selectedLocation.lng,
        comment: description
      })

      setDescription('')
      setSelectedLocation(null)

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="pt-32 md:pt-20 px-4 md:px-6 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6">Report Dirty Area</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Map Section */}
          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-green" />
              Select Location
            </h2>
            <div className="h-[300px] rounded-lg overflow-hidden">
              <MapWithControls 
                onLocationSelect={setSelectedLocation} 
                mode="report"
                selectedLocation={selectedLocation}
              />
            </div>
            {selectedLocation && (
              <p className="text-sm text-gray-400 mt-2">
                Selected location: {selectedLocation.lat.toFixed(6)}, {selectedLocation.lng.toFixed(6)}
              </p>
            )}
          </div>

          {/* Place Details */}
          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-primary-green" />
              Place Details
            </h2>
            
            <div className="space-y-4">
              {/* <div>
                <label htmlFor="placeName" className="block text-sm font-medium text-gray-300 mb-1">
                  Place Name
                </label>
                <input
                  type="text"
                  id="placeName"
                  value={placeName}
                  onChange={(e) => setPlaceName(e.target.value)}
                  className="w-full bg-dark-color text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  placeholder="Enter the name of the place"
                  required
                />
              </div> */}

              {/* <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Level of Pollution
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["low", "medium", "high"].map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => setDirtLevel(level as "low" | "medium" | "high")}
                      className={`p-3 rounded-lg text-center transition-all ${
                        dirtLevel === level
                          ? "bg-primary-green text-black font-semibold"
                          : "bg-dark-color text-gray-300 hover:bg-dark-color/80"
                      }`}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </button>
                  ))}
                </div>
              </div> */}

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Comment
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-dark-color text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green focus:border-transparent"
                  rows={3}
                  placeholder="Describe the area and situation..."
                  required
                />
              </div>
            </div>
          </div>

          {/* Trash Brands */}
          {/* <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-primary-green" />
              Common Trash Brands
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {COMMON_BRANDS.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => handleBrandSelect(brand)}
                  className={`relative p-3 rounded-lg text-center transition-all ${
                    selectedBrands.includes(brand)
                      ? "bg-primary-green text-black font-medium"
                      : "bg-dark-color text-gray-300 hover:bg-dark-color/80"
                  }`}
                >
                  {brand}
                  {selectedBrands.includes(brand) && (
                    <Check className="absolute top-1 right-1 w-4 h-4" />
                  )}
                </button>
              ))}
            </div>
          </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full text-white bg-primary-green text-black font-semibold py-3 rounded-lg hover:bg-primary-green/90 transition-all"
          >
            {
              isLoading
              ?
              <Loader2 className="animate-spin mx-auto"/>
              :
              'Submit Report'
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;