import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const sections = [
  ['Getting started', 'Install Control Deck, launch the application, create your first profile, and assign actions to the controls you use most.'],
  ['Profiles and actions', 'Profiles organize controls for different contexts such as streaming, gaming, editing, development, or focused work. Actions represent commands that can be assigned to controls.'],
  ['Plugins', 'Plugins extend Control Deck with additional applications, services, actions, and workflows. Install only plugins you trust and review requested permissions before enabling them.'],
  ['Marketplace', 'The marketplace architecture supports plugins, icon packs, profiles, actions, themes, and workflows. Items can expose creator details, versions, ratings, supported platforms, and documentation.'],
  ['Developer API', 'The project includes an API-ready MERN architecture. Plugin and marketplace data can be served by the Express backend and persisted in MongoDB as the product moves from mock data to production data.'],
  ['Troubleshooting', 'If an action does not run, verify the target application is available, confirm plugin permissions, reconnect the integration if needed, and restart Control Deck after configuration changes.'],
];

export default function Documentation(){return <><PageHero eyebrow="Documentation" title="Control Deck documentation." description="Practical product documentation for setup, profiles, plugins, integrations, marketplace content and the developer-ready architecture."/><section className="page-shell pb-24"><div className="grid gap-4 md:grid-cols-2">{sections.map(([title,copy],index)=><AnimatedSection key={title} className="surface rounded-2xl p-7"><p className="text-xs font-semibold uppercase tracking-[.2em] text-white/35">{String(index+1).padStart(2,'0')}</p><h2 className="mt-6 text-xl font-semibold">{title}</h2><p className="mt-4 leading-7 text-white/50">{copy}</p></AnimatedSection>)}</div></section></>}
