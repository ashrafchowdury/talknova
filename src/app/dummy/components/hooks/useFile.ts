import { useState } from "react";
import { toast } from "sonner";

const useFile = () => {
  const [filePreview, setFilePreview] = useState<ArrayBuffer | string | null>(
    null
  );
  const [file, setFile] = useState<File | null>({} as File);

  const loadFile = (files: FileList) => {
    setFile(files[0]);
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onloadend = () => {
      setFilePreview(reader.result);
    };
  };

  return { loadFile, filePreview, setFilePreview, file, setFile };
};

export default useFile;
