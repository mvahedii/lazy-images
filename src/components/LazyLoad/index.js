import * as React from "react";
import "./index.css";
const LazyLoad = ({ src, alt }) => {
  const [imageSrc, setImageSrc] = React.useState("");
  const [imageRef, setImageRef] = React.useState("");

  const handleLoading = (event) => {
    event.target.classList.add("loading");
  };

  const handleError = (event) => {
    event.target.classList.add("error");
  };

  React.useEffect(() => {
    let isIgnore = false;
    let observer;
    if (imageRef && imageSrc !== src) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (
              !isIgnore &&
              (entry.intersectionRatio > 0 || entry.isIntersecting)
            ) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        {
          threshold: 0.01,
          rootMargin: "75%",
        }
      );
      observer.observe(imageRef);
    }
  }, [src, imageSrc, imageRef]);
  return (
    <img
      className="image"
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      onLoad={handleLoading}
      onError={handleError}
    />
  );
};

export default LazyLoad;
