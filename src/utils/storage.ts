import { AppData, User, Customer, Delivery, Request } from '../types';

const STORAGE_KEY = 'aqua_supply_data';

const INITIAL_DATA: AppData = {
  user: null,
  customers: [
    {
      id: '1',
      name: 'Ravi Kumar',
      phone: '9876543210',
      address: 'No 12, Main Street, Velachery',
      area: 'Velachery',
      defaultCans: 2,
      currentCansWithCustomer: 5,
      pendingPayment: 500,
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Priya Devi',
      phone: '9876543211',
      address: 'Flat 4B, Adyar Apartments',
      area: 'Adyar',
      defaultCans: 2,
      currentCansWithCustomer: 3,
      pendingPayment: 0,
      createdAt: new Date().toISOString(),
    }
  ],
  deliveries: [
    {
      id: 'd1',
      customerId: '1',
      customerName: 'Ravi Kumar',
      area: 'Velachery',
      cansToDeliver: 2,
      status: 'pending',
      timestamp: new Date().toISOString(),
    },
    {
      id: 'd2',
      customerId: '2',
      customerName: 'Priya Devi',
      area: 'Adyar',
      cansToDeliver: 2,
      status: 'pending',
      timestamp: new Date().toISOString(),
    }
  ],
  requests: [
    {
      id: 'r1',
      name: 'New Customer Request',
      distance: '1.2 KM',
      cansNeeded: 2,
      status: 'pending',
      timestamp: new Date().toISOString(),
    }
  ],
  inventory: {
    totalCans: 500,
  }
};

export const getStorageData = (): AppData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(data);
};

export const setStorageData = (data: AppData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const updateUserData = (user: User | null) => {
  const data = getStorageData();
  data.user = user;
  setStorageData(data);
};

export const addCustomer = (customer: Customer) => {
  const data = getStorageData();
  data.customers.push(customer);
  setStorageData(data);
};

export const updateDelivery = (deliveryId: string, updates: Partial<Delivery>) => {
  const data = getStorageData();
  const index = data.deliveries.findIndex(d => d.id === deliveryId);
  if (index !== -1) {
    data.deliveries[index] = { ...data.deliveries[index], ...updates };
    
    // If completed, update customer cans
    if (updates.status === 'completed') {
      const customerIndex = data.customers.findIndex(c => c.id === data.deliveries[index].customerId);
      if (customerIndex !== -1) {
        data.customers[customerIndex].currentCansWithCustomer += data.deliveries[index].cansToDeliver;
      }
    }
    
    setStorageData(data);
  }
};

export const updateRequest = (requestId: string, status: 'accepted' | 'rejected') => {
  const data = getStorageData();
  const index = data.requests.findIndex(r => r.id === requestId);
  if (index !== -1) {
    data.requests[index].status = status;
    setStorageData(data);
  }
};
