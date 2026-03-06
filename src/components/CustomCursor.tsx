import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [follower, setFollower] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    let followerX = 0
    let followerY = 0
    let animId: number

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY })
    }

    const animate = () => {
      setFollower(prev => {
        const dx = pos.x - prev.x
        const dy = pos.y - prev.y
        followerX = prev.x + dx * 0.12
        followerY = prev.y + dy * 0.12
        return { x: followerX, y: followerY }
      })
      animId = requestAnimationFrame(animate)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      cancelAnimationFrame(animId)
    }
  }, [pos.x, pos.y])

  return (
    <>
      <div
        className="cursor"
        style={{
          left: pos.x,
          top: pos.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2 : 1})`,
        }}
      />
      <div
        className="cursor-follower"
        style={{
          left: follower.x,
          top: follower.y,
          width: isHovering ? '48px' : '32px',
          height: isHovering ? '48px' : '32px',
          borderColor: isHovering ? 'rgba(157, 92, 255, 0.8)' : 'rgba(157, 92, 255, 0.4)',
        }}
      />
    </>
  )
}
