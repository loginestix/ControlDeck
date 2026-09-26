import { CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import DeckPreview from './DeckPreview.jsx';

export default function AuthShell({eyebrow,title,description,children}){
  return <section className="page-shell py-14 sm:py-20">
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#0b0e15] shadow-panel">
      <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-cyan-400/[.06] blur-3xl"/>
      <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-violet-500/[.13] blur-3xl"/>
      <div className="relative grid lg:grid-cols-[1.05fr_.95fr]">
        <div className="flex min-h-[650px] flex-col justify-between border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r lg:p-14">
          <div><span className="inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-400/[.07] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[.17em] text-violet-200"><Sparkles size={13}/>Control Deck account</span><h1 className="mt-7 max-w-xl text-4xl font-semibold tracking-[-.045em] sm:text-5xl">Your controls, profiles and plugins—ready everywhere.</h1><p className="mt-5 max-w-xl text-sm leading-7 text-white/48">Keep your official marketplace library connected and move securely between the website and desktop app.</p></div>
          <div className="my-10"><DeckPreview/></div>
          <div className="grid gap-3 text-sm text-white/50 sm:grid-cols-2"><span className="flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-300"/>Secure account access</span><span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-violet-300"/>Verified plugin library</span></div>
        </div>
        <div className="flex items-center p-7 sm:p-10 lg:p-14"><div className="w-full max-w-md mx-auto"><p className="eyebrow">{eyebrow}</p><h2 className="mt-4 text-3xl font-semibold tracking-[-.035em] sm:text-4xl">{title}</h2><p className="mt-3 text-sm leading-6 text-white/45">{description}</p><div className="mt-8">{children}</div></div></div>
      </div>
    </div>
  </section>
}
