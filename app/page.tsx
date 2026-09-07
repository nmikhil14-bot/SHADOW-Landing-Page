'use client'

import { useRouter } from 'next/navigation'
import { useRef, useEffect, useState } from 'react'
import { Brain, Activity, GitBranch, Mic, ScanFace, FileCode, Zap } from 'lucide-react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SnowParticles from '@/components/ui/snow-particles'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

const features = [
  {
    title: 'Multi-Model Neural Ensemble',
    description: '4+ deep learning models vote on authenticity with aggressive confidence weighting',
    icon: Brain,
  },
  {
    title: 'Frequency Domain Forensics',
    description: 'FFT/DCT analysis detects GAN and diffusion model artifacts invisible to human eyes',
    icon: Activity,
  },
  {
    title: 'Temporal Consistency Tracking',
    description: 'Tracks facial landmarks and identity persistence across video frames to catch unnatural transitions',
    tag: 'Video',
    icon: GitBranch,
  },
  {
    title: 'Audio-Visual Synchronization',
    description: 'Voice deepfake detection with lip-sync correlation analysis',
    tag: 'Video',
    icon: Mic,
  },
  {
    title: 'Facial Forensics',
    description: 'Analyzes symmetry, eye quality, skin texture, and anatomical correctness',
    icon: ScanFace,
  },
  {
    title: 'Metadata Intelligence',
    description: 'EXIF data analysis and ELA compression forensics reveal editing history',
    icon: FileCode,
  },
  {
    title: 'Real-Time Analysis',
    description: 'Process thousands of images per minute via distributed edge network',
    icon: Zap,
  },
]

