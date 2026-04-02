import { z } from "zod";

export const phoneField = z
  .string()
  .regex(/^[0-9+\-() ]{8,20}$/, "Invalid phone number format");

export const bookingSchema = z.object({
  tripId: z.string().min(1, "Trip ID is required"),
  tripName: z.string().min(2, "Trip name is required"),
  tripPrice: z.number().positive("Trip price must be greater than zero"),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email"),
  phone: phoneField,
  eventDate: z.string().min(3, "Event date is required"),
  gender: z.enum(["Male", "Female", "Other"], {
    errorMap: () => ({ message: "Select a gender" })
  }),
  bloodGroup: z.string().min(2, "Blood group is required").max(8, "Blood group is too long"),
  age: z.number().int().min(5, "Age is too low").max(90, "Age is too high"),
  whatsappNumber: phoneField,
  travelers: z.number().int().min(1).max(12),
  departureMonth: z.string().min(3, "Departure month is required"),
  paymentId: z.string().min(4, "Payment ID is required").max(64, "Payment ID is too long"),
  notes: z.string().max(500).optional()
});

export type BookingInput = z.infer<typeof bookingSchema>;
