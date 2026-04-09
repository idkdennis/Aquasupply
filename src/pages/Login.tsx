import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Droplets, ChevronLeft, ArrowRight } from 'lucide-react';
import { updateUserData } from '@/utils/storage';
import { motion, AnimatePresence } from 'motion/react';

export default function Login() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
      setTimer(60);
    }
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Mock login - if phone is 0000000000, go to register, else dashboard
      if (phone === '0000000000') {
        navigate('/register');
      } else {
        updateUserData({
          id: 'u1',
          name: 'John Doe',
          phone: `+91 ${phone}`,
          shopName: 'Aqua Fresh Supplies',
          location: 'Velachery, Chennai',
          deliveryRadius: '2km',
          isAuthenticated: true,
        });
        window.location.href = '/';
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-[350px] space-y-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => step === 'phone' ? navigate('/welcome') : setStep('phone')}
            className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm active:scale-90 transition-transform"
          >
            <ChevronLeft size={20} />
          </button>
          <h1 className="text-xl font-bold text-slate-900">
            {step === 'phone' ? 'Login' : 'Verify OTP'}
          </h1>
        </div>

        <Card className="border-none shadow-2xl shadow-slate-200/50 rounded-[32px] overflow-hidden">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {step === 'phone' ? (
                <motion.form 
                  key="phone"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleSendOtp} 
                  className="space-y-6"
                >
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-500 font-bold text-xs uppercase tracking-wider ml-1">
                      Phone Number
                    </Label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold">+91</span>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        className="pl-14 h-14 rounded-2xl border-slate-100 bg-slate-50 text-lg font-bold focus-visible:ring-blue-500"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        required
                      />
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-100 gap-2"
                    disabled={phone.length !== 10}
                  >
                    Send OTP
                    <ArrowRight size={20} />
                  </Button>
                </motion.form>
              ) : (
                <motion.form 
                  key="otp"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  onSubmit={handleVerify} 
                  className="space-y-6"
                >
                  <div className="space-y-4 text-center">
                    <Label className="text-slate-500 font-bold text-xs uppercase tracking-wider">
                      Enter 4-digit code sent to +91 {phone}
                    </Label>
                    <div className="flex justify-center gap-3">
                      {[...Array(4)].map((_, i) => (
                        <input
                          key={i}
                          type="text"
                          maxLength={1}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 border-slate-100 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                          value={otp[i] || ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, '');
                            if (val) {
                              const newOtp = otp.split('');
                              newOtp[i] = val;
                              setOtp(newOtp.join('').slice(0, 4));
                              if (i < 3) (e.target.nextSibling as HTMLInputElement)?.focus();
                            } else {
                              const newOtp = otp.split('');
                              newOtp[i] = '';
                              setOtp(newOtp.join(''));
                              if (i > 0) (e.target.previousSibling as HTMLInputElement)?.focus();
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-14 text-lg bg-blue-600 hover:bg-blue-700 rounded-2xl shadow-lg shadow-blue-100"
                    disabled={otp.length !== 4}
                  >
                    Verify & Continue
                  </Button>
                  <div className="text-center">
                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={() => setTimer(60)}
                      className="text-sm font-bold text-blue-600 disabled:text-slate-300 transition-colors"
                    >
                      {timer > 0 ? `Resend code in ${timer}s` : 'Resend OTP'}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
