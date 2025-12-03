import type { Traveler } from "@/types/booking";
import type { Destination } from "@/types/booking";

export function validateDates(
  departureDate: string | null,
  returnDate: string | null
): string | null {
  if (!departureDate || !returnDate) return "Please select both dates.";
  if (new Date(returnDate) <= new Date(departureDate)) {
    return "Return date must be after departure date.";
  }
  return null;
}

export function validateTravelers(travelers: Traveler[]): string | null {
  if (!travelers.length) {
    return "At least one traveler is required.";
  }

  for (const t of travelers) {
    if (!t.fullName.trim()) {
      return "Each traveler must have a full name.";
    }

    const ageNum =
      typeof t.age === "number" ? t.age : parseInt(String(t.age), 10);

    if (Number.isNaN(ageNum) || ageNum <= 0) {
      return "Each traveler must have a valid age greater than 0.";
    }
  }

  return null;
}

function parseTravelTimeToDays(travelTime: string | undefined): number {
  if (!travelTime) return 0;
  const [rawAmount, rawUnit] = travelTime.split(" ");
  const amount = parseInt(rawAmount.replace(/[^\d]/g, ""), 10);
  if (!amount || !rawUnit) return 0;

  const unit = rawUnit.toLowerCase();
  if (unit.startsWith("day")) return amount;
  if (unit.startsWith("month")) return amount * 30;
  if (unit.startsWith("year")) return amount * 365;
  return 0;
}

function diffInDays(start: string, end: string): number {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffMs = endDate.getTime() - startDate.getTime();
  return diffMs / (1000 * 60 * 60 * 24);
}

export function validateTripDurationWithDestination(
  departureDate: string | null,
  returnDate: string | null,
  destination: Destination | null
): string | null {
  if (!departureDate || !returnDate || !destination) return null;

  const tripDays = diffInDays(departureDate, returnDate);
  const travelDays = parseTravelTimeToDays(destination.travelTime);

  if (travelDays > 0 && tripDays < travelDays) {
    return `Trip is too short for this destination. Minimum ${travelDays} day(s) required based on travel time.`;
  }

  return null;
}

/**
 * Convenience helper so components/layouts don't need to know
 * about travel-time parsing or map logic.
 */
const DESTINATION_TRAVEL_TIME: Record<string, string> = {
  mars: "7 months",
  europa: "2 years",
  titan: "4 years",
  luna: "3 days",
};

export function validateTripDurationWithDestinationId(
  departureDate: string | null,
  returnDate: string | null,
  destinationId: string | null
): string | null {
  if (!departureDate || !returnDate || !destinationId) return null;

  const travelTime = DESTINATION_TRAVEL_TIME[destinationId];
  if (!travelTime) return null;

  const tripDays = diffInDays(departureDate, returnDate);
  const travelDays = parseTravelTimeToDays(travelTime);

  if (travelDays > 0 && tripDays < travelDays) {
    return `Trip is too short for this destination. Minimum ${travelDays} day(s) required based on travel time.`;
  }

  return null;
}
