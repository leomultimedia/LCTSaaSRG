import { loadStripe } from '@stripe/stripe-js';

const stripePromise = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY 
  ? loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) 
  : null;

export class PaymentService {
  async createCheckoutSession(priceId: string) {
    if (!stripePromise) {
      console.warn('Stripe not configured. Falling back to mock checkout.');
      return { url: '/billing/success?mock=true' };
    }

    const response = await fetch('/api/billing/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priceId }),
    });

    const session = await response.json();
    const stripe = await stripePromise;
    
    if (stripe) {
      const { error } = await (stripe as any).redirectToCheckout({
        sessionId: session.id,
      });
      if (error) throw error;
    }
  }
}
