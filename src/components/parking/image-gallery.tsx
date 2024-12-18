"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="aspect-video relative rounded-lg overflow-hidden cursor-pointer">
                <Image
                  src={image}
                  alt={`Parking Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <div className="relative">
                <Image
                  src={images[currentImageIndex]}
                  alt={`Parking Image ${currentImageIndex + 1}`}
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                  onClick={() => setCurrentImageIndex(0)}
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 left-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1/2 right-2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 hover:bg-opacity-75"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
