"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button/Button";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./page.module.scss";
import { useBooking } from "@/features/booking/hooks/useBooking";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("bookingId") ?? "N/A";

  const { resetBooking } = useBooking();

  useEffect(() => {
    resetBooking();
  }, [resetBooking]);

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
