import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
}

export default function FadeInSection({ children, className = '' }: FadeInSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: '-10% 0px -10% 0px',
    once: false,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
} 