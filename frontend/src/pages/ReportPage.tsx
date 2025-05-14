import { useState } from "react";
import { MapPin, AlertTriangle, Trash2 } from "lucide-react";
import MapWithControls from "@/components/LocatonMap";
import L from 'leaflet';

// interface Coordinates {
//   lat: number;
//   lng: number;
// }

interface TrashBrand {
  name: string;
  count: number;
}

const ReportPage = () => {
  const [selectedArea, setSelectedArea] = useState<L.LatLng[]>([]);
  const [placeName, setPlaceName] = useState("");
  const [dirtLevel, setDirtLevel] = useState<"low" | "medium" | "high">("medium");
  const [trashBrands, setTrashBrands] = useState<TrashBrand[]>([
    { name: "", count: 0 }
  ]);
  const [description, setDescription] = useState("");
  console.log(selectedArea);
  
  const handleAddTrashBrand = () => {
    setTrashBrands([...trashBrands, { name: "", count: 0 }]);
  };

  const handleTrashBrandChange = (index: number, field: keyof TrashBrand, value: string | number) => {
    const newTrashBrands = [...trashBrands];
    newTrashBrands[index] = {
      ...newTrashBrands[index],
      [field]: value
    };
    setTrashBrands(newTrashBrands);
  };

  const handleRemoveTrashBrand = (index: number) => {
    setTrashBrands(trashBrands.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedArea.length < 3) {
      alert("Please select an area on the map first");
      return;
    }

    // Convert LatLng objects to simple coordinates
    const coordinates = selectedArea.map(point => ({
      lat: point.lat,
      lng: point.lng
    }));

    // Here you would typically send the data to your backend
    console.log({
      coordinates,
      placeName,
      dirtLevel,
      trashBrands,
      description
    });
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
              <MapWithControls onAreaSelect={setSelectedArea} mode="report" />
            </div>
            {selectedArea.length > 0 && (
              <p className="text-sm text-gray-400 mt-2">
                Selected area with {selectedArea.length} points
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
              </div>

              <div>
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
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
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
          <div className="bg-dark-secondary rounded-xl p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-primary-green" />
              Common Trash Brands
            </h2>
            
            <div className="space-y-4">
              {trashBrands.map((brand, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <input
                      type="text"
                      value={brand.name}
                      onChange={(e) => handleTrashBrandChange(index, "name", e.target.value)}
                      className="w-full bg-dark-color text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Brand name (e.g., Coca-Cola, Pepsi)"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      value={brand.count}
                      onChange={(e) => handleTrashBrandChange(index, "count", parseInt(e.target.value) || 0)}
                      className="w-full bg-dark-color text-white rounded-lg px-4 py-2 focus:ring-2 focus:ring-primary-green focus:border-transparent"
                      placeholder="Count"
                      min="0"
                    />
                  </div>
                  {trashBrands.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveTrashBrand(index)}
                      className="p-2 text-red-500 hover:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              
              <button
                type="button"
                onClick={handleAddTrashBrand}
                className="text-primary-green hover:text-primary-green/80 text-sm font-medium"
              >
                + Add another brand
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-primary-green text-black font-semibold py-3 rounded-lg hover:bg-primary-green/90 transition-all"
          >
            Submit Report
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportPage;