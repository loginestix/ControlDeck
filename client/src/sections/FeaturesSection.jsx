import { Workflow, Layers3, Plug, Shapes, Keyboard, AudioLines } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Workflow, title: 'Custom Workflows', text: 'Chain actions, shortcuts and app commands into focused one-tap routines.', span: 'md:col-span-2' },
  { icon: Layers3, title: 'Dynamic Profiles', text: 'Switch layouts automatically as your active app or task changes.' },
  { icon: Plug, title: 'Plugin System', text: 'Extend Control Deck with services, tools and community-built capabilities.' },
  { icon: Shapes, title: 'Custom Icons', text: 'Create a control surface that is visually yours and instantly scannable.' },
  { icon: Keyboard, title: 'Macros & Hotkeys', text: 'Trigger complex shortcuts and repeatable sequences without breaking flow.' },
  { icon: AudioLines, title: 'Audio & Stream Control', text: 'Keep core media, microphone and broadcast controls close at hand.', span: 'md:col-span-2' },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="page-shell">
        <div className="max-w-2xl"><div className="eyebrow">Built around your workflow</div><h2 className="section-title mt-4">A control surface that adapts to the way you work.</h2><p className="mt-5 text-base leading-7 text-white/45">Simple enough for everyday shortcuts. Powerful enough for deeply customized creator and professional setups.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text, span }) => (
            <motion.article key={title} whileHover={{ y: -4 }} transition={{ duration: .2 }} className={`surface rounded-2xl p-6 ${span || ''}`}>
              <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5"><Icon size={19} className="text-white/80"/></div>
              <h3 className="mt-8 text-lg font-semibold tracking-[-0.02em]">{title}</h3><p className="mt-2 text-sm leading-6 text-white/42">{text}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
