import React, { useEffect, useState } from 'react';
import { getStorageData, updateRequest } from '@/utils/storage';
import { Request } from '@/types';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Droplets, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'motion/react';

export default function Requests() {
  const [requests, setRequests] = useState<Request[]>([]);

  useEffect(() => {
    const data = getStorageData();
    setRequests(data.requests);
  }, []);

  const handleAction = (id: string, status: 'accepted' | 'rejected') => {
    updateRequest(id, status);
    setRequests(requests.map(r => r.id === id ? { ...r, status } : r));
  };

  const pendingRequests = requests.filter(r => r.status === 'pending');

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="New Requests" />
      
      <div className="p-4 space-y-4">
        <p className="text-sm font-medium text-slate-500">{pendingRequests.length} requests waiting</p>
        
        <AnimatePresence mode="popLayout">
          {pendingRequests.length > 0 ? (
            pendingRequests.map((request) => (
              <motion.div
                key={request.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Card className="border-none shadow-sm overflow-hidden">
                  <div className="h-24 bg-slate-100 relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#3b82f6 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center text-white shadow-lg animate-bounce">
                        <MapPin size={20} />
                      </div>
                    </div>
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-slate-600">
                      <MapPin size={10} />
                      {request.distance}
                    </div>
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 text-[10px] font-bold text-slate-600">
                      <Clock size={10} />
                      10 mins
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="font-bold text-slate-900 text-lg">{request.name}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                          <MapPin size={12} />
                          {request.distance} away
                        </div>
                        <div className="flex items-center gap-1 text-xs text-blue-600 font-bold">
                          <Droplets size={12} />
                          {request.cansNeeded} cans needed
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" className="w-12 h-12 p-0 rounded-xl border-slate-200">
                        <Map size={18} className="text-slate-600" />
                      </Button>
                      <Button 
                        onClick={() => handleAction(request.id, 'accepted')}
                        className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 gap-2 rounded-xl"
                      >
                        <Check size={18} />
                        Accept
                      </Button>
                      <Button 
                        onClick={() => handleAction(request.id, 'rejected')}
                        variant="outline" 
                        className="flex-1 h-12 border-red-100 text-red-600 hover:bg-red-50 gap-2 rounded-xl"
                      >
                        <X size={18} />
                        Reject
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 opacity-50">
                <Bell size={40} />
              </div>
              <p className="font-medium">No new requests</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

const Bell = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
    <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
  </svg>
);

const Map = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
    <line x1="8" y1="2" x2="8" y2="18" />
    <line x1="16" y1="6" x2="16" y2="22" />
  </svg>
);
