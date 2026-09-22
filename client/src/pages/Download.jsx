import { motion, useReducedMotion } from 'framer-motion';
import PageHero from '../components/PageHero.jsx';
import Button from '../components/Button.jsx';
import { Monitor, Apple, Terminal, Smartphone } from 'lucide-react';

const desktopPlatforms = [
  ['Windows', 'Available build target', Monitor, true],
  ['macOS', 'Coming Soon', Apple, false],
  ['Linux', 'Coming Soon', Terminal, false],
];

const apkUrl = import.meta.env.VITE_ANDROID_APK_URL || 'https://github.com/loginestix/ControlDeck/releases/download/v1.0.0/ControlDeck-Mobile-1.0.0.apk';
const windowsUrl = import.meta.env.VITE_WINDOWS_DOWNLOAD_URL || 'https://github.com/loginestix/ControlDeck/releases/download/v1.0.0/ControlDeck-Setup-1.0.0.exe';

export default function Download() {
  const reduce = useReducedMotion();

  return (
    <>
      <PageHero
        eyebrow="Download"
        title="Take Control With You."
        description="Install Control Deck on your primary workstation. Platform availability is configuration-driven and unsupported platforms are clearly identified."
      />
      <section className="page-shell pb-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {desktopPlatforms.map(([name, status, Icon, available], index) => (
            <motion.article
              className="surface rounded-3xl p-7"
              key={name}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              whileHover={reduce ? {} : { y: -4 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.38, delay: reduce ? 0 : index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div whileHover={reduce ? {} : { rotate: -4, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
                <Icon size={28} />
              </motion.div>
              <h2 className="mt-12 text-2xl font-semibold">{name}</h2>
              <p className="mt-2 text-sm text-white/45">{status}</p>
              <div className="mt-8">
                {available ? <Button href={windowsUrl} download variant="primary" className="w-full">Download for Windows</Button> : <Button variant="secondary" className="w-full opacity-60" disabled>Coming Soon</Button>}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.article
          id="android-apk"
          className="surface mt-4 rounded-3xl p-7"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={reduce ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <motion.div whileHover={reduce ? {} : { rotate: 4, scale: 1.05 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="inline-block">
                <Smartphone size={28} />
              </motion.div>
              <h2 className="mt-8 text-2xl font-semibold">Android Mobile APK</h2>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/45">
                Install Control Deck directly on Android without Google Play. Download the official APK build from this site and enable installation from your browser or file manager when Android asks for permission.
              </p>
            </div>
            <Button href={apkUrl} download variant="primary" className="w-full lg:w-auto">Download Mobile APK</Button>
          </div>
        </motion.article>

        <div className="mt-8 flex flex-wrap gap-3 text-sm">
          <Button to="/release-notes" variant="secondary">View Release Notes</Button>
          <Button to="/installation-guide" variant="secondary">Installation Guide</Button>
          <span className="px-4 py-3 text-white/35">Version: configured at release time</span>
        </div>
      </section>
    </>
  );
}
