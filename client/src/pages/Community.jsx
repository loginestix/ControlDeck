import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { ArrowRight, GalleryHorizontal, Code2, Lightbulb, Users, Store } from 'lucide-react';

const cards=[
  ['Creator marketplace','Discover products and the people building them.',Store,'/marketplace'],
  ['Creator guidelines','Prepare original marketplace content for Control Deck.',GalleryHorizontal,'/creator-guidelines'],
  ['Plugin development','Start with documentation for the plugin-ready architecture.',Code2,'/documentation'],
  ['Feature ideas','Use Support to share product questions and useful feedback.',Lightbulb,'/support'],
  ['Learning resources','Explore workflows, tutorials and implementation guidance.',Users,'/resources'],
];

export default function Community(){return <><PageHero eyebrow="Community" title="Built around people who create." description="A connected space for Control Deck users, marketplace creators, plugin developers and workflow enthusiasts."/>
<section className="page-shell pb-24">
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{cards.map(([n,d,I,to])=><Link to={to} className="surface group flex min-h-64 flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-white/20" key={n}><I className="text-violet-300"/><h2 className="mt-10 text-xl font-semibold">{n}</h2><p className="mt-2 leading-7 text-white/50">{d}</p><span className="mt-auto inline-flex items-center gap-2 pt-7 text-sm font-semibold text-violet-200">Explore <ArrowRight size={14} className="transition group-hover:translate-x-1"/></span></Link>)}</div>
  <div className="mt-16 grid gap-7 rounded-3xl border border-white/10 bg-white/[.025] p-8 sm:p-10 lg:grid-cols-[1.2fr_.8fr]"><div><p className="eyebrow">Contribute</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.035em]">Build useful things. Share clear ideas.</h2><p className="mt-4 max-w-2xl leading-7 text-white/50">The strongest ecosystem is one where users can discover workflows, creators can publish high-quality assets, and developers can extend the product without compromising reliability or usability.</p></div><div className="flex items-end lg:justify-end"><Link to="/creator-guidelines" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Creator guidelines <ArrowRight size={15}/></Link></div></div>
</section></>}
