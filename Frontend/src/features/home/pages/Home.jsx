import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'




const MOODS = [
  { id: 'happy',     emoji: '😄', label: 'Happy',     color: '#f5a623', desc: 'Bright & Uplifting',   bg: 'rgba(245,166,35,0.12)' },
  { id: 'sad',       emoji: '😢', label: 'Sad',       color: '#5b9bd5', desc: 'Deep & Reflective',    bg: 'rgba(91,155,213,0.12)' },
  { id: 'surprised', emoji: '😮', label: 'Surprised', color: '#a78bfa', desc: 'Bold & Unexpected',    bg: 'rgba(167,139,250,0.12)' },
  { id: 'angry',     emoji: '😠', label: 'Angry',     color: '#e8392a', desc: 'Intense & Raw',        bg: 'rgba(232,57,42,0.12)' },
]

const HOW_STEPS = [
  { num: '01', title: 'Face Scan',      desc: 'Open your camera and let MoodSync read your expression in real time.', icon: '◉' },
  { num: '02', title: 'Mood Detected',  desc: 'Our ML model maps your face to one of four emotions instantly.', icon: '◈' },
  { num: '03', title: 'Playlist Ready', desc: 'Songs curated for your mood begin playing immediately.', icon: '♫' },
  { num: '04', title: 'You Choose',     desc: 'Browse the full mood playlist and pick exactly what you want.', icon: '✦' },
]

const STATS = [
  { value: '4',    label: 'Mood Categories' },
  { value: '∞',    label: 'Songs Available' },
  { value: 'Live', label: 'Face Detection'  },
  { value: '100%', label: 'Community Driven' },
]

// ── tiny hook: animate number when in view ──
function useInView(ref) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref])
  return inView
}

