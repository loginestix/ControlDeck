import { motion, useReducedMotion } from 'framer-motion';
export default function AnimatedSection({ children, className='' }) {
  const reduce = useReducedMotion();
  return <motion.section className={className} initial={reduce?false:{opacity:0,y:24}} whileInView={reduce?{}:{opacity:1,y:0}} viewport={{once:true,amount:.18}} transition={{duration:.5,ease:[.22,1,.36,1]}}>{children}</motion.section>;
}
