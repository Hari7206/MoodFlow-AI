import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'
import "./Protected.css"

function Procteted({ children }) {

    const { user, loading } = useAuth()


    if (loading) return (
  <div className="db__loading">

    {/* Spotlights */}
    <div className="db__spotlight db__spotlight--red" />
    <div className="db__spotlight db__spotlight--dark" />
    <div className="db__spotlight db__spotlight--red2" />

    {/* Background Floating Boxes */}
    <div className="db__bgbox db__bgbox--1" />
    <div className="db__bgbox db__bgbox--2" />
    <div className="db__bgbox db__bgbox--3" />
    <div className="db__bgbox db__bgbox--4" />
    <div className="db__bgbox db__bgbox--5" />
    <div className="db__bgbox db__bgbox--6" />

    {/* Center */}
    <div className="db__center">

      {/* Vinyl */}
      <div className="db__vinyl-wrap">
        <div className="db__vinyl" />
        <div className="db__vinyl-label" />
        <div className="db__vinyl-hole" />
      </div>

      {/* EQ Bars */}
      <div className="db__eq">
        <div className="db__eq-bar db__eq-bar--1" />
        <div className="db__eq-bar db__eq-bar--2" />
        <div className="db__eq-bar db__eq-bar--3" />
        <div className="db__eq-bar db__eq-bar--4" />
        <div className="db__eq-bar db__eq-bar--5" />
        <div className="db__eq-bar db__eq-bar--6" />
        <div className="db__eq-bar db__eq-bar--7" />
      </div>

      {/* Loading Boxes Row */}
      <div className="db__boxes-row">
        <div className="db__lbox db__lbox--1" />
        <div className="db__lbox db__lbox--2" />
        <div className="db__lbox db__lbox--3" />
        <div className="db__lbox db__lbox--4" />
        <div className="db__lbox db__lbox--5" />
      </div>

      {/* Text */}
      <div className="db__label">Loading…</div>

    </div>
  </div>
);
 
    if (!user) {
        return <Navigate to="/login" />
    }

    return children
}

export default Procteted