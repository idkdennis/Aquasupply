import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStorageData } from '@/services/storage';
import { Delivery } from '@/types';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Phone, MapPin, Droplets, CheckCircle2, AlertCircle, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [filter, setFilter] = useState<'pending' | 'completed' | 'issue'>('pending');
  const navigate = useNavigate();

  useEffect(() => {
    const data = getStorageData();
    setDeliveries(data.deliveries);
  }, []);

  const filteredDeliveries = deliveries.filter(d => d.status === filter);

  const stats = {
    total: deliveries.length,
    done: deliveries.filter(d => d.status === 'completed').length,
    pending: deliveries.filter(d => d.status === 'pending').length,
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header 
        title="Today's Deliveries" 
        rightElement={
          <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600">
            <Droplets size={20} />
          </div>
        }
      />

      <div className="p-4 space-y-4">
        {/* Stats Summary */}
        <Card className="bg-blue-600 border-none text-white shadow-lg shadow-blue-100">
          <CardContent className="p-4 grid grid-cols-3 divide-x divide-white/20">
            <div className="text-center">
              <p className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">Total</p>
              <p className="text-xl font-bold">{stats.total}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">Done</p>
              <p className="text-xl font-bold">{stats.done}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] text-blue-100 font-medium uppercase tracking-wider">Pending</p>
              <p className="text-xl font-bold">{stats.pending}</p>
            </div>
          </CardContent>
        </Card>

        <Button variant="outline" className="w-full h-12 gap-2 text-blue-600 border-blue-100 bg-white shadow-sm">
          <Map size={18} />
          View Route Map
        </Button>

        <div className="pt-2">
          <Tabs defaultValue="pending" className="w-full" onValueChange={(v) => setFilter(v as any)}>
            <TabsList className="w-full grid grid-cols-3 h-12 bg-slate-100 p-1 rounded-xl">
              <TabsTrigger value="pending" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Pending ({stats.pending})
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Done
              </TabsTrigger>
              <TabsTrigger value="issue" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
                Issues
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="space-y-4 pt-2">
          {filteredDeliveries.length > 0 ? (
            filteredDeliveries.map((delivery) => (
              <Card key={delivery.id} className="border-none shadow-sm overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-bold text-slate-900 text-lg">{delivery.customerName}</h3>
                      <div className="flex items-center gap-1 text-slate-500 text-sm">
                        <MapPin size={14} />
                        {delivery.area}
                      </div>
                    </div>
                    <div className="bg-blue-50 text-blue-700 px-3 py-2 rounded-xl flex flex-col items-center min-w-[60px]">
                      <span className="text-lg font-bold">{delivery.cansToDeliver}</span>
                      <span className="text-[10px] font-medium uppercase">cans</span>
                    </div>
                  </div>

                  {delivery.status === 'pending' ? (
                    <div className="px-4 pb-4 flex gap-3">
                      <Button 
                        onClick={() => navigate(`/deliveries/${delivery.id}`)}
                        className="flex-1 h-12 bg-blue-600 hover:bg-blue-700 gap-2 rounded-xl"
                      >
                        <CheckCircle2 size={18} />
                        Deliver
                      </Button>
                      <Button variant="outline" className="w-12 h-12 p-0 rounded-xl border-slate-200">
                        <Phone size={18} className="text-slate-600" />
                      </Button>
                    </div>
                  ) : (
                    <div className="px-4 pb-4">
                      <Badge className={
                        delivery.status === 'completed' 
                          ? "bg-green-100 text-green-700 hover:bg-green-100 border-none px-3 py-1" 
                          : "bg-red-100 text-red-700 hover:bg-red-100 border-none px-3 py-1"
                      }>
                        {delivery.status === 'completed' ? 'Delivered Successfully' : `Issue: ${delivery.issueType?.replace('_', ' ')}`}
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-slate-400">
              <CheckCircle2 size={48} className="mb-4 opacity-10" />
              <p className="font-medium">No {filter} deliveries</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
