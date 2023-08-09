import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import { useRef, useEffect, useState } from 'react';

interface LeafletMapProps {
  coordinates: L.LatLngExpression[];
}

export function LeafletMap({ coordinates }: LeafletMapProps) {
  const leafletMapContainer = useRef<HTMLDivElement | null>(null);
  const leafletMarkersLayerGroup = useRef<L.LayerGroup>();

  const [leafletMap, setLeafletMap] = useState<L.Map>();

  useEffect(() => {
    L.Icon.Default.imagePath = '/images/leaflet/';

    const newLeafletMap = L.map('map-container', {
      scrollWheelZoom: false,
      layers: [
        L.tileLayer(
          `https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png?api_key=${window.ENV.STADIA_MAP_API_KEY}`
        ),
      ],
    });

    newLeafletMap.fitBounds(L.latLngBounds(coordinates));
    setLeafletMap(newLeafletMap);

    return () => {
      newLeafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (!leafletMap) return;

    leafletMap.flyToBounds(L.latLngBounds(coordinates), {
      duration: 1,
      paddingTopLeft: [25, 25],
      paddingBottomRight: [25, 25],
    });

    if (leafletMarkersLayerGroup.current) {
      leafletMarkersLayerGroup.current.clearLayers();
    }

    leafletMarkersLayerGroup.current = L.layerGroup(coordinates.map((a) => L.marker(a))).addTo(
      leafletMap
    );
  }, [leafletMap, coordinates]);

  return <div className="mapContainer" id="map-container" ref={leafletMapContainer} />;
}
