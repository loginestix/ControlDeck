import PageHero from '../components/PageHero.jsx';
import AnimatedSection from '../components/AnimatedSection.jsx';

const items = [
  ['Information you provide','Account details, profile information, support messages, reviews, creator submissions, and other information you choose to provide may be processed to operate Control Deck services.'],
  ['Product and technical data','The service may process device, application, diagnostic, download, integration, and usage information needed for security, reliability, support, and product improvement.'],
  ['How information is used','Information may be used to provide requested features, maintain accounts, deliver downloads, support marketplace activity, prevent abuse, respond to requests, and improve the product.'],
  ['Integrations and third parties','When you connect a third-party service, that service may process information under its own terms and privacy policy. Control Deck should request only permissions needed for the selected integration.'],
  ['Data choices','Users should be able to update relevant account information, disconnect integrations, and request assistance with privacy or account questions through the contact or support channels.'],
  ['Security and updates','Reasonable technical and organizational safeguards should be used to protect service data. This policy should be updated when production data practices, providers, or legal requirements change.'],
];
export default function Privacy(){return <><PageHero eyebrow="Legal" title="Privacy Policy" description="This policy describes the intended privacy principles for the Control Deck service. Production deployment should be reviewed against the actual data flows and service providers in use."/><section className="page-shell pb-24"><div className="surface rounded-3xl p-6 sm:p-8"><p className="text-sm text-white/40">Last updated: September 11, 2026</p><div className="mt-8 grid gap-8">{items.map(([title,copy])=><AnimatedSection key={title}><h2 className="text-xl font-semibold">{title}</h2><p className="mt-3 max-w-4xl leading-7 text-white/50">{copy}</p></AnimatedSection>)}</div></div></section></>}
