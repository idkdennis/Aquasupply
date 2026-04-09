import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Navigation, ChevronLeft, ArrowRight } from 'lucide-react';
import { updateUserData } from '@/utils/storage';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    alternatePhone: '',
    shopName: '',
    location: '',
    deliveryRadius: '2km' as '1km' | '2km' | '3km',
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserData({
      id: 'u1',
      name: formData.name,
      phone: '+91 0000000000', // Mock
      alternatePhone: formData.alternatePhone,
      shopName: formData.shopName,
      location: formData.location || 'Current Location',
      deliveryRadius: formData.deliveryRadius,
      isAuthenticated: true,
    });
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="p-4">
        <Card className="border-none shadow-xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
          <div className="p-6 flex items-center gap-4 border-b border-slate-50">
            <button 
              onClick={() => navigate(-1)}
              className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 active:scale-90 transition-transform"
            >
              <ChevronLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-900">Create Profile</h1>
          </div>
          
          <CardContent className="p-6 pt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                  Your Name *
                </Label>
                <Input
                  id="name"
                  placeholder="dennis"
                  className="h-14 rounded-2xl border-slate-100 bg-white text-lg px-4 focus-visible:ring-blue-500"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="altPhone" className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                  Alternate Phone (optional)
                </Label>
                <Input
                  id="altPhone"
                  type="tel"
                  placeholder="+91 9876543210"
                  className="h-14 rounded-2xl border-slate-100 bg-white text-lg px-4 focus-visible:ring-blue-500"
                  value={formData.alternatePhone}
                  onChange={(e) => setFormData({ ...formData, alternatePhone: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="shopName" className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                  Shop Name (optional)
                </Label>
                <Input
                  id="shopName"
                  placeholder="dennis water supply"
                  className="h-14 rounded-2xl border-slate-100 bg-white text-lg px-4 focus-visible:ring-blue-500"
                  value={formData.shopName}
                  onChange={(e) => setFormData({ ...formData, shopName: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                  Your Location *
                </Label>
                <div className="space-y-3">
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <Input
                      placeholder="Enter your area"
                      className="h-14 rounded-2xl border-slate-100 bg-white text-lg pl-12 pr-4 focus-visible:ring-blue-500"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, location: 'Velachery, Chennai' })}
                    className="flex items-center gap-2 text-blue-600 font-bold text-sm ml-1 active:opacity-70 transition-opacity"
                  >
                    <Navigation size={18} />
                    Use Current Location
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                  Delivery Radius
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  {(['1km', '2km', '3km'] as const).map((radius) => (
                    <button
                      key={radius}
                      type="button"
                      onClick={() => setFormData({ ...formData, deliveryRadius: radius })}
                      className={`h-14 rounded-2xl border-2 font-bold transition-all ${
                        formData.deliveryRadius === radius
                          ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-100'
                          : 'border-slate-50 bg-white text-slate-400'
                      }`}
                    >
                      {radius.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-2xl mt-4 shadow-lg shadow-blue-100 gap-2"
                disabled={!formData.name || !formData.location}
              >
                Continue
                <ArrowRight size={20} />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
