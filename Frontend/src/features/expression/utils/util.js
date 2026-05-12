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
  } = params;

  if (!landmarkerRef.current) return;

  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });

  streamRef.current = stream;

  videoRef.current.srcObject = stream;

  await new Promise((resolve) => {
    videoRef.current.onloadedmetadata = resolve;
  });

  await videoRef.current.play();

  return new Promise((resolve) => {

    setTimeout(() => {

      const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes?.length > 0) {

        const b = results.faceBlendshapes[0].categories;

        const get = (name) =>
          b.find((x) => x.categoryName === name)?.score || 0;

        const smile =
          (get("mouthSmileLeft") + get("mouthSmileRight")) / 2;

        const frown =
          (get("mouthFrownLeft") + get("mouthFrownRight")) / 2;

        const browDown =
          (get("browDownLeft") + get("browDownRight")) / 2;

        const browUp = get("browInnerUp");

        const jaw = get("jawOpen");

        const squint =
          (get("eyeSquintLeft") + get("eyeSquintRight")) / 2;

        let expr = "neutral";

        if (smile > 0.35) {
          expr = "happy";
        } else if (jaw > 0.35 && browUp > 0.3) {
          expr = "surprised";
        } else if (
          smile < 0.2 &&
          (squint > 0.25 || browDown > 0.2)
        ) {
          expr = "angry";
        } else if (
          frown > 0.12 ||
          (browUp > 0.18 && smile < 0.15)
        ) {
          expr = "sad";
        }

        setExpression(expr);

        resolve(expr);

      } else {

        setExpression("neutral");

        resolve("neutral");

      }

    }, 3000);

  });
};