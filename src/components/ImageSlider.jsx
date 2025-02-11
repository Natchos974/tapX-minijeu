import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

function ImageSlider({ imagesArray }) {
  return (
    <div className="w-full h-auto">
      <Slide>
        {imagesArray.map((slideImage, index) => (
          <div
            key={index}
            style={{ backgroundImage: `url(${slideImage})` }}
            className="flex items-center justify-center w-full h-0 pb-[56.25%] bg-cover bg-center rounded-md"
          ></div>
        ))}
      </Slide>
    </div>
  );
}

export default ImageSlider;
