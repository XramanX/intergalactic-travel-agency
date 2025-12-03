import type { ReactNode } from "react";
import { BookingProvider } from "@/features/booking/context/BookingContext";
import { WizardLayout } from "@/components/booking/WizardLayout/WizardLayout";

export default function BookingLayout({ children }: { children: ReactNode }) {
  return (
    <BookingProvider>
      <WizardLayout>{children}</WizardLayout>
    </BookingProvider>
  );
}
