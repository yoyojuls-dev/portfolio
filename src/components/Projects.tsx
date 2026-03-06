// Projects.tsx
import { useState, useEffect, useRef } from 'react'
import { ExternalLink, Github, ArrowRight, X, Tag, Calendar, Layers } from 'lucide-react'
import { projects } from '../data'
import { Project } from '../types'
import RevealOnScroll from './RevealOnScroll'


// ─── Tag color map ────────────────────────────────────────────────────────────
const tagColors: Record<string, { text: string; bg: string; border: string }> = {
  React:          { text: '#00e5ff', bg: 'rgba(0,229,255,0.08)',   border: 'rgba(0,229,255,0.25)'   },
  TypeScript:     { text: '#4f8ef7', bg: 'rgba(79,142,247,0.08)',  border: 'rgba(79,142,247,0.25)'  },
  JavaScript:     { text: '#f7df1e', bg: 'rgba(247,223,30,0.08)',  border: 'rgba(247,223,30,0.25)'  },
  Python:         { text: '#ffd343', bg: 'rgba(255,211,67,0.08)',  border: 'rgba(255,211,67,0.25)'  },
  'Node.js':      { text: '#74c06e', bg: 'rgba(116,192,110,0.08)', border: 'rgba(116,192,110,0.25)' },
  Flask:          { text: '#a0a0a0', bg: 'rgba(160,160,160,0.08)', border: 'rgba(160,160,160,0.25)' },
  Express:        { text: '#c0c0c0', bg: 'rgba(192,192,192,0.08)', border: 'rgba(192,192,192,0.25)' },
  'Express.js':   { text: '#c0c0c0', bg: 'rgba(192,192,192,0.08)', border: 'rgba(192,192,192,0.25)' },
  'Discord.js':   { text: '#7289da', bg: 'rgba(114,137,218,0.08)', border: 'rgba(114,137,218,0.25)' },
  HTML:           { text: '#e44d26', bg: 'rgba(228,77,38,0.08)',   border: 'rgba(228,77,38,0.25)'   },
  CSS:            { text: '#264de4', bg: 'rgba(38,77,228,0.08)',   border: 'rgba(38,77,228,0.25)'   },
  SCSS:           { text: '#cc6699', bg: 'rgba(204,102,153,0.08)', border: 'rgba(204,102,153,0.25)' },
  MongoDB:        { text: '#47a248', bg: 'rgba(71,162,72,0.08)',   border: 'rgba(71,162,72,0.25)'   },
  'TensorFlow.js':{ text: '#ff8c00', bg: 'rgba(255,140,0,0.08)',   border: 'rgba(255,140,0,0.25)'   },
  YOLOv8:         { text: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: 'rgba(255,107,107,0.25)' },
  Docker:         { text: '#0db7ed', bg: 'rgba(13,183,237,0.08)',  border: 'rgba(13,183,237,0.25)'  },
  PHP:            { text: '#787cb5', bg: 'rgba(120,124,181,0.08)', border: 'rgba(120,124,181,0.25)' },
  MySQL:          { text: '#4479a1', bg: 'rgba(68,121,161,0.08)',  border: 'rgba(68,121,161,0.25)'  },
  'Google AI Studio': { text: '#4285f4', bg: 'rgba(66,133,244,0.08)', border: 'rgba(66,133,244,0.25)' },
  Ollama:         { text: '#7fff7f', bg: 'rgba(127,255,127,0.08)', border: 'rgba(127,255,127,0.25)' },
  Vite:           { text: '#bd34fe', bg: 'rgba(189,52,254,0.08)',  border: 'rgba(189,52,254,0.25)'  },
  JSON:           { text: '#f0a500', bg: 'rgba(240,165,0,0.08)',   border: 'rgba(240,165,0,0.25)'   },
  WEBGL:          { text: '#990000', bg: 'rgba(153,0,0,0.08)',     border: 'rgba(153,0,0,0.25)'     },
}

const DEFAULT_TAG = { text: '#9d9db5', bg: 'rgba(157,157,181,0.08)', border: 'rgba(157,157,181,0.2)' }

