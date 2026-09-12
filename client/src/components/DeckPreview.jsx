import { motion, useReducedMotion } from 'framer-motion';
import { Mic2, Radio, Video, MessageSquare, Music2, Folder, Camera, MonitorUp } from 'lucide-react';

const keys = [
  [Radio, 'Go Live'], [Video, 'Scene'], [Mic2, 'Mic'], [Camera, 'Camera'],
  [MonitorUp, 'Record'], [MessageSquare, 'Chat'], [Music2, 'Music'], [Folder, 'More'],
];

export default function DeckPreview() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 24, rotateX: 8 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: .7, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative mx-auto w-full max-w-[620px]"
    >
      <div className="absolute -inset-12 -z-10 rounded-full bg-deck-accent/10 blur-3xl" />
      <div className="surface overflow-hidden rounded-[28px] bg-[#10131a]/90 p-3 sm:p-4">
        <div className="rounded-[22px] border border-white/8 bg-[#0b0d12] p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between">
            <div><div className="text-xs font-semibold text-white/90">Streaming Profile</div><div className="mt-1 text-[11px] text-white/35">8 active controls</div></div>
            <div className="flex gap-1.5"><span className="h-2 w-2 rounded-full bg-white/15"/><span className="h-2 w-2 rounded-full bg-deck-accent"/></div>
          </div>
          <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
            {keys.map(([Icon, label], index) => (
              <motion.button
                key={label}
                whileHover={reduced ? undefined : { y: -3, scale: 1.02 }}
                whileTap={reduced ? undefined : { scale: .97 }}
                className={`aspect-square rounded-2xl border p-2 text-left transition ${index === 0 ? 'border-deck-accent/45 bg-deck-accent/12' : 'border-white/8 bg-white/[0.045] hover:bg-white/[0.075]'}`}
              >
                <Icon className="h-5 w-5 text-white/85 sm:h-6 sm:w-6" />
                <span className="mt-3 block truncate text-[10px] font-medium text-white/55 sm:text-[11px]">{label}</span>
              </motion.button>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5 text-[11px] text-white/40">
            <span>Profile auto-switch enabled</span><span className="rounded-md bg-white/6 px-2 py-1 text-white/65">OBS Studio</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
