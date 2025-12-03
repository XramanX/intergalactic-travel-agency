"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { FaCheckCircle } from "react-icons/fa";
import styles from "./page.module.scss";

export default function SuccessPage() {
  const params = useSearchParams();
  const bookingId = params.get("bookingId");
  const router = useRouter();

  return (
    <div className={styles.container}>
      <FaCheckCircle className={styles.successIcon} aria-hidden="true" />

      <h2 className={styles.title}>Booking Confirmed</h2>

      <p className={styles.message}>
        Your booking ID: <strong>{bookingId}</strong>
      </p>

      <Button fullWidth onClick={() => router.push("/booking/destination")}>
        Make another booking
      </Button>
    </div>
  );
}
