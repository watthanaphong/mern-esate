import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface Props {
  images: string[];
}

const ImageSlider = ({ images }: Props) => {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((index - 1 + images.length) % images.length);
  };

  const next = () => {
    setIndex((index + 1) % images.length);
  };

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <img
        src={images[index]}
        className="w-full h-full object-cover transition-all"
        alt="listing"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
          >
            <FaChevronRight />
          </button>
        </>
      )}
    </div>
  );
};

export default ImageSlider;
