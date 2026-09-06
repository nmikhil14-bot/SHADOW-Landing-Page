"use client"

import { useEffect, useRef, useState } from 'react'

export const SnowParticles = ({
  className,
  quantity = 40,
}: {
  className?: string
  quantity?: number
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const canvasContainerRef = useRef<HTMLDivElement | null>(null)
  const context = useRef<CanvasRenderingContext2D | null>(null)
  const circles = useRef<any[]>([])
  const rafID = useRef<number | undefined>(undefined)
  const [isVisible, setIsVisible] = useState(true)
  const lastFrameTime = useRef(Date.now())

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.innerWidth < 768) {
      setIsVisible(false)
      return
    }

    const adjustedQuantity = window.innerWidth < 1024 ? Math.min(quantity, 30) : quantity

    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d', {
        alpha: true,
        desynchronized: true,
      })
    }

    const initCanvas = () => {
      if (canvasContainerRef.current && canvasRef.current && context.current) {
        circles.current = []
        canvasRef.current.width = canvasContainerRef.current.offsetWidth
        canvasRef.current.height = canvasContainerRef.current.offsetHeight

        for (let i = 0; i < adjustedQuantity; i++) {
          const x = Math.floor(Math.random() * canvasRef.current.width)
          const y = Math.floor(Math.random() * canvasRef.current.height)
          const dX = (Math.random() - 0.5) * 0.5
          const dY = (Math.random() * 0.5) + 0.5
          const size = Math.random() * 2 + 1
          const alpha = Math.random() * 0.2 + 0.2
          circles.current.push({ x, y, dX, dY, size, alpha })
        }
      }
    }

    const drawCircle = (x: number, y: number, size: number, alpha: number) => {
      if (context.current) {
        context.current.beginPath()
        context.current.arc(x, y, size, 0, 2 * Math.PI)
        context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`
        context.current.fill()
      }
    }

    const animate = () => {
      const now = Date.now()
      const elapsed = now - lastFrameTime.current

      if (elapsed >= 33 && canvasRef.current && context.current) {
        context.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

        circles.current.forEach((circle) => {
          circle.y += circle.dY
          circle.x += circle.dX

          if (circle.y > canvasRef.current!.height) {
            circle.y = 0
            circle.x = Math.floor(Math.random() * canvasRef.current!.width)
          }

          if (circle.x > canvasRef.current!.width) circle.x = 0
          if (circle.x < 0) circle.x = canvasRef.current!.width

          drawCircle(circle.x, circle.y, circle.size, circle.alpha)
        })

        lastFrameTime.current = now - (elapsed % 33)
      }

      rafID.current = requestAnimationFrame(animate)
    }

    initCanvas()
    animate()

    const handleResize = () => {
      initCanvas()
    }

    window.addEventListener('resize', handleResize)

    return () => {
      if (rafID.current) cancelAnimationFrame(rafID.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [quantity])

  if (!isVisible) return null

  return (
    <div className={className} ref={canvasContainerRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

export default SnowParticles
