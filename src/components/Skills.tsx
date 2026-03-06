import { useState, useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { skills } from '../data'

const skillRatings: Record<string, Record<string, number>> = {
  Languages: {
    TypeScript: 30, JavaScript: 40, C: 60, 'C++': 55, Python: 30, PHP: 35,
  },
  Frameworks: {
    React: 30, Flask: 42, 'Express.js': 40, 'Discord.js': 25,
    'Next.js': 70, Vite: 82, 'Tailwind CSS': 88, Bootstrap: 78,
  },
  Databases: {
    MySQL: 75, MongoDB: 80, SQLite: 70, Firebase: 75, 'Google Console Databases': 80,
  },
  Tools: {
    VSCode: 95, PyCharm: 70, Git: 82, Figma: 68, Canva: 72, Linux: 65, Docker: 60,
  },
  'AI / ML': {
    'Prompt Engineering': 90, 'OpenAI API': 82, 'Anthropic API': 80, LangChain: 65,
  },
  Other: {
    HTML: 92, CSS: 85, REST: 80, Jinja: 65, EJS: 68, SCSS: 75,
  },
}

const categoryIcons: Record<string, string> = {
  Languages: '{ }', Frameworks: '◈', Databases: '◆',
  Tools: '⚙', 'AI / ML': '◎', Other: '…',
}

const categoryColors: Record<string, string> = {
  Languages: '#9d5cff', Frameworks: '#00e5ff', Databases: '#ff3d8a',
  Tools: '#ffd700', 'AI / ML': '#7fff7f', Other: '#ff8c00',
}

function getRatingLabel(rating: number): string {
  if (rating >= 90) return 'Expert'
  if (rating >= 80) return 'Advanced'
  if (rating >= 65) return 'Proficient'
  if (rating >= 50) return 'Familiar'
  return 'Learning'
}

interface FallingBox {
  x: number; y: number; size: number; speed: number
  rotation: number; rotationSpeed: number; opacity: number; color: string
}

function FallingBoxes({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const boxesRef = useRef<FallingBox[]>([])
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
      size: 8 + Math.random() * 28,
      speed: 0.3 + Math.random() * 0.7,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.012,
      opacity: 0.08 + Math.random() * 0.22,
      color,
    })

    boxesRef.current = Array.from({ length: 22 }, () => spawn())

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      boxesRef.current.forEach(b => {
        ctx.save()
        ctx.translate(b.x, b.y)
        ctx.rotate(b.rotation)
        ctx.strokeStyle = b.color
        ctx.globalAlpha = b.opacity
        ctx.lineWidth = 1
        ctx.strokeRect(-b.size / 2, -b.size / 2, b.size, b.size)
        ctx.restore()
        b.y += b.speed
        b.rotation += b.rotationSpeed
        if (b.y > H + b.size) {
          Object.assign(b, spawn(-b.size))
          b.y = -b.size
        }
      })
      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none rounded-2xl"
    />
  )
}

interface ModalProps {
  category: string
  onClose: () => void
}

