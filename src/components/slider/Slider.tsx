import { useState, useEffect } from "react";
import { SliderData } from "./SliderData";

interface sliderModel {
  image: string;
  heading: string;
  desc: string;
}
const Slider = () => {
  const [sliderData, setSliderData] = useState<sliderModel[]>(SliderData);
  const [currentIndex, setCurrentIndex] = useState<sliderModel>(sliderData[0]);

  const handleNextImage = () => {
    const currentindex = sliderData.findIndex(
      (item: sliderModel) => item.image === currentIndex.image
    );
    const nextIndex = (currentindex + 1) % sliderData.length;
    setCurrentIndex(sliderData[nextIndex]);
  };
  const handlePrevImage = () => {
    const currentindex = sliderData.findIndex(
      (item: sliderModel) => item.image === currentIndex.image
    );
    if(currentindex === 0){
        const prevIndex = sliderData.length - 1;
        setCurrentIndex(sliderData[prevIndex]);
    }else{
        const prevIndex = (currentindex - 1) % sliderData.length;
        setCurrentIndex(sliderData[prevIndex]);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 4000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div >
        <div className="w-full relative bg-slate-200 mb-5" style={{height: '100vh'}}>
            <img src={currentIndex.image} alt="slide"  className="absolute w-full h-full object-cover"/>
                <button className="absolute top-1/2 left-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full" onClick={handlePrevImage}>
                <i className="fa-solid fa-arrow-left text-xl" />
                </button>
                <button className="absolute top-1/2 right-0 transform -translate-y-1/2 px-4 py-2 bg-gray-800 text-white rounded-full" onClick={handleNextImage}>
                <i className="fa-solid fa-arrow-right text-xl"/>
                </button>
                <div className="absolute bg-slate-900 bg-opacity-40 flex justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/3 ">
                    <div className="mx-4 my-6 rounded">
                        <h2 className="text-4xl text-center text-white font-bold mb-5">{currentIndex.heading}</h2>
                        <p className="text-white mb-2 text-center">{currentIndex.desc}</p>
                        <hr className="border-2 w-52 mx-auto"/>
                        <div className="my-4 flex justify-center">
                            <a href="#product" className="bg-blue-600 text-white rounded-md py-2 px-4">Shop Now</a>
                        </div>
                    </div>
                </div>
        </div>
    </div>
  );
};

export default Slider;
