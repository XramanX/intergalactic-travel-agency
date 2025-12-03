import SuccessPageClient from "./SuccessPageClient";

type SearchParams = {
  bookingId?: string;
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const bookingId = params.bookingId ?? "N/A";

  return <SuccessPageClient bookingId={bookingId} />;
}
