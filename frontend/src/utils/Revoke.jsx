import { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

function Revoke({ children, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref);

  const mainControls = useAnimation();

  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView]);
  return (
    <div ref={ref} className={`overflow-hidden w-fit relative`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.2, delay: delay }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default Revoke;
