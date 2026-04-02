import { notFound } from "next/navigation";
import PaymentLandingClient from "@/components/booking/PaymentLandingClient";
import { fetchBookingById } from "@/lib/db";
import { buildUpiIntent } from "@/lib/payment";

interface PaymentPageProps {
  params: {
    bookingId: string;
  };
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const booking = await fetchBookingById(params.bookingId);
  if (!booking) {
    notFound();
  }

  const upiIntent = buildUpiIntent({
    amount: booking.tripPrice,
    tripName: booking.tripName,
    paymentRef: booking.paymentRef
  });

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_right,rgba(211,122,49,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(64,98,67,0.14),transparent_28%),linear-gradient(180deg,#f6efe5,#efe4d3)] pb-16 pt-8">
      <section className="section-shell">
        <div className="mb-6 rounded-[2rem] border border-[#d9cfbf] bg-[#f8f1e6] p-6 shadow-[0_24px_70px_rgba(29,34,26,0.08)] sm:p-8">
          <p className="section-tag">Booking Checkout</p>
          <h1 className="mt-4 font-display text-5xl text-[#112315] sm:text-6xl">Secure your departure</h1>
          <p className="mt-4 max-w-3xl text-sm leading-8 text-[#555b4f] sm:text-base">
            This page keeps your booking details, payment options, and verification steps together so the payment handoff feels clear from start to receipt.
          </p>
        </div>

        <PaymentLandingClient
          bookingId={booking.id}
          tripName={booking.tripName}
          amount={booking.tripPrice}
          paymentRef={booking.paymentRef}
          upiIntent={upiIntent}
          initialPaymentStatus={booking.paymentStatus}
          initialReceiptNumber={booking.receiptNumber}
        />
      </section>
    </main>
  );
}
