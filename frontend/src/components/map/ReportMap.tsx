import { useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const MapClickHandler = ({ onLocationSelect }: { onLocationSelect: (coordinates: L.LatLng) => void }) => {
  useMapEvents({
    click(e) {
      onLocationSelect(e.latlng);
    }
  });
  return null;
};

export const ReportMap = ({ 
  onLocationSelect,
  selectedLocation
}: { 
  onLocationSelect: (coordinates: L.LatLng) => void;
  selectedLocation: L.LatLng | null;
}) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [selectedPoint, setSelectedPoint] = useState<L.LatLng | null>(selectedLocation);

  console.log(mapInstance)

  const ATYRAU_BOUNDS = L.latLngBounds(
    L.latLng(47.0, 51.7),
    L.latLng(47.2, 52.0)
  );

  const handleLocationSelect = useCallback((latlng: L.LatLng) => {
    if (!ATYRAU_BOUNDS.contains(latlng)) {
      toast.error('Please select a location within Atyrau city boundaries.');
      return;
    }
    setSelectedPoint(latlng);
    onLocationSelect(latlng);
  }, [onLocationSelect]);

  return (
    <div className="relative z-10 h-full w-full rounded-xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={[47.1167, 51.8833]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        ref={setMapInstance}
        maxBounds={ATYRAU_BOUNDS}
        maxBoundsViscosity={1.0}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapClickHandler onLocationSelect={handleLocationSelect} />

        {selectedPoint && (
          <Marker position={selectedPoint} icon={redIcon}>
            <Popup className="font-medium">
              <div className="p-1">
                <p className="font-semibold text-gray-800">Selected Location</p>
                <p className="text-sm text-gray-600 mt-1">
                  Click "Submit Report" to report this area
                </p>
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {selectedPoint && (
        <div className="absolute z-[1000] bottom-4 right-4">
          <button
            onClick={() => {
              setSelectedPoint(null);
              onLocationSelect(selectedPoint);
            }}
            className="bg-red-100 px-4 py-2 rounded-lg shadow-md hover:bg-red-200 transition-colors flex items-center gap-2 text-sm font-medium text-red-800"
          >
            <XCircle className="h-5 w-5" />
            Clear Selection
          </button>
        </div>
      )}
    </div>
  );
};