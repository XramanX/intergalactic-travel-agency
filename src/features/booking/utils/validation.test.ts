import {
  validateDates,
  validateTravelers,
  validateTripDurationWithDestination,
} from "./validation";
import type { Traveler, Destination } from "@/types/booking";

describe("validateDates", () => {
  it("returns error when dates are missing", () => {
    expect(validateDates(null, null)).toBe("Please select both dates.");
    expect(validateDates("2025-01-01", null)).toBe("Please select both dates.");
    expect(validateDates(null, "2025-01-02")).toBe("Please select both dates.");
  });

  it("returns error when return date is not after departure", () => {
    expect(validateDates("2025-01-02", "2025-01-02")).toBe(
      "Return date must be after departure date."
    );
    expect(validateDates("2025-01-03", "2025-01-02")).toBe(
      "Return date must be after departure date."
    );
  });

  it("returns null for valid date range", () => {
    expect(validateDates("2025-01-01", "2025-01-02")).toBeNull();
  });
});

describe("validateTravelers", () => {
  const baseTraveler: Traveler = {
    id: "t-1",
    fullName: "Jane Doe",
    age: 30,
  };

  it("requires at least one traveler", () => {
    expect(validateTravelers([])).toBe("At least one traveler is required.");
  });

  it("requires full name for each traveler", () => {
    const travelers: Traveler[] = [
      { ...baseTraveler, fullName: " " },
      { ...baseTraveler, id: "t-2", fullName: "Valid Name" },
    ];
    expect(validateTravelers(travelers)).toBe(
      "Each traveler must have a full name."
    );
  });

  it("requires a valid age > 0 for each traveler", () => {
    const travelers: Traveler[] = [
      { ...baseTraveler, age: 0 },
      { ...baseTraveler, id: "t-2", age: -5 },
    ];
    expect(validateTravelers(travelers)).toBe(
      "Each traveler must have a valid age greater than 0."
    );
  });

  it("returns null when all travelers are valid", () => {
    const travelers: Traveler[] = [
      baseTraveler,
      { ...baseTraveler, id: "t-2", fullName: "John Doe", age: 25 },
    ];
    expect(validateTravelers(travelers)).toBeNull();
  });
});

describe("validateTripDurationWithDestination", () => {
  const destinationDays: Destination = {
    id: "luna",
    name: "Luna (Moon)",
    distance: "384K km",
    travelTime: "3 days",
  };

  const destinationMonths: Destination = {
    id: "mars",
    name: "Mars",
    distance: "225M km",
    travelTime: "7 months",
  };

  it("returns null when required inputs are missing", () => {
    expect(
      validateTripDurationWithDestination(null, "2025-01-02", destinationDays)
    ).toBeNull();
    expect(
      validateTripDurationWithDestination("2025-01-01", null, destinationDays)
    ).toBeNull();
    expect(
      validateTripDurationWithDestination("2025-01-01", "2025-01-02", null)
    ).toBeNull();
  });

  it("returns error when trip is shorter than travel time (days)", () => {
    expect(
      validateTripDurationWithDestination(
        "2025-01-01",
        "2025-01-02",
        destinationDays
      )
    ).toMatch("Trip is too short for this destination");
  });

  it("returns error when trip is shorter than travel time (months approx)", () => {
    expect(
      validateTripDurationWithDestination(
        "2025-01-01",
        "2025-01-31",
        destinationMonths
      )
    ).toMatch("Trip is too short for this destination");
  });

  it("returns null when trip is long enough", () => {
    // 3+ day trip for 3-day travel
    expect(
      validateTripDurationWithDestination(
        "2025-01-01",
        "2025-01-05",
        destinationDays
      )
    ).toBeNull();
  });
});
