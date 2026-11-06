import { PdfPreview } from "./PdfPreview"
import { useEffect, useState, useRef } from "react"
import { AnimatePresence, motion } from "motion/react"
// import HTMLFlipBook from "react-pageflip"
// import { Document, Page as PdfPage, pdfjs } from "react-pdf"

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Database,
  ExternalLink,
  Code2,
  Layers3,
  Maximize2,
  Server,
  Sparkles,
  X,
  FileText,
} from "lucide-react"

import {
  Eye,
  EyeOff,
} from "lucide-react"

import { Link, useParams } from "react-router"
import {
  beAcademicRecord,
  education,
  experiences,
  portfolioAssets,
  projects,
} from "./data"

import { TechBadge, TechLogo } from "./Tech"

import {
  ButtonLink,
  Eyebrow,
  PlaceholderImage,
  SectionIntro,
  Tag,
  Title,
} from "./ui"


function DetailHeader() {
  return (
    <header className="detail-header">
      <Link className="brand" to="/">
        <span className="brand-mark">SS</span>
        <span>Shrikrishna Sutar</span>
      </Link>
      <ButtonLink to="/" variant="text">
        <ArrowLeft size={16} /> Portfolio home
      </ButtonLink>
    </header>
  )
}

function NotFound({ type }: { type: string }) {
  useEffect(() => {
    document.title = `${type} not found · Shrikrishna Sutar`
  }, [type])
  return (
    <>
      <DetailHeader />
      <main className="not-found">
        <Eyebrow>404 · {type}</Eyebrow>
        <Title>That page isn’t in the portfolio.</Title>
        <p>The requested entry may have moved or is not available.</p>
        <ButtonLink to="/">Return home</ButtonLink>
      </main>
    </>
  )
}

