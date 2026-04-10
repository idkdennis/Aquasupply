import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { AppData, User, Customer, Delivery, Request } from './types';
import { getStorageData, generateRandomRequest as genRandomReq, updateUserData as updateUser, addCustomer as addCust, updateDelivery as updateDel, updateRequest as updateReq } from '../services/storage';

interface DataContextType {
  data: AppData | null;
  loading: boolean;
  error: string | null;
  refreshData: () => void;
  updateUser: (user: User | null) => void;
  addCustomer: (customer: Customer) => void;
  updateDelivery: (deliveryId: string, updates: Partial<Delivery>) => void;
  updateRequest: (requestId: string, status: 'accepted' | 'rejected') => void;
  triggerRandomRequest: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshData = useCallback(() => {
    try {
      const storageData = getStorageData();
      setData(storageData);
      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshData();

    // Prototype: Generate random request every 5 minutes
    const interval = setInterval(() => {
      console.log('Generating random request (Context)...');
      genRandomReq();
      refreshData();
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [refreshData]);

  const handleUpdateUser = (user: User | null) => {
    updateUser(user);
    refreshData();
  };

  const handleAddCustomer = (customer: Customer) => {
    addCust(customer);
    refreshData();
  };

  const handleUpdateDelivery = (deliveryId: string, updates: Partial<Delivery>) => {
    updateDel(deliveryId, updates);
    refreshData();
  };

  const handleUpdateRequest = (requestId: string, status: 'accepted' | 'rejected') => {
    updateReq(requestId, status);
    refreshData();
  };

  const triggerRandomRequest = () => {
    genRandomReq();
    refreshData();
  };

  return (
    <DataContext.Provider value={{ 
      data, 
      loading, 
      error, 
      refreshData, 
      updateUser: handleUpdateUser,
      addCustomer: handleAddCustomer,
      updateDelivery: handleUpdateDelivery,
      updateRequest: handleUpdateRequest,
      triggerRandomRequest
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
