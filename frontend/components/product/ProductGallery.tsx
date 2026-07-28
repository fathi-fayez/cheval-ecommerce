"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type ProductGalleryProps = {
  name: string;
  image: string;
  images: string[];
};

export default function ProductGallery({
  name,
  image,
  images,
}: ProductGalleryProps) {
  const galleryImages = useMemo(() => {
    const list = images?.length ? images : [image];
    return Array.from(new Set(list.filter(Boolean)));
  }, [image, images]);

  const [activeImage, setActiveImage] = useState(galleryImages[0] || image);

  return (
    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:gap-4">
      <div className="flex gap-2 overflow-x-auto sm:w-24 sm:flex-col sm:overflow-visible">
        {galleryImages.map((src) => {
          const isActive = src === activeImage;
          return (
            <button
              key={src}
              type="button"
              onClick={() => setActiveImage(src)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden border bg-surface sm:h-24 sm:w-full ${
                isActive ? "border-foreground" : "border-transparent"
              }`}
              aria-label={`View ${name} image`}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>

      <div className="relative aspect-[4/5] w-full flex-1 overflow-hidden bg-surface">
        <Image
          src={activeImage}
          alt={name}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
