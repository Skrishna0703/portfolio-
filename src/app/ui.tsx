import type { ReactNode } from "react"
import { ArrowUpRight, Image as ImageIcon } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"
import { Link } from "react-router"

const MotionLink = motion.create(Link)

export function Eyebrow({
  children,
  light = false,
}: {
  children: ReactNode
  light?: boolean
}) {
  return <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{children}</p>
}

export function Title({
  children,
  as = "h2",
  light = false,
}: {
  children: ReactNode
  as?: "h1" | "h2" | "h3"
  light?: boolean
}) {
  const Tag = as
  return (
    <Tag className={`display-title ${light ? "text-ivory" : ""}`}>
      {children}
    </Tag>
  )
}

export function ButtonLink({
  to,
  children,
  variant = "dark",
  external = false,
  disabled = false,
}: {
  to: string
  children: ReactNode
  variant?: "dark" | "light" | "outline" | "text"
  external?: boolean
  disabled?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const classes = `button button-${variant} ${
    disabled ? "button-disabled" : ""
  }`
  const interaction = reduceMotion
    ? {}
    : {
        whileHover: { y: -3, scale: 1.02 },
        whileTap: { y: 0, scale: 0.96 },
        transition: { duration: 0.24, ease: "easeOut" as const },
      }
  if (disabled) return <span className={classes}>{children}</span>
  if (external) {
    return (
      <motion.a
        className={classes}
        href={to}
        target="_blank"
        rel="noreferrer"
        {...interaction}
      >
        {children}
        <ArrowUpRight size={15} />
      </motion.a>
    )
  }
  return (
    <MotionLink className={classes} to={to} {...interaction}>
      {children}
    </MotionLink>
  )
}

export function PlaceholderImage({
  label,
  accent = "default",
  tall = false,
  src = "",
}: {
  label: string
  accent?: string
  tall?: boolean
  src?: string
}) {
  return (
    <div
      className={`image-placeholder accent-${accent} ${
        tall ? "placeholder-tall" : ""
      }`}
      role="img"
      aria-label={`${label} image placeholder`}
    >
      {src ? (
        <img alt={label} className="placeholder-image" src={src} />
      ) : (
        <>
          <div className="placeholder-grid" />
          <div className="placeholder-mark">
            <ImageIcon size={24} />
            <span>{label}</span>
            <small>Replace with your image</small>
          </div>
          <span className="placeholder-note">Editable image placeholder</span>
        </>
      )}
    </div>
  )
}

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>
}

export function SectionIntro({
  label,
  title,
  copy,
  light = false,
}: {
  label: string
  title: string
  copy?: string
  light?: boolean
}) {
  return (
    <div className="section-intro">
      <Eyebrow light={light}>{label}</Eyebrow>
      <Title light={light}>{title}</Title>
      {copy && (
        <p className={light ? "intro-copy text-sand" : "intro-copy"}>{copy}</p>
      )}
    </div>
  )
}