// ─── Falling boxes (same as Skills modal) ────────────────────────────────────
interface FallingBox {
  x: number; y: number; size: number; speed: number
  rotation: number; rotationSpeed: number; opacity: number
}

function FallingBoxes({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const W = canvas.offsetWidth
    const H = canvas.offsetHeight
    canvas.width = W
    canvas.height = H

    const spawn = (yOverride?: number): FallingBox => ({
      x: Math.random() * W,
      y: yOverride !== undefined ? yOverride : Math.random() * H,
      size: 8 + Math.random() * 32,
      speed: 0.25 + Math.random() * 0.65,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.011,
      opacity: 0.07 + Math.random() * 0.2,
    })

    const boxes: FallingBox[] = Array.from({ length: 26 }, () => spawn())

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      boxes.forEach(b => {
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.rotation)
        ctx.strokeStyle = color
        ctx.globalAlpha = b.opacity
        ctx.lineWidth = 1
        ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size)
        ctx.restore()
        b.y += b.speed
        b.rotation += b.rotationSpeed
        if (b.y > H + b.size) { Object.assign(b, spawn(-b.size)); b.y = -b.size }
      })
      rafRef.current = requestAnimationFrame(draw)
    }
    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ borderRadius: 'inherit' }}
    />
  )
}

// ─── Project Detail Modal ─────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  // Pick an accent color based on the first recognizable tag
  const accentColor = (() => {
    for (const tag of project.tags) {
      if (tagColors[tag]) return tagColors[tag].text
    }
    return '#9d5cff'
  })()

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(7,7,10,0.85)', backdropFilter: 'blur(12px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl rounded-2xl border overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #16161f 0%, #0f0f16 100%)',
          borderColor: accentColor + '30',
          boxShadow: `0 0 100px ${accentColor}18, 0 40px 100px rgba(0,0,0,0.7)`,
          maxHeight: '90vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Falling boxes behind everything */}
        <FallingBoxes color={accentColor} />

        {/* Scrollable content */}
        <div className="relative z-10 overflow-y-auto" style={{ maxHeight: '90vh' }}>
          {/* Project image */}
          <div className="relative h-52 overflow-hidden" style={{ background: '#0a0a10' }}>
            {project.image && (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                style={{ filter: 'brightness(0.7)' }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
            {/* Gradient over image */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to bottom, transparent 30%, #0f0f16 100%)`
              }}
            />
            {/* Accent glow strip at bottom of image */}
            <div
              className="absolute bottom-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${accentColor}88, transparent)` }}
            />
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white transition-colors"
              style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="px-7 pb-7 -mt--1">
            {/* Title row */}
            <div className="flex items-start justify-between gap-4 mb-5">
              <h2
                className="font-display font-bold text-2xl leading-tight"
                style={{ color: '#fff' }}
              >
                {project.title}
              </h2>
              <div className="flex items-center gap-2 flex-shrink-0 mt-1">
                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm transition-all"
                    style={{
                      color: accentColor,
                      border: `1px solid ${accentColor}40`,
                      background: accentColor + '10',
                    }}
                  >
                    <ExternalLink size={11} />
                    Live
                  </a>
                )}
                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 font-mono text-xs px-3 py-1.5 rounded-sm transition-all text-white/50 hover:text-white"
                    style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
                  >
                    <Github size={11} />
                    Source
                  </a>
                )}
              </div>
            </div>

            {/* Description */}
            <div
              className="rounded-xl p-4 mb-6"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Layers size={13} style={{ color: accentColor }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accentColor + 'aa' }}>
                  About
                </span>
              </div>
              <p className="text-white/70 text-sm leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Tech stack */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Tag size={13} style={{ color: accentColor }} />
                <span className="font-mono text-xs uppercase tracking-widest" style={{ color: accentColor + 'aa' }}>
                  Tech Stack
                </span>
                <div className="flex-1 h-px ml-2" style={{ background: `linear-gradient(90deg, ${accentColor}30, transparent)` }} />
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, i) => {
                  const c = tagColors[tag] || DEFAULT_TAG
                  return (
                    <span
                      key={tag}
                      className="font-mono text-xs px-3 py-1.5 rounded-md flex items-center gap-1.5 transition-all duration-200 hover:scale-105"
                      style={{
                        color: c.text,
                        background: c.bg,
                        border: `1px solid ${c.border}`,
                        animationDelay: `${i * 40}ms`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: c.text, opacity: 0.8 }}
                      />
                      {tag}
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({ project, index, onClick }: { project: Project; index: number; onClick: () => void }) {
  return (
    <div
      className="group relative rounded-xl border border-border/50 overflow-hidden card-hover cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #1a1a24 0%, #13131a 100%)',
        animationDelay: `${index * 0.1}s`,
      }}
      onClick={onClick}
    >
      {/* Image area */}
      <div className="h-48 overflow-hidden relative" style={{ background: '#0d0d12' }}>
        {project.image && (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

        {/* Tags over image */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {project.tags.slice(0, 3).map(tag => {
            const c = tagColors[tag] || DEFAULT_TAG
            return (
              <span
                key={tag}
                className="font-mono text-xs px-2 py-0.5 rounded-sm border"
                style={{
                  color: c.text,
                  background: 'rgba(13,13,18,0.85)',
                  borderColor: c.border,
                  backdropFilter: 'blur(4px)',
                }}
              >
                {tag}
              </span>
            )
          })}
        </div>

        {/* Click hint overlay */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        >
          <span className="font-mono text-xs text-white/80 border border-white/20 px-3 py-1.5 rounded-sm backdrop-blur-sm">
            View details →
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display font-semibold text-lg text-text mb-2 group-hover:text-accent transition-colors">
          {project.title}
        </h3>
        <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-2">
          {project.description}
        </p>

        {/* Links row */}
        <div className="flex items-center gap-3" onClick={e => e.stopPropagation()}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-accent hover:text-cyan transition-colors border border-accent/30 hover:border-cyan/50 px-3 py-1.5 rounded-sm"
            >
              <ExternalLink size={12} />
              Live
            </a>
          )}
          {project.githubUrl && project.githubUrl !== '#' && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 font-mono text-xs text-muted hover:text-text transition-colors"
            >
              <Github size={14} />
              Source
            </a>
          )}
        </div>
      </div>

      {/* Hover border glow */}
      <div className="absolute inset-0 rounded-xl border border-accent/0 group-hover:border-accent/20 transition-all duration-500 pointer-events-none" />
    </div>
  )
}

// ─── Main Projects Section ────────────────────────────────────────────────────
export default function Projects() {
  const [showAll, setShowAll] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const featured = projects.filter(p => p.featured)
  const rest = projects.filter(p => !p.featured)
  const displayed = showAll ? projects : featured

  return (
    <section id="projects" className="py-24 relative">
      <div className="absolute left-0 top-0 w-48 h-48 dot-grid opacity-20 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">

        <RevealOnScroll>
          <div className="flex items-end justify-between mb-14">
            <div>
              <div className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
                # projects
              </div>
              <div className="w-24 h-px bg-gradient-to-r from-accent to-transparent" />
              <p className="font-mono text-xs text-muted mt-3">
                click any project to expand ↗
              </p>
            </div>
            <button
              onClick={() => setShowAll(!showAll)}
              className="flex items-center gap-2 font-mono text-sm text-muted hover:text-accent transition-colors group"
            >
              {showAll ? 'Show less' : 'View all'}
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <RevealOnScroll key={project.id} delay={i * 100}>
              <ProjectCard project={project} index={i} onClick={() => setSelectedProject(project)} />
            </RevealOnScroll>
          ))}
        </div>

        {!showAll && rest.length > 0 && (
          <RevealOnScroll>
            <div className="text-center mt-10">
              <button
                onClick={() => setShowAll(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-border/50 text-muted font-mono text-sm
                           hover:border-accent/50 hover:text-accent transition-all duration-300 rounded-sm"
              >
                +{rest.length} more projects
              </button>
            </div>
          </RevealOnScroll>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}