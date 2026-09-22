import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const items = [
  ['Using Control Deck','Use the service lawfully and do not attempt to disrupt the platform, bypass security controls, misuse accounts, or interfere with other users.'],
  ['Accounts','You are responsible for activity performed through your account and for keeping account credentials secure. Information submitted to the service should be accurate and kept reasonably current.'],
  ['Plugins and marketplace content','Third-party plugins, icon packs, profiles, workflows, themes, and integrations may be created by independent creators. Review descriptions, permissions, compatibility, and creator information before installing or purchasing content.'],
  ['Creator submissions','Creators should only submit content they have the right to distribute and should provide accurate descriptions, supported-platform details, permissions, documentation, and version information.'],
  ['Downloads and availability','Features, builds, integrations, marketplace items, and supported platforms may change as Control Deck develops. A platform marked Coming Soon is not represented as currently supported.'],
  ['Changes and support','Terms may be updated when the production service, commercial model, or applicable requirements change. Material production terms should be reviewed before public launch.'],
];
export default function Terms(){return <><PageHero eyebrow="Legal" title="Terms of Use" description="Core terms for responsible use of the Control Deck application, website, plugins and marketplace ecosystem."/><section className="page-shell pb-24"><div className="surface rounded-3xl p-6 sm:p-8"><p className="text-sm text-white/40">Last updated: September 11, 2026</p><div className="mt-8 grid gap-8">{items.map(([title,copy])=><AnimatedSection key={title}><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 max-w-4xl leading-7 text-white/50">{copy}</p></AnimatedSection>)}</div></div></section></>}