export default function Home() {
  const heroRef    = useRef(null)
  const moodsRef   = useRef(null)
  const howRef     = useRef(null)
  const statsRef   = useRef(null)
  const ctaRef     = useRef(null)

  const moodsIn  = useInView(moodsRef)
  const howIn    = useInView(howRef)
  const statsIn  = useInView(statsRef)
  const ctaIn    = useInView(ctaRef)

  // subtle parallax on hero bg
  useEffect(() => {
    const hero = heroRef.current
    const onScroll = () => {
      if (!hero) return
      const y = window.scrollY
      hero.style.setProperty('--py', `${y * 0.3}px`)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&family=Bebas+Neue&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --red:       #e8392a;
          --red-dim:   #a82318;
          --red-glow:  rgba(232,57,42,0.22);
          --black:     #080808;
          --surface:   rgba(255,255,255,0.03);
          --border:    rgba(255,255,255,0.07);
          --text:      #f0ece6;
          --muted:     rgba(240,236,230,0.45);
          --syne:      'Syne', sans-serif;
          --dm:        'DM Sans', sans-serif;
          --bebas:     'Bebas Neue', cursive;
        }

        html { scroll-behavior: smooth; }

        body, .home-root {
          background: var(--black);
          color: var(--text);
          font-family: var(--dm);
          overflow-x: hidden;
        }

        /* ═══════════════════ HERO ═══════════════════ */
        .h-hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 0 5vw 8vh;
          overflow: hidden;
        }

        /* background image slot */
        .h-hero-bg {
          position: absolute;
          inset: 0;
          background-color: #111;
          /* ↓ paste your hero background image here */
          /* background-image: url('/your-hero-bg.jpg'); */
          background-size: cover;
          background-position: center top;
          transform: translateY(var(--py, 0));
          will-change: transform;
        }

        /* GIF overlay slot — top right */
        .h-hero-gif {
          position: absolute;
          top: 80px; right: 0;
          width: clamp(320px, 42vw, 680px);
          height: 78vh;
          overflow: hidden;
          /* comment below if you add a gif */
          background: linear-gradient(135deg, rgba(232,57,42,0.06) 0%, rgba(0,0,0,0) 60%);
        }
        .h-hero-gif img,
        .h-hero-gif video {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.55;
          /* src for your gif/video goes here */
        }
        /* placeholder label */
        .h-hero-gif-label {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--dm);
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.15);
          text-transform: uppercase;
          border: 1px dashed rgba(255,255,255,0.07);
        }

        /* dark gradient overlays */
        .h-hero::after {
          content: '';
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to right,  rgba(8,8,8,0.92) 35%, rgba(8,8,8,0.2) 75%, rgba(8,8,8,0.6) 100%),
            linear-gradient(to top,    rgba(8,8,8,1)    0%,  rgba(8,8,8,0)   55%);
          pointer-events: none;
          z-index: 1;
        }

        .h-hero-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .h-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 100px;
          background: rgba(232,57,42,0.1);
          border: 1px solid rgba(232,57,42,0.25);
          font-size: 11.5px;
          font-weight: 500;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 24px;
          animation: fadeUp 0.7s ease both;
        }
        .h-eyebrow-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--red);
          animation: pulse 2s infinite;
        }

        .h-hero-title {
          font-family: var(--bebas);
          font-size: clamp(60px, 11vw, 160px);
          line-height: 0.92;
          letter-spacing: 1px;
          color: var(--text);
          margin-bottom: 12px;
          animation: fadeUp 0.7s 0.1s ease both;
        }
        .h-hero-title .red { color: var(--red); }

        .h-hero-sub {
          font-family: var(--syne);
          font-size: clamp(16px, 2.2vw, 22px);
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 20px;
          letter-spacing: -0.3px;
          animation: fadeUp 0.7s 0.2s ease both;
        }

        .h-hero-desc {
          font-size: 15px;
          font-weight: 300;
          color: rgba(240,236,230,0.55);
          line-height: 1.65;
          max-width: 420px;
          margin-bottom: 36px;
          animation: fadeUp 0.7s 0.3s ease both;
        }

        .h-hero-ctas {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          animation: fadeUp 0.7s 0.4s ease both;
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 28px;
          border-radius: 14px;
          background: var(--red);
          color: #fff;
          font-family: var(--dm);
          font-size: 14px;
          font-weight: 600;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: all 0.25s;
          box-shadow: 0 0 30px var(--red-glow);
          letter-spacing: 0.2px;
        }
        .btn-primary:hover {
          background: #f04535;
          box-shadow: 0 0 50px rgba(232,57,42,0.5);
          transform: translateY(-2px);
        }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 24px;
          border-radius: 14px;
          background: rgba(255,255,255,0.04);
          color: var(--text);
          font-family: var(--dm);
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
          border: 1px solid var(--border);
          cursor: pointer;
          transition: all 0.25s;
          letter-spacing: 0.2px;
        }
        .btn-ghost:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }

        /* scroll indicator */
        .h-scroll-hint {
          position: absolute;
          bottom: 36px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          font-size: 10px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: rgba(255,255,255,0.25);
          animation: fadeUp 1s 0.8s ease both;
        }
        .h-scroll-line {
          width: 1px;
          height: 40px;
          background: linear-gradient(to bottom, var(--red), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }

        /* ═══════════════════ TEXT + IMAGE BAND ═══════════════════ */
        .h-band {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          min-height: 520px;
          overflow: hidden;
        }

        .h-band-img {
          position: relative;
          overflow: hidden;
          /* IMAGE SLOT */
          background: #111;
          min-height: 420px;
        }
        .h-band-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.7;
          display: block;
          /* src: your image here */
        }
        .h-band-img-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.12);
          text-transform: uppercase;
          border: 1px dashed rgba(255,255,255,0.07);
          /* Remove this div once you add your image */
        }
        /* big text overlay on the image */
        .h-band-overlay-text {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          padding: 40px 36px;
          background: linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 100%);
        }
        .h-band-overlay-text h3 {
          font-family: var(--bebas);
          font-size: clamp(40px, 5vw, 72px);
          line-height: 1;
          color: var(--text);
          letter-spacing: 1px;
        }
        .h-band-overlay-text h3 span {
          color: var(--red);
          display: block;
        }
        .h-band-overlay-text p {
          font-size: 13px;
          color: var(--muted);
          margin-top: 10px;
          font-style: italic;
          font-family: var(--dm);
        }

        .h-band-text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 64px 7vw;
          background: rgba(255,255,255,0.015);
          border-left: 1px solid var(--border);
        }
        .h-band-label {
          font-size: 10.5px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 20px;
          font-weight: 500;
        }
        .h-band-heading {
          font-family: var(--syne);
          font-size: clamp(26px, 3.5vw, 44px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 20px;
          letter-spacing: -0.5px;
        }
        .h-band-body {
          font-size: 15px;
          font-weight: 300;
          color: rgba(240,236,230,0.6);
          line-height: 1.75;
          max-width: 400px;
          margin-bottom: 32px;
        }
        .h-band-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .h-tag {
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 12px;
          font-weight: 500;
          border: 1px solid var(--border);
          color: var(--muted);
          transition: all 0.2s;
        }
        .h-tag:hover {
          border-color: rgba(232,57,42,0.4);
          color: var(--red);
          background: rgba(232,57,42,0.06);
        }

        /* ═══════════════════ MOODS ═══════════════════ */
        .h-section {
          padding: 100px 5vw;
        }
        .h-section-label {
          font-size: 10.5px;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: var(--red);
          margin-bottom: 14px;
          font-weight: 500;
        }
        .h-section-title {
          font-family: var(--syne);
          font-size: clamp(28px, 4vw, 52px);
          font-weight: 800;
          line-height: 1.05;
          letter-spacing: -0.5px;
          margin-bottom: 16px;
        }
        .h-section-sub {
          font-size: 15px;
          color: var(--muted);
          font-weight: 300;
          max-width: 480px;
          line-height: 1.65;
          margin-bottom: 56px;
        }
        .h-section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
          margin-bottom: 56px;
        }
        .h-section-header-text { flex: 1; }

        .h-moods-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .h-mood-card {
          position: relative;
          padding: 32px 24px;
          border-radius: 20px;
          background: var(--surface);
          border: 1px solid var(--border);
          cursor: pointer;
          text-decoration: none;
          color: var(--text);
          overflow: hidden;
          transition: transform 0.3s, box-shadow 0.3s, border-color 0.3s;
          opacity: 0;
          transform: translateY(30px);
        }
        .h-mood-card.visible {
          animation: cardIn 0.5s ease forwards;
        }
        .h-mood-card:nth-child(1) { animation-delay: 0s;    }
        .h-mood-card:nth-child(2) { animation-delay: 0.08s; }
        .h-mood-card:nth-child(3) { animation-delay: 0.16s; }
        .h-mood-card:nth-child(4) { animation-delay: 0.24s; }
        .h-mood-card:hover {
          transform: translateY(-6px);
          border-color: rgba(255,255,255,0.14);
        }
        .h-mood-glow {
          position: absolute;
          bottom: -30px; right: -30px;
          width: 120px; height: 120px;
          border-radius: 50%;
          filter: blur(40px);
          opacity: 0.25;
          transition: opacity 0.3s;
        }
        .h-mood-card:hover .h-mood-glow { opacity: 0.5; }
        .h-mood-emoji {
          font-size: 40px;
          margin-bottom: 20px;
          display: block;
          line-height: 1;
        }
        .h-mood-label {
          font-family: var(--syne);
          font-size: 20px;
          font-weight: 800;
          margin-bottom: 6px;
        }
        .h-mood-desc {
          font-size: 12.5px;
          color: var(--muted);
          font-weight: 300;
        }
        .h-mood-arrow {
          position: absolute;
          top: 24px; right: 24px;
          font-size: 18px;
          color: var(--muted);
          transition: transform 0.2s, color 0.2s;
        }
        .h-mood-card:hover .h-mood-arrow {
          transform: translate(3px, -3px);
          color: var(--text);
        }

        /* ═══════════════════ HOW IT WORKS ═══════════════════ */
        .h-how {
          padding: 100px 5vw;
          border-top: 1px solid var(--border);
        }
        .h-how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 20px;
          overflow: hidden;
        }
        .h-how-card {
          background: var(--black);
          padding: 40px 28px;
          position: relative;
          transition: background 0.2s;
          opacity: 0;
          transform: translateY(20px);
        }
        .h-how-card.visible {
          animation: cardIn 0.5s ease forwards;
        }
        .h-how-card:hover { background: rgba(255,255,255,0.025); }
        .h-how-num {
          font-family: var(--bebas);
          font-size: 72px;
          line-height: 1;
          color: rgba(255,255,255,0.04);
          position: absolute;
          top: 16px; right: 20px;
          user-select: none;
        }
        .h-how-icon {
          width: 46px; height: 46px;
          border-radius: 14px;
          background: rgba(232,57,42,0.1);
          border: 1px solid rgba(232,57,42,0.2);
          display: flex; align-items: center; justify-content: center;
          font-size: 20px;
          margin-bottom: 24px;
          color: var(--red);
          transition: box-shadow 0.2s;
        }
        .h-how-card:hover .h-how-icon {
          box-shadow: 0 0 20px var(--red-glow);
        }
        .h-how-title {
          font-family: var(--syne);
          font-size: 18px;
          font-weight: 700;
          margin-bottom: 10px;
        }
        .h-how-desc {
          font-size: 13.5px;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.65;
        }

        /* ═══════════════════ STATS ═══════════════════ */
        .h-stats {
          padding: 80px 5vw;
          border-top: 1px solid var(--border);
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
        }
        .h-stat {
          background: var(--black);
          padding: 48px 32px;
          text-align: center;
          opacity: 0;
        }
        .h-stat.visible {
          animation: cardIn 0.5s ease forwards;
        }
        .h-stat-val {
          font-family: var(--bebas);
          font-size: clamp(48px, 6vw, 80px);
          color: var(--text);
          line-height: 1;
          margin-bottom: 10px;
          background: linear-gradient(135deg, var(--text) 0%, var(--red) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .h-stat-label {
          font-size: 12px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }

        /* ═══════════════════ CONTRIBUTE BAND ═══════════════════ */
        .h-contribute {
          padding: 100px 5vw;
          border-top: 1px solid var(--border);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .h-contribute-img {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          aspect-ratio: 4/3;
          background: #111;
          border: 1px solid var(--border);
        }
        .h-contribute-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          opacity: 0.65;
          /* src: your contribute section image */
        }
        .h-contribute-img-placeholder {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.12);
          text-transform: uppercase;
          /* Remove once you add image */
        }
        .h-contribute-img::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(232,57,42,0.12) 0%, transparent 60%);
        }
        .h-contribute-text {}
        .h-contribute-steps {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin: 32px 0;
        }
        .h-contribute-step {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }
        .h-contribute-step-num {
          width: 32px; height: 32px;
          border-radius: 10px;
          background: rgba(232,57,42,0.1);
          border: 1px solid rgba(232,57,42,0.25);
          display: flex; align-items: center; justify-content: center;
          font-family: var(--syne);
          font-size: 13px;
          font-weight: 700;
          color: var(--red);
          flex-shrink: 0;
        }
        .h-contribute-step-text strong {
          font-family: var(--syne);
          font-size: 14px;
          font-weight: 700;
          display: block;
          margin-bottom: 4px;
        }
        .h-contribute-step-text p {
          font-size: 13px;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.55;
        }

        /* ═══════════════════ CTA ═══════════════════ */
        .h-cta {
          position: relative;
          margin: 0 5vw 100px;
          border-radius: 28px;
          overflow: hidden;
          padding: 80px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
          border: 1px solid rgba(232,57,42,0.2);
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .h-cta.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .h-cta-bg {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 70% 80% at 0% 50%, rgba(232,57,42,0.18) 0%, transparent 70%),
            radial-gradient(ellipse 50% 60% at 100% 20%, rgba(168,35,24,0.12) 0%, transparent 70%),
            rgba(14,14,14,0.95);
          pointer-events: none;
        }
        /* GIF/image slot for CTA bg */
        .h-cta-gif {
          position: absolute;
          right: 0; top: 0; bottom: 0;
          width: 45%;
          overflow: hidden;
          opacity: 0.12;
          pointer-events: none;
          /* src: your cta gif here */
        }
        .h-cta-gif img { width: 100%; height: 100%; object-fit: cover; }
        .h-cta-content {
          position: relative;
          z-index: 1;
          max-width: 500px;
        }
        .h-cta-tag {
          display: inline-block;
          padding: 5px 12px;
          border-radius: 100px;
          font-size: 11px;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: var(--red);
          border: 1px solid rgba(232,57,42,0.3);
          background: rgba(232,57,42,0.06);
          margin-bottom: 20px;
        }
        .h-cta-title {
          font-family: var(--bebas);
          font-size: clamp(42px, 6vw, 80px);
          line-height: 0.95;
          margin-bottom: 16px;
          letter-spacing: 0.5px;
        }
        .h-cta-desc {
          font-size: 15px;
          color: var(--muted);
          font-weight: 300;
          line-height: 1.65;
          margin-bottom: 32px;
        }
        .h-cta-actions {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: 12px;
          align-items: flex-end;
        }
        .h-cta-note {
          font-size: 11.5px;
          color: rgba(240,236,230,0.3);
          text-align: right;
          letter-spacing: 0.5px;
        }

        /* ═══════════════════ FOOTER ═══════════════════ */
        .h-footer {
          border-top: 1px solid var(--border);
          padding: 48px 5vw;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .h-footer-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .h-footer-logo-icon {
          width: 32px; height: 32px;
          background: var(--red);
          border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .h-footer-logo-text {
          font-family: var(--syne);
          font-weight: 800;
          font-size: 16px;
          color: var(--text);
        }
        .h-footer-logo-text span { color: var(--red); }
        .h-footer-links {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
        }
        .h-footer-links a {
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }
        .h-footer-links a:hover { color: var(--text); }
        .h-footer-copy {
          font-size: 12px;
          color: rgba(240,236,230,0.25);
        }

        /* ═══════════════════ ANIMATIONS ═══════════════════ */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.8); }
        }
        @keyframes scrollLine {
          0%   { transform: scaleY(0); transform-origin: top; }
          50%  { transform: scaleY(1); transform-origin: top; }
          51%  { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }

        /* ═══════════════════ RESPONSIVE ═══════════════════ */
        @media (max-width: 1024px) {
          .h-moods-grid { grid-template-columns: repeat(2, 1fr); }
          .h-how-grid   { grid-template-columns: repeat(2, 1fr); }
          .h-stats      { grid-template-columns: repeat(2, 1fr); }
          .h-band       { grid-template-columns: 1fr; }
          .h-band-img   { min-height: 360px; }
          .h-contribute { grid-template-columns: 1fr; }
          .h-contribute-img { max-height: 340px; }
        }
        @media (max-width: 640px) {
          .h-moods-grid { grid-template-columns: 1fr; }
          .h-how-grid   { grid-template-columns: 1fr; }
          .h-stats      { grid-template-columns: repeat(2, 1fr); }
          .h-hero-gif   { display: none; }
          .h-cta        { padding: 48px 28px; }
          .h-cta-actions { align-items: flex-start; }
          .h-footer     { flex-direction: column; align-items: flex-start; gap: 24px; }
          .h-section, .h-how, .h-contribute { padding: 64px 5vw; }
        }
      `}</style>

      <div className="home-root">

        {/* ══ HERO ══ */}
        <section className="h-hero" ref={heroRef}>
          <div className="h-hero-bg" />

          {/* ↓ GIF / video slot — top right */}
          <div className="h-hero-gif">
           
        
            <div className="h-hero-gif-label"> <img src="https://i.pinimg.com/originals/a3/91/0f/a3910f0f9b207e31f32936f0e92f879a.gif" alt="" /></div>
          </div>

          <div className="h-hero-content">
            <div className="h-eyebrow">
              <span className="h-eyebrow-dot" />
              AI Powered Mood Music
            </div>

            <h1 className="h-hero-title">
              YOUR FACE<br />
              <span className="red">SETS THE</span><br />
              VIBE
            </h1>

            <p className="h-hero-sub">Music that feels what you feel.</p>

            <p className="h-hero-desc">
              MoodSync reads your facial expression in real time and instantly
              curates a playlist that matches your emotion — no buttons, no searching,
              just music that gets you.
            </p>

            <div className="h-hero-ctas">
              <Link to="/face" className="btn-primary">
                ◉ &nbsp;Start Listening
              </Link>
              <Link to="/uploadSong" className="btn-ghost">
                ↑ &nbsp;Contribute a Song
              </Link>
            </div>
          </div>

          <div className="h-scroll-hint">
            <div className="h-scroll-line" />
            scroll
          </div>
        </section>

        {/* ══ TEXT + IMAGE OVERLAY BAND ══ */}
        <section className="h-band">
          <div className="h-band-img">
            {/* ↓ IMAGE SLOT */}
           
            <div className="h-band-img-placeholder"> <img src="https://i.pinimg.com/736x/2c/09/ba/2c09bae158078f3d0737f9cbad59a51f.jpg" alt="Music mood visual" /></div>

            {/* Big text overlay on the image */}
            <div className="h-band-overlay-text">
              <h3>
                FEEL THE
                <span>MUSIC.</span>
              </h3>
              <p>Your emotion is your remote control.</p>
            </div>
          </div>

          <div className="h-band-text">
            <div className="h-band-label">About MoodSync</div>
            <h2 className="h-band-heading">
              Music intelligence<br />built on emotion.
            </h2>
            <p className="h-band-body">
              We trained a machine learning model on thousands of facial expressions
              so your music library always knows what you need — before you do.
              No algorithms guessing from play history. Just your face, in the moment.
            </p>
            <div className="h-band-tags">
              {['Face Recognition', 'ML Powered', 'Real-time', 'Community Playlists', 'Mood Curated'].map(t => (
                <span key={t} className="h-tag">{t}</span>
              ))}
            </div>
          </div>
        </section>

        {/* ══ MOODS ══ */}
        <section className="h-section" ref={moodsRef}>
          <div className="h-section-header">
            <div className="h-section-header-text">
              <div className="h-section-label">Mood Engine</div>
              <h2 className="h-section-title">
                Four moods.<br />Infinite songs.
              </h2>
              <p className="h-section-sub">
                MoodSync maps your expression to one of four states and instantly
                builds a curated playlist just for that feeling.
              </p>
            </div>
            <Link to="/face" className="btn-primary">
              Detect My Mood →
            </Link>
          </div>

          <div className="h-moods-grid">
            {MOODS.map((m, i) => (
              <Link
                key={m.id}
                to="/face"
                className={`h-mood-card${moodsIn ? ' visible' : ''}`}
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div
                  className="h-mood-glow"
                  style={{ background: m.color }}
                />
                <span className="h-mood-emoji">{m.emoji}</span>
                <div className="h-mood-label" style={{ color: m.color }}>{m.label}</div>
                <div className="h-mood-desc">{m.desc}</div>
                <span className="h-mood-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ══ HOW IT WORKS ══ */}
        <section className="h-how" ref={howRef}>
          <div className="h-section-label">The Process</div>
          <h2 className="h-section-title" style={{ marginBottom: 12 }}>
            How it works
          </h2>
          <p className="h-section-sub">
            From face to playlist in under two seconds.
          </p>

          <div className="h-how-grid">
            {HOW_STEPS.map((s, i) => (
              <div
                key={s.num}
                className={`h-how-card${howIn ? ' visible' : ''}`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="h-how-num">{s.num}</div>
                <div className="h-how-icon">{s.icon}</div>
                <div className="h-how-title">{s.title}</div>
                <div className="h-how-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS ══ */}
        <div className="h-stats" ref={statsRef}>
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`h-stat${statsIn ? ' visible' : ''}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="h-stat-val">{s.value}</div>
              <div className="h-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ══ CONTRIBUTE ══ */}
        <section className="h-contribute">
          <div className="h-contribute-img">
            {/* ↓ IMAGE SLOT */}
          
            <div className="h-contribute-img-placeholder">  <img src="https://i.pinimg.com/736x/f0/04/66/f00466385b4ca15acaac74f55254b67b.jpg" alt="Upload your music" /></div>
          </div>

          <div className="h-contribute-text">
            <div className="h-section-label">Community</div>
            <h2 className="h-section-title">
              Your music<br />belongs here.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(240,236,230,0.55)', lineHeight: 1.65, fontWeight: 300 }}>
              Got a track that perfectly captures a mood? Upload it and let the
              community vibe with it. Every submission is reviewed before going live.
            </p>
            <div className="h-contribute-steps">
              {[
                { n: '1', t: 'Choose a Mood', d: 'Pick which emotion your song belongs to — Happy, Sad, Surprised, or Angry.' },
                { n: '2', t: 'Upload the Track', d: 'Drop your file and fill in the song details.' },
                { n: '3', t: 'Admin Review', d: 'We review every submission to keep quality high. Approval is fast.' },
                { n: '4', t: 'Goes Live',   d: 'Your track is added to the playlist and the community can listen.' },
              ].map(step => (
                <div key={step.n} className="h-contribute-step">
                  <div className="h-contribute-step-num">{step.n}</div>
                  <div className="h-contribute-step-text">
                    <strong>{step.t}</strong>
                    <p>{step.d}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link to="/uploadSong" className="btn-primary">
              ↑ &nbsp;Upload a Song
            </Link>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <div className="h-cta" ref={ctaRef} style={ctaIn ? { opacity: 1, transform: 'translateY(0)' } : {}}>
          <div className="h-cta-bg" />
          {/* GIF slot in CTA */}
          <div className="h-cta-gif">
            {/* <img src="/your-cta-gif.gif" alt="" /> */}
          </div>

          <div className="h-cta-content">
            <div className="h-cta-tag">Ready?</div>
            <h2 className="h-cta-title">
              LET YOUR<br />FACE PICK<br />THE SONG
            </h2>
            <p className="h-cta-desc">
              Open your camera and let MoodSync do the rest.
              Your next favourite song is one expression away.
            </p>
            <Link to="/face" className="btn-primary" style={{ fontSize: 15, padding: '16px 32px' }}>
              ◉ &nbsp;Launch Mood Scanner
            </Link>
          </div>

          <div className="h-cta-actions">
            <Link to="/register" className="btn-ghost">
              Create Free Account
            </Link>
            <Link to="/uploadSong" className="btn-ghost">
              ↑ Contribute Music
            </Link>
            <span className="h-cta-note">No credit card · Community powered</span>
          </div>
        </div>

        {/* ══ FOOTER ══ */}
        <footer className="h-footer">
          <Link to="/" className="h-footer-logo">
            <div className="h-footer-logo-icon">🎵</div>
            <span className="h-footer-logo-text">Mood<span>Sync</span></span>
          </Link>
          <div className="h-footer-links">
            <Link to="/">Home</Link>
            <Link to="/face">Listen</Link>
            <Link to="/uploadSong">Upload</Link>
            <Link to="/userDashboard">Dashboard</Link>
            <Link to="/register">Register</Link>
          </div>
          <span className="h-footer-copy">© 2025 MoodSync. Built with ML & music.</span>
        </footer>

      </div>
    </>
  )
}