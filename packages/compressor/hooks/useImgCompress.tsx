import { useState } from "react";
import Compressor from "compressorjs";
import { useToast } from "@/packages/ui";

type PreviewImg = {
  data: ArrayBuffer | string | null;
  name: string;
};

const useImgCompress = () => {
  const [preview, setPreview] = useState<PreviewImg[]>([]);
  const [production, setProduction] = useState<File[]>([]);
  const { toast } = useToast();

  const compressImg = (files: FileList) => {
    const MAX_PREVIEW_COUNT = 4;
    const productionImg: File[] = [];
    const previewImg: PreviewImg[] = [];

    if (files.length > 0 && files.length <= MAX_PREVIEW_COUNT) {
      for (let i = 0; i < files.length; i++) {
        new Compressor(files[i], {
          quality: 0.4, // Adjust the quality here as neede
          success(result: File) {
            const reader = new FileReader();
            reader.readAsDataURL(result);
            reader.onloadend = () => {
              previewImg.push({
                name: files[i].name,
                data: reader.result,
              });
              productionImg.push(result);
              if (previewImg.length === files.length) {
                setPreview(previewImg);
                setProduction(productionImg);
              }
            };
          },
          error(err) {
            toast({ title: "Something Went Wrong!", variant: "destructive" });
          },
        });
      }
    } else {
      toast({
        title: "Can't Select More Then 4 Images At A Time",
        variant: "destructive",
      });
    }
  };

  return { compressImg, preview, production, setPreview, setProduction };
};

export default useImgCompress;
