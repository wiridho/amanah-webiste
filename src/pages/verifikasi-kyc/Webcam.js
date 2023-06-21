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

  // const uploadImage = async () => {
  //   try {
  //     const formData = new FormData();

  //     formData.append("personal.fullName", "RONALDO");
  //     formData.append("personal.gender", "male");
  //     formData.append("personal.birthDate", "2020-10-10");
  //     formData.append("personal.work.name", "FOOTBALLER THE BEST");
  //     formData.append("personal.work.salary", "9999999999");
  //     formData.append("relativesContact.firstRelative.name", "MESSI");
  //     formData.append("relativesContact.firstRelative.relation", "Anak");
  //     formData.append(
  //       "relativesContact.firstRelative.phoneNumber",
  //       "090293284"
  //     );
  //     formData.append("relativesContact.secondRelative.name", "MESSI");
  //     formData.append("relativesContact.secondRelative.relation", "Anak");
  //     formData.append(
  //       "relativesContact.secondRelative.phoneNumber",
  //       "090293284"
  //     );
  //     // formData.append('relatives', dataURLtoFile(imageSrc));
  //     // formData.append('image', dataURLtoFile(imageSrc));
  //     formData.append("idCardImage", dataURLtoFile(capturedImage));
  //     formData.append("faceImage", dataURLtoFile(capturedImage));

  //     const response = await axios.put(
  //       `${apiConfig.baseUrl}/borrowers/request/verification`,
  //       formData,
  //       {
  //         headers: {
  //           "Content-Type": "multipart/form-data",
  //           Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDg1Y2VjOTRmZjYwMDAxNGUwNWVkNjIiLCJyb2xlcyI6ImJvcnJvd2VyIiwidmVyaWZpZWRFbWFpbCI6dHJ1ZSwidmVyaWZpZWRLWUMiOmZhbHNlLCJpYXQiOjE2ODY1NTk3OTYsImV4cCI6MTY4NzE2NDU5Nn0.J9QsxF1harrm2MZ3X4YCQzDE9diJGWBcYl8KTmETczo`,
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error while posting the image", error);
  //   }
  // };

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
