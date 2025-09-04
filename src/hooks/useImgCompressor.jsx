import Compressor from "compressorjs";
import { useEffect, useState } from "react";

function useImgCompressor(img, setImg, size = 20) {
  const [state, setState] = useState();
  useEffect(() => {
    if (img && img !== state) {
      let q = (size * 1000) / img.size;
      new Compressor(img, {
        quality: q,
        success: (file) => {
          let form = new FormData();
          form.append("file", file, file.name);
          let Image = form.get("file");
          setImg(Image);
          setState(Image);
        },
      });
    }
  }, [img]);

  return state;
}

export function imgCompressor(img, size = 20) {
  if (img) {
    let q = (size * 1000) / img.size;
    var { file } = new Compressor(img, {
      quality: q,
      success: (file) => {
        let form = new FormData();
        form.append("file", file, file.name);
        var image = form.get("file");
        return image;
      },
    });
    return file;
  }
}

export default useImgCompressor;
