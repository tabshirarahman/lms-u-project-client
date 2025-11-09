export interface PaymentResult {
  success: boolean;
  clientSecret?: string;
  paymentIntentId?: string;
  error?: string;
}

export interface BookingRecord {
  bookingId: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
  status: "confirmed" | "pending" | "failed";
  pickup: string;
  dropoff: string;
  via?: string;
  vehicle?: string;
  passenger: string;
  email: string;
  mobile: string;
  passengers: number;
  flightNumber?: string;
  arrivalDate?: string;
  arrivalTime?: string;
  meetGreet?: boolean;
  isReturn?: boolean;
  returnDate?: string;
  returnTime?: string;
  suitcases?: number;
  handLuggage?: number;
  createdAt: string;
}
