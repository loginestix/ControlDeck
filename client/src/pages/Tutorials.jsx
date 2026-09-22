import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const tutorials = [
  ['Build your first profile','Create a focused profile, choose a layout, add actions, and organize related controls into folders.','Beginner','/resources/build-your-first-profile'],
  ['Create a streaming workflow','Set up scene switching, microphone control, recording, chat shortcuts, and multi-actions for a faster live workflow.','Creator','/resources/cleaner-streaming-workflow'],
  ['Design a productivity deck','Combine browser, email, calendar, notes, music, focus mode, and custom hotkeys into one work profile.','Productivity','/resources/five-profiles-for-deep-work'],
  ['Install and manage plugins','Browse available plugins, review their purpose and permissions, install them, and keep versions organized.','Plugins','/support/plugins'],
  ['Create a custom icon pack','Prepare consistent icons, preview them against the Control Deck interface, group them into a pack, and add marketplace metadata.','Design','/creator-guidelines'],
  ['Prepare a marketplace item','Add a clear title, creator information, category, description, supported platforms, screenshots, version details, and documentation.','Creator','/resources/marketplace-foundations'],
];

export default function Tutorials(){return <><PageHero eyebrow="Tutorials" title="Learn Control Deck by building with it." description="Step-by-step learning paths for creators, streamers, productivity users, plugin users and marketplace creators."/><section className="page-shell grid gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">{tutorials.map(([title,copy,tag,to])=><AnimatedSection key={title} className="surface rounded-2xl p-6"><p className="text-xs uppercase tracking-widest text-violet-300">{tag}</p><h2 className="mt-8 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p><Link to={to} className="mt-6 inline-block text-sm text-white/70 transition hover:text-violet-300">Tutorial overview →</Link></AnimatedSection>)}</section></>}
