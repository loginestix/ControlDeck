import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import Button from '../components/Button.jsx';
import DeckPreview from '../components/DeckPreview.jsx';

export default function HeroSection() {
  const reduced = useReducedMotion();
  return (
    <section className="overflow-hidden pb-20 pt-16 sm:pb-28 sm:pt-24 lg:pb-32 lg:pt-28">
      <div className="page-shell grid items-center gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-12">
        <motion.div initial={reduced ? false : 'hidden'} animate="show" variants={{ hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{staggerChildren:.08,duration:.5}} }}>
          <motion.div variants={{hidden:{opacity:0,y:10},show:{opacity:1,y:0}}} className="eyebrow">Control software, reimagined</motion.div>
          <motion.h1 variants={{hidden:{opacity:0,y:14},show:{opacity:1,y:0}}} className="mt-5 max-w-2xl text-5xl font-semibold leading-[.94] tracking-[-0.055em] sm:text-6xl lg:text-7xl xl:text-[78px]">One Deck.<br/><span className="text-white/48">Infinite Control.</span></motion.h1>
          <motion.p variants={{hidden:{opacity:0,y:14},show:{opacity:1,y:0}}} className="mt-6 max-w-xl text-base leading-7 text-white/52 sm:text-lg">Control your streams, apps, games, workflows, and creative tools from one customizable command center.</motion.p>
          <motion.div variants={{hidden:{opacity:0,y:14},show:{opacity:1,y:0}}} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button to="/download" className="gap-2"><Download size={17}/>Download Control Deck</Button>
            <Button to="/features" variant="secondary" className="gap-2">Explore Features<ArrowRight size={17}/></Button>
          </motion.div>
          <motion.p variants={{hidden:{opacity:0},show:{opacity:1}}} className="mt-5 text-xs text-white/28">Built for streamers, creators, developers, gamers and focused workflows.</motion.p>
        </motion.div>
        <DeckPreview />
      </div>
    </section>
  );
}
