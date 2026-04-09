import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  User, 
  Phone, 
  MapPin, 
  LogOut, 
  ChevronRight, 
  Settings, 
  Shield, 
  Bell, 
  Edit2, 
  Droplets,
  TrendingUp,
  X,
  CheckCircle2,
  CreditCard,
  Package
} from 'lucide-react';
import { getStorageData, updateUserData } from '@/utils/storage';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion, AnimatePresence } from 'motion/react';

export default function Profile() {
  const data = getStorageData();
  const user = data.user;
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSecurity, setShowSecurity] = useState(false);

  const handleLogout = () => {
    updateUserData(null);
    window.location.href = '/welcome';
  };

  const notifications = [
    { id: 1, title: 'Payment Received', desc: 'Ravi Kumar paid ₹500', time: '2h ago', icon: <CreditCard className="text-green-600" size={18} />, bg: 'bg-green-50' },
    { id: 2, title: 'New Order', desc: 'Sunita Rao requested 3 cans', time: '5h ago', icon: <Package className="text-blue-600" size={18} />, bg: 'bg-blue-50' },
    { id: 3, title: 'Can Returned', desc: 'Priya Devi returned 2 cans', time: '1d ago', icon: <Droplets className="text-purple-600" size={18} />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="My Profile" />
      
      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="relative">
            <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name}`} />
              <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
            </Avatar>
            <button 
              onClick={() => navigate('/register')}
              className="absolute bottom-0 right-0 w-8 h-8 bg-blue-600 rounded-full border-2 border-white flex items-center justify-center text-white shadow-lg active:scale-90 transition-transform"
            >
              <Edit2 size={14} />
            </button>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{user?.name || 'Supplier Name'}</h2>
            <p className="text-slate-500 font-medium">{user?.shopName || 'Aqua Supply'}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <StatCard label="Customers" value={data.customers.length} />
          <StatCard label="Deliveries" value={data.deliveries.length} />
          <StatCard label="Revenue" value="₹12.5k" />
        </div>

        {/* Menu Items */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Account Settings</h3>
          <div className="bg-white rounded-[32px] overflow-hidden shadow-sm border border-slate-50">
            <MenuItem 
              icon={<Droplets className="text-blue-600" />} 
              label="Can Tracking" 
              onClick={() => navigate('/can-tracking')} 
            />
            <MenuItem 
              icon={<TrendingUp className="text-green-600" size={20} />} 
              label="Reports & Analytics" 
              onClick={() => navigate('/reports')} 
            />
            <MenuItem 
              icon={<Bell className="text-orange-500" />} 
              label="Notifications" 
              onClick={() => setShowNotifications(true)}
              badge={notifications.length}
            />
            <MenuItem 
              icon={<Shield className="text-purple-600" />} 
              label="Privacy & Security" 
              onClick={() => setShowSecurity(true)} 
            />
            <MenuItem 
              icon={<Settings className="text-slate-400" />} 
              label="App Settings" 
              onClick={() => {}} 
            />
          </div>
        </div>

        <Button 
          variant="ghost" 
          className="w-full h-14 text-red-500 hover:text-red-600 hover:bg-red-50 rounded-2xl gap-2 font-bold"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          Logout Account
        </Button>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNotifications(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-50 p-8 max-h-[80vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Notifications</h3>
                <button 
                  onClick={() => setShowNotifications(false)}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                {notifications.map(n => (
                  <div key={n.id} className="flex gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
                    <div className={`w-12 h-12 ${n.bg} rounded-2xl flex items-center justify-center shrink-0`}>
                      {n.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-bold text-slate-900">{n.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{n.time}</span>
                      </div>
                      <p className="text-sm text-slate-500">{n.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Security Summary Panel */}
      <AnimatePresence>
        {showSecurity && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecurity(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[40px] z-50 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-slate-900">Security Summary</h3>
                <button 
                  onClick={() => setShowSecurity(false)}
                  className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="bg-green-50 p-6 rounded-[32px] border border-green-100 flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-100">
                    <Shield size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-green-900">Account Protected</h4>
                    <p className="text-sm text-green-700">Your data is encrypted and secure</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <SecurityItem label="Two-Factor Authentication" status="Enabled" />
                  <SecurityItem label="Last Login" status="Today, 10:45 AM" />
                  <SecurityItem label="Connected Devices" status="1 Active" />
                </div>

                <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-bold">
                  Update Security Settings
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const StatCard = ({ label, value }: { label: string, value: string | number }) => (
  <div className="bg-white p-4 rounded-3xl text-center shadow-sm border border-slate-50">
    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
    <p className="text-lg font-bold text-slate-900">{value}</p>
  </div>
);

const MenuItem = ({ icon, label, onClick, badge }: { icon: React.ReactNode, label: string, onClick: () => void, badge?: number }) => (
  <button 
    onClick={onClick}
    className="w-full flex items-center justify-between p-5 hover:bg-slate-50 active:bg-slate-100 transition-colors border-b border-slate-50 last:border-0"
  >
    <div className="flex items-center gap-4">
      <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
        {icon}
      </div>
      <span className="font-bold text-slate-700">{label}</span>
    </div>
    <div className="flex items-center gap-2">
      {badge && (
        <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">
          {badge}
        </span>
      )}
      <ChevronRight className="text-slate-300" size={20} />
    </div>
  </button>
);

const SecurityItem = ({ label, status }: { label: string, status: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <span className="text-sm font-bold text-slate-900">{status}</span>
  </div>
);
