import React, { useState, useRef, useEffect } from "react";
import Navbar from "../../home/components/Nav";   
import { usePostSong } from "../hook/usePostSong";
import "../style/postSong.scss";

const MOOD_OPTIONS = [
  { value: "happy", label: "happy", icon: "fa-bolt" },
  { value: "sad", label: "sad", icon: "fa-leaf" },
  { value: "angry", label: "angry", icon: "fa-cloud-showers-heavy" },
  { value: "surprised", label: "surprised", icon: "fa-wind" },
];

function PostSong({ user }) {
  const { handlePostSong, loading } = usePostSong();
  
  const [file, setFile] = useState(null);
  const [mood, setMood] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fileInputRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const selectedMoodObj = MOOD_OPTIONS.find(m => m.value === mood);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="agency-post-page">
      <Navbar user={user} />

     
      <section className="hero-minimal">
        <div className="hero-text">
          <span className="badge">Sonic Architecture</span>
          <h1>Designing Moods Through <span className="orange-glow">Pure Frequency</span></h1>
          <p>Upload your tracks, assign emotional metadata, and let our system sync your soundwaves to global visual aesthetics.</p>
        </div>
        
        <div className="bento-grid-intro">
          <div className="bento-card main-visual">
            <img src="https://i.pinimg.com/originals/af/c5/cd/afc5cdc69c1408abff7a21c75ad53ba4.gif" alt="Director Vision" />
            <div className="overlay-text">
              <span>Director's Cut</span>
              <strong>Hari Thapa</strong>
            </div>
          </div>

          <div className="bento-card stats">
            <h2>04</h2>
            <p>Core resonant states mapped for adaptive playback.</p>
          </div>

          <div className="bento-card lead-profile">
            <div className="profile-header">
              <img src="https://i.pinimg.com/1200x/0b/59/a3/0b59a39c96b9b9999109799e94bb964c.jpg" alt="Lead" className="profile-avatar" />
              <div className="meta">
                <strong>Hari Thapa</strong>
                <span>Design & Sound Lead</span>
              </div>
            </div>
            <p className="quote">"Audio isn't just heard; it dictates the visual atmosphere of the entire interface."</p>
          </div>
        </div>
      </section>

  
      <section className="capabilities">
        <div className="cap-header">
           <span className="tag">Engine Specs</span>
           <h2>AI Driven Audio Strategy</h2>
        </div>
        <div className="cap-grid">
           <div className="cap-item">
              <i className="fa-solid fa-microchip"></i>
              <h3>Audio Analysis</h3>
              <p>Neural networks scan your track to ensure perfect emotional baseline mapping.</p>
           </div>
           <div className="cap-item">
              <i className="fa-solid fa-wave-square"></i>
              <h3>Waveform Optimization</h3>
              <p>Lossless compression preparing your soundwaves for cross-platform fidelity.</p>
           </div>
           <div className="cap-item">
              <i className="fa-solid fa-shield-halved"></i>
              <h3>Copyright Protection</h3>
              <p>Secure cryptographic metadata embedding tied directly to your user profile.</p>
           </div>
        </div>
      </section>

    
      <section className="upload-section">
        <div className="upload-grid-main">
          
       
          <div 
            className={`upload-box ${file ? 'active' : ''}`} 
            onClick={() => fileInputRef.current.click()}
          >
            <input type="file" ref={fileInputRef} onChange={handleFileChange} hidden accept="audio/*" />
            <i className={`fa-solid ${file ? 'fa-circle-check' : 'fa-plus'}`}></i>
            <div className="text-meta">
              <h3>{file ? file.name : "PICK THE SONG"}</h3>
              <p>MP3, WAV, or FLAC</p>
            </div>
          </div>

       
          <div className="vibe-card-upload">
            <label className="field-label">SELECT VIBE</label>
            
            <div className="custom-dropdown-modern" ref={dropdownRef} onClick={() => setDropdownOpen(!dropdownOpen)}>
              <div className="selected-view">
                <span>{selectedMoodObj ? selectedMoodObj.label : "Select a mood..."}</span>
                <i className={`fa-solid fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
              </div>

              {dropdownOpen && (
                <div className="options-panel">
                  {MOOD_OPTIONS.map((m) => (
                    <div 
                      key={m.value} 
                      className={`option-row ${mood === m.value ? 'selected' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setMood(m.value);
                        setDropdownOpen(false);
                      }}
                    >
                      <i className={`fa-solid ${m.icon}`}></i>
                      <span>{m.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              className="publish-action-btn" 
              disabled={loading || !file || !mood} 
              onClick={() => handlePostSong({file, mood})}
            >
              {loading ? "UPLOADING..." : "PUBLISH PROJECT"}
            </button>
          </div>

        </div>
      </section>
    </div>
  );
}

export default PostSong;