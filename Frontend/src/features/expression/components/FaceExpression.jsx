import { useEffect, useRef, useState } from "react";
import { initModel, startDetection } from "../utils/util";
import "./FaceExpression.scss";

export default function FaceExpression({ onClick = () => {} }) {
  const videoRef     = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef  = useRef(null);
  const streamRef     = useRef(null);

  const [expression, setExpression] = useState(null);
  const [countdown,  setCountdown]  = useState(null);
  const [detecting,  setDetecting]  = useState(false);

  useEffect(() => {
    initModel({ landmarkerRef });
    return () => {
      if (animationRef.current)  cancelAnimationFrame(animationRef.current);
      if (streamRef.current)     streamRef.current.getTracks().forEach(t => t.stop());
      if (landmarkerRef.current) landmarkerRef.current.close();
    };
  }, []);

  async function handleClick() {
    if (detecting) return;
    setDetecting(true);
    setExpression(null);

    for (let i = 3; i >= 1; i--) {
      setCountdown(i);
      await new Promise(res => setTimeout(res, 1000));
    }
    setCountdown(null);

    const expr = await startDetection({
      videoRef,
      landmarkerRef,
      streamRef,
      setExpression,
      animationRef,
    });

    setDetecting(false);
    onClick(expr);
  }

  return (
    <div className="face-expression">
      <div className="face-expression__orb">
        <div className="face-expression__ring face-expression__ring--outer" />
        <div className="face-expression__ring face-expression__ring--inner" />

        <div className="face-expression__camera">
          <video
            ref={videoRef}
            playsInline
            autoPlay
            className="face-expression__video"
          />

          {countdown !== null && (
            <div className="face-expression__countdown" key={countdown}>
              <span className="face-expression__countdown-num">{countdown}</span>
            </div>
          )}

          {detecting && countdown === null && (
            <div className="face-expression__scanning">
              <div className="face-expression__scanline" />
              <div className="face-expression__scan-label">DETECTING</div>
            </div>
          )}
        </div>

        {["tl","tr","bl","br"].map(pos => (
          <div key={pos} className={`face-expression__bracket face-expression__bracket--${pos}`} />
        ))}
      </div>

      <div className="face-expression__status">
        {expression ? (
          <div className="face-expression__result">
            <span className="face-expression__result-label">MOOD DETECTED</span>
            <span className="face-expression__result-value">{expression}</span>
          </div>
        ) : (
          <p className="face-expression__hint">
            {detecting && countdown === null
              ? "Hold still — reading your expression…"
              : "Position your face in the frame"}
          </p>
        )}
      </div>

      <button
        className={`face-expression__btn${detecting ? " face-expression__btn--active" : ""}`}
        onClick={handleClick}
        disabled={detecting}
      >
        <span className="face-expression__btn-glow" />
        <span className="face-expression__btn-text">
          {detecting
            ? countdown !== null
              ? `Get Ready… ${countdown}`
              : "Scanning…"
            : "Detect Expression"}
        </span>
      </button>
    </div>
  );
}