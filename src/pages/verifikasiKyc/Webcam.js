import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const WebcamCapture = ({ selfieFile, fileName, setImageUrl }) => {
  const webcamRef = useRef(null);
  const [isWebcamAvailable, setWebcamAvailability] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isRetake, setIsRetake] = useState(false);

  useEffect(() => {
    checkWebcamAvailability();
  }, []);

  const checkWebcamAvailability = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (stream) {
        setWebcamAvailability(true);
        stream.getTracks().forEach((track) => track.stop());
      }
    } catch (error) {
      console.error("Webcam not available", error);
    }
  };

  const captureImage = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setIsRetake(true);
  };

  const retakeImage = () => {
    setCapturedImage(null);
    setIsRetake(false);
  };

  const saveImage = () => {
    setImageUrl(capturedImage);
    const file = dataURLtoFile(capturedImage, fileName);
    selfieFile(file);
  };

  const dataURLtoFile = (dataURL, fileName) => {
    const arr = dataURL.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], fileName, { type: mime });
  };

  return (
    <div>
      {isWebcamAvailable ? (
        <>
          {!capturedImage ? (
            <>
              <Webcam audio={false} ref={webcamRef} />
              {!isRetake ? (
                <>
                  <button
                    type="button"
                    className="bg-blue-500 px-4 py-2 text-white rounded-md mt-2"
                    onClick={captureImage}
                  >
                    Capture
                  </button>
                  <br />
                  <br />
                </>
              ) : (
                <button onClick={retakeImage}>Retake</button>
              )}
            </>
          ) : (
            <>
              <img src={capturedImage} alt="Captured" />
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="bg-blue-500 px-4 py-2 text-white rounded-md mt-2"
                  onClick={saveImage}
                >
                  Upload
                </button>
                <button
                  type="button"
                  className="bg-red-500 px-4 py-2 text-white rounded-md mt-2"
                  onClick={retakeImage}
                >
                  Retake
                </button>
              </div>
            </>
          )}
        </>
      ) : (
        <div>No webcam available</div>
      )}
    </div>
  );
};

export default WebcamCapture;
