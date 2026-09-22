# Control Deck

Control Deck is a MERN product website and verified desktop-plugin marketplace for a customizable control-deck application.

## Security notice before deployment

The credentials that previously appeared in `.env.example` must be considered exposed. Rotate the MongoDB password and generate new, different `JWT_SECRET` and `PACKAGE_TOKEN_SECRET` values before deploying. Never commit a populated `.env` file.

## Run locally

```bash
npm run install:all
npm run dev
```

Client: `http://localhost:5173`  
API: `http://localhost:5000`

Copy `.env.example` to `.env` and configure MongoDB/JWT values before using authenticated marketplace features.

## Marketplace production path now implemented

The marketplace keeps the existing Control Deck visual system but now includes production-oriented backend flows:

- JWT account authentication for marketplace ownership.
- Server-side entitlements for free acquisitions and purchases.
- Stripe Checkout session creation with prices validated from a server-side catalog.
- Stripe webhook fulfillment that converts paid orders into entitlements.
- A persistent Order model and Entitlement model.
- Short-lived authenticated package URLs.
- `control-deck://install` deep links intended for the desktop app protocol handler.
- SHA-256 package integrity metadata and optional HMAC package signatures.
- Download records for marketplace package requests.
- Public desktop catalog at `GET /api/desktop/plugins` containing only published, verified plugins.
- Official OBS package delivery at `GET /api/desktop/plugins/:id/package`.
- Desktop `control-deck://install?id=...` handoff for website-to-app installation.
- Protected live admin statistics and a validated contact-submission API.

Only OBS Studio is published at launch. The old demonstration plugin packages are intentionally excluded.

## Connect the installed desktop app

After deploying the API over HTTPS, set `apiBaseUrl` in the desktop project's `marketplace-config.json` to:

```json
{ "apiBaseUrl": "https://YOUR-API-DOMAIN.example/api/desktop" }
```

Build the desktop installer after changing that value. The desktop client validates the returned declarative manifest and installs only action types and permissions allowed by its host registry.

### Stripe

Set:

```env
STRIPE_SECRET_KEY=...
STRIPE_WEBHOOK_SECRET=...
```

Configure your Stripe webhook endpoint as:

`POST /api/payments/webhook`

Until Stripe keys are present, checkout returns a clear configuration error rather than pretending that payment succeeded.

### Plugin/package delivery

During local development, put a published package at:

`server/packages/<item-slug>/<version>.zip`

For production, private object storage is recommended. Keep the entitlement check on the API and issue short-lived signed URLs after ownership is verified.

The desktop Control Deck app should register the `control-deck://` scheme, download the package URL supplied by the API, verify the SHA-256/signature, validate the plugin manifest/permissions, and only then install it.

## Preview artwork

Marketplace artwork is rendered in a reusable 16:9 preview frame using `object-contain` rather than crop-heavy card-specific heights. This keeps the full preview visible on Home, Marketplace, product detail and featured placements while retaining the existing theme and card styling.
