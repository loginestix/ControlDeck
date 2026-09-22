# Control Deck marketplace packages

Plugin archives live at `<slug>/<version>.zip`. The current entitlement API uses `latest.zip` for newly-created entitlements unless a specific version is stored.

Every plugin ZIP must contain exactly one `plugin.json` manifest at the archive root or inside one top-level folder. Marketplace installs require `manifest.marketplace.slug` to exactly match the purchased marketplace slug.

The server always returns an `X-Control-Deck-SHA256` header. Production deployments should configure an Ed25519 private key through `PACKAGE_SIGNING_PRIVATE_KEY_PATH` (preferred) or `PACKAGE_SIGNING_PRIVATE_KEY_PEM`; package responses will then also include `X-Control-Deck-Signature` and `X-Control-Deck-Signature-Algorithm: ed25519`.

The desktop client allows checksum-only packages from localhost for development. Non-local package URLs require HTTPS, a host present in `CONTROLDECK_MARKETPLACE_HOSTS`, and a valid Ed25519 signature verified with `CONTROLDECK_PACKAGE_PUBLIC_KEY_PEM`.
