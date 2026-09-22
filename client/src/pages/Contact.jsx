import { useState } from 'react';
import { ArrowRight, HelpCircle, MessagesSquare, Store } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { api } from '../services/api.js';

export default function Contact(){
  const [sent,setSent]=useState(false);
  const [error,setError]=useState('');
  const [sending,setSending]=useState(false);
  const [form,setForm]=useState({name:'',email:'',inquiryType:'Product question',subject:'',message:''});
  const submit=async(e)=>{e.preventDefault();setError('');setSending(true);try{await api.contact(form);setSent(true);setForm({name:'',email:'',inquiryType:'Product question',subject:'',message:''})}catch(err){setError(err.message)}finally{setSending(false)}};
  return <><PageHero eyebrow="Contact" title="Talk to the Control Deck team." description="Choose the right path for product questions, marketplace help, creator inquiries or partnerships."/>
  <section className="page-shell pb-24">
    <div className="grid gap-4 md:grid-cols-3">{[
      ['Product support','Get help with setup, downloads and product use.',HelpCircle,'/support'],
      ['Marketplace help','Find answers about products, Library and creator content.',Store,'/support/marketplace-downloads'],
      ['Creator resources','Review publishing guidance before preparing marketplace content.',MessagesSquare,'/creator-guidelines'],
    ].map(([n,d,I,to])=><Link key={n} to={to} className="surface group rounded-2xl p-6 transition hover:-translate-y-1 hover:border-white/20"><I className="text-violet-300"/><h2 className="mt-7 text-lg font-semibold">{n}</h2><p className="mt-2 min-h-12 text-sm leading-6 text-white/48">{d}</p><span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-200">Open <ArrowRight size={14} className="transition group-hover:translate-x-1"/></span></Link>)}</div>
    <div className="mt-12 grid gap-8 lg:grid-cols-[.7fr_1.3fr]">
      <aside className="rounded-3xl border border-white/10 bg-white/[.025] p-7 sm:p-8"><p className="eyebrow">Before you send</p><h2 className="mt-4 text-2xl font-semibold">Help us route it correctly.</h2><p className="mt-4 text-sm leading-7 text-white/48">Include the feature or marketplace product involved, your platform, and the result you expected. Clear context makes product and support conversations much easier to resolve.</p><div className="mt-7 border-t border-white/10 pt-6"><p className="text-sm font-semibold">Need documentation instead?</p><Link to="/documentation" className="mt-2 inline-flex items-center gap-2 text-sm text-violet-200">Open documentation <ArrowRight size={14}/></Link></div></aside>
      <form onSubmit={submit} className="surface space-y-4 rounded-3xl p-6 sm:p-8">
        <div className="grid gap-4 sm:grid-cols-2">{[['Name','text','name'],['Email','email','email']].map(([n,t,key])=><label className="block" key={n}><span className="mb-2 block text-sm text-white/55">{n}</span><input required type={t} value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-violet-400/60"/></label>)}</div>
        <label className="block"><span className="mb-2 block text-sm text-white/55">Inquiry type</span><select required value={form.inquiryType} onChange={e=>setForm({...form,inquiryType:e.target.value})} className="w-full rounded-xl border border-white/10 bg-[#0b0e13] px-4 py-3 text-white/80 outline-none transition focus:border-violet-400/60"><option>Product question</option><option>Marketplace</option><option>Creator inquiry</option><option>Partnership</option><option>Other</option></select></label>
        <label className="block"><span className="mb-2 block text-sm text-white/55">Subject</span><input required type="text" value={form.subject} onChange={e=>setForm({...form,subject:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-violet-400/60"/></label>
        <label className="block"><span className="mb-2 block text-sm text-white/55">Message</span><textarea required rows="7" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-violet-400/60"/></label>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center"><button disabled={sending} className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-50">{sending?'Sending…':'Send message'}</button><p className="text-xs leading-5 text-white/30">Messages are securely stored for the Control Deck support team.</p></div>
        {error&&<p role="alert" className="rounded-xl border border-red-400/20 bg-red-400/[.06] px-4 py-3 text-sm text-red-200">{error}</p>}
        {sent&&<p role="status" className="rounded-xl border border-emerald-400/20 bg-emerald-400/[.06] px-4 py-3 text-sm text-emerald-200">Your message has been received.</p>}
      </form>
    </div>
  </section></>
}
