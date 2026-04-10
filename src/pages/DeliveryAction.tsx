import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStorageData, updateDelivery } from '@/services/storage';
import { Delivery } from '@/types';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle2, 
  AlertCircle, 
  Camera, 
  X, 
  User, 
  MapPin, 
  Droplets,
  Upload
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DeliveryAction() {
  const { id } = useParams<{ id: string }>();
  const [delivery, setDelivery] = useState<Delivery | null>(null);
  const [action, setAction] = useState<'delivered' | 'issue' | null>(null);
  const [issueType, setIssueType] = useState<Delivery['issueType'] | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const data = getStorageData();
      const d = data.deliveries.find(item => item.id === id);
      if (d) setDelivery(d);
    }
  }, [id]);

  if (!delivery) return null;

  const handleComplete = () => {
    if (action === 'delivered') {
      updateDelivery(delivery.id, { status: 'completed', photoUrl: photo || undefined });
    } else if (action === 'issue' && issueType) {
      updateDelivery(delivery.id, { status: 'issue', issueType });
    }
    navigate('/deliveries');
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="Delivery Action" showBack />

      <div className="p-6 space-y-6">
        {/* Customer Info Card */}
        <Card className="border-none shadow-sm bg-white">
          <CardContent className="p-4 flex items-center gap-4">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
              <User size={28} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 text-lg">{delivery.customerName}</h3>
              <div className="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
                <MapPin size={14} />
                {delivery.area}
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-blue-600 font-bold">
                <Droplets size={16} />
                <span className="text-xl">{delivery.cansToDeliver}</span>
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">Cans</p>
            </div>
          </CardContent>
        </Card>

        {!action ? (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setAction('delivered')}
              className="flex flex-col items-center justify-center gap-3 p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm active:scale-95 transition-all hover:border-green-500 hover:bg-green-50 group"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                <CheckCircle2 size={32} />
              </div>
              <span className="font-bold text-slate-700">Delivered</span>
            </button>

            <button
              onClick={() => setAction('issue')}
              className="flex flex-col items-center justify-center gap-3 p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm active:scale-95 transition-all hover:border-red-500 hover:bg-red-50 group"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center text-red-600 group-hover:bg-red-200 transition-colors">
                <AlertCircle size={32} />
              </div>
              <span className="font-bold text-slate-700">Issue</span>
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-900">
                {action === 'delivered' ? 'Delivery Confirmation' : 'Report Issue'}
              </h4>
              <button 
                onClick={() => { setAction(null); setIssueType(null); setPhoto(null); }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {action === 'delivered' ? (
              <div className="space-y-4">
                <p className="text-sm text-slate-500">Please upload a photo of the delivered cans (optional)</p>
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-video bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-colors overflow-hidden relative"
                >
                  {photo ? (
                    <img src={photo} alt="Delivery" className="w-full h-full object-cover" />
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
                        <Camera size={24} />
                      </div>
                      <span className="text-xs font-bold text-slate-400">Tap to take photo</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="image/*" 
                    capture="environment" 
                    className="hidden" 
                    ref={fileInputRef}
                    onChange={handlePhotoUpload}
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-slate-500">Select the reason for non-delivery</p>
                {(['not_available', 'gate_locked', 'other'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setIssueType(type)}
                    className={`w-full p-4 rounded-2xl border-2 text-left font-bold transition-all ${
                      issueType === type 
                        ? 'border-red-500 bg-red-50 text-red-700' 
                        : 'border-slate-100 bg-white text-slate-600'
                    }`}
                  >
                    {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </button>
                ))}
              </div>
            )}

            <Button 
              onClick={handleComplete}
              disabled={action === 'issue' && !issueType}
              className={`w-full h-14 text-lg rounded-2xl shadow-lg ${
                action === 'delivered' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              Confirm {action === 'delivered' ? 'Delivery' : 'Issue'}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
