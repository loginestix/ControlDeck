import { Check, Plus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import Rating from './Rating.jsx';
import MarketplacePreviewArt from './MarketplacePreviewArt.jsx';

export default function MarketplaceCard({ item, librarySet = new Set(), cartSet = new Set(), onGet, onCart }) {
  const Icon = item.icon; const owned = librarySet.has(item.slug); const inCart = cartSet.has(item.slug);
  return <article className="flex h-full min-h-[430px] flex-col overflow-hidden border border-white/10 bg-[#0d1016] transition duration-300 hover:-translate-y-1 hover:border-white/20">
    <div className="">
      <MarketplacePreviewArt item={item} to={`/marketplace/${item.slug}`}>
        <div className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-black/45 shadow-panel backdrop-blur-sm"><Icon className="h-5 w-5 text-violet-100" /></div>
        <span className="absolute right-4 top-4 rounded-lg border border-white/10 bg-black/55 px-3 py-1 text-[11px] font-medium text-white/70 backdrop-blur-sm">{item.type}</span>
      </MarketplacePreviewArt>
    </div>
    <div className="flex flex-1 flex-col p-5">
      <div className="flex items-start justify-between gap-4"><div className="min-w-0"><Link to={`/marketplace/${item.slug}`} className="font-semibold transition hover:text-violet-200">{item.name}</Link><p className="mt-1 text-sm text-white/40">by <Link to={`/marketplace/maker/${item.creatorSlug}`} className="transition hover:text-white">{item.creator}</Link></p></div><strong className="shrink-0 text-sm">{item.price}</strong></div>
      <p className="mt-4 min-h-12 text-sm leading-6 text-white/50">{item.tagline}</p>
      <div className="mt-auto pt-5"><div className="flex items-center justify-between gap-3"><Rating value={item.rating} /><span className="text-xs text-white/35">{item.downloads}</span></div>
        <div className="mt-5 grid grid-cols-[1fr_auto] gap-2"><Link to={`/marketplace/${item.slug}`} className="rounded-xl border border-white/10 px-4 py-2.5 text-center text-sm font-medium transition hover:bg-white/5">View details</Link>{item.free ? <button onClick={() => onGet?.(item.slug)} disabled={owned} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${owned ? 'cursor-default border border-emerald-400/20 bg-emerald-400/[.08] text-emerald-200' : 'bg-violet-500 text-white hover:bg-violet-400'}`}>{owned ? <Check size={15} /> : <Plus size={15} />}<span className="hidden xl:inline">{owned ? 'Added' : 'Get'}</span></button> : <button onClick={() => onCart?.(item.slug)} className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${inCart ? 'border border-violet-400/30 bg-violet-400/10 text-violet-200' : 'bg-white text-black hover:bg-white/90'}`}><ShoppingBag size={15} /><span className="hidden xl:inline">{inCart ? 'Added' : 'Add'}</span></button>}</div></div>
    </div>
  </article>
}
