import { useMemo, useState } from 'react';
import { Link, useOutletContext, useSearchParams } from 'react-router-dom';
import { ArrowRight, PackageOpen, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import SearchBar from '../components/SearchBar.jsx';
import MarketplaceCard from '../components/MarketplaceCard.jsx';
import MarketplacePreviewArt from '../components/MarketplacePreviewArt.jsx';
import { filterOptions, marketplaceTabs } from '../data/marketplaceData.js';
import { useMarketplaceCatalog } from '../hooks/useMarketplaceCatalog.js';

function FilterSelect({label,value,items,onChange}){
  return <label className="grid min-w-[145px] gap-1.5"><span className="text-[10px] font-semibold uppercase tracking-[.15em] text-white/30">{label}</span><select value={value} onChange={e=>onChange(e.target.value)} className="rounded-xl border border-white/10 bg-[#0d1016] px-3 py-2.5 text-sm text-white/70 outline-none transition focus:border-violet-400/40">{items.map(x=><option key={x}>{x}</option>)}</select></label>
}

function ProductGrid({items,store,columns='xl:grid-cols-3'}){return <div className={`grid gap-4 sm:grid-cols-2 ${columns}`}>{items.map(x=><MarketplaceCard key={x.slug} item={x} librarySet={store.librarySet} cartSet={store.cartSet} onGet={store.addFree} onCart={store.toggleCart}/>)}</div>}

function Section({title,copy,items,store,action}){
  return <section className="mt-12 first:mt-0"><div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"><div><h2 className="text-xl font-semibold tracking-[-.025em] text-white sm:text-2xl">{title}</h2><p className="mt-2 text-sm leading-6 text-white/40">{copy}</p></div>{action}</div><ProductGrid items={items} store={store}/></section>
}

export function MarketplaceHome(){
  const store=useOutletContext();
  const {items}=useMarketplaceCatalog();
  const featured=useMemo(()=>items.filter(x=>x.featured).sort((a,b)=>b.popular-a.popular).slice(0,6),[items]);
  const categories=[['Plugins','Install verified integrations and actions.']];
  const lead=featured[0]; const LeadIcon=lead.icon;
  return <>
    <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.025]">
      <div className="grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="p-7 sm:p-10 lg:p-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[.06] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.15em] text-violet-200"><Sparkles size={13}/>Marketplace Home</div>
          <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-[-.04em] text-white sm:text-5xl">Official plugins. Clear permissions. One-click handoff.</h2>
          <p className="mt-5 max-w-xl text-sm leading-7 text-white/50">Discover verified Control Deck integrations, review every permission, and send an installation directly to the desktop app.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/marketplace/control-deck" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Explore Control Deck <ArrowRight size={15}/></Link>
            <Link to="/marketplace/library" className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[.04] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[.08]">Open your library</Link>
          </div>
        </div>
        <div className="border-t border-white/10 p-4 lg:border-l lg:border-t-0 lg:p-5">
          <MarketplacePreviewArt item={lead} to={`/marketplace/${lead.slug}`} className="h-full min-h-[310px]">
            <div className="absolute right-6 top-6 grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-black/45 backdrop-blur-sm transition duration-300 group-hover:-translate-y-1"><LeadIcon className="h-7 w-7 text-violet-200"/></div>
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/10 bg-black/60 p-5 backdrop-blur-md"><p className="text-[11px] font-semibold uppercase tracking-[.16em] text-white/45">Featured · {lead.category}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.025em]">{lead.name}</h3><p className="mt-2 max-w-md text-sm leading-6 text-white/55">{lead.tagline}</p><span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">View product <ArrowRight size={14}/></span></div>
          </MarketplacePreviewArt>
        </div>
      </div>
    </section>

    <section className="mt-10">
      <div className="mb-5"><p className="eyebrow">Browse Control Deck</p><h2 className="mt-2 text-2xl font-semibold tracking-[-.025em]">Choose what you want to add.</h2></div>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{categories.map(([name,copy])=><Link key={name} to={`/marketplace/control-deck?tab=${encodeURIComponent(name)}`} className="group rounded-2xl border border-white/10 bg-white/[.025] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[.045]"><p className="text-sm font-semibold text-white">{name}</p><p className="mt-2 text-xs leading-5 text-white/38">{copy}</p><ArrowRight size={14} className="mt-5 text-white/28 transition group-hover:translate-x-1 group-hover:text-violet-200"/></Link>)}</div>
    </section>

    <Section title="Official release" copy="Verified and maintained for the current Control Deck desktop application." items={featured} store={store} action={<Link to="/marketplace/control-deck" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-200 hover:text-violet-100">View plugin <ArrowRight size={14}/></Link>}/>
  </>
}

