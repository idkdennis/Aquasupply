import React, { useEffect, useState } from 'react';
import { getStorageData } from '@/utils/storage';
import { AppData } from '@/types';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, AlertTriangle, Users, Warehouse, ChevronRight } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export default function CanTracking() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(getStorageData());
  }, []);

  if (!data) return null;

  const totalCans = data.inventory.totalCans;
  const withCustomers = data.customers.reduce((acc, curr) => acc + curr.currentCansWithCustomer, 0);
  const available = totalCans - withCustomers;
  const overdueCount = data.customers.filter(c => c.currentCansWithCustomer > c.defaultCans).length;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="Can Tracking" showBack />
      
      <div className="p-6 space-y-6">
        {/* Main Inventory Card */}
        <Card className="bg-blue-600 border-none text-white shadow-xl shadow-blue-100 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <CardContent className="p-6 relative z-10">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-blue-100 text-xs font-bold uppercase tracking-wider">Total Inventory</p>
                <h2 className="text-4xl font-bold">{totalCans} Cans</h2>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Warehouse size={24} />
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span>Usage</span>
                <span>{Math.round((withCustomers / totalCans) * 100)}%</span>
              </div>
              <Progress value={(withCustomers / totalCans) * 100} className="h-2 bg-white/20" />
            </div>
          </CardContent>
        </Card>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard 
            icon={<Users className="text-blue-600" />} 
            label="With Customers" 
            value={withCustomers} 
            color="blue"
          />
          <StatCard 
            icon={<Droplets className="text-green-600" />} 
            label="Available" 
            value={available} 
            color="green"
          />
        </div>

        {/* Warnings Section */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Warnings</h3>
          {overdueCount > 0 ? (
            <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
                <AlertTriangle size={24} />
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-orange-900">{overdueCount} Overdue Warnings</h4>
                <p className="text-xs text-orange-600">Customers holding extra cans</p>
              </div>
              <ChevronRight className="text-orange-300" size={20} />
            </div>
          ) : (
            <div className="bg-green-50 border border-green-100 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
                <Check className="text-green-600" size={24} />
              </div>
              <p className="text-sm font-bold text-green-900">All cans accounted for</p>
            </div>
          )}
        </div>

        {/* Detailed List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Customer Holdings</h3>
          <div className="space-y-3">
            {data.customers.map(customer => (
              <div key={customer.id} className="bg-white p-4 rounded-2xl flex items-center justify-between shadow-sm border border-slate-50">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    customer.currentCansWithCustomer > customer.defaultCans 
                      ? 'bg-orange-100 text-orange-600' 
                      : 'bg-blue-50 text-blue-600'
                  }`}>
                    {customer.currentCansWithCustomer}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{customer.name}</h4>
                    <p className="text-xs text-slate-500">{customer.area}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => window.open(`tel:${customer.phone}`)}
                    className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-600 active:bg-slate-100 transition-colors"
                  >
                    <Phone size={18} />
                  </button>
                  <ChevronRight className="text-slate-300" size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Phone = ({ size, className }: { size: number, className?: string }) => (
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
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const StatCard = ({ icon, label, value, color }: { icon: React.ReactNode, label: string, value: number, color: string }) => (
  <Card className="border-none shadow-sm">
    <CardContent className="p-4">
      <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <p className="text-xs text-slate-500 font-medium">{label}</p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </CardContent>
  </Card>
);

const Check = ({ size, className }: { size: number, className?: string }) => (
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
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
