import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '@/context/DataContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  UserPlus, 
  Map, 
  AlertCircle, 
  ChevronRight, 
  Bell, 
  CheckCircle2, 
  Clock,
  Droplets
} from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard() {
  const { data, triggerRandomRequest } = useData();
  const navigate = useNavigate();

  if (!data) return null;

  const totalDeliveries = data.deliveries.length;
  const completedDeliveries = data.deliveries.filter(d => d.status === 'completed').length;
  const pendingDeliveries = data.deliveries.filter(d => d.status === 'pending').length;
  const pendingPayments = data.customers.filter(c => c.pendingPayment > 0).length;
  const cansNotReturned = data.customers.filter(c => c.currentCansWithCustomer > c.defaultCans).length;
  const newRequests = data.requests.filter(r => r.status === 'pending').length;

  return (
    <div className="p-6 space-y-8">
      {/* Welcome Section */}
      <div className="flex justify-between items-start">
        <div>
          <p className="text-slate-500 text-sm font-medium">Good Morning</p>
          <h1 className="text-2xl font-bold text-slate-900">Hello, {data.user?.name.split(' ')[0]} 👋</h1>
        </div>
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
          <Droplets className="text-white" size={24} />
        </div>
      </div>

      {/* Stats Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-blue-600 border-none shadow-2xl shadow-blue-200 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <CardContent className="p-6 text-white relative z-10">
            <p className="text-blue-100 text-sm font-medium mb-1">Today's Deliveries</p>
            <h2 className="text-5xl font-bold mb-6">{totalDeliveries}</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle2 size={14} className="text-blue-200" />
                  <span className="text-xs font-medium text-blue-100">Completed</span>
                </div>
                <p className="text-xl font-bold">{completedDeliveries}</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1">
                  <Clock size={14} className="text-blue-200" />
                  <span className="text-xs font-medium text-blue-100">Pending</span>
                </div>
                <p className="text-xl font-bold">{pendingDeliveries}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-3 gap-4">
          <QuickActionButton 
            icon={<UserPlus size={24} />} 
            label="Add Customer" 
            onClick={() => navigate('/customers/add')}
          />
          <QuickActionButton 
            icon={<Map size={24} />} 
            label="View Route" 
            onClick={() => navigate('/route-map')}
          />
          <QuickActionButton 
            icon={<Droplets size={24} />} 
            label="Cans" 
            onClick={() => navigate('/can-tracking')}
          />
        </div>
      </div>

      {/* Alerts Section */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Alerts</h3>
        <div className="space-y-3">
          {pendingPayments > 0 && (
            <AlertItem 
              icon={<AlertCircle className="text-orange-500" />}
              title={`${pendingPayments} Payments Pending`}
              description="Collect before month end"
              color="orange"
            />
          )}
          {cansNotReturned > 0 && (
            <AlertItem 
              icon={<AlertCircle className="text-orange-500" />}
              title={`${cansNotReturned} Cans Not Returned`}
              description="Follow up with customers"
              color="orange"
            />
          )}
          {newRequests > 0 && (
            <div 
              onClick={() => navigate('/requests')}
              className="bg-white border border-slate-100 rounded-2xl p-4 flex items-center justify-between shadow-sm active:scale-95 transition-transform cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Bell className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{newRequests} New Customer Requests</h4>
                  <p className="text-xs text-slate-500">Tap to review</p>
                </div>
              </div>
              <ChevronRight className="text-slate-300" size={20} />
            </div>
          )}
        </div>
      </div>
      
      {/* Dev Tool - Prototype Only */}
      <div className="mt-8 pt-8 border-t border-slate-100">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={triggerRandomRequest}
          className="w-full text-slate-400 border-dashed"
        >
          Dev: Generate Random Request
        </Button>
      </div>
    </div>
  );
}

const QuickActionButton = ({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center gap-2 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm active:scale-95 transition-transform"
  >
    <div className="text-blue-600">{icon}</div>
    <span className="text-[10px] font-bold text-slate-700 text-center">{label}</span>
  </button>
);

const AlertItem = ({ icon, title, description, color }: { icon: React.ReactNode, title: string, description: string, color: 'orange' | 'red' }) => (
  <div className={`bg-${color}-50 border border-${color}-100 rounded-2xl p-4 flex items-center gap-4`}>
    <div className={`w-12 h-12 bg-${color}-100 rounded-xl flex items-center justify-center`}>
      {icon}
    </div>
    <div>
      <h4 className={`font-bold text-${color}-900`}>{title}</h4>
      <p className={`text-xs text-${color}-600`}>{description}</p>
    </div>
  </div>
);
