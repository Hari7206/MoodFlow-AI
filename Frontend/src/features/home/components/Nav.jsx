import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './nav.css'

// index.html → add Font Awesome if missing:
// <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"/>

const LINKS = [
  { label: 'Home',   path: '/',           icon: 'fa-house'          },
  { label: 'About',  path: '/about',      icon: 'fa-circle-info'    },
  { label: 'Listen', path: '/face',       icon: 'fa-headphones'     },
  { label: 'Upload', path: '/uploadSong', icon: 'fa-cloud-arrow-up' },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const [dropOpen,  setDropOpen]  = useState(false)
  const [user,      setUser]      = useState(null)
  const [authReady, setAuthReady] = useState(false)

  const dropRef  = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  /* scroll listener */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  /* close on route change */
  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
  }, [location.pathname])

  /* close dropdown on outside click */
  useEffect(() => {
    const fn = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target))
        setDropOpen(false)
    }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  /* fetch current user on mount */
  useEffect(() => {
    axios
      .get('http://localhost:3000/api/auth/get-me', { withCredentials: true })
      .then((res) => {
        setUser(res.data?.user ?? null)
        setAuthReady(true)
      })
      .catch(() => {
        setUser(null)
        setAuthReady(true)
      })
  }, [])

  /* logout — axios POST so server clears the httpOnly cookie */
  const handleLogout = async () => {
    try {
      await axios.get(
        'http://localhost:3000/api/auth/logout',
        { withCredentials: true }    // sends cookie → server deletes it
      )
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setUser(null)
      setDropOpen(false)
      setMenuOpen(false)
      navigate('/login')
    }
  }

  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <>
      {/* ══════════════════════════════════════════════════
          NAVBAR  —  LEFT | CENTER | RIGHT
      ══════════════════════════════════════════════════ */}
      <header className="nb">
        <div className={`nb__bar${scrolled ? ' nb__bar--glow' : ''}`}>

          {/* ── LEFT: Logo ─────────────────────────────── */}
          <div className="nb__left">
            <Link to="/" className="nb__logo">
           
              <span className="nb__logo-text">
                Mood<em>Flow</em>
              </span>
            </Link>
          </div>

          {/* ── CENTER: Links ───────────────────────────── */}
          <div className="nb__center">
            <ul className="nb__links">
              {LINKS.map((l) => {
                const active = location.pathname === l.path
                return (
                  <li key={l.path}>
                    <Link
                      to={l.path}
                      className={`nb__link${active ? ' nb__link--on' : ''}`}
                    >
                      <i className={`fa-solid ${l.icon}`} />
                      {l.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* ── RIGHT: Auth ─────────────────────────────── */}
          <div className="nb__right">
            {!authReady ? (
              /* loading pulse */
              <div className="nb__skel" />
            ) : user ? (
              /* avatar + dropdown */
              <div className="nb__av-wrap" ref={dropRef}>
                <button
                  className={`nb__av${dropOpen ? ' nb__av--open' : ''}`}
                  onClick={() => setDropOpen((p) => !p)}
                  aria-label="Account menu"
                  aria-expanded={dropOpen}
                >
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} />
                  ) : (
                    initials
                  )}
                </button>

                <div className={`nb__drop${dropOpen ? ' nb__drop--open' : ''}`}>
                  <div className="nb__drop-head">
                    <span className="nb__drop-name">{user.name}</span>
                    <span className="nb__drop-email">{user.email}</span>
                  </div>

                  <Link
                    to="/userDashboard"
                    className="nb__drop-item"
                    onClick={() => setDropOpen(false)}
                  >
                    <i className="fa-solid fa-circle-user" />
                    My Profile
                  </Link>

                  <div className="nb__drop-sep" />

                  <button
                    className="nb__drop-item nb__drop-item--red"
                    onClick={handleLogout}
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket" />
                    Log Out
                  </button>
                </div>
              </div>
            ) : (
              /* guest */
              <Link to="/register" className="nb__cta">
                <i className="fa-solid fa-bolt" />
                Get Started
              </Link>
            )}

            {/* burger — shown via CSS on mobile */}
            <button
              className={`nb__burger${menuOpen ? ' nb__burger--open' : ''}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>

        </div>
      </header>

      {/* ══════════════════════════════════════════════════
          MOBILE DRAWER
      ══════════════════════════════════════════════════ */}
      <div
        className={`nb__drawer${menuOpen ? ' nb__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <div className="nb__mob-links">
          {LINKS.map((l) => {
            const active = location.pathname === l.path
            return (
              <Link
                key={l.path}
                to={l.path}
                className={`nb__mob-link${active ? ' nb__mob-link--on' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                <i className={`fa-solid ${l.icon}`} />
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="nb__mob-foot">
          {!authReady ? null : user ? (
            <>
              <div className="nb__mob-user">
                <div
                  className="nb__av"
                  style={{ width: 44, height: 44, fontSize: 14, flexShrink: 0 }}
                >
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.name} />
                  ) : (
                    initials
                  )}
                </div>
                <div className="nb__mob-user-info">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
              </div>

              <Link
                to="/profile"
                className="nb__mob-prof-btn"
                onClick={() => setMenuOpen(false)}
              >
                <i className="fa-solid fa-circle-user" />
                My Profile
              </Link>

              <button className="nb__mob-logout" onClick={handleLogout}>
                <i className="fa-solid fa-arrow-right-from-bracket" />
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/register"
              className="nb__cta"
              style={{ justifyContent: 'center' }}
              onClick={() => setMenuOpen(false)}
            >
              <i className="fa-solid fa-bolt" />
              Get Started
            </Link>
          )}
        </div>
      </div>
    </>
  )
}