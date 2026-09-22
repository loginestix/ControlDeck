import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection.jsx';
import { marketplace } from '../data/marketplaceData.js';

export default function PluginEcosystem(){
  const plugins=marketplace.filter(item=>item.category==='Plugins').slice(0,8);
  return <AnimatedSection className="page-shell py-24">
    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
      <div><p className="eyebrow">Plugin ecosystem</p><h2 className="section-title mt-4">Make Control Deck work your way.</h2></div>
      <p className="max-w-md text-white/50">Extend your deck with new applications, actions, services and specialized workflows.</p>
    </div>
    <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {plugins.map((item)=>{const Icon=item.icon;return <div key={item.slug} className="surface group flex h-full flex-col rounded-2xl p-5 transition hover:-translate-y-1 hover:border-white/20">
        <div className="flex items-start justify-between"><div className="rounded-xl bg-white/5 p-3"><Icon className="h-5 w-5"/></div><span className="text-xs text-white/35">★ {item.rating}</span></div>
        <h3 className="mt-7 font-semibold">{item.name}</h3><p className="mt-1 text-xs text-white/40">{item.type}</p>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/45">{item.tagline}</p>
        <Link to={`/marketplace/${item.slug}`} className="mt-auto block w-full rounded-xl border border-white/10 py-2 pt-2 text-center text-sm text-white/65 transition group-hover:bg-white group-hover:text-black">Explore</Link>
      </div>})}
    </div>
  </AnimatedSection>
}
