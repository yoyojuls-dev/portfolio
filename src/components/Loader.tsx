import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-50">
      <div className="relative mb-8">
        {/* Y Logo SVG */}
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10 L40 45 L40 75" stroke="#9d5cff" strokeWidth="4" strokeLinecap="round"/>
          <path d="M70 10 L40 45" stroke="#9d5cff" strokeWidth="4" strokeLinecap="round"/>
          <circle cx="64" cy="22" r="8" stroke="#00e5ff" strokeWidth="2" fill="none"/>
          <circle cx="64" cy="22" r="3" fill="#00e5ff"/>
        </svg>
        <div className="absolute inset-0 rounded-full blur-xl opacity-40" style={{ background: 'radial-gradient(circle, #9d5cff, transparent)' }} />
      </div>

      <div className="font-mono text-xs text-muted mb-6 tracking-widest uppercase">
        Initializing Portfolio
      </div>

      <div className="w-48 h-px bg-border relative overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-accent to-cyan transition-all duration-100"
          style={{ width: `${Math.min(progress, 100)}%` }}
        />
      </div>

      <div className="font-mono text-xs text-muted mt-3">
        {Math.min(Math.round(progress), 100)}%
      </div>
    </div>
  )
}
