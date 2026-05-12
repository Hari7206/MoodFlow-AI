import { useEffect, useRef, useState } from "react";
import { initModel, startDetection } from "../utils/util";

export default function FaceExpression({onClick = () => {}}) {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const streamRef = useRef(null);

  const [expression, setExpression] = useState("Click to start");

  useEffect(() => {
    initModel({ landmarkerRef });

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (landmarkerRef.current) landmarkerRef.current.close();
    };
  }, []);


  async function handleClick() {
    const expression =  await startDetection({
            videoRef,
            landmarkerRef,
            streamRef,
            setExpression,
            animationRef,
          })

          onClick(expression)
  }

  return (
    <div style={{ textAlign: "center" }}>
      <video
        ref={videoRef}
        style={{ width: "400px", borderRadius: "12px" }}
        playsInline
        autoPlay
      />

      <h2>{expression}</h2>

      <button
        onClick={handleClick}
      >
        Detect Expression (3s)
      </button>
    </div>
  );
}