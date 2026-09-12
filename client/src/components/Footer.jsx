import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import LogoMark from './LogoMark.jsx';

const columns = {
  Product: [
    ['Features', '/features'],
    ['Plugins', '/plugins'],
    ['Marketplace', '/marketplace'],
    ['Icons', '/icons'],
    ['Integrations', '/integrations'],
  ],
  Resources: [
    ['Documentation', '/documentation'],
    ['Tutorials', '/tutorials'],
    ['Blog', '/blog'],
    ['Support', '/support'],
  ],
  Company: [
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Community', '/community'],
  ],
  Legal: [
    ['Privacy', '/privacy'],
    ['Terms', '/terms'],
    ['Licenses', '/licenses'],
  ],
};

export default function Footer() {
  const reduce = useReducedMotion();

  return (
    <motion.footer
      className="border-t border-white/10 py-14 sm:py-20"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      whileInView={reduce ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="page-shell grid gap-12 lg:grid-cols-[1.3fr_2fr]">
        <div>
          <div className="flex items-center gap-3"><LogoMark /><span className="font-semibold">Control Deck</span></div>
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/45">Your control center for everything you create.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          {Object.entries(columns).map(([title, items], columnIndex) => (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.38, delay: reduce ? 0 : columnIndex * 0.05 }}
            >
              <h3 className="text-sm font-semibold">{title}</h3>
              <div className="mt-4 grid gap-3">
                {items.map(([label, path]) => (
                  <Link key={label} to={path} className="text-sm text-white/45 hover:text-white">{label}</Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.footer>
  );
}
