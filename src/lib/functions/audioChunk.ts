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

const onStop = async (data: any) => {
  try {
    const response = await fetch(data);
    const audioData = await response.arrayBuffer();
    const uint8Array: any = new Uint8Array(audioData); // Convert the ArrayBuffer to a Uint8Array
    const base64String: any = btoa(
      // Convert the Uint8Array to a Base64 string
      String.fromCharCode.apply(null, uint8Array)
    );
    console.log(base64String);
  } catch (error) {
    console.error("Error converting audio to Blob: ", error);
  }
};
const playAudioFromBlob = (audioTest: any) => {
  if (audioTest) {
    const base64String = `data:audio/webm;base64,${audioTest}`;
    const base64Data = base64String.split(",")[1];
    const binaryString = atob(base64Data); // Convert the Base64 string to a Uint8Array
    const uint8Array = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([uint8Array], { type: "audio/webm" }); // Create a Blob from the Uint8Array
    const audioURL = URL.createObjectURL(blob); // Create an Object URL for the Blob
    console.log(blob);
  } else {
    console.error("No audio Blob available");
  }
};
