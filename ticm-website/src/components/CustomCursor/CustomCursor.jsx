import { useEffect, useState } from 'react'
import './CustomCursor.css'

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isClicking, setIsClicking] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const isTouch = typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches
  if (isTouch) return null

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY })
      if (!isVisible) setIsVisible(true)
    }
    const down = () => setIsClicking(true)
    const up = () => setIsClicking(false)
    const leave = () => setIsVisible(false)
    const enter = () => setIsVisible(true)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    document.addEventListener('mouseleave', leave)
    document.addEventListener('mouseenter', enter)

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.removeEventListener('mouseleave', leave)
      document.removeEventListener('mouseenter', enter)
    }
  }, [isVisible])

  return (
    <div
      className={`custom-cursor ${isClicking ? 'clicking' : ''} ${isVisible ? 'visible' : ''}`}
      style={{ left: position.x, top: position.y }}
    >
      <span className="cursor-cross-h" />
      <span className="cursor-cross-v" />
      <span className="cursor-dot" />
    </div>
  )
}
