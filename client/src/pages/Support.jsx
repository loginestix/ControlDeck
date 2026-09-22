import {useMemo,useState} from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import SearchBar from '../components/SearchBar.jsx';
const faqs=[
{slug:'getting-started',title:'Getting started with Control Deck'},
{slug:'profiles',title:'Creating and switching profiles'},
{slug:'plugins',title:'Installing plugins safely'},
{slug:'marketplace-downloads',title:'Managing marketplace downloads'},
{slug:'connections',title:'Troubleshooting application connections'},
{slug:'accessibility',title:'Keyboard and accessibility controls'}
];
export {faqs};
export default function Support(){const[q,setQ]=useState('');const data=useMemo(()=>faqs.filter(x=>x.title.toLowerCase().includes(q.toLowerCase())),[q]);return <><PageHero eyebrow="Support" title="Find the answer. Get back in control." description="Search setup guidance, troubleshooting information and common Control Deck questions."/><section className="page-shell pb-24"><SearchBar value={q} onChange={setQ} placeholder="Search support"/><div className="mt-6 divide-y divide-white/10 rounded-2xl border border-white/10">{data.map(x=><Link key={x.slug} to={`/support/${x.slug}`} className="flex w-full justify-between p-5 text-left text-sm transition hover:bg-white/[.03]"><span>{x.title}</span><span className="text-white/30">→</span></Link>)}</div></section></>}
