import { useCallback, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Locate, Loader2, XCircle, MapPin } from 'lucide-react';

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
  onAreaSelect?: (coordinates: L.LatLng[]) => void;
  predefinedAreas?: Coordinates[][];
  mode?: 'navigation' | 'report';
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

interface DrawingHandlerProps {
  onAddPoint: (latlng: L.LatLng) => void;
  onComplete: () => void;
  currentPolygon: L.LatLng[];
}

const DrawingHandler = ({ onAddPoint, currentPolygon }: DrawingHandlerProps) => {
  useMapEvents({
    click(e) {
      onAddPoint(e.latlng);
    }
  });

  return (
    <>
      {currentPolygon.length > 0 && (
        <Polygon 
          positions={currentPolygon}
          pathOptions={{
            color: 'red',
            fillOpacity: 0.2,
          }}
        />
      )}
    </>
  );
};

const MapWithControls = ({ onAreaSelect, predefinedAreas = [], mode = 'navigation' }: MapWithControlsProps) => {
  const [mapInstance, setMapInstance] = useState<L.Map | null>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPolygon, setCurrentPolygon] = useState<L.LatLng[]>([]);
  const [dirtyAreas, setDirtyAreas] = useState<L.LatLng[][]>([]);
  const [visibleAreas, setVisibleAreas] = useState<{ [key: number]: boolean }>({});

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

  const handleAddPoint = useCallback((latlng: L.LatLng) => {
    setCurrentPolygon((prev) => [...prev, latlng]);
  }, []);

  const handleCompleteDrawing = useCallback(() => {
    if (currentPolygon.length >= 3) {
      setDirtyAreas((prev) => [...prev, currentPolygon]);
      onAreaSelect?.(currentPolygon);
    }
    setCurrentPolygon([]);
    setIsDrawing(false);
  }, [currentPolygon, onAreaSelect]);

  const toggleArea = useCallback((index: number) => {
    setVisibleAreas(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  }, []);

  // Convert coordinates to LatLng objects
  const predefinedLatLngs = predefinedAreas.map(area => 
    area.map(coord => new L.LatLng(coord.lat, coord.lng))
  );

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

        {/* Predefined areas */}
        {predefinedLatLngs.map((area, index) => {
          const center = area.reduce((acc, point) => {
            return {
              lat: acc.lat + point.lat / area.length,
              lng: acc.lng + point.lng / area.length
            };
          }, { lat: 0, lng: 0 });

          return (
            <div key={`area-${index}`}>
              <Marker 
                position={center} 
                icon={redIcon}
                eventHandlers={{
                  click: () => toggleArea(index)
                }}
              >
                <Popup className="font-medium">
                  🚯 Dirty Area #{index + 1}<br />
                  Click to {visibleAreas[index] ? 'hide' : 'show'} area
                </Popup>
              </Marker>
              {visibleAreas[index] && (
                <Polygon
                  positions={area}
                  pathOptions={{
                    color: '#dc2626',
                    fillColor: '#f87171',
                    fillOpacity: 0.4,
                    weight: 2
                  }}
                />
              )}
            </div>
          );
        })}

        {/* Existing dirty areas */}
        {dirtyAreas.map((area, index) => (
          <Polygon
            key={`dirty-${index}`}
            positions={area}
            pathOptions={{
              color: '#dc2626',
              fillColor: '#f87171',
              fillOpacity: 0.4,
              weight: 2
            }}
          >
            <Popup className="font-medium">
              🚯 Dirty Area #{index + 1}<br />
              Reported: {new Date().toLocaleDateString()}
            </Popup>
          </Polygon>
        ))}

        {/* Current drawing overlay */}
        {isDrawing && (
          <DrawingHandler
            onAddPoint={handleAddPoint}
            onComplete={handleCompleteDrawing}
            currentPolygon={currentPolygon}
          />
        )}
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

        {mode === 'report' && (
          !isDrawing ? (
            <button
              onClick={() => setIsDrawing(true)}
              className="bg-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors flex items-center gap-2 text-sm font-medium text-black"
            >
              <MapPin className="h-5 w-5 text-red-600" />
              Mark Dirty Zone
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <button
                onClick={handleCompleteDrawing}
                disabled={currentPolygon.length < 3}
                className="bg-green-100 px-4 py-2 rounded-lg shadow-md hover:bg-green-200 transition-colors flex items-center gap-2 text-sm font-medium text-green-800"
              >
                Complete Area ({currentPolygon.length} points)
              </button>
              <button
                onClick={() => {
                  setCurrentPolygon([]);
                  setIsDrawing(false);
                }}
                className="bg-red-100 px-4 py-2 rounded-lg shadow-md hover:bg-red-200 transition-colors flex items-center gap-2 text-sm font-medium text-red-800"
              >
                <XCircle className="h-5 w-5" />
                Cancel
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default MapWithControls;