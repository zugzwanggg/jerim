import { useEffect, useState } from "react";
import { MapPin, AlertTriangle, Loader2 } from "lucide-react";
import L from 'leaflet';
import axios from "axios";
import { ReportMap } from "@/components/map/ReportMap";
import { useAppSelector } from "@/hooks/hooks";
import { useNavigate } from "react-router-dom";

const ReportPage = () => {
  const [selectedLocation, setSelectedLocation] = useState<L.LatLng | null>(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLogged } = useAppSelector((state) => state.user);
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLogged) {
      navigate("/auth/signin")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLocation) {
      alert("Please select a location on the map first");
      return;
    }

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
              <ReportMap 
                onLocationSelect={setSelectedLocation} 
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