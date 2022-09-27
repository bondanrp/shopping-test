import { useEffect, useState } from "react";

export default function Image({ className, src }) {
  let [imgError, setImgError] = useState(false);
  useEffect(() => {
    setImgError(false);
  }, [src]);

  return imgError ? (
    <div
      className={` w-100 d-flex justify-content-center align-items-center no-item ${className}`}
    >
      <h3 className="pre-line text-center fw-bold text-primary">{`Image\n Unavailable`}</h3>
    </div>
  ) : (
    <img
      className={className}
      onError={() => {
        setImgError(true);
      }}
      src={src}
    />
  );
}
