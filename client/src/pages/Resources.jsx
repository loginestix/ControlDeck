import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import {resources} from '../data/catalog.js';
import {ArrowUpRight} from 'lucide-react';
export default function Resources(){return <><PageHero eyebrow="Resources" title="Learn, build and refine your workflows." description="Guides, tutorials, development notes and product updates for the Control Deck ecosystem."/><section className="page-shell grid gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">{resources.map(({slug,tag,title,copy})=><article key={title} className="surface rounded-2xl p-6"><p className="text-xs uppercase tracking-widest text-violet-300">{tag}</p><h2 className="mt-8 text-xl font-semibold">{title}</h2><p className="mt-3 min-h-14 text-sm leading-6 text-white/50">{copy}</p><Link to={`/resources/${slug}`} className="mt-6 inline-flex items-center gap-2 text-sm transition hover:text-violet-300">Read resource <ArrowUpRight size={15}/></Link></article>)}</section></>}