function HorizontalScrollFeatures() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile || !sectionRef.current || !cardsContainerRef.current) return

    const section = sectionRef.current
    const cardsContainer = cardsContainerRef.current
    const cardWidth = 380 + 24
    const totalWidth = cardWidth * features.length
    const viewportWidth = window.innerWidth
    const scrollDistance = totalWidth - viewportWidth + 300

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        scrub: 1,
        start: 'top top',
        end: () => `+=${scrollDistance * 2}`,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })

    tl.to(cardsContainer, {
      x: -scrollDistance,
      ease: 'none',
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="features" className="py-20 px-6">
        <div className="container max-w-7xl mx-auto space-y-12">
          <div className="space-y-4 max-w-xl">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Advanced Detection <br />
              Features.
            </h2>
            <p className="text-slate-400 text-lg">
              Multi-layered analysis combining neural networks, signal processing, and biological verification.
            </p>
          </div>

          <div className="space-y-6">
            {features.map((feature, idx) => {
              const Icon = feature.icon
              return (
                <div
                  key={idx}
                  className="bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="text-white/60">
                      <Icon size={28} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-white">{feature.title}</h3>
                        {feature.tag && (
                          <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded">
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="features" ref={sectionRef} className="relative h-screen overflow-hidden z-10">
      <div className="h-screen flex items-center">
        <div className="w-full">
          <div className="container max-w-7xl mx-auto px-6 mb-12">
            <div className="space-y-4 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                Advanced Detection <br />
                Features.
              </h2>
              <p className="text-slate-400 text-lg">
                Multi-layered analysis combining neural networks, signal processing, and biological verification.
              </p>
            </div>
          </div>

          <div className="overflow-hidden">
            <div
              ref={cardsContainerRef}
              className="flex gap-6 pl-6 md:pl-[calc((100vw-1280px)/2+1.5rem)]"
            >
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <div
                    key={idx}
                    className="group flex-shrink-0 w-[380px] bg-white/[0.02] border border-white/10 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors relative overflow-hidden"
                  >
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent animate-scanline" />
                    </div>

                    <div className="mb-6 relative">
                      <Icon
                        size={32}
                        className="text-white/60 transition-all duration-300 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                        strokeWidth={1.5}
                      />
                      <Icon
                        size={32}
                        className="absolute top-0 left-0 text-red-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:translate-x-[-2px] group-hover:translate-y-[-1px]"
                        strokeWidth={1.5}
                      />
                      <Icon
                        size={32}
                        className="absolute top-0 left-0 text-blue-500/40 opacity-0 group-hover:opacity-100 transition-opacity duration-75 group-hover:translate-x-[2px] group-hover:translate-y-[1px]"
                        strokeWidth={1.5}
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h3 className="glitch-text text-2xl font-semibold text-white relative">
                          {feature.title}
                          <span className="glitch-text-layer" data-text={feature.title}></span>
                          <span className="glitch-text-layer" data-text={feature.title}></span>
                        </h3>
                        {feature.tag && (
                          <span className="text-xs px-2 py-1 bg-white/10 text-white/70 rounded group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                            {feature.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-400 text-base leading-relaxed group-hover:text-slate-300 transition-colors">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scanline {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }

        .animate-scanline {
          animation: scanline 2s ease-in-out infinite;
        }

        .glitch-text {
          position: relative;
          display: inline-block;
        }

        .glitch-text-layer {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          opacity: 0;
          pointer-events: none;
        }
      `}</style>
    </section>
  )
}

export default function Home() {
  const router = useRouter()
  const [portraitSweepVisible, setPortraitSweepVisible] = useState(false)

  useEffect(() => {
    let sweepTimeout: number | undefined

    const sweepTimer = window.setInterval(() => {
      setPortraitSweepVisible(true)
      sweepTimeout = window.setTimeout(() => setPortraitSweepVisible(false), 1000)
    }, 9000)

    return () => {
      window.clearInterval(sweepTimer)
      if (sweepTimeout) window.clearTimeout(sweepTimeout)
    }
  }, [])

  return (
    <main className="min-h-screen bg-black text-white selection:bg-cyan-500/30 overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(20,30,60,0.18),transparent_42%),radial-gradient(circle_at_70%_80%,rgba(8,15,30,0.12),transparent_38%)]" />
      </div>
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <SnowParticles quantity={80} />
      </div>

      <section id="home" className="hero-section relative flex min-h-screen w-full flex-col bg-gradient-to-br from-black via-[#0a0a0f] to-black overflow-hidden z-10 lg:h-screen lg:flex-row">
        <div className="hero-portrait relative flex h-[42vh] min-h-[220px] w-full items-center justify-center overflow-hidden lg:h-full lg:flex-1">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/images/Unsettling_Glitched_Face_Video_Generation.mp4" type="video/mp4" />
          </video>
          <div className="portrait-landmarks hidden" aria-hidden="true">
            <svg viewBox="0 0 640 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full">
              <g fill="none" stroke="currentColor" strokeWidth="0.65" strokeLinecap="round" strokeLinejoin="round" opacity="0">
                <path d="M254 338 L270 329 L288 326 L306 329 L320 338 M396 338 L412 329 L430 326 L448 329 L464 339" />
                <path d="M254 362 L266 353 L282 349 L299 351 L315 359 L300 367 L282 369 L266 367 Z M397 359 L413 351 L430 349 L446 353 L464 362 L452 367 L434 369 L416 367 Z" />
                <path d="M266 353 L282 369 M282 349 L300 367 M299 351 L315 359 M413 351 L416 367 M430 349 L434 369 M446 353 L452 367" />
                <path d="M318 354 L332 369 L343 388 L346 410 L340 431 L330 445 M397 354 L383 369 L374 388 L371 410 L377 431 L387 445" />
                <path d="M343 388 L354 397 L371 388 M340 431 L351 437 L361 437 L377 431 M344 448 L353 452 L362 452 L372 448" />
                <path d="M320 474 L334 468 L350 466 L366 468 L382 466 L400 474 L385 484 L368 487 L350 486 L334 484 Z" />
                <path d="M334 468 L350 486 M350 466 L350 486 M366 468 L368 487 M382 466 L385 484 M334 484 L350 486 L368 487" />
                <path d="M275 492 L290 507 L304 526 L320 545 L337 562 L354 571 L371 562 L388 545 L404 526 L419 507 L435 492" />
                <path d="M290 507 L320 545 L354 571 L388 545 L419 507 M304 526 L337 562 M404 526 L371 562" />
              </g>
              <g fill="currentColor" opacity="0">
                <circle cx="254" cy="338" r="1.1" /><circle cx="270" cy="329" r="1.1" /><circle cx="288" cy="326" r="1.1" /><circle cx="306" cy="329" r="1.1" /><circle cx="320" cy="338" r="1.1" />
                <circle cx="254" cy="362" r="1.1" /><circle cx="266" cy="353" r="1.1" /><circle cx="282" cy="349" r="1.1" /><circle cx="299" cy="351" r="1.1" /><circle cx="315" cy="359" r="1.1" /><circle cx="300" cy="367" r="1.1" /><circle cx="282" cy="369" r="1.1" /><circle cx="266" cy="367" r="1.1" />
                <circle cx="396" cy="338" r="1.1" /><circle cx="412" cy="329" r="1.1" /><circle cx="430" cy="326" r="1.1" /><circle cx="448" cy="329" r="1.1" /><circle cx="464" cy="339" r="1.1" />
                <circle cx="397" cy="359" r="1.1" /><circle cx="413" cy="351" r="1.1" /><circle cx="430" cy="349" r="1.1" /><circle cx="446" cy="353" r="1.1" /><circle cx="464" cy="362" r="1.1" /><circle cx="452" cy="367" r="1.1" /><circle cx="434" cy="369" r="1.1" /><circle cx="416" cy="367" r="1.1" />
                <circle cx="318" cy="354" r="1.1" /><circle cx="332" cy="369" r="1.1" /><circle cx="343" cy="388" r="1.1" /><circle cx="346" cy="410" r="1.1" /><circle cx="340" cy="431" r="1.1" /><circle cx="330" cy="445" r="1.1" /><circle cx="397" cy="354" r="1.1" /><circle cx="383" cy="369" r="1.1" /><circle cx="374" cy="388" r="1.1" /><circle cx="371" cy="410" r="1.1" /><circle cx="377" cy="431" r="1.1" /><circle cx="387" cy="445" r="1.1" />
                <circle cx="343" cy="388" r="1.1" /><circle cx="354" cy="397" r="1.1" /><circle cx="371" cy="388" r="1.1" /><circle cx="340" cy="431" r="1.1" /><circle cx="351" cy="437" r="1.1" /><circle cx="361" cy="437" r="1.1" /><circle cx="377" cy="431" r="1.1" />
                <circle cx="320" cy="474" r="1.1" /><circle cx="334" cy="468" r="1.1" /><circle cx="350" cy="466" r="1.1" /><circle cx="366" cy="468" r="1.1" /><circle cx="382" cy="466" r="1.1" /><circle cx="400" cy="474" r="1.1" /><circle cx="385" cy="484" r="1.1" /><circle cx="368" cy="487" r="1.1" /><circle cx="350" cy="486" r="1.1" /><circle cx="334" cy="484" r="1.1" />
                <circle cx="275" cy="492" r="1.1" /><circle cx="290" cy="507" r="1.1" /><circle cx="304" cy="526" r="1.1" /><circle cx="320" cy="545" r="1.1" /><circle cx="337" cy="562" r="1.1" /><circle cx="354" cy="571" r="1.1" /><circle cx="371" cy="562" r="1.1" /><circle cx="388" cy="545" r="1.1" /><circle cx="404" cy="526" r="1.1" /><circle cx="419" cy="507" r="1.1" /><circle cx="435" cy="492" r="1.1" />
              </g>
              <g fill="none" stroke="currentColor" strokeWidth="0.55" strokeLinecap="round" strokeLinejoin="round">
                <path d="M246 400 L258 370 L270 338 L288 326 L306 329 L320 338 L318 354 L315 359 L300 367 L282 369 L266 367 L254 362 L246 400" />
                <path d="M394 354 L396 338 L412 329 L430 326 L448 329 L464 339 L476 370 L488 400 L480 362 L464 362 L452 367 L434 369 L416 367 L397 359 L394 354" />
                <path d="M320 338 L332 369 L343 388 L346 410 L340 431 L330 445 L343 448 L354 452 L362 452 L372 448 L387 445 L377 431 L371 410 L374 388 L383 369 L396 338" />
                <path d="M246 400 L258 430 L275 462 L290 492 L320 545 L337 562 L354 571 L371 562 L388 545 L419 492 L434 462 L451 430 L464 400" />
                <path d="M275 462 L300 467 L320 474 L334 468 L350 466 L366 468 L382 466 L400 474 L419 467 L434 462" />
                <path d="M320 474 L334 484 L350 486 L368 487 L385 484 L400 474" />
                <path d="M258 430 L290 430 L320 410 L340 431 M451 430 L419 430 L377 431 L371 410" />
                <path d="M288 326 L315 359 L343 388 M430 326 L397 359 L374 388 M315 359 L343 388 L340 431 M397 359 L374 388 L377 431" />
                <path d="M300 367 L320 410 L340 431 L334 468 M434 369 L371 410 L377 431 L382 466" />
                <path d="M290 430 L304 462 L320 474 M419 430 L404 462 L400 474 M304 462 L337 445 L350 466 M404 462 L387 445 L366 468" />
              </g>
              <g fill="currentColor">
                <circle cx="246" cy="400" r="1" /><circle cx="258" cy="370" r="1" /><circle cx="270" cy="338" r="1" /><circle cx="288" cy="326" r="1" /><circle cx="306" cy="329" r="1" /><circle cx="320" cy="338" r="1" />
                <circle cx="254" cy="362" r="1" /><circle cx="266" cy="367" r="1" /><circle cx="282" cy="369" r="1" /><circle cx="300" cy="367" r="1" /><circle cx="315" cy="359" r="1" /><circle cx="318" cy="354" r="1" />
                <circle cx="394" cy="354" r="1" /><circle cx="396" cy="338" r="1" /><circle cx="412" cy="329" r="1" /><circle cx="430" cy="326" r="1" /><circle cx="448" cy="329" r="1" /><circle cx="464" cy="339" r="1" /><circle cx="476" cy="370" r="1" /><circle cx="488" cy="400" r="1" /><circle cx="464" cy="362" r="1" /><circle cx="452" cy="367" r="1" /><circle cx="434" cy="369" r="1" /><circle cx="416" cy="367" r="1" /><circle cx="397" cy="359" r="1" />
                <circle cx="332" cy="369" r="1" /><circle cx="343" cy="388" r="1" /><circle cx="346" cy="410" r="1" /><circle cx="340" cy="431" r="1" /><circle cx="330" cy="445" r="1" /><circle cx="343" cy="448" r="1" /><circle cx="354" cy="452" r="1" /><circle cx="362" cy="452" r="1" /><circle cx="372" cy="448" r="1" /><circle cx="387" cy="445" r="1" /><circle cx="377" cy="431" r="1" /><circle cx="371" cy="410" r="1" /><circle cx="374" cy="388" r="1" /><circle cx="383" cy="369" r="1" />
                <circle cx="246" cy="400" r="1" /><circle cx="258" cy="430" r="1" /><circle cx="275" cy="462" r="1" /><circle cx="290" cy="492" r="1" /><circle cx="304" cy="526" r="1" /><circle cx="320" cy="545" r="1" /><circle cx="337" cy="562" r="1" /><circle cx="354" cy="571" r="1" /><circle cx="371" cy="562" r="1" /><circle cx="388" cy="545" r="1" /><circle cx="404" cy="526" r="1" /><circle cx="419" cy="492" r="1" /><circle cx="434" cy="462" r="1" /><circle cx="451" cy="430" r="1" /><circle cx="464" cy="400" r="1" />
                <circle cx="300" cy="467" r="1" /><circle cx="320" cy="474" r="1" /><circle cx="334" cy="468" r="1" /><circle cx="350" cy="466" r="1" /><circle cx="366" cy="468" r="1" /><circle cx="382" cy="466" r="1" /><circle cx="400" cy="474" r="1" /><circle cx="419" cy="467" r="1" /><circle cx="334" cy="484" r="1" /><circle cx="350" cy="486" r="1" /><circle cx="368" cy="487" r="1" /><circle cx="385" cy="484" r="1" />
              </g>
            </svg>
          </div>
          <div className={`portrait-sweep ${portraitSweepVisible ? 'portrait-sweep-visible' : ''}`} aria-hidden="true" />
          <div className="absolute right-0 top-[10%] bottom-[10%] w-px bg-gradient-to-b from-transparent via-cyan-300/25 to-transparent" />
        </div>

        <div className="hero-copy-wrap relative flex min-h-[430px] w-full flex-1 items-center justify-center p-6 lg:p-[60px]">
          <div className="hero-copy relative z-10 max-w-[520px] translate-y-0 lg:-translate-y-[70px]">
            <p className="hero-badge mb-6 inline-flex min-h-[44px] items-center rounded-[5px] border border-cyan-300/35 px-4 py-2 text-[13px] font-mono font-medium tracking-[0.16em] text-cyan-200/65">
              IQOO HACKATHON 2026
            </p>

            <h1 className="hero-title text-[clamp(48px,12vw,92px)] font-normal tracking-[5px] leading-none mb-8 text-white uppercase font-space lg:tracking-[9px]">
              S.H.A.D.O.W
            </h1>

            <p className="hero-subheading text-[25px] font-light text-amber-50/55 mb-3 tracking-[0.3px]">
              AI-assisted media credibility analysis
            </p>

            <div className="hero-status mb-[72px] flex items-center gap-3 text-[17px] font-light tracking-[0.08em] text-white/35">
              <span className="system-status-dot" />
              <span>9 Detection Layers Online</span>
            </div>

            <div className="hero-action flex gap-5">
              <div className="flex flex-col items-start gap-4">
                <p className="hero-support text-[20px] font-light tracking-[0.04em] text-white/40">
                  See how deepfakes are exposed, layer by layer.
                </p>
              <button
                onClick={() => router.push('/learn')}
                className="hero-learn-button group relative min-h-[44px] px-12 py-4 text-[15px] font-normal tracking-[1px] uppercase border border-cyan-300/25 bg-transparent text-white/70 cursor-pointer overflow-hidden transition-colors duration-300 hover:text-black hover:border-cyan-300 hover:-translate-y-0.5 will-change-transform"
              >
                <span className="relative z-10">Learn</span>
                <span className="absolute inset-0 -translate-x-full bg-cyan-300 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              </button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-stat pointer-events-none absolute bottom-[32px] left-[32px] z-20 whitespace-nowrap text-[10px] font-light tracking-[0.08em] text-white/35">
          9 Forensic Layers · Real-time Analysis · Explainable AI
        </div>
        <div className="hero-watermark hidden pointer-events-none absolute bottom-[5%] left-[57%] right-[3%] z-[1] text-right md:block" aria-hidden="true">
          S.H.A.D.O.W.
        </div>
        <div className="scroll-cue hidden pointer-events-none absolute bottom-6 left-1/2 z-20 -translate-x-1/2 flex-col items-center gap-2 text-[9px] font-mono uppercase tracking-[0.16em] text-white/35 md:flex">
          <span>Scroll to explore</span>
          <span className="scroll-cue-arrow" aria-hidden="true">↓</span>
        </div>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease forwards;
          }

          .will-change-transform {
            will-change: transform;
          }

          @keyframes portraitSweep {
            0% {
              opacity: 0;
              transform: translateY(-8px);
            }
            20% {
              opacity: 0.22;
            }
            75% {
              opacity: 0.14;
            }
            100% {
              opacity: 0;
              transform: translateY(100%);
            }
          }

          @keyframes statusPulse {
            0%, 100% {
              opacity: 0.35;
              transform: scale(0.9);
            }
            50% {
              opacity: 0.9;
              transform: scale(1);
            }
          }

          @keyframes scrollCueBob {
            0%, 100% {
              transform: translate(-50%, 0);
            }
            50% {
              transform: translate(-50%, 4px);
            }
          }

          .portrait-sweep {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, rgba(103, 232, 249, 0.8), transparent);
            opacity: 0;
            pointer-events: none;
            z-index: 2;
          }

          .portrait-sweep-visible {
            animation: portraitSweep 1s ease-in-out both;
          }

          .system-status-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(103, 232, 249, 0.8);
            box-shadow: 0 0 8px rgba(103, 232, 249, 0.45);
            animation: statusPulse 2s ease-in-out infinite;
          }

          .scroll-cue {
            animation: scrollCueBob 3.5s ease-in-out infinite;
          }

          .scroll-cue-arrow {
            color: rgba(103, 232, 249, 0.55);
            font-size: 14px;
            line-height: 1;
          }

          .hero-watermark {
            color: rgba(103, 232, 249, 0.05);
            font-size: clamp(24px, 4vw, 72px);
            font-weight: 400;
            letter-spacing: 0.08em;
            line-height: 0.9;
            white-space: nowrap;
          }

          .portrait-landmarks {
            color: rgba(103, 232, 249, 0.9);
            opacity: 0;
            transform: scale(1.015);
            transition: opacity 1.2s ease, transform 1.8s ease;
            mix-blend-mode: screen;
            pointer-events: none;
            z-index: 1;
          }

          .portrait-landmarks-visible {
            opacity: 0.35;
            transform: scale(1);
          }

          .portrait-status {
            position: absolute;
            left: 24px;
            bottom: 24px;
            display: flex;
            align-items: center;
            gap: 9px;
            color: rgba(165, 243, 252, 0.7);
            font: 10px/1.2 ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            letter-spacing: 0.04em;
            white-space: nowrap;
            max-width: calc(100% - 48px);
            overflow: visible;
            opacity: 0;
            transform: translateY(5px);
            transition: opacity 1s ease, transform 1s ease;
            z-index: 2;
          }

          .portrait-status-visible {
            opacity: 1;
            transform: translateY(0);
          }

          .portrait-status-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #67e8f9;
            box-shadow: 0 0 8px rgba(103, 232, 249, 0.8);
          }

          .analysis-signal {
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .analysis-signal-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: rgba(103, 232, 249, 0.7);
            box-shadow: 0 0 8px rgba(103, 232, 249, 0.5);
          }

          @media (prefers-reduced-motion: reduce) {
            .portrait-landmarks,
            .portrait-status,
            .animate-fade-in-up,
            .portrait-sweep,
            .system-status-dot,
            .scroll-cue {
              transition: none;
              animation: none;
            }

            .portrait-landmarks {
              opacity: 0.35;
              transform: none;
            }

            .portrait-status {
              opacity: 1;
              transform: none;
            }
          }

          @media (max-width: 1024px) {
            .flex-1:first-child::after {
              display: none;
            }

            .hero-watermark {
              left: auto;
              right: 6%;
              bottom: 12%;
              font-size: clamp(22px, 7vw, 48px);
            }
          }

          @media (max-width: 767px) {
            .hero-section {
              min-height: 0;
              overflow: hidden;
              padding-bottom: 64px;
            }

            .hero-portrait {
              height: min(52vh, 440px);
              min-height: 240px;
              flex: none;
            }

            .hero-portrait::after {
              content: '';
              position: absolute;
              inset: 0;
              pointer-events: none;
              background: linear-gradient(to bottom, transparent 50%, rgba(0, 0, 0, 0.18));
            }

            .hero-copy-wrap {
              min-height: 0;
              padding: 40px 24px 48px;
              align-items: flex-start;
            }

            .hero-copy {
              width: min(100%, 520px);
              transform: none;
              text-align: center;
            }

            .hero-badge {
              margin-bottom: 24px;
              padding: 10px 14px;
              font-size: 10px;
              letter-spacing: 0.11em;
            }

            .hero-title {
              margin-bottom: 24px;
              font-size: clamp(34px, 12vw, 48px);
              letter-spacing: 3px;
              line-height: 1.05;
              white-space: nowrap;
            }

            .hero-subheading {
              margin-bottom: 10px;
              font-size: clamp(17px, 5vw, 21px);
              line-height: 1.35;
            }

            .hero-status {
              justify-content: center;
              margin-bottom: 40px;
              font-size: clamp(13px, 4vw, 16px);
              line-height: 1.4;
            }

            .hero-action {
              justify-content: center;
            }

            .hero-action > div {
              align-items: center;
              gap: 16px;
            }

            .hero-support {
              max-width: 320px;
              font-size: clamp(15px, 4.5vw, 18px);
              line-height: 1.5;
            }

            .hero-learn-button {
              min-width: 132px;
              min-height: 44px;
              padding: 12px 28px;
            }

            .hero-stat {
              position: relative;
              inset: auto;
              margin: 0 24px;
              max-width: calc(100% - 48px);
              white-space: normal;
              text-align: center;
              line-height: 1.5;
              font-size: 10px;
            }

            .hero-watermark,
            .scroll-cue {
              display: none !important;
              position: static;
            }

            #features {
              padding-top: 80px;
            }
          }
        `}</style>
      </section>

      <HorizontalScrollFeatures />

      <footer className="py-24 px-6 border-t border-white/5 bg-black">
        <div className="container max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <img src="/images/shadow.jpg" alt="AI Analyzer Logo" className="w-8 h-8 object-contain" loading="lazy" />
                S.H.A.D.O.W
              </h2>
              <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
                Helping people make informed judgments about digital media.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Resources</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-white cursor-pointer transition-colors">Documentation</li>
                  <li className="hover:text-white cursor-pointer transition-colors">API Reference</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Security</li>
                </ul>
              </div>
              <div className="space-y-6">
                <h4 className="text-sm font-bold text-white uppercase tracking-widest">Company</h4>
                <ul className="space-y-4 text-sm text-slate-500">
                  <li className="hover:text-white cursor-pointer transition-colors">About</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Careers</li>
                  <li className="hover:text-white cursor-pointer transition-colors">Contact</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs font-medium">
            <p>© 2026 S.H.A.D.O.W — Media analysis to support informed judgment.</p>
            <div className="flex gap-8">
              <span className="hover:text-white cursor-pointer transition-colors">Privacy</span>
              <span className="hover:text-white cursor-pointer transition-colors">Terms</span>
              <span className="hover:text-white cursor-pointer transition-colors">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