function Gallery({
  title,
  accent,
  images = [],
}: {
  title: string
  accent: string
  images?: string[]
}) {
  const [active, setActive] = useState<number | null>(null)
  const labels = [
    "Landing page",
    "Dashboard / main feature",
    "Important workflow",
    "Responsive mobile view",
  ]
  return (
    <>
      <div className="gallery-grid">
        {labels.map((label, index) => (
          <button
            className="gallery-item"
            onClick={() => setActive(index)}
            key={label}
          >
            <PlaceholderImage
              label={`${title} · ${label}`}
              accent={accent}
              src={images[index]}
            />
            <span>
              {label}
              <Maximize2 size={15} />
            </span>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {active !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Screenshot preview"
          >
            <button
              className="lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Close image preview"
            >
              <X />
            </button>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="lightbox-content"
            >
              <PlaceholderImage
                label={`${title} · ${labels[active]}`}
                accent={accent}
                tall
              />
              <p>{labels[active]} · Replace with supplied project screenshot</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((item) => item.slug === slug)
  useEffect(() => {
    if (project) document.title = `${project.title} · Shrikrishna Sutar`
    window.scrollTo(0, 0)
  }, [project])
  if (!project) return <NotFound type="Project" />
  const index = projects.indexOf(project)
  const previous = projects[(index - 1 + projects.length) % projects.length]
  const next = projects[(index + 1) % projects.length]
  const architecture = project.stack.some((item) =>
    ["Node.js", "Express.js", "Next.js"].includes(item),
  )
    ? [
        "User interface",
        "Application / API layer",
        project.stack.includes("MongoDB") ? "MongoDB" : "External services",
        "Third-party APIs",
      ]
    : [
        "User interface",
        "Client-side logic",
        "External API",
        "Rendered response",
      ]
  return (
    <>
      <DetailHeader />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <section className="case-hero">
          <div className="case-hero-copy">
            <Eyebrow>{project.category}</Eyebrow>
            <Title as="h1">{project.title}</Title>
            <p>{project.description}</p>
            <div className="button-row">
              <ButtonLink to="#" disabled>
                <ExternalLink size={16} /> Live demo pending
              </ButtonLink>
              <ButtonLink to="#" variant="outline" disabled>
                <Code2 size={16} /> Repository pending
              </ButtonLink>
            </div>
            <a className="back-link" href="/#projects">
              <ArrowLeft size={15} /> Back to projects
            </a>
          </div>
          <PlaceholderImage
            label={`${project.title} cover screenshot`}
            accent={project.accent}
            src={portfolioAssets.projectScreenshots[project.slug]?.[0]}
            tall
          />
        </section>

        <section className="case-section overview-grid">
          <SectionIntro
            label="01 · Project overview"
            title="A focused digital solution."
          />
          <div className="case-copy">
            <p className="lead">{project.description}</p>
            <p>
              <strong>Purpose.</strong> {project.objective}
            </p>
            <p>
              <strong>Target users.</strong> The intended audience follows
              directly from the project’s purpose. Specific user research
              details are not yet supplied.
            </p>
          </div>
        </section>

        <section className="case-section section-sand">
          <SectionIntro
            label="02 · Objectives & features"
            title="What the product is designed to do."
          />
          <div className="feature-grid">
            {project.features.map((feature, i) => (
              <article className="feature-card" key={feature}>
                <span>0{i + 1}</span>
                <Sparkles size={20} />
                <h3>{feature}</h3>
                <p>
                  A core capability identified from the project’s verified
                  description and technology stack.
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="case-section">
          <div className="two-column-heading">
            <SectionIntro
              label="03 · UI/UX design"
              title="Clear structure, purposeful interaction."
            />
            <p>
              Interface decisions prioritize readable content, direct actions
              and responsive behavior. Detailed design rationale and original
              design files can be added when available.
            </p>
          </div>
          <Gallery
            title={project.shortTitle}
            accent={project.accent}
            images={portfolioAssets.projectScreenshots[project.slug]}
          />
        </section>

        <section className="case-section section-dark">
          <SectionIntro
            label="04 · Workflow & architecture"
            title="How the experience connects."
            light
          />
          <div className="workflow">
            {project.workflow.map((step, i) => (
              <div className="workflow-step" key={step}>
                <span>0{i + 1}</span>
                <p>{step}</p>
                {i < project.workflow.length - 1 && <ArrowRight />}
              </div>
            ))}
          </div>
          <div className="architecture">
            {architecture.map((layer, i) => {
              const Icon =
                i === 0
                  ? Layers3
                  : i === 1
                    ? Server
                    : i === 2
                      ? Database
                      : Sparkles
              return (
                <div className="architecture-node" key={layer}>
                  <Icon />
                  <strong>{layer}</strong>
                  <small>
                    {i === 0
                      ? "Frontend"
                      : i === 1
                        ? "Logic"
                        : "Data & services"}
                  </small>
                </div>
              )
            })}
          </div>
          <p className="architecture-note">
            Architecture reflects the supplied stack only; service-specific
            implementation details remain editable.
          </p>
        </section>

        <section className="case-section">
          <SectionIntro
            label="05 · Technology stack"
            title="Tools and their role."
          />
          <div className="stack-table stack-table-branded">
            {project.stack.map((technology, i) => (
              <div key={technology}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>
                  <TechLogo name={technology} size={25} />
                  {technology}
                </strong>
                <p>
                  {i < 3
                    ? "Core project technology"
                    : "Supporting service / platform"}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="case-section section-sand">
          <SectionIntro
            label="06 · Development record"
            title="Timeline, challenges & learning."
          />
          <div className="record-grid">
            <article>
              <h3>Development timeline</h3>
              <p>Start date · Editable placeholder</p>
              <p>End date · Editable placeholder</p>
              <p>Duration · Editable placeholder</p>
              <Tag>Status pending verification</Tag>
            </article>
            <article>
              <h3>Challenges & solutions</h3>
              <p>
                Real implementation challenges and their solutions have not been
                supplied. This area is ready for verified project notes.
              </p>
            </article>
            <article>
              <h3>Results & learnings</h3>
              <p>
                Outcome metrics and first-hand learnings have not been supplied.
                Add verified reflections here without changing the layout.
              </p>
            </article>
          </div>
        </section>

        <nav className="case-pagination" aria-label="Project pagination">
          <Link to={`/projects/${previous.slug}`}>
            <ChevronLeft />
            <span>
              Previous project<small>{previous.shortTitle}</small>
            </span>
          </Link>
          <Link to={`/projects/${next.slug}`}>
            <span>
              Next project<small>{next.shortTitle}</small>
            </span>
            <ChevronRight />
          </Link>
        </nav>
      </motion.main>
    </>
  )
}


export function EducationDetail() {
  const { slug } = useParams()
  const item = education.find((entry) => entry.slug === slug)

  const [selectedYear, setSelectedYear] = useState(0)
  const [previewOpen, setPreviewOpen] = useState(false)

  useEffect(() => {
    if (item) {
      document.title = `${item.qualification} · Shrikrishna Sutar`
    }

    window.scrollTo(0, 0)
    setSelectedYear(0)
    setPreviewOpen(false)
  }, [item])

  if (!item) return <NotFound type="Education record" />

  const isDegree = item.slug === "be"
  const isDiploma = item.slug === "diploma-computer-technology"
  const isSsc = item.slug === "ssc"

  const years = item.academicYears ?? []
  const selectedRecord = years[selectedYear]

  const pdfTitle = isSsc
    ? "SSC Marksheet"
    : `${selectedRecord?.title ?? "Academic"} Marksheet`

  return (
    <>
      <DetailHeader />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        {/* Academic Hero */}
        <section className="academic-hero">
          <div>
            <Eyebrow>Academic record</Eyebrow>
            <Title as="h1">{item.qualification}</Title>

            <p>{item.institution}</p>
            <p>{item.board}</p>

            <div className="button-row">
              <Tag>{item.status}</Tag>
              <Tag>{item.period}</Tag>
            </div>
          </div>

          <div className="academic-logos">
            {item.institutionLogo && (
              <div className="academic-logo">
                <img
                  src={item.institutionLogo}
                  alt={`${item.institution} logo`}
                  loading="lazy"
                />
                <small className="academic-logo-label">
                  {item.institution}
                </small>
              </div>
            )}

            {item.universityLogo && (
              <div className="academic-logo">
                <img
                  src={item.universityLogo}
                  alt={`${item.board} logo`}
                  loading="lazy"
                />
                <small className="academic-logo-label">
                  {item.board}
                </small>
              </div>
            )}
          </div>
        </section>

        {/* BE Overall Summary */}
        {isDegree && (
          <section className="academic-summary">
            <div>
              <span>Final CGPA</span>
              <strong>9.08</strong>
            </div>

            <div>
              <span>Fourth-year SGPA</span>
              <strong>9.45</strong>
            </div>

            <div>
              <span>Total semesters</span>
              <strong>08</strong>
            </div>

            <div>
              <span>Graduation year</span>
              <strong>2026</strong>
            </div>
          </section>
        )}

        {/* BE and Diploma Records */}
        {(isDegree || isDiploma) && (
          <section className="case-section">
            <SectionIntro
              label="Academic performance"
              title="Your academic journey, year by year."
              copy={
                isDegree
                  ? "Explore your BE performance and original semester marksheets."
                  : "Explore your Diploma performance and original semester marksheets."
              }
            />

            <div className="academic-year-grid">
              {years.map((year, index) => (
                <motion.button
                  type="button"
                  key={year.title}
                  className={`academic-year-card ${
                    selectedYear === index ? "active" : ""
                  }`}
                  onClick={() => {
                    setSelectedYear(index)
                    setPreviewOpen(false)
                  }}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  aria-pressed={selectedYear === index}
                >
                  <div className="year-card-top">
                    <span className="year-number">
                      0{index + 1}
                    </span>
                    <FileText size={21} />
                  </div>

                  <h3>{year.title}</h3>
                  <p>{year.semesters}</p>

                  <div className="year-card-metrics">
                    <div>
                      <span>Obtained marks</span>
                      <strong>
                        {year.obtainedMarks !== null
                          ? year.obtainedMarks.toLocaleString("en-IN")
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Total marks</span>
                      <strong>
                        {year.totalMarks !== null
                          ? year.totalMarks.toLocaleString("en-IN")
                          : "—"}
                      </strong>
                    </div>

                    <div>
                      <span>Percentage</span>
                      <strong>{year.percentage || "—"}</strong>
                    </div>

                    <div>
                      <span>SGPA</span>
                      <strong>{year.sgpa || "—"}</strong>
                    </div>
                  </div>

                  <div className="year-card-footer">
                    <span>
                      {selectedYear === index
                        ? "Currently selected"
                        : "View academic record"}
                    </span>
                    <ChevronRight size={18} />
                  </div>
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {selectedRecord && (
                <motion.div
                  key={selectedRecord.title}
                  className="selected-year-panel"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                >
                  {/* Selected Year Heading */}
                  <div className="selected-year-heading">
                    <div>
                      <Eyebrow>Academic year</Eyebrow>
                      <h3>{selectedRecord.title}</h3>
                      <p>{selectedRecord.semesters}</p>
                    </div>

                    <Tag>
                      {selectedRecord.pdf
                        ? "Original marksheet"
                        : "PDF pending"}
                    </Tag>
                  </div>

                  {/* Academic Metrics */}
                  <div className="year-detail-metrics">
                    <div>
                      <span>Total maximum marks</span>
                      <strong>
                        {selectedRecord.totalMarks !== null
                          ? selectedRecord.totalMarks.toLocaleString("en-IN")
                          : "Not available"}
                      </strong>
                    </div>

                    <div>
                      <span>Marks obtained</span>
                      <strong>
                        {selectedRecord.obtainedMarks !== null
                          ? selectedRecord.obtainedMarks.toLocaleString("en-IN")
                          : "Not available"}
                      </strong>
                    </div>

                    <div>
                      <span>Percentage</span>
                      <strong>{selectedRecord.percentage || "—"}</strong>
                    </div>

                    <div>
                      <span>SGPA</span>
                      <strong>{selectedRecord.sgpa || "—"}</strong>
                    </div>

                    <div>
                      <span>CGPA</span>
                      <strong>{selectedRecord.cgpa || "—"}</strong>
                    </div>
                  </div>

                  {/* PDF Actions */}
                  {selectedRecord.pdf ? (
                    <div className="marksheet-toolbar">
                      <button
                        type="button"
                        className="preview-marksheet-btn"
                        onClick={() =>
                          setPreviewOpen((previous) => !previous)
                        }
                        aria-expanded={previewOpen}
                      >
                        {previewOpen ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}

                        {previewOpen
                          ? "Close Preview"
                          : "Preview Marksheet"}

                        <ChevronRight
                          size={17}
                          className={
                            previewOpen ? "preview-chevron-open" : ""
                          }
                        />
                      </button>

                      <a
                        href={selectedRecord.pdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="open-pdf-btn"
                      >
                        <ExternalLink size={17} />
                        Open in New Tab
                      </a>
                    </div>
                  ) : (
                    <p className="marksheet-pending">
                      Marksheet PDF will be available soon.
                    </p>
                  )}

                  {/* Custom Animated PDF Preview */}
                  <AnimatePresence initial={false}>
                    {previewOpen && selectedRecord.pdf && (
                      <motion.div
                        key={selectedRecord.pdf}
                        initial={{
                          opacity: 0,
                          height: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          height: "auto",
                          y: 0,
                        }}
                        exit={{
                          opacity: 0,
                          height: 0,
                          y: 15,
                        }}
                        transition={{
                          duration: 0.45,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ overflow: "hidden" }}
                      >
                        <PdfPreview
                          pdfUrl={selectedRecord.pdf}
                          title={pdfTitle}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </section>
        )}

        {/* SSC Record */}
        {isSsc && (
          <section className="case-section">
            <SectionIntro
              label="SSC academic record"
              title="Secondary School Certificate."
              copy="Explore your SSC academic performance and original marksheet."
            />

            <div className="ssc-summary">
              <div>
                <span>Overall percentage</span>
                <strong>78.60%</strong>
              </div>

              <div>
                <span>Qualification</span>
                <strong>SSC (10th)</strong>
              </div>

              <div>
                <span>Passing period</span>
                <strong>March 2018</strong>
              </div>
            </div>

            {item.marksheetPdf ? (
              <>
                <div className="marksheet-toolbar">
                  <button
                    type="button"
                    className="preview-marksheet-btn"
                    onClick={() =>
                      setPreviewOpen((previous) => !previous)
                    }
                    aria-expanded={previewOpen}
                  >
                    {previewOpen ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}

                    {previewOpen
                      ? "Close Preview"
                      : "Preview SSC Marksheet"}

                    <ChevronRight
                      size={17}
                      className={
                        previewOpen ? "preview-chevron-open" : ""
                      }
                    />
                  </button>

                  <a
                    href={item.marksheetPdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="open-pdf-btn"
                  >
                    <ExternalLink size={17} />
                    Open in New Tab
                  </a>
                </div>

                {/* Custom SSC PDF Preview */}
                <AnimatePresence initial={false}>
                  {previewOpen && (
                    <motion.div
                      key={item.marksheetPdf}
                      initial={{
                        opacity: 0,
                        height: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        height: "auto",
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        height: 0,
                        y: 15,
                      }}
                      transition={{
                        duration: 0.45,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      style={{ overflow: "hidden" }}
                    >
                      <PdfPreview
                        pdfUrl={item.marksheetPdf}
                        title="SSC Marksheet"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            ) : (
              <p className="marksheet-pending">
                SSC marksheet PDF will be available soon.
              </p>
            )}
          </section>
        )}
      </motion.main>
    </>
  )
}


export function ExperienceDetail() {
  const { slug } = useParams()
  const item = experiences.find((entry) => entry.slug === slug)
  const [preview, setPreview] = useState(false)
  useEffect(() => {
    if (item)
      document.title = `${item.role} at ${item.organization} · Shrikrishna Sutar`
    window.scrollTo(0, 0)
  }, [item])
  if (!item) return <NotFound type="Experience" />
  return (
    <>
      <DetailHeader />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        <section className="experience-hero">
          <div className="organization-logo">
            Organization
            <br />
            logo placeholder
          </div>
          <div>
            <Eyebrow>
              {item.type} · {item.date}
            </Eyebrow>
            <Title as="h1">{item.role}</Title>
            <p className="experience-org">{item.organization}</p>
            <p>{item.description}</p>
            <div className="tag-list tech-badge-list">
              {item.keywords.map((keyword) => (
                <TechBadge compact key={keyword} name={keyword} />
              ))}
            </div>
          </div>
        </section>
        <section className="case-section overview-grid">
          <SectionIntro
            label="01 · Organization & role"
            title="Contribution with community impact."
          />
          <div className="case-copy">
            <p className="lead">{item.description}</p>
            <p>
              <strong>Employment type.</strong> {item.type}
            </p>
            <p>
              <strong>Dates, duration & location.</strong> Editable placeholders
              — not supplied.
            </p>
            <p>
              <strong>Organization overview.</strong> A verified organization
              profile has not been supplied.
            </p>
          </div>
        </section>
        <section className="case-section section-sand">
          <SectionIntro
            label="02 · Responsibilities"
            title="How I contributed."
          />
          <div className="responsibility-list">
            {item.responsibilities.map((responsibility) => (
              <div key={responsibility}>
                <Check size={18} />
                <span>{responsibility}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="case-section">
          <SectionIntro
            label="03 · Achievements & outcomes"
            title="Verified impact, when available."
          />
          <div className="record-grid">
            <article>
              <h3>Outcomes</h3>
              <p>Editable placeholder — add verified contribution outcomes.</p>
            </article>
            <article>
              <h3>Skills developed</h3>
              <div className="tag-list tech-badge-list">
                {item.keywords.map((keyword) => (
                  <TechBadge compact key={keyword} name={keyword} />
                ))}
              </div>
            </article>
            <article>
              <h3>Verification</h3>
              <p>Certificate ID and verification link not supplied.</p>
            </article>
          </div>
        </section>
        <section className="case-section section-dark">
          <SectionIntro
            label="04 · Certificate gallery"
            title="Contribution credentials."
            light
          />
          <button
            className="certificate-large"
            onClick={() => setPreview(true)}
          >
            <PlaceholderImage label={`${item.organization} certificate`} tall />
            <span>
              View certificate placeholder <Maximize2 size={16} />
            </span>
          </button>
        </section>
        <AnimatePresence>
          {preview && (
            <motion.div
              className="lightbox"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <button
                className="lightbox-close"
                onClick={() => setPreview(false)}
              >
                <X />
              </button>
              <div className="lightbox-content">
                <PlaceholderImage label="Certificate image" tall />
                <p>Actual certificate image not supplied</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>
    </>
  )
}