function SkillModal({ category, onClose }: ModalProps) {
  const color = categoryColors[category] || '#9d5cff'
  const icon = categoryIcons[category] || '◆'
  const ratings = skillRatings[category] || {}
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 80)
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => { clearTimeout(t); window.removeEventListener('keydown', onKey) }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(7,7,10,0.82)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl border overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #16161f 0%, #0f0f16 100%)',
          borderColor: color + '33',
          boxShadow: `0 0 80px ${color}1a, 0 30px 80px rgba(0,0,0,0.7)`,
          maxHeight: '88vh',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Falling boxes canvas — behind content */}
        <FallingBoxes color={color} />

        {/* Content */}
        <div className="relative z-10 p-7 overflow-y-auto" style={{ maxHeight: '88vh' }}>
          {/* Header */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-mono"
                style={{ background: color + '18', border: `1px solid ${color}33` }}
              >
                <span style={{ color }}>{icon}</span>
              </div>
              <div>
                <h2 className="font-display font-bold text-xl text-white">{category}</h2>
                <p className="font-mono text-xs" style={{ color: color + 'aa' }}>
                  {Object.keys(ratings).length} skills tracked
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-muted hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)' }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Skill bars */}
          <div className="space-y-5">
            {Object.entries(ratings)
              .sort((a, b) => b[1] - a[1])
              .map(([skill, rating], i) => (
                <div key={skill}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-sm text-white/80">{skill}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className="font-mono text-xs px-2 py-0.5 rounded-sm"
                        style={{
                          color,
                          background: color + '14',
                          border: `1px solid ${color}28`,
                        }}
                      >
                        {getRatingLabel(rating)}
                      </span>
                      <span className="font-mono text-xs text-muted w-8 text-right">
                        {rating}%
                      </span>
                    </div>
                  </div>
                  {/* Bar track */}
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ background: 'rgba(255,255,255,0.06)' }}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: animated ? `${rating}%` : '0%',
                        transition: `width 0.7s cubic-bezier(0.4,0,0.2,1) ${i * 60}ms`,
                        background: `linear-gradient(90deg, ${color}88, ${color})`,
                        boxShadow: `0 0 8px ${color}55`,
                      }}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Legend */}
          <div className="mt-7 pt-5 border-t flex flex-wrap gap-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
            {[
              { label: 'Expert', min: 90 },
              { label: 'Advanced', min: 80 },
              { label: 'Proficient', min: 65 },
              { label: 'Familiar', min: 50 },
            ].map(({ label, min }) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full" style={{ background: color, opacity: min / 100 + 0.1 }} />
                <span className="font-mono text-xs text-muted">{label} ≥{min}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Skills() {
  const [openCategory, setOpenCategory] = useState<string | null>(null)

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute right-0 bottom-0 w-64 h-64 dot-grid opacity-15 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-14">
          <div className="font-mono text-accent text-xs uppercase tracking-widest mb-3">
            # skills
          </div>
          <div className="w-16 h-px bg-gradient-to-r from-accent to-transparent" />
          <p className="font-mono text-xs text-muted mt-3">
            click any category to see ratings ↗
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((skill, i) => {
            const color = categoryColors[skill.category] || '#9d5cff'
            const icon = categoryIcons[skill.category] || '◆'
            return (
              <button
                key={skill.category}
                onClick={() => setOpenCategory(skill.category)}
                className="group relative p-6 rounded-xl border text-left w-full card-hover cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #1a1a24 0%, #13131a 100%)',
                  borderColor: 'rgba(42,42,58,0.4)',
                  animationDelay: `${i * 0.08}s`,
                }}
              >
                {/* Header */}
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-mono text-base" style={{ color }}>{icon}</span>
                  <h3 className="font-display font-semibold text-sm text-text">
                    {skill.category}
                  </h3>
                  <div className="ml-auto flex items-center gap-2">
                    <span
                      className="font-mono text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ color }}
                    >
                      view →
                    </span>
                    <div className="w-8 h-px" style={{ background: color + '44' }} />
                  </div>
                </div>

                {/* Items */}
                <div className="flex flex-wrap gap-2">
                  {skill.items.map(item => (
                    <span
                      key={item}
                      className="font-mono text-xs px-2.5 py-1 rounded-sm border border-border/50 text-muted"
                      style={{ background: 'rgba(13,13,18,0.6)' }}
                    >
                      {item}
                    </span>
                  ))}
                </div>

                {/* Bottom accent line on hover */}
                <div
                  className="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-500 rounded-b-xl"
                  style={{ background: `linear-gradient(90deg, ${color}, transparent)` }}
                />

                {/* Inner border glow on hover */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: `inset 0 0 0 1px ${color}28` }}
                />
              </button>
            )
          })}
        </div>

        {/* Decoration */}
        <div className="hidden lg:flex items-center justify-center mt-16 gap-6 opacity-20">
          {[16, 24, 12, 20, 8].map((size, idx) => (
            <div
              key={idx}
              className="border border-accent/40 rounded-sm"
              style={{ width: size, height: size, transform: `rotate(${idx * 15}deg)` }}
            />
          ))}
        </div>
      </div>

      {openCategory && (
        <SkillModal
          category={openCategory}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </section>
  )
}