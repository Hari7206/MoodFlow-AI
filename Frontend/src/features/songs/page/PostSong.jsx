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
    // Block new file selection while uploading
    if (loading) return;
    const selected = e.target.files[0];
    if (selected) setFile(selected);
  };

  const handleUploadBoxClick = () => {
    // Block opening file picker while uploading
    if (loading) return;
    fileInputRef.current.click();
  };

  const handlePublish = async () => {
    await handlePostSong({ file, mood });
    // Reset UI after upload completes (success or fail handled inside hook)
    setFile(null);
    setMood("");
    // Reset the file input so the same file can be re-selected if needed
    if (fileInputRef.current) fileInputRef.current.value = "";
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
            <div className="stats-inner">
              <h2>04</h2>
              <p>Core resonant states mapped for adaptive playback.</p>
              <div className="stats-moods">
                {MOOD_OPTIONS.map(m => (
                  <span key={m.value} className="mood-tag">
                    <i className={`fa-solid ${m.icon}`}></i> {m.label}
                  </span>
                ))}
              </div>
            </div>
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
            <div className="profile-stats-row">
              <div className="pstat">
                <strong>128+</strong>
                <span>Tracks</span>
              </div>
              <div className="pstat">
                <strong>4</strong>
                <span>Moods</span>
              </div>
              <div className="pstat">
                <strong>∞</strong>
                <span>Vibes</span>
              </div>
            </div>
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
          
          {/* Upload box — locked while uploading */}
          <div 
            className={`upload-box ${file ? 'active' : ''} ${loading ? 'locked' : ''}`} 
            onClick={handleUploadBoxClick}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              hidden
              accept="audio/*"
              disabled={loading}
            />
            {loading ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i>
                <div className="text-meta">
                  <h3>UPLOADING...</h3>
                  <p>{file?.name}</p>
                </div>
              </>
            ) : (
              <>
                <i className={`fa-solid ${file ? 'fa-circle-check' : 'fa-plus'}`}></i>
                <div className="text-meta">
                  <h3>{file ? file.name : "PICK THE SONG"}</h3>
                  <p>MP3, WAV, or FLAC</p>
                </div>
              </>
            )}
          </div>

          <div className="vibe-card-upload">
            <label className="field-label">SELECT VIBE</label>
            
            <div
              className={`custom-dropdown-modern ${loading ? 'locked' : ''}`}
              ref={dropdownRef}
              onClick={() => !loading && setDropdownOpen(!dropdownOpen)}
            >
              <div className="selected-view">
                <span>{selectedMoodObj ? selectedMoodObj.label : "Select a mood..."}</span>
                <i className={`fa-solid fa-chevron-${dropdownOpen ? 'up' : 'down'}`}></i>
              </div>

              {dropdownOpen && !loading && (
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
              onClick={handlePublish}
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