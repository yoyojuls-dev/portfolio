import { useState, useEffect } from 'react'
import { navLinks } from '../data'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['home', 'projects', 'skills', 'about', 'contact']
      for (const section of sections) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActive(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'py-3 backdrop-blur-xl bg-bg/80 border-b border-border/50'
          : 'py-6'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group">
          <svg width="36" height="36" viewBox="0 0 80 80" fill="none">
            <path d="M10 10 L40 45 L40 75" stroke="#9d5cff" strokeWidth="5" strokeLinecap="round"/>
            <path d="M70 10 L40 45" stroke="#9d5cff" strokeWidth="5" strokeLinecap="round"/>
            <circle cx="64" cy="22" r="8" stroke="#00e5ff" strokeWidth="2.5" fill="none" className="group-hover:animate-pulse"/>
            <circle cx="64" cy="22" r="3" fill="#00e5ff"/>
          </svg>
          <span className="font-mono text-sm text-muted group-hover:text-accent transition-colors">
            <span className="text-text">yoyo</span>.dev
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`font-mono text-sm transition-colors relative group ${
                active === link.href.replace('#', '')
                  ? 'text-accent'
                  : 'text-muted hover:text-text'
              }`}
            >
              <span className="text-accent/60 mr-1">{'>'}</span>
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300 ${
                active === link.href.replace('#', '') ? 'w-full' : 'w-0 group-hover:w-full'
              }`} />
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          className="hidden md:flex items-center gap-2 px-4 py-2 border border-accent/30 text-accent font-mono text-sm 
                     hover:bg-accent/10 transition-all duration-300 hover:border-accent rounded-sm"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          Available
        </a>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className={`w-6 h-px bg-text transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`w-6 h-px bg-text transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-6 h-px bg-text transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border/50 bg-bg/95 backdrop-blur-xl">
          {navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block px-6 py-4 font-mono text-sm text-muted hover:text-accent border-b border-border/30 transition-colors"
            >
              <span className="text-accent mr-2">{'>'}</span>
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
