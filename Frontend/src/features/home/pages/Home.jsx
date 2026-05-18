import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from "../components/Nav"
import './Home.css'            

const MOODS = [
  { id: 'happy',     emoji: '😄', label: 'Happy',    color: '#f5a623', desc: 'Bright & Uplifting',   bg: 'rgba(245,166,35,0.12)' },
  { id: 'sad',       emoji: '😢', label: 'Sad',      color: '#5b9bd5', desc: 'Deep & Reflective',    bg: 'rgba(91,155,213,0.12)' },
  { id: 'surprised', emoji: '😮', label: 'Surprised', color: '#a78bfa', desc: 'Bold & Unexpected',    bg: 'rgba(167,139,250,0.12)' },
  { id: 'angry',     emoji: '😠', label: 'Angry',     color: '#e8392a', desc: 'Intense & Raw',        bg: 'rgba(232,57,42,0.12)' },
]

const HOW_STEPS = [
  { num: '01', title: 'Face Scan',      desc: 'Open your camera and let MoodFlow read your expression in real time.', icon: '◉' },
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

  const user = null   

  return (
    <>
     <Navbar />
      <div className="home-root">

        <section className="h-hero" ref={heroRef}>
          <div className="h-hero-bg">
            <img
              src="https://i.pinimg.com/originals/a3/91/0f/a3910f0f9b207e31f32936f0e92f879a.gif"
              alt=""
              className="h-hero-bg-img"
            />
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
              MoodFlow reads your facial expression in real time and instantly
              curates a playlist that matches your emotion — no buttons, no searching,
              just music that gets you.
            </p>
            <div className="h-hero-ctas">
              <Link to="/face" className="btn-primary">◉ &nbsp;Start Listening</Link>
              <Link to="/uploadSong" className="btn-ghost">↑ &nbsp;Contribute a Song</Link>
            </div>
          </div>
        </section>

        <section className="h-band">
          <div className="h-band-img">
            <div className="h-band-img-placeholder">
              <img src="https://i.pinimg.com/736x/2c/09/ba/2c09bae158078f3d0737f9cbad59a51f.jpg" alt="Music mood visual" />
            </div>
            <div className="h-band-overlay-text">
              <h3>FEEL THE <span>MUSIC.</span></h3>
              <p>Your emotion is your remote control.</p>
            </div>
          </div>
          <div className="h-band-text">
            <div className="h-band-label">About MoodFlow</div>
            <h2 className="h-band-heading">Music intelligence<br />built on emotion.</h2>
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

        <section className="h-section" ref={moodsRef}>
          <div className="h-section-header">
            <div className="h-section-header-text">
              <div className="h-section-label">Mood Engine</div>
              <h2 className="h-section-title">Four moods.<br />Infinite songs.</h2>
              <p className="h-section-sub">
                MoodFlow maps your expression to one of four states and instantly
                build a curated playlist just for that feeling.
              </p>
            </div>
            <Link to="/face" className="btn-primary">Detect My Mood →</Link>
          </div>
          <div className="h-moods-grid">
            {MOODS.map((m, i) => (
              <Link key={m.id} to="/face" className={`h-mood-card${moodsIn ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
                <div className="h-mood-glow" style={{ background: m.color }} />
                <span className="h-mood-emoji">{m.emoji}</span>
                <div className="h-mood-label" style={{ color: m.color }}>{m.label}</div>
                <div className="h-mood-desc">{m.desc}</div>
                <span className="h-mood-arrow">↗</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="h-how" ref={howRef}>
          <div className="h-section-label">The Process</div>
          <h2 className="h-section-title" style={{ marginBottom: 12 }}>How it works</h2>
          <p className="h-section-sub">From face to playlist in under two seconds.</p>
          <div className="h-how-timeline">
            {HOW_STEPS.map((s, i) => (
              <div key={s.num} className={`h-how-step${howIn ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="h-how-step-top">
                  <div className="h-how-step-icon">{s.icon}</div>
                  {i < HOW_STEPS.length - 1 && <div className="h-how-connector" />}
                </div>
                <div className="h-how-step-num">{s.num}</div>
                <div className="h-how-step-title">{s.title}</div>
                <div className="h-how-step-desc">{s.desc}</div>
              </div>
            ))}
          </div>
        </section>

        <div className="h-stats" ref={statsRef}>
          {STATS.map((s, i) => (
            <div key={s.label} className={`h-stat${statsIn ? ' visible' : ''}`} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="h-stat-val">{s.value}</div>
              <div className="h-stat-label">{s.label}</div>
            </div>
          ))}
        </div>

        <section className="h-contribute">
          <div className="h-contribute-img">
            <div className="h-contribute-img-placeholder">
              <img src="https://i.pinimg.com/736x/f0/04/66/f00466385b4ca15acaac74f55254b67b.jpg" alt="Upload your music" />
            </div>
          </div>
          <div className="h-contribute-text">
            <div className="h-section-label">Community</div>
            <h2 className="h-section-title">Your music<br />belongs here.</h2>
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
            <Link to="/uploadSong" className="btn-primary">↑ &nbsp;Upload a Song</Link>
          </div>
        </section>

        <div className="h-cta" ref={ctaRef} style={ctaIn ? { opacity: 1, transform: 'translateY(0)' } : {}}>
          <div className="h-cta-bg" />
          <div className="h-cta-gif" />
          <div className="h-cta-content">
            <div className="h-cta-tag">Ready?</div>
            <h2 className="h-cta-title">LET YOUR<br />FACE PICK<br />THE SONG</h2>
            <p className="h-cta-desc">
              Open your camera and let MoodFlow do the rest.
              Your next favourite song is one expression away.
            </p>
            <Link to="/face" className="btn-primary" style={{ fontSize: 15, padding: '16px 32px' }}>
              ◉ &nbsp;Launch Mood Scanner
            </Link>
          </div>
          <div className="h-cta-side">
            <div className="h-cta-card">
              <div className="h-cta-card-icon">♫</div>
              <div className="h-cta-card-title">Contribute Music</div>
              <p className="h-cta-card-desc">
                Have a track that perfectly nails a mood? Share it with the community
                and help others find their sound.
              </p>
              <Link to="/uploadSong" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                ↑ Upload a Song
              </Link>
            </div>
            <div className="h-cta-card">
              <div className="h-cta-card-icon">◈</div>
              <div className="h-cta-card-title">Explore Playlists</div>
              <p className="h-cta-card-desc">
                Browse all four mood playlists — Happy, Sad, Surprised, Angry — and
                discover new tracks the community loves.
              </p>
              <Link to="/face" className="btn-ghost" style={{ width: '100%', justifyContent: 'center' }}>
                Browse Moods →
              </Link>
            </div>
          </div>
        </div>

        <footer className="h-footer">
          <div className="h-footer-top">
            <div className="h-footer-brand">
              <Link to="/" className="h-footer-logo">
                <div className="h-footer-logo-icon">🎵</div>
                <span className="h-footer-logo-text">Mood<span>Flow</span></span>
              </Link>
              <p className="h-footer-tagline">
                Music that reads your face.<br />
                Built with ML, powered by community.
              </p>
              <div className="h-footer-socials">
                <span className="h-footer-social">𝕏</span>
                <span className="h-footer-social">in</span>
                <span className="h-footer-social">gh</span>
              </div>
            </div>
            <div className="h-footer-cols">
              <div className="h-footer-col">
                <div className="h-footer-col-title">Product</div>
                <Link to="/face">Mood Scanner</Link>
                <Link to="/uploadSong">Upload Song</Link>
                <Link to="/userDashboard">Dashboard</Link>
              </div>
              <div className="h-footer-col">
                <div className="h-footer-col-title">Moods</div>
                <Link to="/face"> Happy</Link>
                <Link to="/face"> Sad</Link>
                <Link to="/face"> Surprised</Link>
                <Link to="/face"> Angry</Link>
              </div>
              <div className="h-footer-col">
                <div className="h-footer-col-title">Account</div>
                <Link to="/register">Sign Up</Link>
                <Link to="/login">Log In</Link>
                <Link to="/userDashboard">My Uploads</Link>
              </div>
            </div>
          </div>
          <div className="h-footer-bottom">
            <span className="h-footer-copy">© 2025 MoodFlow. Built with ML &amp; music.</span>
            <div className="h-footer-bottom-links">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}