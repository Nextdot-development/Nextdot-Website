import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { motion, AnimatePresence } from "motion/react";

// India TopoJSON with detailed state boundaries
const INDIA_TOPO_URL =
  "https://raw.githubusercontent.com/Anujarya300/bubble_maps/master/data/geography-data/india.topo.json";

// Neighbor countries (GeoJSON) for a subtle regional context
const NEIGHBORS_GEO_URL =
  "https://raw.githubusercontent.com/johan/world.geo.json/master/countries.geo.json";

const NEIGHBOR_IDS = new Set([
  "AFG",
  "BGD",
  "BTN",
  "CHN",
  "MMR",
  "NPL",
  "PAK",
  "LKA",
]);

interface Office {
  city: string;
  type: string;
  address: string;
  coordinates: [number, number];
}

const OFFICES: Office[] = [
  {
    city: "Gurgaon",
    type: "Corporate Office",
    address: "DLF Cyber City, Phase 2\nGurgaon, Haryana 122002, India",
    coordinates: [77.0266, 28.4595],
  },
  {
    city: "Mumbai",
    type: "Regional Office",
    address: "Rcity Offices, Ghatkopar\n Mumbai, Maharashtra 400086, India",
    coordinates: [72.8777, 19.076],
  },
  {
    city: "Jamshedpur",
    type: "AI Capability Centre",
    address: "Bistupur, Jamshedpur, Jharkhand 831001, India",
    coordinates: [86.2029, 22.8046],
  },
];

export const WorldMap = () => {
  const [active, setActive] = useState<Office | null>(null);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-[#E8EDF5] h-[360px] sm:h-[440px] lg:h-[520px] bg-[#F8FAFD] shadow-sm">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          center: [80.5, 22.5],
          scale: 2000,
        }}
        width={900}
        height={600}
        style={{ width: "100%", height: "100%", maxWidth: "100%" }}
      >
        {/* Neighbor countries (faded) */}
        <Geographies geography={NEIGHBORS_GEO_URL}>
          {({ geographies }) =>
            geographies
              .filter((geo) => NEIGHBOR_IDS.has(String(geo.id)))
              .map((geo) => (
                <Geography
                  key={`neighbor-${geo.rsmKey}`}
                  geography={geo}
                  fill="#E6EDF7"
                  stroke="#D7E2F1"
                  strokeWidth={0.6}
                  style={{
                    default: { outline: "none", opacity: 0.65 },
                    hover: { outline: "none" },
                  }}
                />
              ))
          }
        </Geographies>

        {/* India states with detailed boundaries */}
        <Geographies geography={INDIA_TOPO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#F4F7FC"
                stroke="#C5D9F0"
                strokeWidth={0.75}
                style={{
                  default: { outline: "none" },
                  hover: { outline: "none" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Pins */}
        {OFFICES.map((office) => (
          <OfficeMarker
            key={office.city}
            office={office}
            active={active?.city === office.city}
            onHover={() => setActive(office)}
            onLeave={() => setActive(null)}
          />
        ))}
      </ComposableMap>

      {/* Hover tooltip card */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="absolute top-4 right-4 left-4 sm:left-auto sm:top-8 sm:right-8 z-30 w-auto sm:w-[320px] bg-white rounded-[20px] border border-[#E7ECF4] shadow-lg p-4 sm:p-5"
          >
            <div className="text-[18px] font-semibold text-[#0F172A] mb-2">
              {active.city}
            </div>
            <div className="text-[#2563EB] text-[13px] font-medium mb-3">
              {active.type}
            </div>
            <div className="h-px bg-[#EEF2F7] mb-3" />
            <div className="text-[#475569] text-[13px] whitespace-pre-line leading-6">
              {active.address}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function OfficeMarker({
  office,
  active,
  onHover,
  onLeave,
}: {
  office: Office;
  active: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  return (
    <Marker
      coordinates={office.coordinates}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <g style={{ cursor: "pointer" }}>
        {/* Glow effect on hover */}
        {active && (
          <>
            <circle r={20} fill="#2563EB" opacity={0.15} />
            <circle r={14} fill="#2563EB" opacity={0.25} />
          </>
        )}

        {/* Premium pin marker */}
        <g transform="translate(-12,-28)">
          {/* Shadow */}
          <defs>
            <filter id="pin-shadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Pin shape */}
          <path
            d="M12 0C18.6 0 24 5.4 24 12C24 19.5 12 32 12 32C12 32 0 19.5 0 12C0 5.4 5.4 0 12 0Z"
            fill="#2563EB"
            filter="url(#pin-shadow)"
          />

          {/* White center dot */}
          <circle cx="12" cy="11" r="4.5" fill="#FFFFFF" />
        </g>
      </g>
    </Marker>
  );
}