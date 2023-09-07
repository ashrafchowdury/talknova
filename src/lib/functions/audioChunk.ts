// Audio encoding
function encodeBlobToBase64(blob: any) {
  return new Promise((resolve, reject) => {
    const reader: any = new FileReader();
    reader.onload = () => {
      resolve(reader.result.split(",")[1]); // Extract base64 data part
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
// When stop recoding, audio will converted into binary
const stopRecording = async (audioChunks: any) => {
  const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
  encodeBlobToBase64(audioBlob)
    .then((base64Audio) => {
      console.log(base64Audio);
    })
    .catch((error) => {
      console.error("Error encoding audio:", error);
    });
};
// To get every data from react-mic onData function
const onData = (recordedData: any) => {
  const { chunk } = recordedData;
  // setAudioChunks((prevChunks: any) => [...prevChunks, chunk]);
};
