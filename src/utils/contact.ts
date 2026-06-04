import { SITE } from "../data/site";

export type ContactFormValues = {
  name: string;
  email: string;
  projectType: string;
  budgetTimeline: string;
  message: string;
};

export type ContactErrors = Partial<Record<keyof ContactFormValues, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContact(values: ContactFormValues): ContactErrors {
  const errors: ContactErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Enter your name.";
  if (!email) errors.email = "Enter your email.";
  else if (!emailPattern.test(email)) errors.email = "Enter a valid email address.";
  if (!message) errors.message = "Tell me a little about the project.";

  return errors;
}

export function buildMailto(values: ContactFormValues): string {
  const subject = `Project enquiry from ${values.name.trim() || "jatskie.com"}`;
  const body = [
    `Name: ${values.name.trim()}`,
    `Email: ${values.email.trim()}`,
    `Project type: ${values.projectType.trim() || "Not specified"}`,
    `Budget / timeline: ${values.budgetTimeline.trim() || "Not specified"}`,
    "",
    "Message:",
    values.message.trim()
  ].join("\n");

  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function hasContactErrors(errors: ContactErrors): boolean {
  return Object.keys(errors).length > 0;
}
