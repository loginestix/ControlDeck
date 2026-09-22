import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Button({ children, to, href, variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent';
  const styles = variant === 'primary'
    ? 'bg-white text-black hover:bg-white/90'
    : 'border border-white/12 bg-white/[0.04] text-white hover:bg-white/[0.08]';

  const content = <span className={`${base} ${styles} ${className}`}>{children}</span>;
  if (to) return <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}><Link to={to}>{content}</Link></motion.div>;
  if (href) return <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}><a href={href} {...props}>{content}</a></motion.div>;
  return <motion.button whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }} {...props}>{content}</motion.button>;
}
