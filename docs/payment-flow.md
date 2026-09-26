# Marketplace payment flow

1. The authenticated browser sends only item slugs to `POST /api/payments/checkout-session`.
2. The API resolves prices from its own catalog and creates a pending Order.
3. The API creates a Stripe Checkout Session and returns its hosted checkout URL.
4. Stripe sends `checkout.session.completed` to `/api/payments/webhook`.
5. The webhook marks the order paid and creates/activates Entitlement records.
6. The returning Library page reloads entitlements from the API.
7. An entitled user can request a short-lived package/deep-link install token.

The client never decides the paid price or marks its own order as paid.
