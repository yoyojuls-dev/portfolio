import { useScrollReveal } from '../hooks/useScrollReveal'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  className?: string
}

export default function RevealOnScroll({ children, delay = 0, className = '' }: Props) {
  const { ref, visible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}