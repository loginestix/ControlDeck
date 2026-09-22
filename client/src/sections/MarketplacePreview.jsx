import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import Rating from '../components/Rating.jsx';
import MarketplacePreviewArt from '../components/MarketplacePreviewArt.jsx';
import { marketplace } from '../data/catalog.js';

export default function MarketplacePreview() {
  const previewSlugs = ['scene-pilot', 'audio-router', 'live-director', 'deep-work-station', 'precision-line', 'signal-blocks', 'orbit-grid', 'studio-signals'];
  const items = previewSlugs.map(slug => marketplace.find(item => item.slug === slug)).filter(Boolean);
  return <AnimatedSection className="page-shell py-24">
    <div className="">
      <p className="eyebrow">Marketplace</p>
      <div className="mt-4 flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <h2 className="section-title">Discover. Install. Make it yours.</h2>
        <Link to="/marketplace" className="text-sm text-violet-300 transition hover:text-violet-200">Explore marketplace →</Link>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{items.map((item) => {
        const Icon = item.icon;
        return <article key={item.slug} className="flex h-full flex-col overflow-hidden border border-white/10 bg-[#0d1016]">
          <div className="rounded-2xl">
            <MarketplacePreviewArt item={item} to={`/marketplace/${item.slug}`}>
              <span className="absolute right-4 top-4 rounded-full bg-black/50 px-2.5 py-1 text-[10px] text-white/70 backdrop-blur-sm">{item.category}</span>
              <div className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/45 backdrop-blur-sm">
                <Icon className="h-5 w-5 text-violet-200" />
              </div>
            </MarketplacePreviewArt>
          </div>
          <div className="flex flex-1 flex-col p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4"><div>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-1 text-sm text-white/40">by {item.creator}</p>
            </div>
              <span className="text-sm font-semibold">{item.price}</span>
            </div>
            <p className="mt-4 text-sm leading-6 text-white/50">{item.tagline}</p>
            <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
              <div className="flex items-center gap-3">
                <Rating value={item.rating} />
                <span className="text-xs text-white/40">{item.downloads}</span>
              </div>
              <Link to={`/marketplace/${item.slug}`} className="text-sm font-medium text-violet-300 transition hover:text-violet-200">View →</Link>
            </div>
          </div>
        </article>
      })}
      </div>
    </div>
  </AnimatedSection>
}
