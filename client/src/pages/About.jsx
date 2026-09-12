import { ArrowRight, Blocks, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

const principles=[
  ['Original by design','A distinct product language built around focused control, not imitation.',Sparkles],
  ['Extensible at the core','Profiles, actions, integrations and marketplace products work as reusable building blocks.',Blocks],
  ['Professional first','Clear hierarchy, accessibility and restrained motion stay ahead of visual noise.',ShieldCheck],
];

export default function About(){return <><PageHero eyebrow="About Control Deck" title="A focused control layer for modern digital work." description="Control Deck is being built as an original, extensible command center for creators, gamers, developers and professionals."/>
<section className="page-shell pb-24">
  <div className="grid gap-4 lg:grid-cols-3">{principles.map(([n,d,I])=><article key={n} className="surface flex min-h-64 flex-col rounded-2xl p-7"><div className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-violet-300"><I size={20}/></div><h2 className="mt-8 text-xl font-semibold">{n}</h2><p className="mt-4 leading-7 text-white/50">{d}</p></article>)}</div>
  <div className="mt-16 grid gap-8 rounded-3xl border border-white/10 bg-white/[.025] p-7 sm:p-10 lg:grid-cols-[.9fr_1.1fr] lg:p-12"><div><p className="eyebrow">Why it exists</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.035em]">One control surface. Fewer interruptions.</h2></div><div><p className="leading-8 text-white/52">Modern work moves across streaming tools, creative apps, developer utilities, communication platforms and everyday system controls. Control Deck brings those actions into one customizable layer so users can build focused workflows instead of repeatedly hunting through windows and menus.</p><p className="mt-5 leading-8 text-white/52">The platform is being designed around reusable profiles, plugins, visual assets and automation so the ecosystem can grow without compromising the core experience.</p></div></div>
  <div className="mt-16 grid gap-4 md:grid-cols-3">{[['Product','Custom command surfaces for different workflows.'],['Platform','A plugin-ready architecture for integrations and automation.'],['Ecosystem','A marketplace for profiles, icons, motion, sound and creator tools.']].map(([n,d])=><div key={n} className="rounded-2xl border border-white/10 bg-white/[.018] p-6"><p className="text-sm font-semibold text-violet-200">{n}</p><p className="mt-2 text-sm leading-6 text-white/45">{d}</p></div>)}</div>
  <div className="mt-16 flex flex-col items-start justify-between gap-6 rounded-3xl border border-violet-400/20 bg-violet-400/[.055] p-8 sm:flex-row sm:items-center sm:p-10"><div><p className="eyebrow">See the platform</p><h2 className="mt-3 text-2xl font-semibold">Explore what Control Deck can become.</h2></div><Link to="/features" className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Explore features <ArrowRight size={15}/></Link></div>
</section></>}
