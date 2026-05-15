import React from 'react'
import { Link } from 'react-router-dom'
import './about.css'
import Nav from "../components/Nav"

export default function About() {
  return (
    <div className="ab-page">
      <div className="spotlight" />
      <div className="spotlight-2" />
      <div className="noise" />
      <Nav/>

      <section className="ab-hero">
        <div className="ab-hero__left">
          <p className="ab-hero__eyebrow fade-up fade-up-1">Mood-Driven Music Experience</p>
          <h1 className="ab-hero__title fade-up fade-up-2">
            YOUR FACE
            <span>YOUR</span>
            <em>MUSIC</em>
          </h1>
          <p className="ab-hero__desc fade-up fade-up-3">
            MoodSync reads your facial expressions in real-time and plays the perfect song for how you actually feel — not how you think you feel. Four moods, infinite songs, one seamless experience.
          </p>
          <Link to="/face" className="ab-hero__cta fade-up fade-up-4">
            <i className="fa-solid fa-play" /> Start Listening
          </Link>
        </div>

        <div className="ab-hero__visual fade-up fade-up-3">
          <div className="ab-hero__card">
            <p className="ab-hero__card-num">01 — Feature</p>
            <h3 className="ab-hero__card-title">Face Recognition</h3>
            <p className="ab-hero__card-desc">Your camera reads micro-expressions to detect your real emotional state instantly.</p>
          </div>
          <div className="ab-hero__card">
            <p className="ab-hero__card-num">02 — Feature</p>
            <h3 className="ab-hero__card-title">Mood Playlists</h3>
            <p className="ab-hero__card-desc">Every mood gets its own curated playlist — single tracks or full sets, your choice.</p>
          </div>
          <div className="ab-hero__card">
            <p className="ab-hero__card-num">03 — Feature</p>
            <h3 className="ab-hero__card-title">Artist Upload</h3>
            <p className="ab-hero__card-desc">Artists submit songs. Admin-approved tracks get featured across the platform.</p>
          </div>
          <div className="ab-hero__card">
            <p className="ab-hero__card-num">04 — Feature</p>
            <h3 className="ab-hero__card-title">Personal Dashboard</h3>
            <p className="ab-hero__card-desc">Track your listening history, mood patterns, and manage your uploaded songs.</p>
          </div>
        </div>
      </section>

      <section className="ab-how">
        <p className="ab-section-label">How It Works</p>
        <h2 className="ab-section-heading">
          FOUR STEPS TO<br /><span className="accent">PERFECT SOUND</span>
        </h2>
        <div className="ab-how__grid">
          <div className="ab-how__step">
            <span className="ab-how__step-num">01</span>
            <div className="ab-how__step-icon"><i className="fa-solid fa-camera" /></div>
            <h3 className="ab-how__step-title">Open Camera</h3>
            <p className="ab-how__step-text">Allow camera access. MoodSync activates face-tracking in real time through your browser — no app download needed.</p>
          </div>
          <div className="ab-how__step">
            <span className="ab-how__step-num">02</span>
            <div className="ab-how__step-icon"><i className="fa-solid fa-brain" /></div>
            <h3 className="ab-how__step-title">Detect Mood</h3>
            <p className="ab-how__step-text">Our model analyzes your facial landmarks and classifies your current emotion — happy, sad, angry, or surprised.</p>
          </div>
          <div className="ab-how__step">
            <span className="ab-how__step-num">03</span>
            <div className="ab-how__step-icon"><i className="fa-solid fa-music" /></div>
            <h3 className="ab-how__step-title">Match Music</h3>
            <p className="ab-how__step-text">A curated song or playlist built for that exact mood starts playing automatically. No search. No decisions.</p>
          </div>
          <div className="ab-how__step">
            <span className="ab-how__step-num">04</span>
            <div className="ab-how__step-icon"><i className="fa-solid fa-chart-line" /></div>
            <h3 className="ab-how__step-title">Track History</h3>
            <p className="ab-how__step-text">Your dashboard logs every session — what mood you were in, what played, and trends over time.</p>
          </div>
        </div>
      </section>

      <section className="ab-moods">
        <p className="ab-section-label">The Moods</p>
        <h2 className="ab-section-heading">
          FOUR EMOTIONS<br /><span className="accent">ONE PLATFORM</span>
        </h2>
        <div className="ab-moods__grid">
          <div className="ab-mood-card ab-mood-card--happy">
            <span className="ab-mood-card__bg-text">HAPPY</span>
            <span className="ab-mood-card__emoji">🔥</span>
            <h3 className="ab-mood-card__name">HAPPY</h3>
            <p className="ab-mood-card__desc">Upbeat anthems, feel-good pop, and high-energy tracks that match your radiant energy. When you glow, the music glows with you.</p>
          </div>
          <div className="ab-mood-card ab-mood-card--sad">
            <span className="ab-mood-card__bg-text">SAD</span>
            <span className="ab-mood-card__emoji">🌊</span>
            <h3 className="ab-mood-card__name">SAD</h3>
            <p className="ab-mood-card__desc">Slow, introspective, and deeply emotional tracks for when you need the music to understand what words cannot. Let it sit with you.</p>
          </div>
          <div className="ab-mood-card ab-mood-card--angry">
            <span className="ab-mood-card__bg-text">ANGRY</span>
            <span className="ab-mood-card__emoji">⚡</span>
            <h3 className="ab-mood-card__name">ANGRY</h3>
            <p className="ab-mood-card__desc">Aggressive beats, raw vocals, and explosive energy. Channel the fire into something powerful. MoodSync turns rage into rhythm.</p>
          </div>
          <div className="ab-mood-card ab-mood-card--surprised">
            <span className="ab-mood-card__bg-text">SURPRISED</span>
            <span className="ab-mood-card__emoji">✦</span>
            <h3 className="ab-mood-card__name">SURPRISED</h3>
            <p className="ab-mood-card__desc">Unpredictable, eclectic, and wonderfully unexpected. When life catches you off guard, the music meets you in that electric moment.</p>
          </div>
        </div>
      </section>

      <section className="ab-upload">
        <div className="ab-upload__left">
          <p className="ab-section-label">For Artists</p>
          <h2 className="ab-section-heading">
            SHARE YOUR<br /><span className="accent">SOUND</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(245,240,235,0.5)', fontWeight: 300, lineHeight: 1.8, marginBottom: 32 }}>
            MoodSync is built for independent artists. Upload your tracks, tag them to a mood, and get in front of listeners exactly when your music will hit hardest.
          </p>
          <div className="ab-upload__process">
            <div className="ab-upload__step">
              <div className="ab-upload__step-dot">01</div>
              <div>
                <p className="ab-upload__step-title">Upload Your Track</p>
                <p className="ab-upload__step-text">Submit your audio file, add a title, artist name, and assign it to one of the four moods.</p>
              </div>
            </div>
            <div className="ab-upload__step">
              <div className="ab-upload__step-dot">02</div>
              <div>
                <p className="ab-upload__step-title">Admin Review</p>
                <p className="ab-upload__step-text">Our team listens to every submission. Quality tracks that fit the mood are approved within 48 hours.</p>
              </div>
            </div>
            <div className="ab-upload__step">
              <div className="ab-upload__step-dot">03</div>
              <div>
                <p className="ab-upload__step-title">Go Live</p>
                <p className="ab-upload__step-text">Approved tracks are added to the mood playlist and start playing for real users immediately.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="ab-upload__visual">
          <div className="ab-upload__icon">
            <i className="fa-solid fa-cloud-arrow-up" />
          </div>
          <h3 className="ab-upload__title">Submit Your Music</h3>
          <p className="ab-upload__sub">
            Only registered users can upload. Sign up, upload your track, and let the admin decide if it belongs in the mood library. No gatekeeping — just quality control.
          </p>
          <br />
          <Link to="/uploadSong" className="btn-primary" style={{ display: 'inline-flex', marginTop: 8 }}>
            <i className="fa-solid fa-upload" /> Upload Now
          </Link>
        </div>
      </section>

      <section className="ab-dashboard">
        <p className="ab-section-label">User Dashboard</p>
        <h2 className="ab-section-heading">
          YOUR SPACE<br /><span className="accent">YOUR DATA</span>
        </h2>
        <div className="ab-dashboard__inner">
          <div>
            <div className="ab-dash-feature">
              <div className="ab-dash-feature__icon"><i className="fa-solid fa-user-pen" /></div>
              <div>
                <p className="ab-dash-feature__title">Profile Management</p>
                <p className="ab-dash-feature__text">Update your name, email, avatar, and personal details anytime from your dashboard.</p>
              </div>
            </div>
            <div className="ab-dash-feature">
              <div className="ab-dash-feature__icon"><i className="fa-solid fa-clock-rotate-left" /></div>
              <div>
                <p className="ab-dash-feature__title">Listening History</p>
                <p className="ab-dash-feature__text">Every song played through MoodSync is logged. Review what you listened to and when.</p>
              </div>
            </div>
            <div className="ab-dash-feature">
              <div className="ab-dash-feature__icon"><i className="fa-solid fa-music" /></div>
              <div>
                <p className="ab-dash-feature__title">Your Uploads</p>
                <p className="ab-dash-feature__text">See all your submitted songs — pending, approved, or rejected — in one clean view.</p>
              </div>
            </div>
            <div className="ab-dash-feature">
              <div className="ab-dash-feature__icon"><i className="fa-solid fa-chart-bar" /></div>
              <div>
                <p className="ab-dash-feature__title">Mood Analytics</p>
                <p className="ab-dash-feature__text">Discover your dominant moods over time. Patterns you never noticed about yourself, visualized.</p>
              </div>
            </div>
          </div>

          <div className="ab-mock">
            <div className="ab-mock__topbar">
              <div className="ab-mock__dot" />
              <div className="ab-mock__dot" />
              <div className="ab-mock__dot" />
            </div>
            <div className="ab-mock__body">
              <div className="ab-mock__profile">
                <div className="ab-mock__avatar">MS</div>
                <div>
                  <p className="ab-mock__name">Alex Rivera</p>
                  <p className="ab-mock__sub">alex@moodsync.io</p>
                </div>
              </div>
              <div className="ab-mock__stats">
                <div className="ab-mock__stat">
                  <p className="ab-mock__stat-num">142</p>
                  <p className="ab-mock__stat-label">Played</p>
                </div>
                <div className="ab-mock__stat">
                  <p className="ab-mock__stat-num">6</p>
                  <p className="ab-mock__stat-label">Uploads</p>
                </div>
                <div className="ab-mock__stat">
                  <p className="ab-mock__stat-num">4</p>
                  <p className="ab-mock__stat-label">Approved</p>
                </div>
              </div>
              <div className="ab-mock__row">
                <span className="ab-mock__row-icon"><i className="fa-solid fa-music" /></span>
                <span className="ab-mock__row-name">Midnight Drive</span>
                <span className="ab-mock__row-tag">SAD</span>
              </div>
              <div className="ab-mock__row">
                <span className="ab-mock__row-icon"><i className="fa-solid fa-music" /></span>
                <span className="ab-mock__row-name">Blaze &amp; Thunder</span>
                <span className="ab-mock__row-tag">ANGRY</span>
              </div>
              <div className="ab-mock__row">
                <span className="ab-mock__row-icon"><i className="fa-solid fa-music" /></span>
                <span className="ab-mock__row-name">Golden Hour</span>
                <span className="ab-mock__row-tag">HAPPY</span>
              </div>
              <div className="ab-mock__row">
                <span className="ab-mock__row-icon"><i className="fa-solid fa-music" /></span>
                <span className="ab-mock__row-name">Shock Wave</span>
                <span className="ab-mock__row-tag">SURPRISED</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="ab-stats">
        <p className="ab-section-label">Platform</p>
        <h2 className="ab-section-heading">BY THE <span className="accent">NUMBERS</span></h2>
        <div className="ab-stats__grid">
          <div className="ab-stat-box">
            <p className="ab-stat-box__num">4</p>
            <p className="ab-stat-box__label">Mood States</p>
          </div>
          <div className="ab-stat-box">
            <p className="ab-stat-box__num">100%</p>
            <p className="ab-stat-box__label">Real-Time Detection</p>
          </div>
          <div className="ab-stat-box">
            <p className="ab-stat-box__num">0</p>
            <p className="ab-stat-box__label">Skips Needed</p>
          </div>
          <div className="ab-stat-box">
            <p className="ab-stat-box__num">24h</p>
            <p className="ab-stat-box__label">Upload Review Time</p>
          </div>
        </div>
      </section>

      <section className="ab-cta-strip">
        <h2 className="ab-cta-strip__title">
          READY TO FEEL<br /><span>THE MUSIC?</span>
        </h2>
        <p className="ab-cta-strip__sub">
          No playlists to build. No mood to describe. Just your face — and the right song.
        </p>
        <div className="ab-cta-strip__btns">
          <Link to="/face" className="btn-primary">
            <i className="fa-solid fa-play" /> Start Listening
          </Link>
          <Link to="/register" className="btn-ghost">
            <i className="fa-solid fa-user-plus" /> Create Account
          </Link>
        </div>
      </section>

      <footer>
        <div className="footer__grid">
          <div>
            <p className="footer__brand-name">Mood<em>Sync</em></p>
            <p className="footer__brand-desc">
              Music that reads your face. A platform where emotion drives every song, every playlist, every moment.
            </p>
          </div>
          <div>
            <p className="footer__col-title">Navigate</p>
            <ul className="footer__links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/face">Listen</Link></li>
              <li><Link to="/uploadSong">Upload</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Account</p>
            <ul className="footer__links">
              <li><Link to="/login">Sign In</Link></li>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/userDashboard">Dashboard</Link></li>
            </ul>
          </div>
          <div>
            <p className="footer__col-title">Moods</p>
            <ul className="footer__links">
              <li><a href="#">Happy</a></li>
              <li><a href="#">Sad</a></li>
              <li><a href="#">Angry</a></li>
              <li><a href="#">Surprised</a></li>
            </ul>
          </div>
        </div>
        <div className="footer__bottom">
          <p className="footer__copy">2025 MoodSync. All rights reserved.</p>
          <div className="footer__social">
            <a href="#"><i className="fa-brands fa-instagram" /></a>
            <a href="#"><i className="fa-brands fa-x-twitter" /></a>
            <a href="#"><i className="fa-brands fa-spotify" /></a>
            <a href="#"><i className="fa-brands fa-github" /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}