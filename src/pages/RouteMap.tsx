import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function RouteMap() {
  const navigate = useNavigate();

  const points = [
    { id: 'A', name: 'Start Point', area: 'Kabelvåg', type: 'origin' },
    { id: 'B', name: 'Ravi Kumar', area: 'Vestvågøy', type: 'delivery' },
    { id: 'C', name: 'Priya Devi', area: 'Leknes', type: 'delivery' },
    { id: 'D', name: 'Sunita Rao', area: 'Ballstad', type: 'delivery' },
    { id: 'E', name: 'Final Stop', area: 'Reine', type: 'delivery' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="Delivery Route" showBack />
      
      <div className="p-4 space-y-4">
        {/* Mock Map Container */}
        <div className="relative w-full aspect-[4/3] bg-blue-50 rounded-[32px] overflow-hidden border-4 border-white shadow-xl">
          {/* Mock Map Background (Grid) */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
          
          {/* Mock Route Line (SVG) */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 300">
            <motion.path
              d="M320,80 L280,120 L200,100 L180,160 L120,180 L80,240"
              fill="none"
              stroke="#2563eb"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Map Points */}
          <MapMarker x={320} y={80} label="A" color="bg-purple-700" />
          <MapMarker x={200} y={100} label="B" color="bg-yellow-400" />
          <MapMarker x={180} y={160} label="C" color="bg-yellow-400" />
          <MapMarker x={120} y={180} label="D" color="bg-yellow-400" />
          <MapMarker x={80} y={240} label="E" color="bg-blue-600" pulse />
        </div>

        {/* Route Info */}
        <div className="bg-white rounded-[32px] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Optimal Route</h3>
              <p className="text-sm text-slate-500">5 stops • 12.4 KM • 45 mins</p>
            </div>
            <button className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-100">
              <Navigation size={24} />
            </button>
          </div>

          <div className="space-y-4">
            {points.map((point, index) => (
              <div key={point.id} className="flex gap-4 relative">
                {index !== points.length - 1 && (
                  <div className="absolute left-[11px] top-6 w-[2px] h-8 bg-slate-100" />
                )}
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white z-10 ${
                  point.id === 'A' ? 'bg-purple-700' : point.id === 'E' ? 'bg-blue-600' : 'bg-yellow-400'
                }`}>
                  {point.id}
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{point.name}</h4>
                    <p className="text-xs text-slate-500">{point.area}</p>
                  </div>
                  {point.type === 'delivery' && (
                    <button className="p-2 bg-slate-50 rounded-lg text-slate-400">
                      <Phone size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Button 
          onClick={() => navigate('/deliveries')}
          className="w-full h-14 bg-blue-600 hover:bg-blue-700 rounded-2xl text-lg font-bold shadow-lg shadow-blue-100"
        >
          Start Deliveries
        </Button>
      </div>
    </div>
  );
}

const MapMarker = ({ x, y, label, color, pulse }: { x: number, y: number, label: string, color: string, pulse?: boolean }) => (
  <motion.div 
    className="absolute"
    style={{ left: x, top: y }}
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5 }}
  >
    {pulse && (
      <div className="absolute -inset-2 bg-blue-400/30 rounded-full animate-ping" />
    )}
    <div className={`w-8 h-8 ${color} rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs -translate-x-1/2 -translate-y-1/2 relative z-10`}>
      {label}
    </div>
    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white absolute top-4 -translate-x-1/2" />
  </motion.div>
);

const Button = ({ children, onClick, className, disabled }: any) => (
  <button 
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 ${className}`}
  >
    {children}
  </button>
);
