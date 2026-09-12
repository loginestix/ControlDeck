# Desktop marketplace install contract

The website/API side now returns a `control-deck://install?...` deep link after an authenticated entitlement check.

The desktop application should register the `control-deck` protocol and handle the install URI using this sequence:

1. Parse `url` and `slug` from the deep link.
2. Download `url` immediately; it expires after 10 minutes.
3. Read `X-Control-Deck-SHA256` and `X-Control-Deck-Signature` response headers.
4. Verify the downloaded archive hash. In production, verify the signature using the corresponding application-side verification strategy before extraction.
5. Read and validate the plugin/package manifest.
6. Display requested permissions to the user before first activation.
7. Extract into an isolated marketplace package directory.
8. Register the package version and rollback metadata locally.
9. Enable the item only after validation succeeds.

The website should never install arbitrary downloaded code directly. Installation belongs to the trusted desktop client.
