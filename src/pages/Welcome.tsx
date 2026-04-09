import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Droplets } from 'lucide-react';
import { motion } from 'motion/react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 flex flex-col items-center text-center"
      >
        <div className="w-20 h-20 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-200 mb-6">
          <Droplets className="text-white" size={40} />
        </div>
        <h1 className="text-3xl font-bold text-slate-900 mb-2">AquaSupply</h1>
        <p className="text-slate-500 font-medium max-w-[240px]">
          The smartest way to manage your water supply business
        </p>
      </motion.div>

      <div className="w-full space-y-4 max-w-[300px]">
        <Button 
          onClick={() => navigate('/login')}
          className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-100"
        >
          Login
        </Button>
        <Button 
          onClick={() => navigate('/register')}
          variant="outline"
          className="w-full h-14 text-lg border-slate-200 text-slate-700 rounded-2xl bg-white"
        >
          Sign Up
        </Button>
      </div>

      <p className="mt-12 text-xs text-slate-400 text-center px-8">
        Trusted by 500+ suppliers across the city
      </p>
    </div>
  );
}
