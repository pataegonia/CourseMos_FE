import { motion } from "framer-motion";

// dir에 따라 진입/퇴장 방향 고정
export default function PageSlide({ children, dir = "right" }) {
  const xFrom = dir === "right" ? 80 : -80;  // 들어올 때
  const xExit = dir === "right" ? -80 : 80;  // 나갈 때

  return (
    <motion.div
      initial={{ opacity: 0, x: xFrom }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: xExit }}
      transition={{ type: "tween", duration: 0.28, ease: "easeOut" }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
