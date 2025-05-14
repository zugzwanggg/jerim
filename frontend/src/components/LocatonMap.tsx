import { useCallback, useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate, Loader2, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

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

export interface Coordinates {
  id: number;
  lat: string;
  lng: string;
  comment?: string;
  user_id: number;
  created_at?: string;
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
  const [markers, setMarkers] = useState<Array<{
    position: L.LatLng;
    description?: string;
    username?: string;
    created_at?: string;
    user_id: number;
  }>>([]);

  const ATYRAU_BOUNDS = L.latLngBounds(
    L.latLng(47.0, 51.7),  
    L.latLng(47.2, 52.0) 
  );

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
    if (mode === 'report' && !ATYRAU_BOUNDS.contains(latlng)) {
      toast.error('Please select a location within Atyrau city boundaries.');
      return;
    }
    setSelectedPoint(latlng);
    onLocationSelect?.(latlng);
  }, [onLocationSelect, mode]);

  const getUser = async (id: number) => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/api/user/${id}`);
      return res.data.username; 
    } catch (error) {
      console.log(error);
      return 'Unknown User';
    }
  }

  useEffect(() => {
    const fetchMarkerData = async () => {
      const markersData = await Promise.all(
        predefinedLocations.map(async (coord) => {
          const username = coord.user_id ? await getUser(coord.user_id) : undefined;
          return {
            position: new L.LatLng(parseFloat(coord.lat), parseFloat(coord.lng)),
            description: coord.comment,
            username,
            created_at: coord.created_at,
            user_id: coord.user_id
          };
        })
      );
      setMarkers(markersData);
    };

    fetchMarkerData();
  }, [predefinedLocations]);

  return (
    <div className="relative z-10 h-full w-full rounded-xl overflow-hidden border-2 border-gray-200">
      <MapContainer
        center={[47.1167, 51.8833]} // Atyrau coordinates
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
        <LocationMarker />
        <MapClickHandler onLocationSelect={handleLocationSelect} mode={mode} />

        {mode === 'report' && selectedPoint && (
          <Marker 
            position={selectedPoint}
            icon={redIcon}
          >
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

        {markers.map((location, index) => (
          <Marker 
            key={`location-${index}`}
            position={location.position}
            icon={redIcon}
          >
            <Popup className="font-medium">
              <div className="p-1.5 md:p-2 min-w-[200px] md:min-w-[250px]">
                <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3 pb-1.5 md:pb-2 border-b border-gray-200">
                  <div className="bg-red-100 p-1 md:p-1.5 rounded-lg">
                    <span className="text-red-500 text-base md:text-lg">🚯</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 text-sm md:text-base">Dirty Area #{index + 1}</h3>
                    <p className="text-[10px] md:text-xs text-gray-500">Reported Issue</p>
                  </div>
                </div>

                {location.description && (
                  <div className="mb-2 md:mb-3">
                    <p className="text-xs md:text-sm text-gray-600 bg-gray-50 p-1.5 md:p-2 rounded-lg">
                      {location.description}
                    </p>
                  </div>
                )}

                <div className="flex flex-col gap-1 md:gap-1.5 text-[10px] md:text-xs text-gray-500 bg-gray-50 p-1.5 md:p-2 rounded-lg">
                  {location.username && (
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="font-medium text-gray-600">Reported by:</span>
                      <Link to={`/profile/${location.user_id}`} className="text-blue-500 hover:underline">
                        {location.username}
                      </Link>
                    </div>
                  )}
                  {location.created_at && (
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <span className="font-medium text-gray-600">Date:</span>
                      <span>
                        {new Date(location.created_at).toLocaleString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  )}
                </div>
              </div>
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