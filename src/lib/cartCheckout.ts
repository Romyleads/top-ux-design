export function canContinueToPayment(contact: { name: string; email: string; consent: boolean }, itemCount: number): boolean {
  return itemCount > 0 && Boolean(contact.name.trim()) && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contact.email.trim()) && contact.consent;
}