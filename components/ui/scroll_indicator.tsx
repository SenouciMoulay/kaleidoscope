import { motion, useScroll } from "framer-motion";

const ScrollIndicator = () => {

  const { scrollYProgress } = useScroll();

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle
        cx="50"
        cy="50"
        r="30"
        pathLength="1"
        className="stroke-gray-500 fill-none stroke-2"
      />
      <motion.circle
        cx="50"
        cy="50"
        r="30"
        pathLength="1"
        style={{ pathLength: scrollYProgress }}
        className="stroke-yellow-500 fill-none stroke-2"
      />
      <path
        d="M 50 40 L 50 60 M 40 50 L 50 60 L 60 50"
        className="stroke-yellow-500 fill-none stroke-2"
      />
    </svg>

  );
}

export default ScrollIndicator;
