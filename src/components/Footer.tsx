import { Github, Dribbble, Figma, Facebook, Linkedin } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border/40 py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left */}
        <div className="flex items-center gap-3">
          <svg width="24" height="24" viewBox="0 0 80 80" fill="none">
            <path d="M10 10 L40 45 L40 75" stroke="#9d5cff" strokeWidth="6" strokeLinecap="round"/>
            <path d="M70 10 L40 45" stroke="#9d5cff" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="64" cy="22" r="8" stroke="#00e5ff" strokeWidth="2.5" fill="none"/>
            <circle cx="64" cy="22" r="3" fill="#00e5ff"/>
          </svg>
          <div>
            <div className="font-mono text-xs text-text">Julius Ceasar Visbal</div>
            <div className="font-mono text-xs text-muted">AI Engineer · QA Tester · Prompt Engineer</div>
          </div>
        </div>

        {/* Center */}
        <div className="font-mono text-xs text-muted/60">
          © {year} Julius Ceasar Visbal. All rights reserved.
        </div>

        {/* Right */}
        <div className="flex items-center gap-4">
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
              className="text-muted hover:text-accent transition-colors"
              aria-label={label}
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
