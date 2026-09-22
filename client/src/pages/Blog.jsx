import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const posts = [
  ['Product','Why Control Deck is being built as an extensible control platform','A look at the product principles behind profiles, actions, plugins, integrations and a creator marketplace.','/resources/designing-for-extensibility'],
  ['Workflows','Designing controls around context instead of app lists','Why focused profiles can reduce switching and make repeated creative or professional tasks easier to run.','/resources/five-profiles-for-deep-work'],
  ['Development','How the plugin architecture fits into the MERN platform','An overview of the API-ready data model for plugins, categories, reviews, downloads and marketplace content.','/resources/plugin-architecture-overview'],
  ['Design','Building a professional control interface without visual noise','The design system favors hierarchy, restrained motion, strong contrast and consistent surfaces over crowded gaming visuals.','/documentation'],
  ['Marketplace','What makes a useful marketplace listing','Clear descriptions, supported platforms, version information, screenshots, permissions and documentation help users evaluate extensions.','/resources/marketplace-foundations'],
  ['Updates','Preparing Control Deck for desktop and mobile distribution','The download experience is structured to support desktop builds and direct Android APK delivery while platform availability evolves.','/release-notes'],
];

export default function Blog(){return <><PageHero eyebrow="Blog" title="Ideas, product notes and Control Deck updates." description="Original articles about workflows, product design, plugins, integrations, marketplace creation and the platform architecture."/><section className="page-shell grid gap-4 pb-24 md:grid-cols-2 lg:grid-cols-3">{posts.map(([tag,title,copy,to])=><AnimatedSection key={title} className="surface rounded-2xl p-6"><p className="text-xs uppercase tracking-widest text-violet-300">{tag}</p><h2 className="mt-8 text-xl font-semibold">{title}</h2><p className="mt-3 text-sm leading-6 text-white/50">{copy}</p><Link to={to} className="mt-6 inline-block text-sm text-white/70 transition hover:text-violet-300">Read article →</Link></AnimatedSection>)}</section></>}
