import { Link, useOutletContext } from 'react-router-dom';
import { ArrowRight, Library, Trash2 } from 'lucide-react';
import MarketplaceCard from '../components/MarketplaceCard.jsx';
import { useMarketplaceCatalog } from '../hooks/useMarketplaceCatalog.js';

export default function MarketplaceLibrary(){
  const store=useOutletContext();
  const {items:catalog}=useMarketplaceCatalog();
  const items=catalog.filter(x=>store.librarySet.has(x.slug));
  return <>
    <div className="mb-8 border-b border-white/10 pb-7"><p className="eyebrow">Your Marketplace</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Your Library</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">Everything you have added from the marketplace, in one place.</p></div>
    {items.length?<div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(x=><div key={x.slug} className="relative"><MarketplaceCard item={x} librarySet={store.librarySet} cartSet={store.cartSet} onGet={store.addFree} onCart={store.toggleCart}/><button onClick={()=>store.removeLibrary(x.slug)} className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-black/60 text-white/50 backdrop-blur transition hover:text-white" aria-label={`Remove ${x.name} from library`}><Trash2 size={14}/></button></div>)}</div>:<div className="grid min-h-[420px] place-items-center rounded-3xl border border-white/10 bg-white/[.025] text-center"><div className="max-w-sm px-5"><Library className="mx-auto h-8 w-8 text-white/25"/><h3 className="mt-5 text-xl font-semibold">Your library is empty</h3><p className="mt-2 text-sm leading-6 text-white/40">Add free products from the Control Deck marketplace and they will appear here.</p><Link to="/marketplace/control-deck" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Browse Control Deck <ArrowRight size={15}/></Link></div></div>}
  </>
}
