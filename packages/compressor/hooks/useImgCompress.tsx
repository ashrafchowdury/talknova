import { useState } from "react";
import Compressor from "compressorjs";
import { useToast } from "@/packages/ui";

const useImgCompress = () => {
  const [preview, setPreview] = useState([]);
  const [production, setProduction] = useState([]);
  const { toast } = useToast();

  const compressImg = (files: any) => {
    const MAX_PREVIEW_COUNT = 4;
    const productionImg: any = [];
    const previewImg: any = [];

    if (files.length > 0 && files.length <= MAX_PREVIEW_COUNT) {
      for (let i = 0; i < files.length; i++) {
        new Compressor(files[i], {
          quality: 0.4, // Adjust the quality here as neede
          success(result: any) {
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
