import { useEffect, useState } from 'react'
import { Github, Dribbble, Figma, ArrowDown, Facebook, Linkedin } from 'lucide-react'
import { projects } from '@/data'

const roles = ['AI Engineer', 'Prompt Engineer', 'QA Tester', 'System Builder']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (typing) {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 60)
      } else {
        timeout = setTimeout(() => setTyping(false), 1800)
      }
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 35)
      } else {
        setRoleIndex(i => (i + 1) % roles.length)
        setTyping(true)
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, typing, roleIndex])

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20">
      {/* Dot grid background */}
      <div className="absolute right-0 top-0 w-1/2 h-full dot-grid opacity-30 pointer-events-none" />

      {/* Side social links */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-5 z-40 hidden lg:flex">
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-border mx-auto" />
        {[
          { icon: Github, href: 'https://github.com/yoyojuls-dev', label: 'GitHub' },
          { icon: Facebook, href: 'https://www.facebook.com/juluis.visbal', label: 'Facebook' },
          { icon: Linkedin, href: 'https://www.linkedin.com/in/juliusvisbal/', label: 'LinkedIn' },
        ].map(({ icon: Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-accent transition-colors p-1"
            aria-label={label}
          >
            <Icon size={18} />
          </a>
        ))}
        <div className="w-px h-16 bg-gradient-to-t from-transparent to-border mx-auto" />
      </div>

      <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Text content */}
        <div>
          <div className="font-mono text-accent text-sm mb-4 animate-fade-in flex items-center gap-2">
            <span className="w-8 h-px bg-accent" />
            Hello, World! I'm
          </div>

          <h1 className="animate-fade-in-delay-1 mb-3">
            <span
              className="font-display font-bold leading-none block"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                letterSpacing: '-0.02em',
                color: '#e8e8f0',
              }}
            >
              JULIUS CEASAR
            </span>
            <span
              className="font-display font-bold leading-none block gradient-text"
              style={{
                fontSize: 'clamp(2.4rem, 6vw, 4.5rem)',
                letterSpacing: '-0.02em',
              }}
            >
              VISBAL
            </span>
          </h1>

          <div className="font-mono text-lg text-muted mb-8 animate-fade-in-delay-2 h-7 flex items-center gap-2">
            <span className="text-accent">{'>'}</span>
            <span className="text-text">{displayed}</span>
            <span className="blink text-accent">|</span>
          </div>

          <p className="text-muted leading-relaxed max-w-lg mb-10 animate-fade-in-delay-3" style={{ fontSize: '0.95rem' }}>
            A passionate technology enthusiast with a strong interest in artificial intelligence,
            system quality, and human-centered solutions. I aim to design, test, and improve
            intelligent systems that are accurate, reliable, and impactful in real-world applications.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-in-delay-4">
            <a
              href="#contact"
              className="group px-7 py-3 bg-accent text-white font-mono text-sm font-medium
                         hover:bg-accent-dim transition-all duration-300 rounded-sm relative overflow-hidden"
            >
              <span className="relative z-10">Contact me !!</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
            </a>
            <a
              href="#projects"
              className="px-7 py-3 border border-border text-muted font-mono text-sm
                         hover:border-accent hover:text-accent transition-all duration-300 rounded-sm"
            >
              View Projects →
            </a>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-12 animate-fade-in-delay-5">
            {[
              { value: `${projects.length}`, label: 'Projects Built' },
              { value: `${(new Date().getFullYear() - 2024) || 1}+`, label: 'Years Coding with AI Vibing' },
              { value: '∞', label: 'Prompts Crafted' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display font-bold text-2xl gradient-text">{value}</div>
                <div className="font-mono text-xs text-muted mt-0.5">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Profile image / visual */}
        <div className="relative flex justify-center lg:justify-end animate-fade-in-delay-2">
          {/* Decorative rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-80 h-80 rounded-full border border-accent/10 animate-pulse-slow" />
            <div className="absolute w-64 h-64 rounded-full border border-accent/15" />
          </div>

          {/* Profile picture placeholder / actual image */}
          <div className="relative w-72 h-80">
            <div
              className="w-full h-full rounded-2xl overflow-hidden border border-border/50"
              style={{
                background: 'linear-gradient(135deg, #1a1a24 0%, #13131a 100%)',
                boxShadow: '0 0 80px rgba(157, 92, 255, 0.15), inset 0 0 60px rgba(157, 92, 255, 0.05)',
              }}
            >
              {/* Replace src with your actual photo: /images/julius.png */}
              <img
                src="/images/julius.png"
                alt="Julius Ceasar Visbal"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  // Fallback to placeholder
                  const target = e.target as HTMLImageElement
                  target.style.display = 'none'
                  target.nextElementSibling?.classList.remove('hidden')
                }}
              />
              {/* Fallback placeholder */}
              <div className="hidden w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">👨‍💻</div>
                  <div className="font-mono text-xs text-muted">Add your photo to</div>
                  <div className="font-mono text-xs text-accent">public/images/julius.png</div>
                </div>
              </div>
            </div>

            {/* Corner accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 dot-grid opacity-50 rounded" />
            <div className="absolute -top-4 -left-4 w-16 h-16 border border-accent/20 rounded" />

            {/* Status badge */}
            <div
              className="absolute -bottom-4 left-4 px-4 py-2 font-mono text-xs border border-border/80 rounded-sm flex items-center gap-2"
              style={{ background: '#13131a' }}
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Open to work
            </div>
          </div>

          {/* Y Logo floating */}
          <div className="absolute top-4 right-0 lg:-right-8 opacity-20 animate-float">
            <svg width="100" height="100" viewBox="0 0 80 80" fill="none">
              <path d="M10 10 L40 45 L40 75" stroke="#9d5cff" strokeWidth="4" strokeLinecap="round"/>
              <path d="M70 10 L40 45" stroke="#9d5cff" strokeWidth="4" strokeLinecap="round"/>
              <circle cx="64" cy="22" r="10" stroke="#00e5ff" strokeWidth="2" fill="none"/>
              <circle cx="64" cy="22" r="4" fill="#00e5ff" opacity="0.6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted animate-bounce">
        <span className="font-mono text-xs">scroll</span>
        <ArrowDown size={14} />
      </div>
    </section>
  )
}
