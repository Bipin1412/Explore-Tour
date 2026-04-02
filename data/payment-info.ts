export interface PaymentInfo {
  payeeName: string;
  upiId: string;
  phoneNumber: string;
  whatsappNumber: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  ifsc: string;
  branch: string;
  note: string;
}

export const paymentInfo: PaymentInfo = {
  payeeName: "Explorers Group",
  upiId: "explorers.group@upi",
  phoneNumber: "+91 98765 43210",
  whatsappNumber: "+91 98765 43210",
  bankName: "HDFC Bank",
  accountName: "Explorers Group Adventures",
  accountNumber: "50200012345678",
  ifsc: "HDFC0001020",
  branch: "Pune Camp Branch",
  note: "Replace these details with the client's final GPay, WhatsApp, and banking information."
};

export function buildPaymentQrValue() {
  const encodedName = encodeURIComponent(paymentInfo.payeeName);
  const encodedUpi = encodeURIComponent(paymentInfo.upiId);

  return `upi://pay?pa=${encodedUpi}&pn=${encodedName}&cu=INR`;
}
