import React, { useEffect, useRef, useState } from "react";
import "./ImgCarousel.css";

// Author: M. Vagnon

interface ImgCarouselProps {
  images: Array<string>;
  slideSpeed?: number;
}
export default function ImgCarousel(props: ImgCarouselProps) {
  const { images, slideSpeed, ...other } = props;
  const [current, setCurrent] = useState(0);
  const [img0, setImg0] = useState(images.length - 1);
  const [img1, setImg1] = useState(0);
  const [img2, setImg2] = useState(1 % images.length);
  const setImgs = [setImg0, setImg1, setImg2];

  function useInterval(callback: () => void, delay: number) {
    const savedCallback = useRef() as React.MutableRefObject<() => void>;

    // Remember the latest callback
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(
    () => {
      const imgElements = [
        document.querySelector(".carousel-img.carousel-img-left"),
        document.querySelector(".carousel-img.carousel-img-center"),
        document.querySelector(".carousel-img.carousel-img-right"),
      ];

      imgElements[0]?.classList.replace(
        "carousel-img-left",
        "carousel-img-right"
      );
      imgElements[1]?.classList.replace(
        "carousel-img-center",
        "carousel-img-left"
      );
      imgElements[2]?.classList.replace(
        "carousel-img-right",
        "carousel-img-center"
      );
      setImgs[current % imgElements.length](
        (current + imgElements.length - 1) % images.length
      );
      setCurrent((prevState) => prevState + 1);
    },
    slideSpeed ? slideSpeed : 10000
  );

  return (
    <React.Fragment>
      <div className="carousel" {...other}>
        <div
          className="carousel-img carousel-img-left"
          style={{
            backgroundImage: `url(${images[img0]})`,
          }}
        />
        <div
          className="carousel-img carousel-img-center"
          style={{
            backgroundImage: `url(${images[img1]})`,
          }}
        />
        <div
          className="carousel-img carousel-img-right"
          style={{
            backgroundImage: `url(${images[img2]})`,
          }}
        />
      </div>
    </React.Fragment>
  );
}
