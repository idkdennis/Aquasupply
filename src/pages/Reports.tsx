import React, { useEffect, useState } from 'react';
import { getStorageData } from '@/services/storage';
import { AppData } from '@/types';
import { Header } from '@/components/Header';
import { Card, CardContent } from '@/components/ui/card';
import { 
  TrendingUp, 
  Truck, 
  CreditCard, 
  Droplets, 
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';

export default function Reports() {
  const [data, setData] = useState<AppData | null>(null);

  useEffect(() => {
    setData(getStorageData());
  }, []);

  if (!data) return null;

  const totalRevenue = data.deliveries.filter(d => d.status === 'completed').length * 40; // Mock 40 per can
  const totalDeliveries = data.deliveries.filter(d => d.status === 'completed').length;
  const pendingPayments = data.customers.reduce((acc, curr) => acc + curr.pendingPayment, 0);
  const pendingCans = data.customers.reduce((acc, curr) => acc + curr.currentCansWithCustomer, 0);

  const chartData = [
    { name: 'Mon', count: 12 },
    { name: 'Tue', count: 18 },
    { name: 'Wed', count: 15 },
    { name: 'Thu', count: 22 },
    { name: 'Fri', count: 10 },
    { name: 'Sat', count: 25 },
    { name: 'Sun', count: 8 },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <Header title="Reports" showBack />
      
      <div className="p-6 space-y-6">
        {/* Period Selector */}
        <div className="flex items-center justify-between bg-white p-2 rounded-2xl shadow-sm">
          <button className="flex-1 py-2 text-sm font-bold text-blue-600 bg-blue-50 rounded-xl">Today</button>
          <button className="flex-1 py-2 text-sm font-bold text-slate-400">Week</button>
          <button className="flex-1 py-2 text-sm font-bold text-slate-400">Month</button>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <ReportStatCard 
            title="Revenue" 
            value={`₹${totalRevenue}`} 
            trend="+12%" 
            isUp={true}
            icon={<TrendingUp size={20} />}
            color="blue"
          />
          <ReportStatCard 
            title="Deliveries" 
            value={totalDeliveries} 
            trend="+5%" 
            isUp={true}
            icon={<Truck size={20} />}
            color="green"
          />
          <ReportStatCard 
            title="Unpaid" 
            value={`₹${pendingPayments}`} 
            trend="-2%" 
            isUp={false}
            icon={<CreditCard size={20} />}
            color="orange"
          />
          <ReportStatCard 
            title="Pending Cans" 
            value={pendingCans} 
            trend="+8%" 
            isUp={true}
            icon={<Droplets size={20} />}
            color="purple"
          />
        </div>

        {/* Chart Section */}
        <Card className="border-none shadow-sm">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Delivery Trends</h3>
              <Calendar size={18} className="text-slate-400" />
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 600 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={20}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 5 ? '#2563eb' : '#dbeafe'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Summary List */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">Summary</h3>
          <div className="bg-white rounded-2xl shadow-sm divide-y divide-slate-50">
            <SummaryItem label="Total Customers" value={data.customers.length} />
            <SummaryItem label="Active Routes" value="3" />
            <SummaryItem label="Avg. Delivery Time" value="18 mins" />
            <SummaryItem label="Customer Satisfaction" value="4.8/5" />
          </div>
        </div>
      </div>
    </div>
  );
}

const ReportStatCard = ({ title, value, trend, isUp, icon, color }: any) => (
  <Card className="border-none shadow-sm overflow-hidden">
    <CardContent className="p-4">
      <div className={`w-10 h-10 bg-${color}-50 rounded-xl flex items-center justify-center mb-3 text-${color}-600`}>
        {icon}
      </div>
      <p className="text-xs text-slate-500 font-medium">{title}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <p className="text-xl font-bold text-slate-900">{value}</p>
        <span className={`text-[10px] font-bold flex items-center ${isUp ? 'text-green-600' : 'text-red-600'}`}>
          {isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
          {trend}
        </span>
      </div>
    </CardContent>
  </Card>
);

const SummaryItem = ({ label, value }: { label: string, value: string | number }) => (
  <div className="p-4 flex justify-between items-center">
    <span className="text-sm font-medium text-slate-600">{label}</span>
    <span className="text-sm font-bold text-slate-900">{value}</span>
  </div>
);
