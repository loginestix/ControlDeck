import { motion, useReducedMotion } from 'framer-motion';

export default function PageTransition({ children }) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={reduce ? {} : { opacity: 1, y: 0 }}
      transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
