// Server-side catalog authority for checkout, entitlement and delivery validation.
// Keep prices here in integer cents. Never trust client-submitted prices.
const rows = [
  ['scene-pilot',0,'plugin'],['audio-router',0,'plugin'],['focus-launcher',0,'plugin'],['command-runner',900,'plugin'],['window-grid',0,'plugin'],['capture-toolkit',1200,'plugin'],['system-sensors',0,'plugin'],['macro-flow',1400,'plugin'],
  ['live-director',1100,'profile'],['deep-work-station',0,'profile'],['edit-suite-pro',1500,'profile'],['dev-console',0,'profile'],['game-night',0,'profile'],['meeting-room',600,'profile'],
  ['precision-line',700,'icons'],['signal-blocks',800,'icons'],['creator-glyphs',900,'icons'],['orbit-grid',0,'screensaver'],['studio-signals',600,'soundboard'],['mono-deck',500,'icons'],
  ['telemetry-drift',500,'screensaver'],['quiet-orbit',0,'screensaver'],['after-hours',500,'screensaver'],
  ['studio-cues',600,'soundboard'],['interface-pulse',0,'soundboard'],['broadcast-kit',800,'soundboard'],
];
export const marketplaceCatalog = rows.map(([slug, unitAmount, delivery]) => ({ slug, unitAmount, currency:'usd', delivery }));
export function getCatalogItem(slug){ return marketplaceCatalog.find(item => item.slug === slug) || null; }
