export interface User {
  id: string;
  name: string;
  phone: string;
  alternatePhone?: string;
  shopName: string;
  location: string;
  deliveryRadius: '1km' | '2km' | '3km';
  isAuthenticated: boolean;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address: string;
  area: string;
  defaultCans: number;
  currentCansWithCustomer: number;
  pendingPayment: number;
  createdAt: string;
}

export interface Delivery {
  id: string;
  customerId: string;
  customerName: string;
  area: string;
  cansToDeliver: number;
  status: 'pending' | 'completed' | 'issue';
  issueType?: 'not_available' | 'gate_locked' | 'other';
  photoUrl?: string;
  timestamp: string;
}

export interface Request {
  id: string;
  name: string;
  distance: string;
  cansNeeded: number;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: string;
}

export interface AppData {
  user: User | null;
  customers: Customer[];
  deliveries: Delivery[];
  requests: Request[];
  inventory: {
    totalCans: number;
  };
}
