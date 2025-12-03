import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./page.module.scss";

interface SuccessPageProps {
  searchParams: Promise<{
    bookingId?: string;
  }>;
}

export default async function SuccessPage({ searchParams }: SuccessPageProps) {
  const params = await searchParams;
  const bookingId = params.bookingId ?? "N/A";

  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.successIcon} aria-hidden="true" />

      <h2 className={styles.title}>Booking Confirmed</h2>

      <p className={styles.message}>
        Your booking ID: <strong>{bookingId}</strong>
      </p>

      <Link href="/booking/destination">
        <Button fullWidth>Make another booking</Button>
      </Link>
    </div>
  );
}
