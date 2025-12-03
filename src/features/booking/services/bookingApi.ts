import { fetchJson } from "@/lib/fetchJson";
import type { Destination } from "@/types/booking";

export async function getDestinations(): Promise<Destination[]> {
  return fetchJson<Destination[]>("/api/destinations");
}

export async function getDestinationById(
  id: string
): Promise<Destination | null> {
  const all = await getDestinations();
  return all.find((d) => d.id === id) ?? null;
}
