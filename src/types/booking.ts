export type DestinationId = "mars" | "europa" | "titan" | "luna";

export interface Destination {
  id: DestinationId;
  name: string;
  distance: string;
  travelTime: string;
}

export interface Traveler {
  id: string;
  fullName: string;
  age: number | "";
}

export interface BookingDates {
  departureDate: string | null;
  returnDate: string | null;
}

export interface BookingState {
  destinationId: DestinationId | null;
  dates: BookingDates;
  travelers: Traveler[];
}

export interface BookingPayload {
  destinationId: DestinationId;
  departureDate: string;
  returnDate: string;
  travelers: Array<{
    fullName: string;
    age: number;
  }>;
}

export interface BookingResponse {
  success: boolean;
  bookingId: string;
}
