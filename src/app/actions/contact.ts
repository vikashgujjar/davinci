"use server";

import { validateContact, type ContactState, type ContactValues } from "@/lib/contact-schema";

/**
 * Handles demo / contact inquiries.
 *
 * TODO(client): connect a delivery channel before launch — e.g. an email
 * provider (Resend, Postmark, SES), a CRM webhook, or a database. Until then
 * inquiries are validated and logged on the server only.
 */
export async function submitInquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real users never fill this hidden field.
  if (String(formData.get("website") ?? "").length > 0) {
    return { status: "success", message: "Thank you — your inquiry has been received." };
  }

  const values: ContactValues = {
    fullName: String(formData.get("fullName") ?? ""),
    company: String(formData.get("company") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const errors = validateContact(values);
  if (Object.keys(errors).length > 0) {
    return { status: "error", message: "Please review the highlighted fields.", errors, values };
  }

  try {
    // Replace with real delivery (see TODO above).
    console.info("[DaVinci] New inquiry", { ...values, receivedAt: new Date().toISOString() });
    return { status: "success", message: "Thank you — your inquiry has been received. Our team will be in touch shortly." };
  } catch {
    return { status: "error", message: "Something went wrong while sending your inquiry. Please try again.", values };
  }
}
