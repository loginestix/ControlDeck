import { Link, useOutletContext, useParams } from 'react-router-dom';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import MarketplaceCard from '../components/MarketplaceCard.jsx';
import { creators, marketplace } from '../data/marketplaceData.js';

export default function MarketplaceCreator(){
  const {slug}=useParams();
  const store=useOutletContext();
  const creator=creators.find(x=>x.slug===slug);
  if(!creator) return <div className="grid min-h-[420px] place-items-center rounded-3xl border border-white/10 bg-white/[.025] text-center"><div><p className="eyebrow">Marketplace creator</p><h2 className="mt-4 text-2xl font-semibold">Creator not found.</h2><Link to="/marketplace" className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black">Back to Marketplace</Link></div></div>;
  const items=marketplace.filter(x=>x.creatorSlug===slug);
  return <>
    <Link to="/marketplace" className="inline-flex items-center gap-2 text-sm text-white/45 transition hover:text-white"><ArrowLeft size={15}/>Back to Marketplace</Link>
    <div className="mt-7 border-b border-white/10 pb-8"><p className="eyebrow">Marketplace creator</p><h1 className="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{creator.name}</h1><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">{creator.bio}</p></div>
    <div className="mt-8 mb-10 rounded-2xl border border-white/10 bg-white/[.025] p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center"><div><div className="flex items-center gap-2"><p className="text-sm text-white/50">{creator.handle}</p><BadgeCheck size={15} className="text-violet-300"/></div><p className="mt-3 text-sm text-white/40">Specializes in {creator.specialties.join(', ')}</p></div><span className="text-sm text-white/40">{items.length} marketplace products</span></div></div>
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{items.map(x=><MarketplaceCard key={x.slug} item={x} librarySet={store.librarySet} cartSet={store.cartSet} onGet={store.addFree} onCart={store.toggleCart}/>)}</div>
  </>
}
