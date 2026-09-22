import { Link, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import PageHero from '../components/PageHero.jsx';
import Button from '../components/Button.jsx';
import { resources } from '../data/catalog.js';

export default function ResourceDetail(){
  const {slug}=useParams();
  const item=resources.find(x=>x.slug===slug);
  if(!item) return <PageHero eyebrow="Resources" title="Resource not found." description="Return to the resource library to continue browsing."><Button to="/resources">View Resources</Button></PageHero>;
  return <><section className="page-shell pt-14 sm:pt-20"><Link to="/resources" className="inline-flex items-center gap-2 text-sm text-white/45 hover:text-white"><ArrowLeft size={15}/>Back to Resources</Link></section><PageHero eyebrow={item.tag} title={item.title} description={item.copy}/><section className="page-shell pb-24"><article className="surface mx-auto max-w-4xl rounded-3xl p-6 sm:p-10">{item.body.map((p,i)=><p key={i} className={`${i?'mt-6':''} text-base leading-8 text-white/60`}>{p}</p>)}</article></section></>
}
