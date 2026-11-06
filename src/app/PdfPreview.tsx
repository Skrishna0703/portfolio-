
import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Document, Page, pdfjs } from "react-pdf"
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  ExternalLink,
  FileText,
  RotateCcw,
} from "lucide-react"

import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString()

type PdfPreviewProps = {
  pdfUrl: string
  title: string
}

export function PdfPreview({ pdfUrl, title }: PdfPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  const [pageNumber, setPageNumber] = useState(1)
  const [numPages, setNumPages] = useState(0)
  const [pageWidth, setPageWidth] = useState(650)
  const [zoom, setZoom] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [direction, setDirection] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)

  useEffect(() => {
    setPageNumber(1)
    setNumPages(0)
    setZoom(1)
    setLoading(true)
    setError(false)
  }, [pdfUrl])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const updateWidth = () => {
      const availableWidth = container.clientWidth - 48
      setPageWidth(Math.max(200, Math.min(availableWidth, 850)))
    }

    updateWidth()

    const observer = new ResizeObserver(updateWidth)
    observer.observe(container)

    return () => observer.disconnect()
  }, [])

  const onDocumentLoadSuccess = ({
    numPages: totalPages,
  }: {
    numPages: number
  }) => {
    setNumPages(totalPages)
    setPageNumber(1)
    setLoading(false)
    setError(false)
  }

  const nextPage = () => {
    if (pageNumber >= numPages) return
    setDirection(1)
    setPageNumber((current) => current + 1)
  }

  const previousPage = () => {
    if (pageNumber <= 1) return
    setDirection(-1)
    setPageNumber((current) => current - 1)
  }

  const changeZoom = (amount: number) => {
    setZoom((current) =>
      Math.min(2, Math.max(0.6, Number((current + amount).toFixed(1)))),
    )
  }

  const toggleFullscreen = async () => {
    const element = containerRef.current
    if (!element) return

    try {
      if (!document.fullscreenElement) {
        await element.requestFullscreen()
        setFullscreen(true)
      } else {
        await document.exitFullscreen()
        setFullscreen(false)
      }
    } catch {
      setFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement))
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange,
      )
    }
  }, [])

  return (
    <section className="custom-pdf-viewer" ref={containerRef}>
      {/* Viewer Header */}
      <div className="pdf-viewer-header">
        <div className="pdf-document-info">
          <div className="pdf-document-icon">
            <FileText size={21} />
          </div>

          <div>
            <h4>{title}</h4>
            <span>Original academic document</span>
          </div>
        </div>

        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pdf-external-link"
          title="Open PDF in new tab"
          aria-label="Open PDF in new tab"
        >
          <ExternalLink size={17} />
        </a>
      </div>

      {/* PDF Toolbar */}
      <div className="pdf-toolbar">
        <div className="pdf-page-navigation">
          <button
            type="button"
            onClick={previousPage}
            disabled={pageNumber <= 1 || loading}
            title="Previous page"
            aria-label="Previous page"
          >
            <ChevronLeft size={19} />
          </button>

          <span className="pdf-page-count">
            <strong>{pageNumber}</strong>
            <span>/</span>
            {numPages || "—"}
          </span>

          <button
            type="button"
            onClick={nextPage}
            disabled={pageNumber >= numPages || loading}
            title="Next page"
            aria-label="Next page"
          >
            <ChevronRight size={19} />
          </button>
        </div>

        <div className="pdf-zoom-controls">
          <button
            type="button"
            onClick={() => changeZoom(-0.1)}
            disabled={zoom <= 0.6}
            title="Zoom out"
            aria-label="Zoom out"
          >
            <ZoomOut size={17} />
          </button>

          <span>{Math.round(zoom * 100)}%</span>

          <button
            type="button"
            onClick={() => changeZoom(0.1)}
            disabled={zoom >= 2}
            title="Zoom in"
            aria-label="Zoom in"
          >
            <ZoomIn size={17} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(1)}
            title="Reset zoom"
            aria-label="Reset zoom"
          >
            <RotateCcw size={16} />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
            aria-label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
          >
            <Maximize2 size={17} />
          </button>
        </div>
      </div>

      {/* Document Area */}
      <div className="pdf-stage">
        {loading && (
          <div className="pdf-loading">
            <div className="pdf-loader" />
            <p>Preparing your marksheet...</p>
          </div>
        )}

        {error ? (
          <div className="pdf-error">
            <FileText size={35} />
            <h4>Unable to load PDF</h4>
            <p>Please check the PDF file path and try again.</p>
            <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
              Open original PDF
              <ExternalLink size={15} />
            </a>
          </div>
        ) : (
          <Document
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={() => {
              setLoading(false)
              setError(true)
            }}
            loading={null}
            error={null}
          >
            <AnimatePresence mode="wait" initial={false}>
              {!loading && (
                <motion.div
                  key={pageNumber}
                  className="pdf-animated-page"
                  initial={{
                    opacity: 0,
                    x: direction * 45,
                    rotateY: direction * -7,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    rotateY: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: direction * -35,
                    rotateY: direction * 5,
                  }}
                  transition={{
                    duration: 0.38,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Page
                    pageNumber={pageNumber}
                    width={pageWidth * zoom}
                    renderTextLayer
                    renderAnnotationLayer
                    loading={null}
                    className="pdf-document-page"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </Document>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="pdf-bottom-bar">
        <button
          type="button"
          onClick={previousPage}
          disabled={pageNumber <= 1 || loading}
        >
          <ChevronLeft size={17} />
          Previous
        </button>

        <div className="pdf-progress">
          <div
            className="pdf-progress-fill"
            style={{
              width: `${numPages ? (pageNumber / numPages) * 100 : 0}%`,
            }}
          />
        </div>

        <button
          type="button"
          onClick={nextPage}
          disabled={pageNumber >= numPages || loading}
        >
          Next
          <ChevronRight size={17} />
        </button>
      </div>

      <div className="pdf-viewer-footer">
        <span>PAGE {pageNumber} OF {numPages || "—"}</span>
        <span>ORIGINAL DOCUMENT</span>
      </div>
    </section>
  )
}
