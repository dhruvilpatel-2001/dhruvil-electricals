"use client";

import { useState, useEffect } from "react";

export default function AutoResizeImage({ src, alt, maxWidth = 1200 }) {
  const [optimizedSrc, setOptimizedSrc] = useState("");

  useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.crossOrigin = "anonymous"; // allows canvas drawing
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const scale = maxWidth / img.width;

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      setOptimizedSrc(canvas.toDataURL("image/jpeg", 0.8));
    };
  }, [src]);

  return (
    <img
      src={optimizedSrc || src}
      alt={alt}
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  );
}
