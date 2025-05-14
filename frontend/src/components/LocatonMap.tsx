import { useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate, Loader2, XCircle } from 'lucide-react';

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom red marker icon
const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

interface Coordinates {
  lat: number;
  lng: number;
}

interface MapWithControlsProps {
  onLocationSelect?: (coordinates: L.LatLng) => void;
  predefinedLocations?: Coordinates[];
  mode?: 'navigation' | 'report';
  selectedLocation?: L.LatLng | null;
}

const LocationMarker = () => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const map = useMapEvents({
    locationfound(e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, 13);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup className="font-medium">
        📍 Your current location
      </Popup>
    </Marker>
  );
};

const MapClickHandler = ({ onLocationSelect, mode }: { onLocationSelect?: (coordinates: L.LatLng) => void, mode: 'navigation' | 'report' }) => {
  useMapEvents({
    click(e) {
      if (mode === 'report') {
        onLocationSelect?.(e.latlng);
      }
    }
  });
  return null;
};

const MapWithControls = ({ onLocationSelect, predefinedLocations = [], mode = 'navigation', selectedLocation }: MapWithControlsProps) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<L.LatLng | null>(selectedLocation || null);

  const handleLocate = useCallback(() => {
    if (!mapInstance) return;

    setIsLocating(true);
    mapInstance.locate().on('locationfound', () => {
      setIsLocating(false);
    }).on('locationerror', () => {
      setIsLocating(false);
      alert('Location access denied. Please enable permissions in your browser settings.');
    });
  }, [mapInstance]);

  const handleLocationSelect = useCallback((latlng: L.LatLng) => {
    setSelectedPoint(latlng);
    onLocationSelect?.(latlng);
  }, [onLocationSelect]);

  // Convert coordinates to LatLng objects
  const predefinedMarkers = predefinedLocations.map(coord => new L.LatLng(coord.lat, coord.lng));

  return (
    <div className="relative z-10 h-full w-full rounded-xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={[47.1167, 51.8833]} // Atyrau coordinates
        zoom={13}
        scrollWheelZoom={true}
        className="h-full w-full"
        ref={setMapInstance}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker />
        <MapClickHandler onLocationSelect={handleLocationSelect} mode={mode} />

        {/* Selected point in report mode */}
        {mode === 'report' && selectedPoint && (
          <Marker 
            position={selectedPoint}
            icon={redIcon}
          >
            <Popup className="font-medium">
              🚯 Selected Location
            </Popup>
          </Marker>
        )}

        {/* Predefined locations */}
        {predefinedMarkers.map((location, index) => (
          <Marker 
            key={`location-${index}`}
            position={location}
            icon={redIcon}
          >
            <Popup className="font-medium">
              🚯 Dirty Area #{index + 1}<br />
              Reported: {new Date().toLocaleDateString()}
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Locate button */}
      <div className="absolute z-[1000] bottom-4 right-4 flex flex-col gap-2">
        <button
          onClick={handleLocate}
          disabled={isLocating}
          className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-black"
        >
          {isLocating ? (
            <>
              <Loader2 className="animate-spin h-5 w-5 text-blue-600" />
              Locating...
            </>
          ) : (
            <>
              <Locate className="h-5 w-5 text-blue-600" />
              Find Me
            </>
          )}
        </button>

        {mode === 'report' && selectedPoint && (
          <button
            onClick={() => {
              setSelectedPoint(null);
              onLocationSelect?.(selectedPoint);
            }}
            className="bg-red-100 px-4 py-2 rounded-lg shadow-md hover:bg-red-200 transition-colors flex items-center gap-2 text-sm font-medium text-red-800"
          >
            <XCircle className="h-5 w-5" />
            Clear Selection
          </button>
        )}
      </div>
    </div>
  );
};

export default MapWithControls;