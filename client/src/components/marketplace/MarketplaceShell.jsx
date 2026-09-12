import { Link, NavLink, Outlet } from 'react-router-dom';
import { Boxes, Home, Library, ShoppingBag, Store, UploadCloud } from 'lucide-react';
import { useMarketplaceLibrary } from '../../hooks/useMarketplaceLibrary.js';

const navClass = ({ isActive }) => `flex items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${isActive ? 'bg-white/[.075] text-white' : 'text-white/50 hover:bg-white/[.04] hover:text-white'}`;

export default function MarketplaceShell(){
  const store=useMarketplaceLibrary();
  return <section className="page-shell pb-24 pt-10 sm:pt-14">
    <div className="mb-9 flex flex-col gap-4 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="eyebrow">Control Deck Marketplace</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-[-.035em] text-white sm:text-4xl">Discover. Install. Make it yours.</h1>
      </div>
      <p className="max-w-xl text-sm leading-6 text-white/45 sm:text-right">Plugins, profiles, icon systems, screensavers and sounds—built for the way you use Control Deck.</p>
    </div>

    <div className="grid gap-7 lg:grid-cols-[228px_minmax(0,1fr)]">
      <aside className="h-fit rounded-2xl border border-white/10 bg-white/[.025] p-3 lg:sticky lg:top-24">
        <p className="px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/30">Marketplace</p>
        <div className="mt-2 grid gap-1">
          <NavLink end to="/marketplace" className={navClass}><span className="flex items-center gap-3"><Home size={16}/>Home</span></NavLink>
        </div>

        <p className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/30">Products</p>
        <div className="mt-2 grid gap-1">
          <NavLink to="/marketplace/control-deck" className={navClass}><span className="flex items-center gap-3"><Boxes size={16}/>Control Deck</span></NavLink>
        </div>

        <p className="mt-6 px-3 text-[10px] font-semibold uppercase tracking-[.18em] text-white/30">Your Marketplace</p>
        <div className="mt-2 grid gap-1">
          <NavLink to="/marketplace/library" className={navClass}><span className="flex items-center gap-3"><Library size={16}/>Your Library</span>{store.library.length>0&&<span className="text-[10px] text-white/35">{store.library.length}</span>}</NavLink>
          <NavLink to="/marketplace/cart" className={navClass}><span className="flex items-center gap-3"><ShoppingBag size={16}/>Cart</span>{store.cart.length>0&&<span className="text-[10px] text-white/35">{store.cart.length}</span>}</NavLink>
        </div>

        <div className="mt-6 border-t border-white/8 pt-4">
          <Link to="/creator-guidelines" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[.04] hover:text-white"><UploadCloud size={16}/>Publish products</Link>
          <Link to="/support" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-white/45 transition hover:bg-white/[.04] hover:text-white"><Store size={16}/>Marketplace help</Link>
        </div>
      </aside>

      <main className="min-w-0"><Outlet context={store}/></main>
    </div>
  </section>
}
