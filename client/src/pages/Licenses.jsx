import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const libraries = [
  ['React','UI framework used for the Control Deck web client.'],
  ['React Router','Client-side routing for product and resource pages.'],
  ['Framer Motion','Motion and interaction library used for restrained interface animation.'],
  ['Tailwind CSS','Utility-first styling framework used by the design system.'],
  ['Lucide','Open-source icon set used for interface icons.'],
  ['Vite','Frontend development and build tooling.'],
  ['Express','HTTP server framework used by the backend architecture.'],
  ['Mongoose','MongoDB object modeling used by the backend data layer.'],
  ['OBS Studio','The OBS Studio logo is used to identify the supported OBS integration. OBS and the OBS Studio logo are trademarks of Wizards of OBS LLC; Control Deck is not affiliated with or endorsed by OBS.'],
];
export default function Licenses(){return <><PageHero eyebrow="Legal" title="Open-source licenses and acknowledgements." description="Control Deck is built with open-source software. Distribution builds should include the exact license notices required by the dependency versions shipped with the product."/><section className="page-shell pb-24"><div className="grid gap-4 md:grid-cols-2">{libraries.map(([name,copy])=><AnimatedSection key={name} className="surface rounded-2xl p-7"><h2 className="text-xl font-semibold">{name}</h2><p className="mt-4 leading-7 text-white/50">{copy}</p></AnimatedSection>)}</div><p className="mt-8 max-w-3xl text-sm leading-6 text-white/40">Before production distribution, generate and ship a dependency license report from the final lockfiles so copyright notices and license texts match the exact packages included in each released build.</p></section></>}
