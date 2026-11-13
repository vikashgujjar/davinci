export type ContactField = "fullName" | "company" | "email" | "phone" | "message";

export type ContactValues = Record<ContactField, string>;

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string>>;
  values?: Partial<ContactValues>;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\-.\s\d]{7,20}$/;

/** Shared validation used by both the client form and the server action. */
export function validateContact(v: ContactValues): Partial<Record<ContactField, string>> {
  const e: Partial<Record<ContactField, string>> = {};
  if (v.fullName.trim().length < 2) e.fullName = "Please enter your full name.";
  else if (v.fullName.length > 100) e.fullName = "Name is too long.";
  if (v.company.trim().length < 2) e.company = "Please enter your company name.";
  else if (v.company.length > 120) e.company = "Company name is too long.";
  if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid work email address.";
  if (v.phone.trim() && !PHONE.test(v.phone.trim())) e.phone = "Please enter a valid phone number.";
  if (v.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
  else if (v.message.length > 2000) e.message = "Message must be under 2,000 characters.";
  return e;
}
