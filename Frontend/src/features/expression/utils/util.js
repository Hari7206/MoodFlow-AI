import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const initModel = async ({ landmarkerRef }) => {
  const vision = await FilesetResolver.forVisionTasks(
    "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
  );

  landmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath:
        "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
    },
    outputFaceBlendshapes: true,
    runningMode: "VIDEO",
    numFaces: 1,
  });
};

export const startDetection = async (params) => {
  const {
    videoRef,
    landmarkerRef,
    streamRef,
    setExpression,
    animationRef,
  } = params;

  if (!landmarkerRef.current) return;

  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  streamRef.current = stream;

  videoRef.current.srcObject = stream;

  await new Promise((res) => {
    videoRef.current.onloadedmetadata = res;
  });

  await videoRef.current.play();

  let startTime = Date.now();

  const detect = () => {
    if (!landmarkerRef.current || !videoRef.current) return;

    if (videoRef.current.videoWidth === 0) {
      animationRef.current = requestAnimationFrame(detect);
      return;
    }

    const results = landmarkerRef.current.detectForVideo(
      videoRef.current,
      performance.now()
    );

    if (results.faceBlendshapes?.length > 0) {
      const b = results.faceBlendshapes[0].categories;

      const get = (name) =>
        b.find((x) => x.categoryName === name)?.score || 0;

      const smile = (get("mouthSmileLeft") + get("mouthSmileRight")) / 2;
      const frown = (get("mouthFrownLeft") + get("mouthFrownRight")) / 2;
      const browDown = (get("browDownLeft") + get("browDownRight")) / 2;
      const browUp = get("browInnerUp");
      const jaw = get("jawOpen");
      const squint = (get("eyeSquintLeft") + get("eyeSquintRight")) / 2;

      let expr = "Neutral 😐";

      if (smile > 0.35) {
        expr = "Happy 😄";
      } else if (jaw > 0.35 && browUp > 0.3) {
        expr = "Surprised 😲";
      } else if (smile < 0.2 && (squint > 0.25 || browDown > 0.2)) {
        expr = "Angry 😠";
      } else if (frown > 0.12 || (browUp > 0.18 && smile < 0.15)) {
        expr = "Sad 😢";
      }

      setExpression(expr);
    }

    if (Date.now() - startTime < 3000) {
      animationRef.current = requestAnimationFrame(detect);
    }
  };

  detect();
};