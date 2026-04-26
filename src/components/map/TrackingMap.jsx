import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet marker icon issues
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom icons
const riderIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-10 h-10 bg-[var(--accent)] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5.5 17.5L2 14l3.5-3.5M9 17.5L12.5 14 9 10.5M15 17.5l3.5-3.5-3.5-3.5M22 17.5L18.5 14 22 10.5"/></svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const restaurantIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-10 h-10 bg-black rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

const homeIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `<div class="w-10 h-10 bg-[var(--green)] rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
  </div>`,
  iconSize: [40, 40],
  iconAnchor: [20, 20]
});

/**
 * Component to auto-fit map bounds
 */
const ChangeView = ({ bounds }) => {
  const map = useMap();
  useEffect(() => {
    if (bounds) map.fitBounds(bounds, { padding: [50, 50] });
  }, [bounds, map]);
  return null;
};

/**
 * Delivery tracking map
 * @param {Object} props
 * @param {Array<number>} props.riderPos
 * @param {Array<number>} props.restaurantPos
 * @param {Array<number>} props.homePos
 */
export const TrackingMap = ({ riderPos, restaurantPos, homePos }) => {
  const center = [
    (restaurantPos[0] + homePos[0]) / 2,
    (restaurantPos[1] + homePos[1]) / 2,
  ];

  const bounds = [restaurantPos, homePos];

  return (
    <div className="w-full h-full">
      <MapContainer 
        center={center} 
        zoom={14} 
        scrollWheelZoom={false}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <ChangeView bounds={bounds} />
        
        <Marker position={restaurantPos} icon={restaurantIcon}>
          <Popup>Burger Theory</Popup>
        </Marker>
        
        <Marker position={homePos} icon={homeIcon}>
          <Popup>Your Home</Popup>
        </Marker>
        
        <Marker position={riderPos} icon={riderIcon}>
          <Popup>Rider is here</Popup>
        </Marker>

        <Polyline 
          positions={[restaurantPos, riderPos, homePos]} 
          color="#f97316" 
          dashArray="10, 10" 
          weight={3}
          opacity={0.6}
        />
      </MapContainer>
    </div>
  );
};
