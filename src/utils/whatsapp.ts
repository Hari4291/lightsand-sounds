import { businessConfig } from '../config/business';

/**
 * Normalizes phone numbers for WhatsApp click-to-chat.
 * Strips non-digit characters and ensures country code 91 for Indian mobile numbers.
 */
export function formatWhatsAppNumber(phone: string): string {
  if (!phone) return '';
  let clean = phone.replace(/[^0-9]/g, '');
  // If it's a 10-digit Indian number, add 91 prefix
  if (clean.length === 10 && /^[6-9]/.test(clean)) {
    clean = `91${clean}`;
  }
  return clean;
}

/**
 * Checks whether a valid WhatsApp number is present in configuration.
 */
export function hasWhatsAppNumber(): boolean {
  const num = formatWhatsAppNumber(businessConfig.whatsappNumber);
  return num.length >= 8;
}

/**
 * Checks whether a valid Phone number is present in configuration.
 */
export function hasPhoneNumber(): boolean {
  const num = (businessConfig.phoneNumber || '').trim();
  return num.length >= 8;
}

/**
 * Creates the official WhatsApp Click-to-Chat URL.
 * Returns null if no WhatsApp number is configured.
 */
export function getWhatsAppUrl(message?: string): string | null {
  const cleanNumber = formatWhatsAppNumber(businessConfig.whatsappNumber);
  if (!cleanNumber) return null;

  const defaultMsg =
    "Hello! I am interested in your services. I would like to know more details.";
  const text = encodeURIComponent(message || defaultMsg);

  return `https://wa.me/${cleanNumber}?text=${text}`;
}

/**
 * Creates a service-specific WhatsApp enquiry URL.
 */
export function getServiceEnquiryUrl(serviceTitle: string): string | null {
  const message = `Hello! I would like to enquire about your ${serviceTitle} for an upcoming celebration. Please share details and availability.`;
  return getWhatsAppUrl(message);
}

/**
 * Generates the tel: protocol link for direct phone calls.
 * Returns null if no phone number is configured.
 */
export function getPhoneCallUrl(): string | null {
  const phone = (businessConfig.phoneNumber || '').trim();
  if (!phone) return null;
  // Clean phone for tel:
  const clean = phone.replace(/[^\d+]/g, '');
  return `tel:${clean}`;
}