export function ControlDeckMarketplace(){
  const store=useOutletContext();
  const {items,marketplaceOnline}=useMarketplaceCatalog();
  const [params,setParams]=useSearchParams();
  const tab=marketplaceTabs.includes(params.get('tab'))?params.get('tab'):'Discover';
  const [q,setQ]=useState('');
  const [filters,setFilters]=useState({});
  const [freeOnly,setFreeOnly]=useState(false);
  const [dialOnly,setDialOnly]=useState(false);
  const [sort,setSort]=useState('Popular');
  const setTab=(next)=>{setParams(next==='Discover'?{}:{tab:next});setFilters({});setFreeOnly(false);setDialOnly(false);setQ('');};
  const options=filterOptions[tab]||{};
  const filtered=useMemo(()=>{
    let rows=items.filter(x=>tab==='Discover'||x.category===tab);
    const needle=q.trim().toLowerCase();
    if(needle) rows=rows.filter(x=>`${x.name} ${x.creator} ${x.type} ${x.tagline}`.toLowerCase().includes(needle));
    Object.entries(filters).forEach(([key,value])=>{if(!value||value==='All')return; if(key==='OS'||key==='Device')rows=rows.filter(x=>(x[key.toLowerCase()]||[]).includes(value)); else rows=rows.filter(x=>x[key.toLowerCase()]===value);});
    if(freeOnly) rows=rows.filter(x=>x.free);
    if(dialOnly) rows=rows.filter(x=>x.dial);
    return [...rows].sort((a,b)=>sort==='Recent'?b.recent-a.recent:sort==='A–Z'?a.name.localeCompare(b.name):b.popular-a.popular);
  },[items,tab,q,filters,freeOnly,dialOnly,sort]);
  const featured=useMemo(()=>items.filter(x=>x.featured).sort((a,b)=>b.popular-a.popular).slice(0,6),[items]);
  const popularPlugins=useMemo(()=>items.filter(x=>x.category==='Plugins').sort((a,b)=>b.popular-a.popular).slice(0,3),[items]);
  const activeCount=Object.values(filters).filter(x=>x&&x!=='All').length+(freeOnly?1:0)+(dialOnly?1:0);
  const resetFilters=()=>{setFilters({});setFreeOnly(false);setDialOnly(false);};

  return <div className="min-w-0">
    <div className="mb-7 flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between"><div><p className="eyebrow">Control Deck</p><h2 className="mt-3 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Verified plugins for your deck.</h2><p className="mt-3 max-w-2xl text-sm leading-6 text-white/45">Review compatibility and permissions before installing an official integration.</p></div><span className={`w-fit rounded-full border px-3 py-1.5 text-xs ${marketplaceOnline?'border-emerald-400/20 bg-emerald-400/[.06] text-emerald-200':'border-amber-400/20 bg-amber-400/[.06] text-amber-200'}`}>{marketplaceOnline?'Marketplace connected':'Showing verified offline catalog'}</span></div>

    <div className="sticky top-20 z-20 mb-8 border-b border-white/10 bg-[#07090d]/92 pb-3 pt-1 backdrop-blur-xl">
      <div className="flex gap-1 overflow-x-auto">{marketplaceTabs.map(x=><button key={x} onClick={()=>setTab(x)} className={`shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition ${tab===x?'border-violet-400 text-white':'border-transparent text-white/45 hover:text-white'}`}>{x}</button>)}</div>
      <div className="mt-3"><SearchBar value={q} onChange={setQ} placeholder={`Search ${tab==='Discover'?'Control Deck marketplace':tab.toLowerCase()}`}/></div>
    </div>

    {tab==='Discover' && !q ? <>
      <section className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.025] p-7 sm:p-10"><div className="grid items-center gap-8 lg:grid-cols-[1.1fr_.9fr]"><div><p className="eyebrow">Discover</p><h3 className="mt-4 max-w-xl text-3xl font-semibold tracking-[-.035em] sm:text-4xl">Start with the official OBS Studio plugin.</h3><p className="mt-4 max-w-xl text-sm leading-7 text-white/50">Control recording, streaming, scenes, sources, audio, replay buffer and Studio Mode from your deck.</p><button onClick={()=>setTab('Plugins')} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">View plugin <ArrowRight size={15}/></button></div><div className="grid grid-cols-3 gap-3">{featured.slice(0,6).map((x,i)=>{const Icon=x.icon;return <Link key={x.slug} to={`/marketplace/${x.slug}`} className={`grid aspect-square place-items-center rounded-2xl border border-white/10 bg-white/[.035] transition hover:-translate-y-1 hover:bg-white/[.06] ${i===1||i===4?'translate-y-4':''}`}><Icon className="h-6 w-6 text-violet-200"/></Link>})}</div></div></section>
      <Section title="Available now" copy="Verified by Control Deck and ready for the desktop application." items={popularPlugins} store={store}/>
    </> : <>
      {tab!=='Discover' && <div className="mb-7 rounded-2xl border border-white/10 bg-white/[.025] p-4"><div className="flex flex-wrap items-end gap-3">{Object.entries(options).map(([label,items])=><FilterSelect key={label} label={label} value={filters[label]||'All'} items={items} onChange={value=>setFilters(f=>({...f,[label]:value}))}/>)}{(tab==='Plugins'||tab==='Profiles')&&<button onClick={()=>setDialOnly(v=>!v)} className={`rounded-xl border px-4 py-2.5 text-sm transition ${dialOnly?'border-violet-400/30 bg-violet-400/10 text-violet-200':'border-white/10 text-white/55 hover:bg-white/5'}`}><SlidersHorizontal size={14} className="mr-2 inline"/>Dial actions</button>}<button onClick={()=>setFreeOnly(v=>!v)} className={`rounded-xl border px-4 py-2.5 text-sm transition ${freeOnly?'border-violet-400/30 bg-violet-400/10 text-violet-200':'border-white/10 text-white/55 hover:bg-white/5'}`}>Free only</button><FilterSelect label="Sort" value={sort} items={['Popular','Recent','A–Z']} onChange={setSort}/>{activeCount>0&&<button onClick={resetFilters} className="mb-1 inline-flex items-center gap-2 px-2 py-2 text-xs text-white/40 transition hover:text-white"><X size={13}/>Clear</button>}</div></div>}
      <div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow">{tab}</p><h3 className="mt-2 text-2xl font-semibold tracking-[-.025em]">{tab==='Discover'?'Search results':`${tab} for Control Deck`}</h3></div><span className="text-xs text-white/35">{filtered.length} items</span></div>
      {filtered.length?<ProductGrid items={filtered} store={store}/>:<div className="grid min-h-72 place-items-center rounded-2xl border border-white/10 bg-white/[.025] text-center"><div><PackageOpen className="mx-auto h-7 w-7 text-white/30"/><h3 className="mt-4 font-semibold">Nothing found</h3><p className="mt-2 text-sm text-white/40">Try another search or clear a filter.</p></div></div>}
    </>}
  </div>
}
