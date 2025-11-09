import type { BookingData } from "@/types/booking";

export function getBookingsData(): BookingData[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem("bluebird-bookings-data");
  return data ? JSON.parse(data) : generateMockBookings();
}

export function addBooking(
  booking: Omit<BookingData, "id" | "createdAt" | "updatedAt">,
): BookingData {
  const bookings = getBookingsData();
  const newBooking: BookingData = {
    ...booking,
    id: `booking_${Date.now()}`,
    bookingId: `BB${Date.now().toString().slice(-6)}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  bookings.push(newBooking);
  localStorage.setItem("bluebird-bookings-data", JSON.stringify(bookings));
  return newBooking;
}

export function updateBooking(id: string, updates: Partial<BookingData>): boolean {
  const bookings = getBookingsData();
  const index = bookings.findIndex((booking) => booking.id === id);
  if (index === -1) return false;

  bookings[index] = {
    ...bookings[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem("bluebird-bookings-data", JSON.stringify(bookings));
  return true;
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookingsData();
  const filteredBookings = bookings.filter((booking) => booking.id !== id);
  localStorage.setItem("bluebird-bookings-data", JSON.stringify(filteredBookings));
  return true;
}

export function getBookingsByStatus(status: string): BookingData[] {
  const bookings = getBookingsData();
  return bookings.filter((booking) => booking.status === status);
}

function generateMockBookings(): BookingData[] {
  const mockBookings: BookingData[] = [
    {
      id: "booking_1",
      bookingId: "BB001234",
      status: "pending",
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      locations: {
        pickup: "Heathrow Airport Terminal 5",
        dropoff: "Central London Hotel",
        via: [],
        pickupType: "airport",
        dropoffType: "hotel",
      },
      journey: {
        selectedVehicle: {
          id: "vehicle_1",
          name: "Mercedes E-Class",
          description: "Premium executive sedan",
          passengers: 4,
          luggage: 3,
          price: 85,
          image: "/placeholder.svg?height=200&width=300",
          features: ["Air Conditioning", "GPS Navigation", "Premium Sound"],
          totalPrice: 85,
        },
        isReturn: false,
        passengers: 2,
        handLuggage: 2,
        suitcases: 2,
        date: new Date().toISOString().split("T")[0],
        time: "14:30",
      },
      user: {
        isLoggedIn: true,
        email: "john.smith@email.com",
        name: "John Smith",
        phone: "+44 7123 456789",
      },
      payment: {
        method: "card",
        status: "pending",
        amount: 85,
        currency: "GBP",
      },
      totalAmount: 85,
      notes: "Flight arriving from New York",
    },
    {
      id: "booking_2",
      bookingId: "BB001235",
      status: "confirmed",
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      locations: {
        pickup: "London Bridge Station",
        dropoff: "Gatwick Airport",
        via: [],
        pickupType: "address",
        dropoffType: "airport",
      },
      journey: {
        selectedVehicle: {
          id: "vehicle_2",
          name: "BMW 5 Series",
          description: "Luxury business sedan",
          passengers: 4,
          luggage: 4,
          price: 95,
          image: "/placeholder.svg?height=200&width=300",
          features: ["Leather Seats", "Climate Control", "WiFi"],
          totalPrice: 95,
        },
        isReturn: false,
        passengers: 1,
        handLuggage: 1,
        suitcases: 1,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "09:00",
      },
      user: {
        isLoggedIn: true,
        email: "sarah.johnson@email.com",
        name: "Sarah Johnson",
        phone: "+44 7987 654321",
      },
      payment: {
        method: "card",
        status: "completed",
        amount: 95,
        currency: "GBP",
      },
      totalAmount: 95,
      flightDetails: {
        flightNumber: "BA123",
        arrivingFrom: "Paris",
        meetGreet: true,
        arrivalDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        arrivalTime: "11:30",
        additionalInfo: "Business trip",
        passengerName: "Sarah Johnson",
        passengerMobile: "+44 7987 654321",
        passengerEmail: "sarah.johnson@email.com",
        passengers: 1,
        handLuggage: 1,
        suitcases: 1,
        isReturn: false,
        returnDate: "",
        returnTime: "",
      },
    },
    {
      id: "booking_3",
      bookingId: "BB001236",
      status: "active",
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      locations: {
        pickup: "Manchester Airport",
        dropoff: "City Centre Hotel",
        via: ["Shopping District"],
        pickupType: "airport",
        dropoffType: "hotel",
      },
      journey: {
        selectedVehicle: {
          id: "vehicle_3",
          name: "Audi A6",
          description: "Executive comfort vehicle",
          passengers: 5,
          luggage: 4,
          price: 90,
          image: "/placeholder.svg?height=200&width=300",
          features: ["Premium Interior", "Advanced Safety", "Entertainment System"],
          totalPrice: 90,
        },
        isReturn: true,
        returnDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        returnTime: "16:00",
        passengers: 3,
        handLuggage: 3,
        suitcases: 2,
        date: new Date().toISOString().split("T")[0],
        time: "12:00",
      },
      user: {
        isLoggedIn: true,
        email: "mike.brown@email.com",
        name: "Mike Brown",
        phone: "+44 7456 123789",
      },
      payment: {
        method: "card",
        status: "completed",
        amount: 180,
        currency: "GBP",
      },
      totalAmount: 180,
      estimatedDuration: "45 minutes",
    },
    {
      id: "booking_4",
      bookingId: "BB001237",
      status: "completed",
      createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      locations: {
        pickup: "Birmingham New Street",
        dropoff: "Birmingham Airport",
        via: [],
        pickupType: "address",
        dropoffType: "airport",
      },
      journey: {
        selectedVehicle: {
          id: "vehicle_4",
          name: "Tesla Model S",
          description: "Electric luxury sedan",
          passengers: 5,
          luggage: 3,
          price: 120,
          image: "/placeholder.svg?height=200&width=300",
          features: ["Electric", "Autopilot", "Premium Audio"],
          totalPrice: 120,
        },
        isReturn: false,
        passengers: 2,
        handLuggage: 2,
        suitcases: 3,
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "08:30",
      },
      user: {
        isLoggedIn: true,
        email: "emma.wilson@email.com",
        name: "Emma Wilson",
        phone: "+44 7321 987654",
      },
      payment: {
        method: "card",
        status: "completed",
        amount: 120,
        currency: "GBP",
      },
      totalAmount: 120,
    },
    {
      id: "booking_5",
      bookingId: "BB001238",
      status: "cancelled",
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      locations: {
        pickup: "Edinburgh Airport",
        dropoff: "Royal Mile Hotel",
        via: [],
        pickupType: "airport",
        dropoffType: "hotel",
      },
      journey: {
        selectedVehicle: {
          id: "vehicle_5",
          name: "Range Rover Evoque",
          description: "Luxury SUV",
          passengers: 5,
          luggage: 5,
          price: 110,
          image: "/placeholder.svg?height=200&width=300",
          features: ["4WD", "Panoramic Roof", "Heated Seats"],
          totalPrice: 110,
        },
        isReturn: false,
        passengers: 4,
        handLuggage: 4,
        suitcases: 4,
        date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
        time: "19:00",
      },
      user: {
        isLoggedIn: true,
        email: "david.taylor@email.com",
        name: "David Taylor",
        phone: "+44 7654 321987",
      },
      payment: {
        method: "card",
        status: "refunded",
        amount: 110,
        currency: "GBP",
      },
      totalAmount: 110,
      notes: "Customer requested cancellation due to flight delay",
    },
  ];

  localStorage.setItem("bluebird-bookings-data", JSON.stringify(mockBookings));
  return mockBookings;
}
