import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData } from '@/utils/storage';
import { Customer } from '@/types';
import { Header } from '@/components/Header';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Plus, Phone, MapPin, Droplets, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorageData();
    setCustomers(data.customers);
  }, []);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.phone.includes(search) ||
    c.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="Customers" />
      
      <div className="p-4 sticky top-16 z-30 bg-slate-50/80 backdrop-blur-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <Input 
            placeholder="Search name, phone or area..." 
            className="pl-10 h-12 bg-white border-none shadow-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="px-4 space-y-3">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <Card 
              key={customer.id} 
              className="border-none shadow-sm active:scale-[0.98] transition-transform cursor-pointer"
            >
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold text-lg">
                    {customer.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{customer.name}</h3>
                    <div className="flex items-center gap-3 mt-1">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin size={12} />
                        {customer.area}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <Droplets size={12} />
                        {customer.defaultCans} cans
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="text-slate-300" size={20} />
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Users size={48} className="mb-4 opacity-20" />
            <p className="font-medium">No customers found</p>
          </div>
        )}
      </div>

      <Button
        onClick={() => navigate('/customers/add')}
        className="fixed bottom-24 right-6 w-14 h-14 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700 p-0 z-40"
      >
        <Plus size={28} />
      </Button>
    </div>
  );
}

const Users = ({ size, className }: { size: number, className?: string }) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
