import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addCustomer } from '@/services/storage';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Minus, Plus } from 'lucide-react';

export default function AddCustomer() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    area: '',
    defaultCans: 1,
  });
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name.length < 2 || formData.phone.length !== 10 || formData.address.length < 5) {
      return;
    }

    addCustomer({
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      area: formData.area || 'General',
      defaultCans: formData.defaultCans,
      currentCansWithCustomer: 0,
      pendingPayment: 0,
      createdAt: new Date().toISOString(),
    });

    navigate('/customers');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header title="Add Customer" showBack />
      
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name *</Label>
          <Input
            id="name"
            placeholder="e.g. Rahul Sharma"
            className="h-12"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            minLength={2}
            maxLength={50}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">+91</span>
            <Input
              id="phone"
              type="tel"
              placeholder="10 digit number"
              className="pl-12 h-12"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="area">Area / Locality</Label>
          <Input
            id="area"
            placeholder="e.g. Velachery"
            className="h-12"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Full Address *</Label>
          <Textarea
            id="address"
            placeholder="House No, Street, Landmark..."
            className="min-h-[100px]"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            required
            minLength={5}
          />
        </div>

        <div className="space-y-2">
          <Label>Default Cans</Label>
          <div className="flex items-center gap-6 bg-white p-4 rounded-xl border border-slate-100">
            <button
              type="button"
              onClick={() => setFormData({ ...formData, defaultCans: Math.max(1, formData.defaultCans - 1) })}
              className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 active:bg-slate-200"
            >
              <Minus size={20} />
            </button>
            <span className="text-2xl font-bold text-slate-900 flex-1 text-center">
              {formData.defaultCans}
            </span>
            <button
              type="button"
              onClick={() => setFormData({ ...formData, defaultCans: formData.defaultCans + 1 })}
              className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 active:bg-blue-100"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>

        <Button type="submit" className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 mt-4">
          Save Customer
        </Button>
      </form>
    </div>
  );
}
