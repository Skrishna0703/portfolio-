import { FormEvent, useEffect, useState } from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react"
import {
  ArrowDown,
  ArrowRight,
  Award,
  Braces,
  CheckCircle2,
  Code2,
  GraduationCap,
  Mail,
  Menu,
  Trophy,
  Users,
  X,
} from "lucide-react"
import { Link, useLocation } from "react-router"
import {
  education,
  experiences,
  navItems,
  portfolioAssets,
  projects,
  skillGroups,
} from "./data"
import { TechBadge, TechCard, TechLogo } from "./Tech"
import {
  ButtonLink,
  Eyebrow,
  PlaceholderImage,
  SectionIntro,
  Tag,
  Title,
} from "./ui"

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("home")
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.toLowerCase()))
      .filter(Boolean) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (entry) => entry.isIntersecting && setActive(entry.target.id),
        ),
      { rootMargin: "-35% 0px -55%" },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <header className={`site-header ${scrolled ? "header-scrolled" : ""}`}>
      <Link className="brand" to="/" aria-label="Shrikrishna Sutar home">
        <span className="brand-mark">SS</span>
        <span>Shrikrishna Sutar</span>
      </Link>
      <nav
        className={`nav-links ${open ? "nav-open" : ""}`}
        aria-label="Primary navigation"
      >
        {navItems.map((item) => (
          <a
            className={
              pathname === "/" && active === item.toLowerCase() ? "active" : ""
            }
            href={`/#${item.toLowerCase()}`}
            key={item}
            onClick={() => setOpen(false)}
          >
            {item}
          </a>
        ))}
        <ButtonLink to="#" variant="outline" disabled>
          Resume pending
        </ButtonLink>
      </nav>
      <button
        className="menu-button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const smoothX = useSpring(pointerX, { stiffness: 90, damping: 18 })
  const smoothY = useSpring(pointerY, { stiffness: 90, damping: 18 })
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-3, 3])
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [3, -3])
  const heading = [
    ["Building", "digital"],
    ["experiences"],
    ["that", "solve"],
    ["real", "problems."],
  ]
  const heroTech = [
    ["React.js", "float-react"],
    ["TypeScript", "float-typescript"],
    ["Node.js", "float-node"],
    ["Python", "float-python"],
  ]

  function parallax(event: React.MouseEvent<HTMLDivElement>) {
    if (reduceMotion) return
    const bounds = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5)
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5)
  }
  return (
    <section className="hero" id="home">
      <div className="hero-copy">
        <motion.div
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.6 }}
        >
          <Eyebrow>Hello, I’m Shrikrishna</Eyebrow>
          <Title as="h1">
            <span className="hero-heading-lines">
              {heading.map((line, lineIndex) => (
                <span
                  className={`hero-heading-line ${
                    lineIndex >= 2 ? "accent-line" : ""
                  }`}
                  key={line.join("-")}
                >
                  {line.map((word, wordIndex) => (
                    <motion.span
                      initial={reduceMotion ? false : { opacity: 0, y: 38 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + (lineIndex * 2 + wordIndex) * 0.065,
                        duration: 0.55,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      key={word}
                    >
                      {word}
                    </motion.span>
                  ))}
                </span>
              ))}
            </span>
          </Title>
        </motion.div>
        <motion.div
          className="hero-intro"
          initial={reduceMotion ? false : "hidden"}
          animate="visible"
          variants={reveal}
          transition={{ duration: 0.6, delay: 0.12 }}
        >
          <p className="hero-name">Shrikrishna Sutar</p>
          <p className="hero-role">
            Full Stack Developer <span>·</span> AI & Data Science Enthusiast
          </p>
          <p className="hero-description">
            I build modern web applications and intelligent solutions by
            combining creative frontend experiences, reliable backend systems
            and practical AI technologies.
          </p>
          <div className="button-row">
            <ButtonLink to="/#projects">
              Explore my work <ArrowRight size={16} />
            </ButtonLink>
            <ButtonLink to="#" variant="outline" >
              Resume pending
            </ButtonLink>
            <ButtonLink to="/#contact" variant="text">
              Let’s connect <ArrowDown size={16} />
            </ButtonLink>
          </div>
        </motion.div>
      </div>
      <motion.div
        className="hero-visual"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        onMouseMove={parallax}
        onMouseLeave={() => {
          pointerX.set(0)
          pointerY.set(0)
        }}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
      >
        <div className="profile-frame">
          <PlaceholderImage
            label="Profile photo"
            src={portfolioAssets.profilePhoto}
            tall
          />
        </div>
        {heroTech.map(([name, position], index) => (
          <motion.span
            animate={
              reduceMotion ? undefined : { y: [0, index % 2 ? 5 : -5, 0] }
            }
            className={`floating-tech ${position}`}
            key={name}
            transition={{
              duration: 3.4 + index * 0.35,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <TechLogo name={name} size={21} />
            <small>{name}</small>
          </motion.span>
        ))}
        <div className="hero-index">
          <span>Portfolio</span>
          <strong>01</strong>
        </div>
      </motion.div>
      <motion.a
        className="scroll-indicator"
        href="#about"
        animate={reduceMotion ? undefined : { y: [0, 7, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <span>Scroll to explore</span>
        <ArrowDown size={15} />
      </motion.a>
    </section>
  )
}

function About() {
  const highlights = [
    { icon: Braces, value: "500+", label: "DSA Problems Solved" },
    { icon: GraduationCap, value: "BE", label: "AI & Data Science" },
    { icon: Users, value: "GSSoC’25", label: "Project Admin" },
    { icon: Award, value: "OSCG’26", label: "Mentor" },
  ]
  return (
    <section className="section section-about" id="about">
      <div className="about-layout">
        <SectionIntro label="01 · About" title="A little about me." />
        <div className="about-copy">
          <p className="lead">
            I’m an AI & Data Science engineering student building at the intersection of
            thoughtful interfaces, dependable systems and intelligent
            technology.
          </p>
          <p>
            My interests span the full product journey—from shaping responsive
            frontend experiences and backend architecture to working with
            databases, APIs and practical machine learning. I’m equally
            motivated by problem solving and the open-source communities that
            make technology better.
          </p>
          <div className="interest-list" aria-label="Professional interests">
            {[
              "Full Stack Development",
              "MERN Stack",
              "AI & Machine Learning",
              "Problem Solving",
              "Open Source",
            ].map((interest) => (
              <span key={interest}>{interest}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="highlight-grid">
        {highlights.map(({ icon: Icon, value, label }) => (
          <motion.article
            className="highlight-card"
            key={label}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={reveal}
          >
            <Icon size={20} />
            <strong>{value}</strong>
            <span>{label}</span>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

function Skills() {
  return (
    <section className="section section-dark" id="skills">
      <SectionIntro
        label="02 · Technical practice"
        title="Technologies I work with."
        copy="A versatile toolkit for designing, developing and delivering complete digital products."
        light
      />
      <div className="skills-grid">
        {skillGroups.map((group, index) => (
          <article className="skill-group" key={group.title}>
            <span className="skill-number">0{index + 1}</span>
            <h3>{group.title}</h3>
            <div className="tech-card-grid">
              {group.items.map((item) => (
                <TechCard category={group.title} key={item} name={item} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

function Projects() {
  return (
    <section className="section" id="projects">
      <div className="section-heading-row">
        <SectionIntro
          label="03 · Selected projects"
          title="Work built with purpose."
          copy="A collection of applications, experiments and solutions I’ve built."
        />
        <span className="project-count">08 projects</span>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.slug}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={reveal}
            transition={{ delay: (index % 3) * 0.06 }}
          >
            <Link
              className="project-image-link"
              to={`/projects/${project.slug}`}
              aria-label={`Read more about ${project.title}`}
            >
              <PlaceholderImage
                label={`${project.shortTitle} screenshot`}
                accent={project.accent}
                src={portfolioAssets.projectScreenshots[project.slug]?.[0]}
              />
              <span className="project-number">
                {String(index + 1).padStart(2, "0")}
              </span>
            </Link>
            <div className="project-card-body">
              <p className="card-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tag-list compact tech-badge-list">
                {project.stack.slice(0, 5).map((item) => (
                  <TechBadge compact key={item} name={item} />
                ))}
              </div>
              <div className="project-actions">
                <ButtonLink to="#" variant="outline" disabled>
                  Live pending
                </ButtonLink>
                <ButtonLink to="#" variant="outline" disabled>
                  GitHub pending
                </ButtonLink>
                <ButtonLink to={`/projects/${project.slug}`} variant="text">
                  Read more <ArrowRight size={15} />
                </ButtonLink>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}


function Education() {
  return (
    <section className="section section-sand" id="education">
      <SectionIntro
        label="04 · Education"
        title="Education & academic journey."
      />

      <div className="timeline">
        <motion.span
          className="timeline-progress"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />

        {education.map((item, index) => (
          <motion.article
            className="timeline-item"
            initial={{ opacity: 0, x: 24 }}
            key={item.slug}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <div className="timeline-marker">
              <span>0{index + 1}</span>
            </div>

            <div className="timeline-card">
              <div className="timeline-meta">
                <Tag>{item.status}</Tag>
                <span>{item.period}</span>
              </div>

              <h3>{item.qualification}</h3>

              <p className="timeline-institution">
                {item.institution}
              </p>

              <p>{item.board}</p>

              {item.slug === "be" && (
                <p>
                  Passing year · 2026 · Final CGPA pending official result
                </p>
              )}

              {/* Institution and university/board logos */}
              <div className="logo-placeholders">
                {item.institutionLogo && (
                  <div className="education-logo">
                    <img
                      src={item.institutionLogo}
                      alt={`${item.institution} logo`}
                      loading="lazy"
                    />
                  </div>
                )}

                {item.universityLogo && (
                  <div className="education-logo">
                    <img
                      src={item.universityLogo}
                      alt={`${item.board} logo`}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>

              <ButtonLink
                to={`/education/${item.slug}`}
                variant="text"
              >
                View academic details <ArrowRight size={15} />
              </ButtonLink>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}


function Experience() {
  return (
    <section className="section section-dark" id="experience">
      <SectionIntro
        label="05 · Experience & contribution"
        title="Learning in public. Leading with care."
        copy="Open-source administration, mentorship and community contributions that extend beyond code."
        light
      />
      <div className="experience-list">
        {experiences.map((item, index) => (
          <article className="experience-row" key={item.slug}>
            <span className="experience-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <p className="card-category">
                {item.type} · {item.date}
              </p>
              <h3>{item.role}</h3>
              <p className="experience-org">{item.organization}</p>
              <div className="experience-tech">
                {item.keywords.slice(0, 3).map((keyword) => (
                  <TechBadge compact key={keyword} name={keyword} />
                ))}
              </div>
            </div>
            <p>{item.description}</p>
            <ButtonLink to={`/experience/${item.slug}`} variant="light">
              View experience <ArrowRight size={15} />
            </ButtonLink>
          </article>
        ))}
      </div>
      <div className="editable-note">
        NeuAI Lab and DK Technos details will be added after the resume source is supplied.
      </div>
    </section>
  )
}

function Achievements() {
  const items = [
    [
      "500+",
      "DSA Problems Solved",
      "Problem Solving",
      "Consistent practice across data structures and algorithms.",
    ],
    [
      "2025",
      "GSSoC Project Admin",
      "GirlScript Summer of Code",
      "Project administration and contributor coordination.",
    ],
    [
      "2026",
      "OSCG Mentor",
      "Open Source Connect Global",
      "Open-source mentorship and contributor guidance.",
    ],
    [
      "2025",
      "SIH Internal Round",
      "Smart India Hackathon",
      "College-level internal round participation / waitlisted category.",
    ],
  ]
  return (
    <section className="section" id="achievements">
      <SectionIntro
        label="06 · Milestones"
        title="Achievements that mark the journey."
      />
      <div className="achievement-grid">
        {items.map(([year, title, org, copy]) => (
          <article className="achievement-card" key={title}>
            <span className="achievement-year">{year}</span>
            <Trophy size={22} />
            <h3>{title}</h3>
            <p className="card-category">{org}</p>
            <p>{copy}</p>
            <span className="proof-status">
              Proof / certificate placeholder
            </span>
          </article>
        ))}
      </div>
    </section>
  )
}

function Certifications() {
  const [preview, setPreview] = useState<number | null>(null)
  return (
    <section className="section certifications-section" id="certifications">
      <SectionIntro
        label="07 · Certifications & learning"
        title="A growing record of focused learning."
        copy="Verified certificates will be presented here with issuer details, skills covered and full-size previews."
      />
      <div className="certifications-block">
        <div>
          <Eyebrow>Continuous practice</Eyebrow>
          <h3>Learning that compounds into better work.</h3>
        </div>
        {[0, 1].map((item) => (
          <button
            className="certificate-placeholder"
            key={item}
            onClick={() => setPreview(item)}
          >
            <PlaceholderImage label="Certificate" />
            <p>Certificate details — Editable placeholder</p>
            <span className="button button-outline">Preview placeholder</span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {preview !== null && (
          <motion.div
            animate={{ opacity: 1 }}
            aria-label="Certificate preview"
            aria-modal="true"
            className="lightbox"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            role="dialog"
          >
            <button
              className="lightbox-close"
              onClick={() => setPreview(null)}
              aria-label="Close preview"
            >
              <X />
            </button>
            <motion.div
              className="lightbox-content"
              initial={{ scale: 0.96 }}
              animate={{ scale: 1 }}
            >
              <PlaceholderImage label="Certificate image" tall />
              <p>
                Actual certificate image and details have not been supplied.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

function Contact() {
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const reduceMotion = useReducedMotion()
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setMessage("")
    await new Promise((resolve) => window.setTimeout(resolve, 550))
    setSubmitting(false)
    setMessage(
      "Your message is validated. Add your preferred form endpoint to enable delivery.",
    )
  }
  return (
    <motion.section
      className="section contact-section"
      id="contact"
      initial={{ opacity: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.65 }}
    >
      <div className="contact-copy">
        <SectionIntro
          label="08 · Contact"
          title="Let’s build something meaningful."
          light
        />
        <p>
          Have a project idea, collaboration opportunity or interesting
          challenge? I’d love to connect.
        </p>
        <div className="contact-links">
          <span>
            <Mail size={18} /> Email · Pending verified address
          </span>
          <a
            href="https://github.com/Skrishna0703"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 size={18} /> github.com/Skrishna0703
          </a>
          <span>LinkedIn · Pending verified URL</span>
        </div>
      </div>
      <form className="contact-form" onSubmit={submit}>
        <label>
          Name
          <input name="name" required placeholder="Your name" />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <label className="full-field">
          Subject
          <input
            name="subject"
            required
            placeholder="What would you like to discuss?"
          />
        </label>
        <label className="full-field">
          Message
          <textarea
            name="message"
            required
            rows={5}
            placeholder="Tell me a little about your idea..."
          />
        </label>
        <motion.button
          className="button button-light"
          disabled={submitting}
          type="submit"
          whileHover={reduceMotion ? undefined : { y: -3, scale: 1.02 }}
          whileTap={reduceMotion ? undefined : { scale: 0.96 }}
          transition={{ duration: 0.24 }}
        >
          {submitting ? "Preparing…" : "Send message"} <ArrowRight size={16} />
        </motion.button>
        {message && (
          <p className="form-message">
            <CheckCircle2 size={16} />
            {message}
          </p>
        )}
      </form>
    </motion.section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div>
        <span className="brand-mark">SS</span>
        <strong>Shrikrishna Sutar</strong>
      </div>
      <p>Full Stack Developer · AI & Data Science Enthusiast</p>
      <div className="footer-links">
        <a href="/#home">Back to top</a>
        <a
          href="https://github.com/Skrishna0703"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
      </div>
      <p>
        © {new Date().getFullYear()} Shrikrishna Sutar. Built with intention.
      </p>
    </footer>
  )
}

export function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (hash)
      requestAnimationFrame(() =>
        document.querySelector(hash)?.scrollIntoView(),
      )
  }, [])
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Experience />
        <Achievements />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
