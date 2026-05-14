import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

// Google Fonts loaded via index.html or App.jsx — add these to your <head>:
// <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">

const NAV_LINKS = [
  { label: 'Home', path: '/', icon: '⌂' },
  { label: 'Listen', path: '/face', icon: '◉' },
  { label: 'Upload', path: '/uploadSong', icon: '↑' },
  { label: 'Dashboard', path: '/userDashboard', icon: '▦' },
]

export default function Navbar({ user }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setProfileOpen(false)
  }, [location.pathname])

  const handleLogout = () => {
    // plug your logout logic here
    navigate('/login')
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        :root {
          --red: #e8392a;
          --red-dim: #a82318;
          --red-glow: rgba(232,57,42,0.25);
          --black: #0a0a0a;
          --surface: rgba(14,14,14,0.85);
          --border: rgba(255,255,255,0.07);
          --text: #f0ece6;
          --muted: rgba(240,236,230,0.45);
        }

        .nb-root {
          position: fixed;
          top: 0; left: 0; right: 0;
          z-index: 1000;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.4s ease;
        }

        /* ── desktop bar ── */
        .nb-bar {
          margin: 14px 28px 0;
          padding: 0 22px;
          height: 58px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-radius: 18px;
          background: var(--surface);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid var(--border);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.4),
                      0 8px 32px rgba(0,0,0,0.5),
                      inset 0 1px 0 rgba(255,255,255,0.06);
          transition: box-shadow 0.4s ease, background 0.4s ease;
        }
        .nb-bar.scrolled {
          box-shadow: 0 0 0 1px rgba(0,0,0,0.6),
                      0 12px 48px rgba(0,0,0,0.7),
                      0 0 60px var(--red-glow),
                      inset 0 1px 0 rgba(255,255,255,0.06);
        }

        /* logo */
        .nb-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          user-select: none;
        }
        .nb-logo-icon {
          width: 34px; height: 34px;
          background: var(--red);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 16px;
          box-shadow: 0 0 18px var(--red-glow);
          flex-shrink: 0;
        }
        .nb-logo-text {
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: var(--text);
          letter-spacing: -0.3px;
        }
        .nb-logo-text span {
          color: var(--red);
        }

        /* links */
        .nb-links {
          display: flex;
          align-items: center;
          gap: 2px;
          list-style: none;
          margin: 0; padding: 0;
        }
        .nb-link {
          position: relative;
        }
        .nb-link a {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          border-radius: 10px;
          font-size: 13.5px;
          font-weight: 500;
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.2px;
          white-space: nowrap;
        }
        .nb-link a:hover {
          color: var(--text);
          background: rgba(255,255,255,0.05);
        }
        .nb-link a.active {
          color: var(--text);
          background: rgba(232,57,42,0.12);
        }
        .nb-link a.active::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 50%; transform: translateX(-50%);
          width: 20px; height: 2px;
          background: var(--red);
          border-radius: 2px;
        }
        .nb-link-icon {
          font-size: 13px;
          opacity: 0.7;
        }

        /* right side */
        .nb-right {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        /* upload pill button */
        .nb-upload-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 16px;
          border-radius: 10px;
          background: rgba(232,57,42,0.1);
          border: 1px solid rgba(232,57,42,0.3);
          color: var(--red);
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
          text-decoration: none;
          letter-spacing: 0.2px;
        }
        .nb-upload-btn:hover {
          background: rgba(232,57,42,0.2);
          border-color: rgba(232,57,42,0.5);
          box-shadow: 0 0 18px var(--red-glow);
        }

        /* profile area */
        .nb-profile-wrap {
          position: relative;
        }
        .nb-avatar {
          width: 36px; height: 36px;
          border-radius: 11px;
          background: linear-gradient(135deg, var(--red) 0%, #7a1a10 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: #fff;
          cursor: pointer;
          border: 1.5px solid rgba(232,57,42,0.4);
          transition: all 0.2s;
          user-select: none;
          overflow: hidden;
        }
        .nb-avatar:hover {
          border-color: var(--red);
          box-shadow: 0 0 14px var(--red-glow);
        }
        .nb-avatar img {
          width: 100%; height: 100%;
          object-fit: cover;
          border-radius: 10px;
        }

        /* dropdown */
        .nb-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 210px;
          background: rgba(18,18,18,0.97);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 8px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.7),
                      0 0 0 1px rgba(255,255,255,0.04);
          backdrop-filter: blur(20px);
          opacity: 0;
          transform: translateY(-8px) scale(0.97);
          pointer-events: none;
          transition: opacity 0.2s, transform 0.2s;
        }
        .nb-dropdown.open {
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: all;
        }
        .nb-dd-user {
          padding: 10px 12px 12px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 6px;
        }
        .nb-dd-name {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          color: var(--text);
        }
        .nb-dd-email {
          font-size: 11.5px;
          color: var(--muted);
          margin-top: 2px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .nb-dd-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 9px 12px;
          border-radius: 10px;
          font-size: 13px;
          color: var(--muted);
          text-decoration: none;
          cursor: pointer;
          transition: all 0.15s;
          background: none;
          border: none;
          width: 100%;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
        }
        .nb-dd-item:hover {
          background: rgba(255,255,255,0.05);
          color: var(--text);
        }
        .nb-dd-item.danger:hover {
          background: rgba(232,57,42,0.1);
          color: var(--red);
        }
        .nb-dd-icon {
          font-size: 14px;
          width: 18px;
          text-align: center;
          opacity: 0.7;
        }
        .nb-dd-sep {
          height: 1px;
          background: var(--border);
          margin: 6px 0;
        }

        /* login btn */
        .nb-login-btn {
          padding: 8px 20px;
          border-radius: 10px;
          background: var(--red);
          color: #fff;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all 0.2s;
          box-shadow: 0 0 20px var(--red-glow);
          letter-spacing: 0.2px;
        }
        .nb-login-btn:hover {
          background: #f04535;
          box-shadow: 0 0 30px rgba(232,57,42,0.5);
          transform: translateY(-1px);
        }

        /* hamburger */
        .nb-hamburger {
          display: none;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
          padding: 5px;
          background: none;
          border: none;
          outline: none;
        }
        .nb-hamburger span {
          display: block;
          width: 22px; height: 2px;
          background: var(--text);
          border-radius: 2px;
          transition: all 0.3s;
          transform-origin: center;
        }
        .nb-hamburger.open span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
        .nb-hamburger.open span:nth-child(2) { opacity: 0; transform: scaleX(0); }
        .nb-hamburger.open span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }

        /* mobile menu */
        .nb-mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(8,8,8,0.97);
          backdrop-filter: blur(24px);
          z-index: 999;
          display: flex;
          flex-direction: column;
          padding: 100px 32px 40px;
          opacity: 0;
          pointer-events: none;
          transition: opacity 0.3s;
        }
        .nb-mobile-menu.open {
          opacity: 1;
          pointer-events: all;
        }
        .nb-mobile-links {
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }
        .nb-mobile-link {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 20px;
          border-radius: 14px;
          text-decoration: none;
          color: var(--muted);
          font-family: 'Syne', sans-serif;
          font-size: 22px;
          font-weight: 700;
          transition: all 0.2s;
          border: 1px solid transparent;
        }
        .nb-mobile-link:hover,
        .nb-mobile-link.active {
          color: var(--text);
          background: rgba(232,57,42,0.08);
          border-color: rgba(232,57,42,0.15);
        }
        .nb-mobile-link-icon {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .nb-mobile-bottom {
          border-top: 1px solid var(--border);
          padding-top: 24px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .nb-mobile-user {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .nb-mobile-avatar {
          width: 46px; height: 46px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--red) 0%, #7a1a10 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 18px;
          color: #fff;
          flex-shrink: 0;
          overflow: hidden;
        }
        .nb-mobile-avatar img {
          width: 100%; height: 100%; object-fit: cover;
        }
        .nb-mobile-user-info .nb-dd-name { font-size: 16px; }
        .nb-mobile-user-info .nb-dd-email { font-size: 12px; }
        .nb-mobile-logout {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 20px;
          border-radius: 12px;
          background: rgba(232,57,42,0.08);
          border: 1px solid rgba(232,57,42,0.2);
          color: var(--red);
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
          outline: none;
        }
        .nb-mobile-logout:hover {
          background: rgba(232,57,42,0.15);
        }

        @media (max-width: 768px) {
          .nb-bar {
            margin: 10px 14px 0;
            padding: 0 16px;
            height: 52px;
          }
          .nb-links, .nb-upload-btn, .nb-profile-wrap { display: none; }
          .nb-hamburger { display: flex; }
          .nb-login-btn { padding: 7px 14px; font-size: 12.5px; }
        }
      `}</style>

      {/* ── NAV BAR ── */}
      <nav className="nb-root">
        <div className={`nb-bar${scrolled ? ' scrolled' : ''}`}>

          {/* Logo */}
          <Link to="/" className="nb-logo">
            <div className="nb-logo-icon">🎵</div>
            <span className="nb-logo-text">Mood<span>Sync</span></span>
          </Link>

          {/* Desktop Links */}
          <ul className="nb-links">
            {NAV_LINKS.map(link => (
              <li key={link.path} className="nb-link">
                <Link
                  to={link.path}
                  className={location.pathname === link.path ? 'active' : ''}
                >
                  <span className="nb-link-icon">{link.icon}</span>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div className="nb-right">
            {user ? (
              <>
                <Link to="/uploadSong" className="nb-upload-btn">
                  ↑ Upload Song
                </Link>
                <div className="nb-profile-wrap">
                  <div
                    className="nb-avatar"
                    onClick={() => setProfileOpen(p => !p)}
                    title={user.name}
                  >
                    {user.avatar
                      ? <img src={user.avatar} alt={user.name} />
                      : (user.name?.[0] || 'U').toUpperCase()
                    }
                  </div>
                  <div className={`nb-dropdown${profileOpen ? ' open' : ''}`}>
                    <div className="nb-dd-user">
                      <div className="nb-dd-name">{user.name || 'User'}</div>
                      <div className="nb-dd-email">{user.email || ''}</div>
                    </div>
                    <Link to="/userDashboard" className="nb-dd-item">
                      <span className="nb-dd-icon">▦</span> Dashboard
                    </Link>
                    <Link to="/face" className="nb-dd-item">
                      <span className="nb-dd-icon">◉</span> Start Listening
                    </Link>
                    <div className="nb-dd-sep" />
                    <button onClick={handleLogout} className="nb-dd-item danger">
                      <span className="nb-dd-icon">→</span> Log Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <Link to="/login" className="nb-login-btn">
                Sign In →
              </Link>
            )}

            {/* Hamburger */}
            <button
              className={`nb-hamburger${menuOpen ? ' open' : ''}`}
              onClick={() => setMenuOpen(p => !p)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>
      </nav>

      {/* ── MOBILE MENU ── */}
      <div className={`nb-mobile-menu${menuOpen ? ' open' : ''}`}>
        <div className="nb-mobile-links">
          {NAV_LINKS.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`nb-mobile-link${location.pathname === link.path ? ' active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="nb-mobile-link-icon">{link.icon}</span>
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nb-mobile-bottom">
          {user ? (
            <>
              <div className="nb-mobile-user">
                <div className="nb-mobile-avatar">
                  {user.avatar
                    ? <img src={user.avatar} alt={user.name} />
                    : (user.name?.[0] || 'U').toUpperCase()
                  }
                </div>
                <div className="nb-mobile-user-info">
                  <div className="nb-dd-name">{user.name || 'User'}</div>
                  <div className="nb-dd-email">{user.email || ''}</div>
                </div>
              </div>
              <button onClick={handleLogout} className="nb-mobile-logout">
                → Log Out
              </button>
            </>
          ) : (
            <Link to="/login" className="nb-login-btn" style={{ justifyContent: 'center', padding: '13px' }}>
              Sign In →
            </Link>
          )}
        </div>
      </div>
    </>
  )
}