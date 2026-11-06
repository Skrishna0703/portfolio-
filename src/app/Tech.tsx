import {
  Braces,
  Cloud,
  CreditCard,
  FileCode2,
  KeyRound,
  Sparkles,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"
import {
  siClerk,
  siCss,
  siExpress,
  siFirebase,
  siFramer,
  siGit,
  siGithub,
  siGoogle,
  siHtml5,
  siJavascript,
  siKeras,
  siMongodb,
  siNetlify,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPostman,
  siPrisma,
  siPython,
  siPytorch,
  siRazorpay,
  siReact,
  siRender,
  siScikitlearn,
  siSocketdotio,
  siStreamlit,
  siTailwindcss,
  siTensorflow,
  siTypescript,
  siVercel,
  siVite,
  type SimpleIcon,
} from "simple-icons"

type LogoEntry = {
  icon?: SimpleIcon
  fallback?: ComponentType<SVGProps<SVGSVGElement>>
  color?: string
}

const logos: Record<string, LogoEntry> = {
  HTML: { icon: siHtml5 },
  HTML5: { icon: siHtml5 },
  CSS: { icon: siCss },
  CSS3: { icon: siCss },
  JavaScript: { icon: siJavascript },
  TypeScript: { icon: siTypescript },
  "React.js": { icon: siReact },
  React: { icon: siReact },
  "Next.js": { icon: siNextdotjs },
  "Tailwind CSS": { icon: siTailwindcss },
  "Vite.js": { icon: siVite },
  Vite: { icon: siVite },
  "Framer Motion": { icon: siFramer },
  "Node.js": { icon: siNodedotjs },
  "Express.js": { icon: siExpress },
  "Socket.IO": { icon: siSocketdotio },
  MongoDB: { icon: siMongodb },
  PostgreSQL: { icon: siPostgresql },
  Firebase: { icon: siFirebase },
  Prisma: { icon: siPrisma },
  Python: { icon: siPython },
  TensorFlow: { icon: siTensorflow },
  Keras: { icon: siKeras },
  PyTorch: { icon: siPytorch },
  "Scikit-learn": { icon: siScikitlearn },
  "Google Gemini API": { icon: siGoogle },
  Git: { icon: siGit },
  GitHub: { icon: siGithub },
  Postman: { icon: siPostman },
  Vercel: { icon: siVercel },
  Netlify: { icon: siNetlify },
  Render: { icon: siRender },
  Streamlit: { icon: siStreamlit },
  Razorpay: { icon: siRazorpay },
  Clerk: { icon: siClerk },
  "REST APIs": { fallback: Braces, color: "B87555" },
  API: { fallback: Braces, color: "B87555" },
  "API Integration": { fallback: Braces, color: "B87555" },
  "OpenWeatherMap API": { fallback: Cloud, color: "F2A340" },
  "JWT Authentication": { fallback: KeyRound, color: "D63AFF" },
  JWT: { fallback: KeyRound, color: "D63AFF" },
  Web3Forms: { fallback: FileCode2, color: "B87555" },
  PyPDF2: { fallback: FileCode2, color: "B87555" },
  "python-docx": { fallback: FileCode2, color: "3776AB" },
  ReportLab: { fallback: FileCode2, color: "B87555" },
  Lottie: { fallback: Sparkles, color: "00DDB3" },
  "Machine Learning": { fallback: Sparkles, color: "85836A" },
  "Deep Learning": { fallback: Sparkles, color: "85836A" },
  "MongoDB Atlas": { icon: siMongodb },
  Payment: { fallback: CreditCard, color: "0C2451" },
}

export function TechLogo({ name, size = 22 }: { name: string; size?: number }) {
  const entry = logos[name] ?? { fallback: Braces, color: "795B48" }
  if (entry.icon) {
    return (
      <svg
        aria-label={`${name} logo`}
        className="tech-logo"
        height={size}
        role="img"
        viewBox="0 0 24 24"
        width={size}
      >
        <path d={entry.icon.path} fill={`#${entry.icon.hex}`} />
      </svg>
    )
  }
  const Fallback = entry.fallback ?? Braces
  return (
    <Fallback
      aria-label={`${name} technology symbol`}
      className="tech-logo"
      color={`#${entry.color}`}
      height={size}
      role="img"
      width={size}
    />
  )
}

export function TechBadge({
  name,
  compact = false,
}: {
  name: string
  compact?: boolean
}) {
  return (
    <span
      className={`tech-badge ${compact ? "tech-badge-compact" : ""}`}
      title={name}
    >
      <TechLogo name={name} size={compact ? 14 : 18} />
      <span>{name}</span>
    </span>
  )
}

export function TechCard({
  name,
  category,
}: {
  name: string
  category: string
}) {
  return (
    <div className="tech-card" tabIndex={0}>
      <span className="tech-card-icon">
        <TechLogo name={name} size={28} />
      </span>
      <span>
        <strong>{name}</strong>
        <small>{category}</small>
      </span>
    </div>
  )
}
