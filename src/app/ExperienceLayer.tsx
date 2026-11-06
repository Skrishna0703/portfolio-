import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

export function IntroLoader() {
  const [visible, setVisible] = useState(
    () => sessionStorage.getItem("portfolio-intro-seen") !== "true",
  )
  const reduceMotion = useReducedMotion()
  useEffect(() => {
    if (!visible) return
    const timer = window.setTimeout(
      () => {
        sessionStorage.setItem("portfolio-intro-seen", "true")
        setVisible(false)
      },
      reduceMotion ? 150 : 1350,
    )
    return () => window.clearTimeout(timer)
  }, [reduceMotion, visible])
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="intro-loader"
          exit={{
            opacity: 0,
            transition: { duration: reduceMotion ? 0.01 : 0.45 },
          }}
        >
          <motion.div
            animate={{ opacity: 1, scale: 1 }}
            className="loader-mark"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.82 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            SS
          </motion.div>
          <motion.p
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.25 }}
          >
            Shrikrishna Sutar — Portfolio
          </motion.p>
          <div className="loader-track">
            <motion.span
              animate={{ scaleX: 1 }}
              initial={{ scaleX: 0 }}
              transition={{
                duration: reduceMotion ? 0.01 : 1.05,
                ease: "easeInOut",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
